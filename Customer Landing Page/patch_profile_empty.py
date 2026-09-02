import re

with open('src/pages/Profile.jsx', 'r') as f:
    content = f.read()

orders_empty = """                    <div className="space-y-4">
                      {orders.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 border border-slate-200 dark:border-slate-800 rounded-2xl">
                          <ShoppingBag size={32} className="mx-auto mb-2 text-slate-300" />
                          <p className="font-semibold text-slate-700">No orders found</p>
                        </div>
                      ) : (
                        orders.map((order) => ("""

bookings_empty = """                    <div className="space-y-4">
                      {bookings.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 border border-slate-200 dark:border-slate-800 rounded-2xl">
                          <Calendar size={32} className="mx-auto mb-2 text-slate-300" />
                          <p className="font-semibold text-slate-700">No bookings found</p>
                        </div>
                      ) : (
                        bookings.map((booking) => ("""

addresses_empty = """                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {addresses.length === 0 ? (
                        <div className="col-span-1 sm:col-span-2 p-12 text-center text-slate-500 border border-slate-200 dark:border-slate-800 rounded-2xl">
                          <MapPin size={32} className="mx-auto mb-2 text-slate-300" />
                          <p className="font-semibold text-slate-700">No addresses saved</p>
                        </div>
                      ) : (
                        addresses.map((addr) => ("""

notifs_empty = """                    <div className="space-y-3">
                      {notifications.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 border border-slate-200 dark:border-slate-800 rounded-2xl">
                          <Bell size={32} className="mx-auto mb-2 text-slate-300" />
                          <p className="font-semibold text-slate-700">No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notif) => ("""

if "orders.length === 0 ?" not in content:
    content = content.replace('                    <div className="space-y-4">\n                      {orders.map((order) => (', orders_empty)
    content = content.replace('                        </div>\n                      ))}\n                    </div>', '                        </div>\n                      ))\n                      )}\n                    </div>', 1)

if "bookings.length === 0 ?" not in content:
    content = content.replace('                    <div className="space-y-4">\n                      {bookings.map((booking) => (', bookings_empty)
    # Be very careful because there's multiple `space-y-4` closing div
    content = re.sub(r'(</div>\n\s*)\)\)}\n\s*</div>', r'\1))\n                      )}\n                    </div>', content, 1)

if "addresses.length === 0 ?" not in content:
    content = content.replace('                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">\n                      {addresses.map((addr) => (', addresses_empty)
    content = re.sub(r'(</div>\n\s*)\)\)}\n\s*</div>', r'\1))\n                      )}\n                    </div>', content, 1)


if "notifications.length === 0 ?" not in content:
    content = content.replace('                    <div className="space-y-3">\n                      {notifications.map((notif) => (', notifs_empty)
    content = re.sub(r'(</div>\n\s*)\)\)}\n\s*</div>', r'\1))\n                      )}\n                    </div>', content, 1)

with open('src/pages/Profile.jsx', 'w') as f:
    f.write(content)
print("Patched Profile.jsx empty states")
