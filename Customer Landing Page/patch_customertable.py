import re

with open('src/components/seller/customers/CustomerTable.jsx', 'r') as f:
    content = f.read()

empty_state = """        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-12 text-center text-slate-500">
                <Users size={32} className="mx-auto mb-2 text-slate-300" />
                <p className="font-semibold text-slate-700">No customers found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search.</p>
              </td>
            </tr>
          ) : (
            customers.map((c) => (
"""

content = content.replace("        <tbody>\n            {customers.map((c) => (", empty_state)

content = content.replace("              </tr>\n            ))}\n          </tbody>", "              </tr>\n            ))\n          )}\n          </tbody>")

# Same for mobile view
mobile_empty = """      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {customers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users size={32} className="mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-700">No customers found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search.</p>
          </div>
        ) : (
          customers.map((c) => ("""

content = content.replace('      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">\n        {customers.map((c) => (', mobile_empty)
content = content.replace('          </button>\n        ))}\n      </div>', '          </button>\n        ))\n        )}\n      </div>')


with open('src/components/seller/customers/CustomerTable.jsx', 'w') as f:
    f.write(content)

print("Patched CustomerTable.jsx empty state.")
