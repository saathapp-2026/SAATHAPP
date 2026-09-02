with open('./src/pages/seller/dashboard/DashboardHome.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    """  const handleCancelPlan = () => {
    if (!window.confirm('Cancel membership and revert to Free plan?')) return;
    toast.success('Membership cancelled');
    if (seller) {
      updateMockSeller(seller.id, { 'business.plan': 'free' });
      window.location.reload();
    }
  };""",
    """  const handleCancelPlan = () => {
    setConfirmCancel(true);
  };"""
)

with open('./src/pages/seller/dashboard/DashboardHome.jsx', 'w') as f:
    f.write(content)
