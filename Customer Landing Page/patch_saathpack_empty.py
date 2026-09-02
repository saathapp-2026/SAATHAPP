import re

with open('src/pages/saathpack/SaathPackProductListing.jsx', 'r') as f:
    content = f.read()

empty_state = """
          {currentItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No products found</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-md">Try adjusting your filters or category selection to find what you're looking for.</p>
              <button onClick={clearAllFilters} className="mt-6 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {currentItems.map(product => {
"""

if "currentItems.length === 0 ?" not in content:
    content = content.replace(
        '<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">\n              {currentItems.map(product => {',
        empty_state
    )
    content = content.replace(
        '            </div>\n\n            {/* Pagination */}',
        '            </div>\n          )}\n\n            {/* Pagination */}'
    )

with open('src/pages/saathpack/SaathPackProductListing.jsx', 'w') as f:
    f.write(content)

print("Patched SaathPackProductListing.jsx empty state.")
