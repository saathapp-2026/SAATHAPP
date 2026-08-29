with open('./src/pages/seller/dashboard/DashboardHome.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    """  const handleMembershipCancel = async () => {
    if (!window.confirm('Cancel membership and revert to Free plan?')) return;
    const auth = getStoredSellerAuth();
    const result = await cancelMembership(auth?.seller?.id);
    updateSection('membership', result.membership);
    showBanner('info', 'Membership Cancelled', result.message);
  };""",
    """  const handleMembershipCancel = async () => {
    setConfirmCancel(true);
  };"""
)

with open('./src/pages/seller/dashboard/DashboardHome.jsx', 'w') as f:
    f.write(content)
