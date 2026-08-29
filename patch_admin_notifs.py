import re

with open('Admin page/src/App.jsx', 'r') as f:
    content = f.read()

# Add state
state_injection = """  const [notifOpen, setNotifOpen] = useState(false);
  const [adminNotifs, setAdminNotifs] = useState(() => {
    try {
      const stored = localStorage.getItem('saath_admin_notifs');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: 'a1', t: "New seller KYC pending review", time: "2m ago", read: false },
      { id: 'a2', t: "Fraud alert: suspicious order spike in Mumbai", time: "18m ago", read: false },
      { id: 'a3', t: "Low stock alert — 12 warehouses affected", time: "1h ago", read: true },
    ];
  });
"""

content = content.replace("  const [notifOpen, setNotifOpen] = useState(false);", state_injection)

# Replace render
render_target = """              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 sa-pulse" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden sa-rise">
                <div className="px-4 py-3 border-b border-black/5 font-semibold text-sm sa-font-body">Notifications</div>
                <div className="max-h-80 overflow-y-auto sa-scrollbar">
                  {[
                    { t: "New seller KYC pending review", time: "2m ago", icon: Store },
                    { t: "Fraud alert: suspicious order spike in Mumbai", time: "18m ago", icon: ShieldAlert },
                    { t: "Low stock alert — 12 warehouses affected", time: "1h ago", icon: AlertTriangle },
                  ].map((n, i) => (
                    <div key={i} className="flex gap-3 px-4 py-3 hover:bg-slate-50 border-b border-black/5 last:border-0">
                      <n.icon size={15} className="mt-0.5 shrink-0" color={T.forest} />
                      <div>
                        <p className="text-xs text-[#0B1420] sa-font-body">{n.t}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}"""

render_replacement = """              {adminNotifs.some(n => !n.read) && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 sa-pulse" />}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden sa-rise">
                <div className="flex justify-between items-center px-4 py-3 border-b border-black/5">
                  <span className="font-semibold text-sm sa-font-body">Notifications</span>
                  {adminNotifs.some(n => !n.read) && (
                    <button onClick={() => {
                      const updated = adminNotifs.map(n => ({...n, read: true}));
                      setAdminNotifs(updated);
                      localStorage.setItem('saath_admin_notifs', JSON.stringify(updated));
                    }} className="text-[10px] text-blue-600 font-bold hover:underline">Mark all read</button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto sa-scrollbar">
                  {adminNotifs.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">No notifications</div>
                  ) : (
                    adminNotifs.map((n) => (
                      <div key={n.id} onClick={() => {
                        if (!n.read) {
                          const updated = adminNotifs.map(x => x.id === n.id ? {...x, read: true} : x);
                          setAdminNotifs(updated);
                          localStorage.setItem('saath_admin_notifs', JSON.stringify(updated));
                        }
                      }} className={`flex gap-3 px-4 py-3 hover:bg-slate-50 border-b border-black/5 last:border-0 cursor-pointer ${n.read ? 'opacity-60' : 'bg-blue-50/30'}`}>
                        <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.read ? 'bg-slate-300' : 'bg-blue-500'}`} />
                        <div>
                          <p className="text-xs text-[#0B1420] sa-font-body">{n.t}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}"""

content = content.replace(render_target, render_replacement)

with open('Admin page/src/App.jsx', 'w') as f:
    f.write(content)
