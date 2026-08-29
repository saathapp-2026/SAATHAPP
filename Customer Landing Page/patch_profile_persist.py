import re

with open('src/pages/Profile.jsx', 'r') as f:
    content = f.read()

replacement = """                        onClick={() => {
                          const updated = notifications.map(n => ({ ...n, read: true }));
                          setNotifications(updated);
                          localStorage.setItem('saath_notifications', JSON.stringify(updated));
                          toast.success('All notifications marked as read.');
                        }}"""

content = content.replace("""                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                          toast.success('All notifications marked as read.') }}""", replacement)

# We should also make clicking on an individual notification mark it as read!
content = content.replace("""                      {notifications.map((notif) => (""", """                      {notifications.map((notif) => (
                        <div key={notif.id} onClick={() => {
                          if (!notif.read) {
                            const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
                            setNotifications(updated);
                            localStorage.setItem('saath_notifications', JSON.stringify(updated));
                          }
                        }} className={`p-4 border rounded-2xl flex items-start gap-3.5 text-xs text-left cursor-pointer transition-all ${
                          notif.read ? 'bg-slate-50/30 dark:bg-slate-950/10 border-slate-100 dark:border-slate-800 hover:bg-page' : 'bg-[#6C3BFF]/5 dark:bg-[#6C3BFF]/10 border-primary/20 hover:bg-[#6C3BFF]/10'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${notif.read ? 'bg-slate-300 dark:bg-slate-700' : 'bg-[#6C3BFF]'}`} />
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <p className="font-black text-slate-800 dark:text-slate-200">{notif.title}</p>
                                <span className="text-[9px] text-slate-400 font-semibold">{notif.time}</span>
                              </div>
                              <button onClick={(e) => {
                                e.stopPropagation();
                                const updated = notifications.filter(n => n.id !== notif.id);
                                setNotifications(updated);
                                localStorage.setItem('saath_notifications', JSON.stringify(updated));
                              }} className="text-slate-400 hover:text-red-500 cursor-pointer p-1">
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{notif.message}</p>
                          </div>
                        </div>
                      ))}
                      {/* Old mapping logic completely replaced above */}
""")

# wait, I need to remove the old mapping logic properly.
