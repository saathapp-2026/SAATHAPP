with open('src/components/Header.jsx', 'r') as f:
    content = f.read()

# Make sure Zap is imported
if 'Zap,' not in content and 'Zap ' not in content:
    content = content.replace('import { Search, Mic', 'import { Search, Mic, Zap')

start_idx = content.find('            {/* Deliver To */}')
end_idx = content.find('            {/* Desktop Search Bar */}')

if start_idx != -1 and end_idx != -1:
    deliver_to = """            {/* Deliver To */}
            <button
              type="button"
              onClick={() => navigate('/location')}
              className="flex flex-col items-start gap-1 cursor-pointer shrink-0 mx-2"
            >
              <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-black text-[17px] tracking-tight">
                <Zap size={16} className="fill-slate-900 dark:fill-white text-slate-900 dark:text-white" />
                <span>20 minutes</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Deliver to</span>
                <span className="max-w-[150px] md:max-w-[200px] truncate text-xs font-semibold">{location || 'Select Location...'}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </button>

"""
    content = content[:start_idx] + deliver_to + content[end_idx:]

with open('src/components/Header.jsx', 'w') as f:
    f.write(content)
print("Replaced Deliver To block!")
