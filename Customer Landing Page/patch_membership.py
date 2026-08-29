with open('./src/pages/seller/Membership.jsx', 'r') as f:
    content = f.read()

import re

if 'ConfirmDialog' not in content:
    content = content.replace(
        "import { Check, X, Shield, Zap, Crown, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';",
        "import { Check, X, Shield, Zap, Crown, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';\nimport ConfirmDialog from '../../components/seller/orders/ConfirmDialog';"
    )
    content = content.replace(
        "const [billing, setBilling] = useState('monthly');",
        "const [billing, setBilling] = useState('monthly');\n  const [confirmCancel, setConfirmCancel] = useState(null);"
    )
    content = content.replace(
        """  const handleDowngrade = () => {
    if (!window.confirm(`Downgrade to ${getPlanById(selectedPlan).name} plan?`)) return;
    toast.success(`Downgraded to ${getPlanById(selectedPlan).name} plan successfully`);
    const s = getMockSeller();
    if (s) {
      updateMockSeller(s.id, { 'business.plan': selectedPlan });
      window.location.reload();
    }
  };

  const handleCancel = () => {
    if (!window.confirm('Cancel your membership? You will revert to the Free plan.')) return;
    toast.success('Membership cancelled');
    const s = getMockSeller();
    if (s) {
      updateMockSeller(s.id, { 'business.plan': 'free' });
      window.location.reload();
    }
  };""",
        """  const handleDowngrade = () => {
    setConfirmCancel({
      type: 'downgrade',
      title: 'Downgrade Plan',
      message: `Downgrade to ${getPlanById(selectedPlan).name} plan?`,
      action: () => {
        toast.success(`Downgraded to ${getPlanById(selectedPlan).name} plan successfully`);
        const s = getMockSeller();
        if (s) {
          updateMockSeller(s.id, { 'business.plan': selectedPlan });
          window.location.reload();
        }
      }
    });
  };

  const handleCancel = () => {
    setConfirmCancel({
      type: 'cancel',
      title: 'Cancel Membership',
      message: 'Cancel your membership? You will revert to the Free plan.',
      action: () => {
        toast.success('Membership cancelled');
        const s = getMockSeller();
        if (s) {
          updateMockSeller(s.id, { 'business.plan': 'free' });
          window.location.reload();
        }
      }
    });
  };"""
    )
    content = content.replace(
        """    </div>
  );
}""",
        """      <ConfirmDialog
        open={!!confirmCancel}
        title={confirmCancel?.title}
        message={confirmCancel?.message}
        danger={true}
        confirmLabel="Yes, Continue"
        cancelLabel="Keep Current Plan"
        onCancel={() => setConfirmCancel(null)}
        onConfirm={() => {
          confirmCancel?.action();
          setConfirmCancel(null);
        }}
      />
    </div>
  );
}"""
    )
    with open('./src/pages/seller/Membership.jsx', 'w') as f:
        f.write(content)

with open('./src/pages/seller/dashboard/DashboardHome.jsx', 'r') as f:
    content = f.read()

if 'ConfirmDialog' not in content:
    content = content.replace(
        "import { Link } from 'react-router-dom';",
        "import { Link } from 'react-router-dom';\nimport ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';"
    )
    content = content.replace(
        "const [range, setRange] = useState('7d');",
        "const [range, setRange] = useState('7d');\n  const [confirmCancel, setConfirmCancel] = useState(false);"
    )
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
    content = content.replace(
        """    </div>
  );
}""",
        """      <ConfirmDialog
        open={confirmCancel}
        title="Cancel Membership"
        message="Cancel membership and revert to Free plan?"
        danger={true}
        confirmLabel="Yes, Cancel"
        cancelLabel="Keep Plan"
        onCancel={() => setConfirmCancel(false)}
        onConfirm={() => {
          setConfirmCancel(false);
          toast.success('Membership cancelled');
          if (seller) {
            updateMockSeller(seller.id, { 'business.plan': 'free' });
            window.location.reload();
          }
        }}
      />
    </div>
  );
}"""
    )
    with open('./src/pages/seller/dashboard/DashboardHome.jsx', 'w') as f:
        f.write(content)

