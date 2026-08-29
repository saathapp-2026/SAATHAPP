with open('./src/pages/Profile.jsx', 'r') as f:
    content = f.read()

import re

# Add toaster
if "import toast, { Toaster }" not in content:
    content = content.replace(
        "import { ArrowLeft",
        "import toast, { Toaster } from 'react-hot-toast';\nimport { ArrowLeft"
    )

content = content.replace("alert(`Downloading invoice", "toast.success(`Downloading invoice")
content = content.replace("alert(`Re-ordering products", "toast.success(`Re-ordering products")
content = content.replace("alert(`Cancel request sent", "toast.success(`Cancel request sent")
content = content.replace("alert(`Reschedule dialog", "toast.success(`Reschedule dialog")
content = content.replace("alert('Mock: Withdraw payout requested')", "toast.success('Mock: Withdraw payout requested')")
content = content.replace("alert('Mock: Recipient transfer opened')", "toast.success('Mock: Recipient transfer opened')")
content = content.replace("alert('Mock: Voucher code sheet opened')", "toast.success('Mock: Voucher code sheet opened')")
content = content.replace("alert(`Coupon code ${coupon.code} copied to clipboard!`)", "toast.success(`Coupon code ${coupon.code} copied to clipboard!`)")
content = content.replace("alert('All notifications marked as read.')", "toast.success('All notifications marked as read.')")
content = content.replace("alert(`Opening FAQ for ${cat.label}...`)", "toast.success(`Opening FAQ for ${cat.label}...`)")
content = content.replace("alert('Opening live chat...')", "toast.success('Opening live chat...')")
content = content.replace("alert('Opening support ticket...')", "toast.success('Opening support ticket...')")
content = content.replace("alert(`Opening settings for ${c.title}...`)", "toast.success(`Opening settings for ${c.title}...`)")
content = content.replace("alert('Mock: Toggle channel state')", "toast.success('Mock: Toggle channel state')")
content = content.replace("alert('Loading terms...')", "toast.success('Loading terms...')")
content = content.replace("alert('Loading privacy...')", "toast.success('Loading privacy...')")
content = content.replace("alert('Mock: Uploader modal')", "toast.success('Mock: Uploader modal')")

if "<Toaster" not in content:
    content = content.replace(
        """    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 selection:bg-primary/30">""",
        """    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 selection:bg-primary/30">
      <Toaster position="top-right" />"""
    )

with open('./src/pages/Profile.jsx', 'w') as f:
    f.write(content)

