with open('./src/pages/seller/dashboard/ProductsPage.jsx', 'r') as f:
    content = f.read()

import re

# Add imports
content = content.replace(
    "import { Plus, Package, SlidersHorizontal, Settings, Trash2, EyeOff, Archive, Copy, Download, Link as LinkIcon, HelpCircle } from 'lucide-react';",
    """import { Plus, Package, SlidersHorizontal, Settings, Trash2, EyeOff, Archive, Copy, Download, Link as LinkIcon, HelpCircle } from 'lucide-react';
import ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';"""
)

# Add confirmState
content = content.replace(
    "const [products, setProducts] = useState([]);",
    """const [products, setProducts] = useState([]);
  const [confirmState, setConfirmState] = useState(null);"""
)

# Replace handleBulk
content = re.sub(
    r'const handleBulk = async \(action\) => \{.*?\n  \};\n',
    """const handleBulk = async (action) => {
    const ids = [...selected];
    if (!ids.length) return toast.error('Select products first');
    
    if (action === 'duplicate') {
      for (const id of ids) await duplicateProduct(id);
      toast.success('Duplicated');
      setSelected(new Set());
      load();
      return;
    }

    setConfirmState({
      title: 'Bulk Action',
      message: `Apply "${action}" to ${ids.length} product(s)?`,
      danger: action === 'delete',
      onConfirm: async () => {
        setConfirmState(null);
        await bulkUpdateProducts(ids, action);
        toast.success('Bulk action completed');
        setSelected(new Set());
        load();
      }
    });
  };
""",
    content,
    flags=re.DOTALL
)

# Add ConfirmDialog in render
content = content.replace(
    "    </div>\n  );\n}",
    """
      <ConfirmDialog
        open={!!confirmState}
        title={confirmState?.title}
        message={confirmState?.message}
        danger={confirmState?.danger}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmState?.onConfirm}
      />
    </div>
  );
}"""
)

with open('./src/pages/seller/dashboard/ProductsPage.jsx', 'w') as f:
    f.write(content)
