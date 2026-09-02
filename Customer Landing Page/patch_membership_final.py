with open('./src/pages/seller/Membership.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    """  const handleDowngrade = async () => {
    if (!window.confirm(`Downgrade to ${getPlanById(selectedPlan).name} plan?`)) return;
    setLoading(true);
    try {
      const auth = getStoredSellerAuth();
      const result = await downgradeMembership({ sellerId: auth?.seller?.id, planId: selectedPlan });
      updateSection('membership', result.membership);
      setSelectedPlan(result.membership.planId);
      showSuccess(result.message, 'Plan Updated');
    } finally {
      setLoading(false);
    }
  };""",
    """  const handleDowngrade = async () => {
    setConfirmCancel({
      title: 'Downgrade Plan',
      message: `Downgrade to ${getPlanById(selectedPlan).name} plan?`,
      confirmLabel: 'Downgrade',
      action: async () => {
        setLoading(true);
        try {
          const auth = getStoredSellerAuth();
          const result = await downgradeMembership({ sellerId: auth?.seller?.id, planId: selectedPlan });
          updateSection('membership', result.membership);
          setSelectedPlan(result.membership.planId);
          showSuccess(result.message, 'Plan Updated');
        } finally {
          setLoading(false);
        }
      }
    });
  };"""
)

content = content.replace(
    """  const handleCancel = async () => {
    if (!window.confirm('Cancel your membership? You will revert to the Free plan.')) return;
    setLoading(true);
    try {
      const auth = getStoredSellerAuth();
      const result = await cancelMembership(auth?.seller?.id);
      updateSection('membership', result.membership);
      setSelectedPlan('free');
      showSuccess(result.message);
    } finally {
      setLoading(false);
    }
  };""",
    """  const handleCancel = async () => {
    setConfirmCancel({
      title: 'Cancel Membership',
      message: 'Cancel your membership? You will revert to the Free plan.',
      confirmLabel: 'Cancel Membership',
      danger: true,
      action: async () => {
        setLoading(true);
        try {
          const auth = getStoredSellerAuth();
          const result = await cancelMembership(auth?.seller?.id);
          updateSection('membership', result.membership);
          setSelectedPlan('free');
          showSuccess(result.message);
        } finally {
          setLoading(false);
        }
      }
    });
  };"""
)

with open('./src/pages/seller/Membership.jsx', 'w') as f:
    f.write(content)
