import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, RefreshCw, Navigation, Sparkles, LoaderCircle, PencilLine } from 'lucide-react';

const STORAGE_KEY = 'saathapp-location';
const PLACEHOLDER_STATS = {
  deliveryTime: 'Placeholder',
  nearbyStores: 'Placeholder',
};

function formatLocationLabel(value) {
  if (!value) return 'Select Location...';
  return value;
}

async function reverseGeocode(lat, lon) {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
  if (!response.ok) {
    throw new Error('Unable to resolve address');
  }
  const data = await response.json();
  const address = data?.address || {};
  const locality = address.suburb || address.neighbourhood || address.village || address.town || address.city || 'Current locality';
  const city = address.city || address.town || address.village || locality;
  const state = address.state || 'State';
  const postalCode = address.postcode || 'Postal code';

  return {
    label: `${locality}, ${city} - ${postalCode}`,
    locality,
    city,
    state,
    postalCode,
    fullAddress: data?.display_name || `${locality}, ${city}, ${state}`,
  };
}

export default function LocationHeader({ location, onLocationClick, onLocationChange, onRefresh }) {
  const [resolvedLocation, setResolvedLocation] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [stats, setStats] = useState(PLACEHOLDER_STATS);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setResolvedLocation(parsed);
        if (parsed?.label) {
          onLocationChange?.(parsed.label);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [onLocationChange]);

  useEffect(() => {
    if (!location || location === 'Select Location...') {
      setResolvedLocation(null);
    }
  }, [location]);

  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setStatus('unsupported');
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setStatus('loading');
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await reverseGeocode(position.coords.latitude, position.coords.longitude);
          const nextLocation = {
            ...data,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            source: 'gps',
            savedAt: new Date().toISOString(),
          };
          setResolvedLocation(nextLocation);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLocation));
          onLocationChange?.(nextLocation.label);
          setStatus('ready');
        } catch (geoError) {
          setStatus('error');
          setError(geoError.message || 'Unable to resolve your location.');
        }
      },
      (geoError) => {
        setStatus('denied');
        if (geoError.code === 1) {
          setError('Location permission was denied.');
        } else {
          setError('Unable to detect your location right now.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const handleManualSave = (event) => {
    event.preventDefault();
    const trimmed = manualAddress.trim();
    if (!trimmed) {
      setError('Please enter a delivery address.');
      return;
    }

    const nextLocation = {
      label: trimmed,
      locality: trimmed,
      city: trimmed,
      state: 'Manual input',
      postalCode: 'N/A',
      fullAddress: trimmed,
      source: 'manual',
      savedAt: new Date().toISOString(),
    };

    setResolvedLocation(nextLocation);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLocation));
    onLocationChange?.(trimmed);
    setManualAddress('');
    setShowManualEntry(false);
    setStatus('ready');
    setError('');
  };

  const displayLabel = useMemo(() => formatLocationLabel(resolvedLocation?.label || location), [location, resolvedLocation]);

  return (
    <div className="hidden md:flex items-center gap-2.5 rounded-btn border border-slate-200/70 bg-slate-100/90 px-3.5 py-2.5 text-slate-700 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/70 dark:text-slate-200">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
        {status === 'loading' ? <LoaderCircle size={16} className="animate-spin" /> : <MapPin size={16} />}
      </div>

      <div className="min-w-[220px] max-w-[280px]">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
          <Sparkles size={11} className="text-amber-500" />
          Live Delivery
        </div>

        {status === 'loading' && (
          <div className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">Detecting your location…</div>
        )}

        {status === 'ready' && resolvedLocation && (
          <div className="mt-1 space-y-1">
            <div className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{displayLabel}</div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>{stats.deliveryTime} delivery</span>
              <span>•</span>
              <span>{stats.nearbyStores} nearby stores</span>
            </div>
          </div>
        )}

        {(status === 'denied' || status === 'error' || status === 'unsupported') && (
          <div className="mt-1 space-y-2">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Location unavailable</div>
            {error && <div className="text-xs text-slate-500">{error}</div>}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fetchCurrentLocation()}
                className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white transition hover:opacity-90"
              >
                Enable GPS
              </button>
              <button
                type="button"
                onClick={() => setShowManualEntry((prev) => !prev)}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Enter Address Manually
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            if (onRefresh) onRefresh();
            fetchCurrentLocation();
          }}
          className="rounded-full p-1.5 text-slate-500 transition hover:bg-white hover:text-primary dark:hover:bg-slate-700"
          title="Refresh location"
        >
          <RefreshCw size={14} />
        </button>
        <button
          type="button"
          onClick={() => setShowManualEntry((prev) => !prev)}
          className="rounded-full p-1.5 text-slate-500 transition hover:bg-white hover:text-primary dark:hover:bg-slate-700"
          title="Change address"
        >
          <PencilLine size={14} />
        </button>
      </div>

      {showManualEntry && (
        <form onSubmit={handleManualSave} className="absolute left-0 top-full z-50 mt-2 w-[280px] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Manual address</label>
          <input
            type="text"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            placeholder="Enter a new delivery address"
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <div className="mt-3 flex justify-end gap-2">
            <button type="button" onClick={() => setShowManualEntry(false)} className="rounded-full px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100">Cancel</button>
            <button type="submit" className="rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90">Save</button>
          </div>
        </form>
      )}
    </div>
  );
}
