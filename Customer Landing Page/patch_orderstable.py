with open('src/components/seller/orders/OrdersTable.jsx', 'r') as f:
    content = f.read()

empty_state = """        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={10} className="p-12 text-center text-slate-500">
                <Package size={32} className="mx-auto mb-2 text-slate-300" />
                <p className="font-semibold text-slate-700">No orders found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search.</p>
              </td>
            </tr>
          ) : (
            orders.map((o) => ("""

content = content.replace("        <tbody className=\"divide-y divide-slate-100 dark:divide-slate-800\">\n          {orders.map((o) => (", empty_state)
content = content.replace("            </tr>\n          ))}\n        </tbody>", "            </tr>\n          ))\n          )}\n        </tbody>")

mobile_empty = """      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Package size={32} className="mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-700">No orders found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search.</p>
          </div>
        ) : (
          orders.map((o) => ("""

content = content.replace('      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">\n        {orders.map((o) => (', mobile_empty)
content = content.replace('          </div>\n        ))}\n      </div>', '          </div>\n        ))\n        )}\n      </div>')

with open('src/components/seller/orders/OrdersTable.jsx', 'w') as f:
    f.write(content)

print("Patched OrdersTable.jsx empty state.")
