with open('src/components/Header.jsx', 'r') as f:
    content = f.read()

# For desktop header bell
if "onClick={() => navigate('/profile?tab=notifications')}" not in content:
    content = content.replace(
        '<button className="relative text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0">\n                <Bell size={24} />',
        '<button onClick={() => navigate(\'/profile?tab=notifications\')} className="relative text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0">\n                <Bell size={24} />'
    )
    # For mobile drawer bell
    content = content.replace(
        '<button className="relative p-2 rounded-xl text-theme-secondary bg-surface border border-theme-border shadow-xs cursor-pointer">\n                    <Bell size={17} />',
        '<button onClick={() => { setIsCustomerMenuOpen(false); navigate(\'/profile?tab=notifications\'); }} className="relative p-2 rounded-xl text-theme-secondary bg-surface border border-theme-border shadow-xs cursor-pointer">\n                    <Bell size={17} />'
    )

with open('src/components/Header.jsx', 'w') as f:
    f.write(content)
