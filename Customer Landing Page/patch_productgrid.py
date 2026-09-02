with open('src/components/saathapp-product/ProductGrid.jsx', 'r') as f:
    content = f.read()

empty_state = """  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center w-full">
        <ShoppingCart size={48} className="text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No products found</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md">Try adjusting your filters or search to find what you're looking for.</p>
      </div>
    );
  }

  return ("""

if "products.length === 0" not in content:
    content = content.replace("  return (", empty_state, 1)

with open('src/components/saathapp-product/ProductGrid.jsx', 'w') as f:
    f.write(content)

print("Patched ProductGrid.jsx")
