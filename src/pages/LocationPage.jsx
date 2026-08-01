import React, { useMemo, useState } from 'react';
import { ArrowLeft, Search, MapPin, Plus, Navigation, Trash2, CheckCircle2 } from 'lucide-react';

function buildLabelFromResult(result) {
  const address = result?.address || {};
  const area = address.suburb || address.neighbourhood || address.village || address.city_district || address.city || 'Current location';
  const city = address.city || address.town || address.village || area;
  const state = address.state || 'State';
  const pincode = address.postcode || '000000';
  return `${area}, ${city}, ${state} - ${pincode}`;
}

export default function LocationPage({
  savedAddresses = [],
  selectedAddress = null,
  onBack,
  onAddAddress,
  onSelectAddress,
  onDeleteAddress,
  onUseCurrentLocation,
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${encodeURIComponent(trimmed)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const payload = await response.json();
      setResults(payload || []);
      if (!payload?.length) {
        setError('No matching areas were found.');
      }
    } catch {
      setError('Unable to search locations right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (result) => {
    const address = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: 'Other',
      label: buildLabelFromResult(result),
      fullAddress: result.display_name,
      area: result.address?.suburb || result.address?.neighbourhood || result.address?.village || result.address?.city || '',
      city: result.address?.city || result.address?.town || result.address?.village || '',
      state: result.address?.state || '',
      pincode: result.address?.postcode || '',
      phoneNumber: '',
      receiverName: '',
      addressType: 'Other',
      source: 'search',
      createdAt: new Date().toISOString(),
    };
    onSelectAddress(address);
    setResults([]);
    setQuery('');
  };

  const activeAddressLabel = useMemo(() => selectedAddress?.label || 'Select a delivery address', [selectedAddress]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur">
          <button type="button" onClick={onBack} className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Delivery location</p>
            <h1 className="text-lg font-black">Select a Location</h1>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <label className="mb-2 block text-sm font-semibold text-slate-600">Search for area, street name or locality</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search for area, street name..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
                  />
                </div>
                <button type="submit" className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                  Search
                </button>
              </div>
              {loading && <p className="mt-3 text-sm text-slate-500">Searching nearby areas...</p>}
              {error && <p className="mt-3 text-sm text-danger">{error}</p>}
            </form>

            <button type="button" onClick={onUseCurrentLocation} className="flex w-full items-center justify-between rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 p-4 text-left shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Navigation size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Use Current Location</p>
                  <p className="text-sm text-slate-600">Find your exact GPS position and save it</p>
                </div>
              </div>
              <MapPin size={18} className="text-primary" />
            </button>

            <button type="button" onClick={onAddAddress} className="flex w-full items-center justify-between rounded-3xl border border-dashed border-slate-300 bg-white p-4 text-left shadow-sm transition hover:border-primary hover:bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Plus size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Add Address</p>
                  <p className="text-sm text-slate-600">Create a new delivery location manually</p>
                </div>
              </div>
            </button>

            {results.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="mb-3 text-sm font-semibold text-slate-600">Search results</p>
                <div className="space-y-2">
                  {results.map((result) => (
                    <button key={result.place_id} type="button" onClick={() => handleSelectSuggestion(result)} className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 p-3 text-left transition hover:border-primary hover:bg-primary/5">
                      <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{buildLabelFromResult(result)}</p>
                        <p className="text-xs text-slate-500">{result.display_name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Currently selected</p>
              <div className="mt-2 flex items-start gap-2">
                <CheckCircle2 size={18} className="mt-0.5 text-primary" />
                <div>
                  <p className="text-sm font-black text-slate-900">{activeAddressLabel}</p>
                  <p className="text-sm text-slate-600">This address will appear in the landing page header.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900">Saved Addresses</h2>
                <span className="text-sm font-semibold text-slate-500">{savedAddresses.length} saved</span>
              </div>
              <div className="space-y-3">
                {savedAddresses.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">No saved addresses yet. Add one to get started.</div>
                ) : (
                  savedAddresses.map((address) => (
                    <div key={address.id} className={`rounded-2xl border p-3 ${selectedAddress?.id === address.id ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                            {address.addressType === 'Work' ? 'W' : address.addressType === 'Home' ? 'H' : 'O'}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{address.title || address.addressType}</p>
                            <p className="text-sm text-slate-700">{address.fullAddress}</p>
                            {address.phoneNumber && <p className="mt-1 text-xs text-slate-500">{address.phoneNumber}</p>}
                          </div>
                        </div>
                        <button type="button" onClick={() => onDeleteAddress(address.id)} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">{address.addressType || 'Other'}</span>
                        <button type="button" onClick={() => onSelectAddress(address)} className="rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90">
                          {selectedAddress?.id === address.id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
