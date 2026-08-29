import re

path = './components/wholesale/dashboard/DashboardTopNav.jsx'

with open(path, 'r') as f:
    content = f.read()

# Add state
if "const [searchQuery, setSearchQuery]" not in content:
    # find the start of the component body
    body_start = content.find("const [isProfileMenuOpen")
    if body_start != -1:
        content = content[:body_start] + "const [searchQuery, setSearchQuery] = useState('');\n  " + content[body_start:]

# Add onChange and clear button
if "onChange={(e) => setSearchQuery(e.target.value)}" not in content:
    content = re.sub(
        r'<input\s+type="text"\s+placeholder="Search[^>]+>',
        lambda m: m.group(0).replace(
            'className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 pl-10 pr-4', 
            'value={searchQuery}\n              onChange={(e) => setSearchQuery(e.target.value)}\n              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 pl-10 pr-10'
        ) + '\n            {searchQuery && (\n              <button onClick={() => setSearchQuery(\'\')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">\n                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\n              </button>\n            )}',
        content
    )

with open(path, 'w') as f:
    f.write(content)
