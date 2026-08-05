import React from 'react';
import { Phone, MessageCircle, MessageSquare, MapPin, History, User, Ban, StickyNote } from 'lucide-react';

export default function CustomerQuickActions({ customer, onAction }) {
  if (!customer) return null;

  const actions = [
    { id: 'call', label: 'Call', icon: Phone },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'directions', label: 'Directions', icon: MapPin },
    { id: 'previous', label: 'Previous Orders', icon: History },
    { id: 'profile', label: 'Customer Profile', icon: User },
    { id: 'block', label: customer.blocked ? 'Unblock' : 'Block Customer', icon: Ban },
    { id: 'notes', label: 'Notes', icon: StickyNote },
  ];

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Customer quick actions">
      {actions.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onAction?.(id)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            id === 'block'
              ? 'border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30'
              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Icon size={12} aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}
