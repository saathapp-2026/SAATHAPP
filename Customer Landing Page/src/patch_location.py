with open('./pages/LocationPage.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    """className="w-full rounded-2xl border border-slate-200 bg-page py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
                  />
                </div>""",
    """className="w-full rounded-2xl border border-slate-200 bg-page py-3 pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:bg-white"
                  />
                  {query && (
                    <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  )}
                </div>"""
)

with open('./pages/LocationPage.jsx', 'w') as f:
    f.write(content)
