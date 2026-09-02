with open('./src/components/seller/DashboardTopbar.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    """<form onSubmit={handleSearchSubmit} className="relative hidden md:block w-64 lg:w-96">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, products, customers, reports..."
            aria-label="Search dashboard"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </form>""",
    """<form onSubmit={handleSearchSubmit} className="relative hidden md:block w-64 lg:w-96">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, products, customers, reports..."
            aria-label="Search dashboard"
            className="w-full pl-9 pr-9 py-2 text-sm rounded-xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}
        </form>"""
)

with open('./src/components/seller/DashboardTopbar.jsx', 'w') as f:
    f.write(content)
