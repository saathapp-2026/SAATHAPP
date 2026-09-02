with open('./components/professional/CustomerTable.jsx', 'r') as f:
    content = f.read()

# Add clear button
content = content.replace(
    """<input
            type="text"
            placeholder="Search by client or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200/80 dark:border-slate-800 rounded-xl bg-page dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none focus:border-primary/50"
          />
        </div>""",
    """<input
            type="text"
            placeholder="Search by client or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs border border-slate-200/80 dark:border-slate-800 rounded-xl bg-page dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none focus:border-primary/50"
          />
          {search && (
            <button 
              onClick={() => setSearch('')} 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}
        </div>"""
)

# No result state is already handled by `filteredCustomers.length === 0 ? "No customers found." : ...`
# Let's enhance it to be specific to search.
content = content.replace(
    """<td colSpan="6" className="py-8 text-center text-slate-400">
                      No customers found.
                    </td>""",
    """<td colSpan="6" className="py-8 text-center text-slate-400">
                      {search ? `No customers found for "${search}".` : "No customers found."}
                      {search && (
                        <div className="mt-2">
                          <button onClick={() => setSearch('')} className="text-primary hover:underline text-xs">Clear Search</button>
                        </div>
                      )}
                    </td>"""
)

with open('./components/professional/CustomerTable.jsx', 'w') as f:
    f.write(content)
