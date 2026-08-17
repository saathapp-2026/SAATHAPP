import React, { useState } from 'react';
import { User, Briefcase, CreditCard, Shield, Check, Edit2, Lock } from 'lucide-react';
export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    email: '',
    experience: '',
    category: '',
    skills: '',
    bankAccount: '',
    emergencyContact: '',
  });
  const [formData, setFormData] = useState({ ...profile });

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  const fields = [
    { section: 'Basic Details', icon: User, items: [
      { key: 'fullName', label: 'Full Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
    ]},
    { section: 'Skills & Experience', icon: Briefcase, items: [
      { key: 'category', label: 'Primary Skill' },
      { key: 'experience', label: 'Experience' },
      { key: 'skills', label: 'Skills' },
    ]},
    { section: 'Bank Details', icon: CreditCard, items: [
      { key: 'bankAccount', label: 'Bank Account' },
    ]},
    { section: 'Emergency Contact', icon: Shield, items: [
      { key: 'emergencyContact', label: 'Contact' },
    ]},
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft text-left max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-primary/15 shadow-premium shrink-0 bg-primary flex items-center justify-center text-white font-black text-4xl">
          SW
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-black text-slate-800 dark:text-white">{profile.fullName || 'Service Worker'}</h3>
          <p className="text-sm text-slate-500 mt-1">{profile.category || 'Not set'} · {profile.city || 'Not set'}</p>
          <p className="text-xs font-bold text-primary mt-1">Worker ID: —</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (isEditing) setFormData({ ...profile });
            setIsEditing(!isEditing);
          }}
          className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-black uppercase hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Edit2 size={12} />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {fields.map(({ section, icon: Icon, items }) => (
          <div key={section}>
            <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider mb-4">
              <Icon size={14} />
              {section}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(({ key, label }) => (
                <div key={key} className={key === 'skills' ? 'md:col-span-2' : ''}>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">{label}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-sm outline-none focus:border-primary/50"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 bg-page dark:bg-slate-950/50 px-3 py-2.5 rounded-xl">
                      {profile[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {isEditing ? (
            <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase flex items-center gap-1.5">
              <Check size={14} /> Save Changes
            </button>
          ) : (
            <button type="button" onClick={() => alert('Password change flow would open here.')} className="px-6 py-2.5 border border-slate-200 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 text-slate-600">
              <Lock size={14} /> Change Password
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
