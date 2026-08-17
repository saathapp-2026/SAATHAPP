import React, { useState } from 'react';
import { User, Briefcase, CreditCard, Shield, Check, Edit2 } from 'lucide-react';

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Rahul Kumar',
    phone: '9876543210',
    email: 'rahulkumar@saathapp.com',
    experience: '8 Years',
    hourlyRate: '350',
    radius: '15',
    category: 'Electrician',
    bankName: 'HDFC Bank Ltd',
    accountNo: '50100456123456',
    ifscCode: 'HDFC0000120',
    upiId: 'rahul.kumar@okhdfcbank',
    gstNo: '10AAAAA1111A1Z1 (Optional)',
    emergencyName: 'Amit Kumar (Brother)',
    emergencyPhone: '9876543219'
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    alert('Profile parameters updated successfully.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-surface border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft hover:shadow-premium transition-all text-left">
      
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-slate-100  pb-4 mb-6">
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Partner Storefront Settings</h3>
          <p className="text-[10px] text-slate-450 mt-0.5">Manage your personal, banking, and business details</p>
        </div>
        <button
          onClick={() => {
            if (isEditing) setFormData({ ...profile });
            setIsEditing(!isEditing);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-page text-xs font-black uppercase text-slate-500 hover:text-primary transition-all cursor-pointer"
        >
          {isEditing ? <span>Cancel</span> : (
            <>
              <Edit2 size={12} />
              <span>Modify</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SECTION 1: PERSONAL INFORMATION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider">
            <User size={14} />
            <span>Personal Particulars</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="field-label">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-950 p-3 rounded-xl border border-transparent">
                  {profile.fullName}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="field-label">Mobile Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                  {profile.phone}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="field-label">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                  {profile.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: BUSINESS SETTINGS */}
        <div className="space-y-4 pt-4 border-t border-slate-100 ">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider">
            <Briefcase size={14} />
            <span>Business Settings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="field-label">Professional Category</label>
              <p className="text-xs sm:text-sm font-semibold text-slate-855 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                {profile.category}
              </p>
            </div>

            <div className="space-y-1">
              <label className="field-label">Hourly Base Rate (₹)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                  ₹{profile.hourlyRate} / hour
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="field-label">Serving Radius (km)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="radius"
                  value={formData.radius}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                  {profile.radius} km radius
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: BANK DETAILS */}
        <div className="space-y-4 pt-4 border-t border-slate-100 ">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider">
            <CreditCard size={14} />
            <span>Settlement Bank Routing Details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="field-label">Bank Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                  {profile.bankName}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="field-label">Account Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="accountNo"
                  value={formData.accountNo}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                  {profile.accountNo.replace(/\d(?=\d{4})/g, '•')}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="field-label">UPI ID</label>
              {isEditing ? (
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                  {profile.upiId}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 4: EMERGENCY CONTACTS */}
        <div className="space-y-4 pt-4 border-t border-slate-100 ">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider">
            <Shield size={14} />
            <span>Emergency Contacts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="field-label">Contact Name & Relationship</label>
              {isEditing ? (
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                  {profile.emergencyName}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="field-label">Contact Mobile Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  className="input-field dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-955 p-3 rounded-xl border border-transparent">
                  {profile.emergencyPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Save button visible only in edit mode */}
        {isEditing && (
          <div className="flex justify-end pt-4 border-t border-slate-100 ">
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto px-6 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check size={14} />
              <span>Save Parameters</span>
            </button>
          </div>
        )}

      </form>
    </div>
  );
}
