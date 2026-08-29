with open('./src/pages/seller/dashboard/DashboardHome.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    """  const handleCancelPlan = async () => {
    if (!window.confirm('Cancel membership and revert to Free plan?')) return;
    const auth = getStoredSellerAuth();
    const result = await cancelMembership(auth?.seller?.id);
    updateSection('membership', result.membership);
    showBanner('info', 'Membership Cancelled', result.message);
  };""",
    """  const handleCancelPlan = async () => {
    setConfirmCancel(true);
  };"""
)

# wait I already have ConfirmDialog in there. I'll just change the onConfirm.
content = content.replace(
    """        onConfirm={() => {
          setConfirmCancel(false);
          toast.success('Membership cancelled');
          if (seller) {
            updateMockSeller(seller.id, { 'business.plan': 'free' });
            window.location.reload();
          }
        }}""",
    """        onConfirm={async () => {
          setConfirmCancel(false);
          const auth = getStoredSellerAuth();
          const result = await cancelMembership(auth?.seller?.id);
          updateSection('membership', result.membership);
          showBanner('info', 'Membership Cancelled', result.message);
        }}"""
)

with open('./src/pages/seller/dashboard/DashboardHome.jsx', 'w') as f:
    f.write(content)
