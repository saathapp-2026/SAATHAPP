import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const [location, setLocation] = useState('Green Park, New Delhi');
  const [pincode, setPincode] = useState('110016');
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  const [savedAddresses, setSavedAddresses] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem('saathapp-addresses');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedAddress, setSelectedAddress] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = window.localStorage.getItem('saathapp-selected-address');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('saathapp-addresses', JSON.stringify(savedAddresses));
    }
  }, [savedAddresses]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('saathapp-selected-address', JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);

  // Live IP-based Location Detection on First Load
  useEffect(() => {
    if (!selectedAddress) {
      const detectLocation = async () => {
        try {
          const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
          if (response.ok) {
            const data = await response.json();
            if (data && data.city && data.region) {
              const label = `${data.city}, ${data.region}`;
              setLocation(label);
              // We don't save it to `selectedAddress` array so we don't pollute saved addresses, 
              // but we set the top-level location text so the user sees their live city.
            }
          }
        } catch (e) {
          console.error("IP Live Detection failed", e);
        }
      };
      detectLocation();
    }
  }, [selectedAddress]);

  const handleGPSDetect = (onComplete) => {
    setIsGpsLoading(true);
    setTimeout(() => {
      setLocation('Connaught Place, Central Delhi');
      setPincode('110001');
      setIsGpsLoading(false);
      if (onComplete) onComplete();
    }, 2000);
  };

  const handleUseCurrentLocation = (onComplete) => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported in this browser.');
      return;
    }

    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await response.json();
          const address = data?.address || {};
          let area = address.suburb || address.neighbourhood || address.village || address.city_district || address.city;
          if (!area) area = data?.display_name ? data.display_name.split(',')[0] : 'Unknown Area';
          const city = address.city || address.town || address.county || '';
          const state = address.state || '';
          const newPincode = address.postcode || '';
          
          const parts = [area];
          if (city && city !== area) parts.push(city);
          if (state && state !== city) parts.push(state);
          const base = parts.join(', ');
          const label = newPincode ? `${base} - ${newPincode}` : base;
          const nextAddress = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            title: 'Current Location',
            label,
            fullAddress: data?.display_name || label,
            area,
            city,
            state,
            pincode: newPincode,
            phoneNumber: '',
            receiverName: '',
            addressType: 'Home',
            source: 'gps',
            createdAt: new Date().toISOString(),
          };
          setSavedAddresses((prev) => [nextAddress, ...prev]);
          setSelectedAddress(nextAddress);
          setLocation(label);
          setPincode(newPincode);
          
          if (routerLocation.pathname === '/location/add') {
            navigate('/location');
          }
          if (onComplete) onComplete();
        } catch {
          toast.error('Unable to resolve the current location right now.');
        } finally {
          setIsGpsLoading(false);
        }
      },
      async () => {
        toast('GPS denied, falling back to network detection...', { icon: '📡' });
        try {
          const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
          if (response.ok) {
            const data = await response.json();
            if (data && data.city && data.region) {
              const label = `${data.city}, ${data.region}`;
              const nextAddress = {
                id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                title: 'Network Location',
                label,
                fullAddress: label,
                area: data.city,
                city: data.city,
                state: data.region,
                pincode: '000000',
                phoneNumber: '',
                receiverName: '',
                addressType: 'Home',
                source: 'network',
                createdAt: new Date().toISOString(),
              };
              setSavedAddresses((prev) => [nextAddress, ...prev]);
              setSelectedAddress(nextAddress);
              setLocation(label);
              setPincode('000000');
              
              if (routerLocation.pathname === '/location/add') {
                navigate('/location');
              }
              if (onComplete) onComplete();
              toast.success('Location detected via network.');
            } else {
              toast.error('Network detection failed. Please add manually.');
            }
          }
        } catch (e) {
          toast.error('Location permission was denied. You can still add a location manually.');
        } finally {
          setIsGpsLoading(false);
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSaveAddress = (address) => {
    setSavedAddresses((prev) => [address, ...prev]);
    setSelectedAddress(address);
    setLocation(address.label);
    setPincode(address.pincode || '000000');
    navigate('/location');
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setLocation(address.label);
    setPincode(address.pincode || '000000');
    navigate('/');
  };

  const handleDeleteAddress = (addressId) => {
    setSavedAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    setSelectedAddress((prev) => (prev?.id === addressId ? null : prev));
  };

  const value = {
    location,
    setLocation,
    pincode,
    setPincode,
    savedAddresses,
    selectedAddress,
    isGpsLoading,
    handleGPSDetect,
    handleUseCurrentLocation,
    handleSaveAddress,
    handleSelectAddress,
    handleDeleteAddress
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}
