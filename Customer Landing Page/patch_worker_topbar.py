with open('./src/components/worker/Topbar.jsx', 'r') as f:
    content = f.read()

if 'X size={14}' not in content:
    content = content.replace(
        """<input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search jobs, customers, earnings..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/80 dark:bg-slate-955/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-slate-700 dark:text-slate-200 shadow-sm"
        />
      </div>""",
        """<input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search jobs, customers, earnings..."
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-white/80 dark:bg-slate-955/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-slate-700 dark:text-slate-200 shadow-sm"
        />
        {searchQuery && (
          <button type="button" onClick={() => onSearchChange?.('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>"""
    )
    with open('./src/components/worker/Topbar.jsx', 'w') as f:
        f.write(content)
