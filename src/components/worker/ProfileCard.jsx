import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, CreditCard, Shield, Check, Edit2 } from 'lucide-react';

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Ramesh Kumar',
    phone: '9876543210',
    email: 'ramesh.kumar@saathapp.com',
    experience: '4 Years',
    salaryType: 'Fixed + Incentives',
    category: 'Electrician',
    bankName: 'HDFC Bank Ltd',
    accountNo: '50100456123456',
    ifscCode: 'HDFC0000120',
    upiId: 'ramesh.kumar@okhdfcbank',
    emergencyName: 'Amit Kumar (Brother)',
    emergencyPhone: '9876543219'
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    alert('Worker profile settings saved.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft hover:shadow-premium transition-all text-left">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/40 pb-4 mb-6">
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Worker Profile Settings</h3>
          <p className="text-[10px] text-slate-455 mt-0.5">Manage personal bio, banking records, and contacts</p>
        </div>
        <button
          onClick={() => {
            if (isEditing) setFormData({ ...profile });
            setIsEditing(!isEditing);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 text-xs font-black uppercase text-slate-505 hover:text-primary transition-all cursor-pointer"
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
        
        {/* Personal */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider">
            <User size={14} />
            <span>Bio Details</span>
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
                  className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl">
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
                  className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
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
                  className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
                  {profile.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Business Category and Skills */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/40">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider">
            <Briefcase size={14} />
            <span>Job Category & Skills</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="field-label">Primary Skill Category</label>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
                {profile.category}
              </p>
            </div>

            <div className="space-y-1">
              <label className="field-label">Experience</label>
              {isEditing ? (
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
                  {profile.experience}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="field-label">Payment Category</label>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
                {profile.salaryType}
              </p>
            </div>
          </div>
        </div>

        {/* Bank settlement */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/40">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider">
            <CreditCard size={14} />
            <span>Bank Routing Details</span>
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
                  className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
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
                  className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
                  {profile.accountNo.replace(/\d(?=\d{4})/g, '•')}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="field-label">UPI Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
                  {profile.upiId}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Emergency contact */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/40">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider">
            <Shield size={14} />
            <span>Emergency Contacts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="field-label">Contact Name & Relation</label>
              {isEditing ? (
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
                  {profile.emergencyName}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="field-label">Contact Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-955 p-3 rounded-xl">
                  {profile.emergencyPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/40">
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto px-6 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        )}

      </form>
    </div>
  );
}
