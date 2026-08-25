import re

with open('src/components/Header.jsx', 'r') as f:
    content = f.read()

# Make sure User is imported
if 'User,' not in content and 'User ' not in content:
    content = content.replace('import { Search, ShoppingCart, Menu, X, MapPin, Zap, ChevronDown, Moon, Sun, Bell, Download, LogOut } from \'lucide-react\';',
                              'import { Search, ShoppingCart, Menu, X, MapPin, Zap, ChevronDown, Moon, Sun, Bell, Download, LogOut, User } from \'lucide-react\';')

# The block to replace: From <!-- Desktop Actions --> down to the end of the profile button
start_idx = content.find('            {/* Desktop Actions */}')
end_idx = content.find('              <button\n                onClick={() => setIsCustomerMenuOpen(true)}')
if start_idx != -1 and end_idx != -1:
    desktop_actions = """            {/* Desktop Actions */}
            <div className="flex items-center gap-4 shrink-0">
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer shrink-0"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={22} className="text-amber-400" /> : <Moon size={22} />}
              </motion.button>

              <button className="relative text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer shrink-0">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
              </button>

              {/* Install App Button */}
              {canInstall && !isInstalled && (
                <button
                  onClick={installApp}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-300 bg-transparent border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <Download size={16} />
                  <span>Install App</span>
                </button>
              )}

              <button
                onClick={onCartClick}
                className="relative text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer shrink-0"
                title="Cart"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white font-bold text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border border-white dark:border-slate-900">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('/profile')}
                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              >
                {user?.photo ? (
                  <img src={user.photo} alt={user.name || 'Profile'} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                ) : (
                  <User size={24} />
                )}
              </button>

"""
    content = content[:start_idx] + desktop_actions + content[end_idx:]

with open('src/components/Header.jsx', 'w') as f:
    f.write(content)
print("Replaced desktop actions!")
