import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { User, Landmark, Settings, Upload, Save, Shield, Bell, Key, LogOut } from 'lucide-react';

export function SellerProfilePlaceholder() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@example.com',
    mobile: '9876543210',
    gender: 'male',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Seller profile updated successfully');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl">
      <Toaster position="top-right" />
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <User className="text-emerald-500" size={20} />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Personal Information</h2>
            <p className="text-sm text-slate-500">Update your personal details and public profile.</p>
          </div>
        </div>
        
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-2xl font-bold border-2 border-emerald-500 shadow-sm relative group overflow-hidden">
              RS
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Upload size={18} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">Profile Photo</h3>
              <p className="text-sm text-slate-500 mb-2">JPG, GIF or PNG. Max size of 800K</p>
              <button type="button" className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                Upload New Photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
              <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
              <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Mobile Number</label>
              <input type="tel" required value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-3.5 py-2.5 text-sm outline-none cursor-not-allowed text-slate-500" readOnly title="Mobile number cannot be changed directly" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="button" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">
              Discard Changes
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 shadow-sm">
              <Save size={16} />
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function BankDetailsPlaceholder() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountHolder: 'Rahul Sharma',
    accountNumber: 'XXXXX5678',
    ifsc: 'HDFC0001234',
    bankName: 'HDFC Bank',
    accountType: 'current',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Bank details update request submitted for verification');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl">
      <Toaster position="top-right" />
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Landmark className="text-emerald-500" size={20} />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Bank Account Details</h2>
              <p className="text-sm text-slate-500">Manage your settlement bank account.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Shield size={12} /> Verified
          </span>
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
            <strong>Important:</strong> Changing bank details requires re-verification by our team. Withdrawals will be paused for 24-48 hours during verification.
          </p>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Account Holder Name</label>
              <input type="text" required value={formData.accountHolder} onChange={e => setFormData({...formData, accountHolder: e.target.value})} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bank Name</label>
              <input type="text" required value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Account Type</label>
              <select value={formData.accountType} onChange={e => setFormData({...formData, accountType: e.target.value})} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Account Number</label>
              <input type="password" required value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">IFSC Code</label>
              <input type="text" required value={formData.ifsc} onChange={e => setFormData({...formData, ifsc: e.target.value})} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 uppercase" placeholder="e.g. SBIN0001234" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 shadow-sm">
              <Shield size={16} />
              {loading ? 'Submitting...' : 'Update & Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AccountSettingsPlaceholder() {
  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Account settings saved');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Toaster position="top-right" />
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Key className="text-emerald-500" size={20} />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Password & Security</h2>
            <p className="text-sm text-slate-500">Update your password and secure your account.</p>
          </div>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Password</label>
            <input type="password" required className="w-full max-w-md rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">New Password</label>
            <input type="password" required className="w-full max-w-md rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm New Password</label>
            <input type="password" required className="w-full max-w-md rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm">
              Update Password
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Bell className="text-emerald-500" size={20} />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Notification Preferences</h2>
            <p className="text-sm text-slate-500">Manage how you receive alerts and updates.</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {[
            { id: 'notif-1', title: 'New Orders', desc: 'Receive email alerts for new orders.', defaultChecked: true },
            { id: 'notif-2', title: 'Settlements', desc: 'Get notified when a bank payout is processed.', defaultChecked: true },
            { id: 'notif-3', title: 'Low Stock Alerts', desc: 'Receive warnings when inventory falls below reorder limits.', defaultChecked: true },
            { id: 'notif-4', title: 'Marketing Emails', desc: 'Promotions, newsletters, and platform updates.', defaultChecked: false },
          ].map(item => (
            <div key={item.id} className="flex items-start gap-4">
              <div className="pt-1">
                <input type="checkbox" id={item.id} defaultChecked={item.defaultChecked} className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-600" />
              </div>
              <div>
                <label htmlFor={item.id} className="text-sm font-medium text-slate-900 dark:text-slate-100 cursor-pointer">{item.title}</label>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="pt-4">
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
            <LogOut size={20} /> Danger Zone
          </h2>
          <p className="text-sm text-red-600 dark:text-red-300 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button onClick={() => toast.error('Please contact support to delete account')} className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
}
