import re

with open('src/components/seller/orders/OrdersTable.jsx', 'r') as f:
    content = f.read()

# For Desktop
desktop_target = """            <tbody>
              {orders.map((order) => ("""
desktop_replacement = """            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-slate-500">
                    <p className="font-semibold text-slate-700">No orders found</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => ("""

content = content.replace(desktop_target, desktop_replacement)
content = content.replace("                </tr>\n              ))}\n            </tbody>", "                </tr>\n              ))\n              )}\n            </tbody>")

# For Mobile
mobile_target = """      <div className="lg:hidden space-y-2.5">
        {orders.map((order) => ("""
mobile_replacement = """      <div className="lg:hidden space-y-2.5">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-slate-500 rounded-xl border border-slate-200">
            <p className="font-semibold text-slate-700">No orders found</p>
          </div>
        ) : (
          orders.map((order) => ("""

content = content.replace(mobile_target, mobile_replacement)
content = content.replace("          </article>\n        ))}\n      </div>", "          </article>\n        ))\n        )}\n      </div>")


with open('src/components/seller/orders/OrdersTable.jsx', 'w') as f:
    f.write(content)
