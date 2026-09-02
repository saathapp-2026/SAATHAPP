with open('src/components/seller/DashboardTopbar.jsx', 'r') as f:
    content = f.read()

replacement = """                      <button
                        key={n.id}
                        type="button"
                        onClick={() => {
                          handleMarkRead(n.id);
                          setShowNotifications(false);
                          if (n.type === 'order') navigate('/seller/orders');
                          else if (n.type === 'payment') navigate('/seller/wallet');
                          else if (n.type === 'inventory') navigate('/seller/products');
                        }}
                        className={`w-full text-left px-4 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-page focus:outline-none focus:bg-page dark:focus:bg-slate-800/50 ${!n.read ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : ''}`}
                      >"""

content = content.replace("""                      <button
                        key={n.id}
                        type="button"
                        onClick={() => handleMarkRead(n.id)}
                        className={`w-full text-left px-4 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-page focus:outline-none focus:bg-page dark:focus:bg-slate-800/50 ${!n.read ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : ''}`}
                      >""", replacement)

with open('src/components/seller/DashboardTopbar.jsx', 'w') as f:
    f.write(content)
