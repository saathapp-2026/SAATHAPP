with open('src/pages/Profile.jsx', 'r') as f:
    content = f.read()

replacement = """  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    } else if (location.pathname === '/profile') {
      setActiveTab('profile');
    } else if (location.pathname === '/customer/dashboard') {
      if (location.state?.activeTab) {
        setActiveTab(location.state.activeTab);
      } else if (activeTab === 'profile') {
        setActiveTab('dashboard');
      }
    }
  }, [location.pathname, location.search, location.state]);"""

content = content.replace("""  useEffect(() => {
    if (location.pathname === '/profile') {
      setActiveTab('profile');
    } else if (location.pathname === '/customer/dashboard') {
      if (location.state?.activeTab) {
        setActiveTab(location.state.activeTab);
      } else if (activeTab === 'profile') {
        setActiveTab('dashboard');
      }
    }
  }, [location.pathname, location.state]);""", replacement)

with open('src/pages/Profile.jsx', 'w') as f:
    f.write(content)
