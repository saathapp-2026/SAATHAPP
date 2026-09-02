with open('./components/customer/ServicesTab.jsx', 'r') as f:
    content = f.read()

# Add clear button
content = content.replace(
    """<input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search electrician, plumber..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none dark:bg-slate-950 font-semibold"
          />
        </div>""",
    """<input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search electrician, plumber..."
            className="w-full pl-9 pr-9 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none dark:bg-slate-950 font-semibold"
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}
        </div>"""
)

# No results state
content = content.replace(
    """<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicesList
          .filter(s => filter === 'All' || s.category === filter)
          .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
          .map((srv) => (""",
    """<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(() => {
          const filtered = servicesList
            .filter(s => filter === 'All' || s.category === filter)
            .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));
          
          if (filtered.length === 0) {
            return (
              <div className="col-span-1 md:col-span-2 py-10 text-center border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-955/10">
                <p className="text-slate-500 font-medium mb-2">No results found for "{search}".</p>
                {search && (
                  <button onClick={() => setSearch('')} className="text-sm font-bold text-[#6C3BFF] hover:underline">
                    Clear Search
                  </button>
                )}
              </div>
            );
          }
          return filtered.map((srv) => ("""
)

# Close the IIFE
content = content.replace(
    """<button
                  onClick={() => { setSelectedService(srv); setShowBookingFormModal(true); }}
                  className="px-4 py-2 bg-[#6C3BFF] text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-[#5a2ee0] transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
      </div>""",
    """<button
                  onClick={() => { setSelectedService(srv); setShowBookingFormModal(true); }}
                  className="px-4 py-2 bg-[#6C3BFF] text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-[#5a2ee0] transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ));
        })()}
      </div>"""
)

with open('./components/customer/ServicesTab.jsx', 'w') as f:
    f.write(content)
