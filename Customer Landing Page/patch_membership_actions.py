with open('./src/pages/seller/Membership.jsx', 'r') as f:
    content = f.read()

import re

# replace imports
content = content.replace(
    "import { Package, Check, Crown, Shield, Activity, Receipt, CreditCard, ChevronRight, Download, Plus, MapPin, Truck, RefreshCw, Box } from 'lucide-react';",
    "import { Package, Check, Crown, Shield, Activity, Receipt, CreditCard, ChevronRight, Download, Plus, MapPin, Truck, RefreshCw, Box } from 'lucide-react';\nimport ConfirmDialog from '../../components/seller/orders/ConfirmDialog';"
)

# replace handleDowngrade
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

# replace handleCancel
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

# replace return rendering
content = content.replace(
    "    </SellerOverlay>\n  );\n}",
    """    </SellerOverlay>
      <ConfirmDialog
        open={!!confirmCancel}
        title={confirmCancel?.title}
        message={confirmCancel?.message}
        danger={confirmCancel?.danger}
        confirmLabel={confirmCancel?.confirmLabel || 'Confirm'}
        onCancel={() => setConfirmCancel(null)}
        onConfirm={() => {
          confirmCancel?.action();
          setConfirmCancel(null);
        }}
      />
    </>
  );
}"""
)

# wait, the component might not be wrapped in fragment or SellerOverlay is rendered inside.
