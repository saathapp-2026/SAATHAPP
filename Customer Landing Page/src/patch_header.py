import re

with open('./components/Header.jsx', 'r') as f:
    content = f.read()

# Add escape key handling
if "handleKeyDown" not in content:
    content = content.replace(
        "const handleSearchSubmit = (e) => {",
        """const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchFocused(false);
      searchRef.current?.querySelector('input')?.blur();
    }
  };

  const handleSearchSubmit = (e) => {"""
    )

    # Attach to mobile input
    content = content.replace(
        """onFocus={() => setIsSearchFocused(true)}
                    className="input-field pl-10\"""",
        """onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={handleKeyDown}
                    className="input-field pl-10 pr-10\""""
    )
    
    # Add clear button for mobile input
    content = content.replace(
        """<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-secondary">
                    <Search size={18} />
                  </div>
                </div>""",
        """<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-secondary pointer-events-none">
                    <Search size={18} />
                  </div>
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      <X size={16} />
                    </button>
                  )}
                </div>"""
    )

    # Attach to desktop input
    content = content.replace(
        """onFocus={() => setIsSearchFocused(true)}
                    className="w-full h-11 pl-11 pr-4 rounded-xl""",
        """onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-11 pl-11 pr-10 rounded-xl"""
    )
    
    # Add clear button for desktop input
    content = content.replace(
        """<div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Search size={18} />
                  </div>
                </div>""",
        """<div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    <Search size={18} />
                  </div>
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      <X size={16} />
                    </button>
                  )}
                </div>"""
    )

with open('./components/Header.jsx', 'w') as f:
    f.write(content)
