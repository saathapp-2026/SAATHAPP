import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function HandoverModal({ open, order, loading, onConfirm, onClose }) {
  const [form, setForm] = useState({
    packageId: order ? `PKG-${order.id}` : '',
    orderId: order?.id || '',
    otp: '',
    qrCode: order ? `SAATH-${order.id}-PKG` : '',
    sellerSignature: '',
    deliverySignature: '',
    lat: order?.customer?.lat || 12.9716,
    lng: order?.customer?.lng || 77.5946,
  });

  React.useEffect(() => {
    if (order) {
      setForm({
        packageId: `PKG-${order.id}`,
        orderId: order.id,
        otp: String(Math.floor(1000 + Math.random() * 9000)),
        qrCode: `SAATH-${order.id}-PKG`,
        sellerSignature: '',
        deliverySignature: '',
        lat: 12.9716,
        lng: 77.5946,
      });
    }
  }, [order]);

  if (!open || !order) return null;

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <ConfirmDialog
      open={open}
      title="Handover Verification"
      message="Record package handover details before releasing to the delivery agent."
      confirmLabel="Confirm Handover"
      loading={loading}
      onCancel={onClose}
      onConfirm={() =>
        onConfirm({
          packageId: form.packageId,
          orderId: form.orderId,
          otp: form.otp,
          qrCode: form.qrCode,
          sellerSignature: form.sellerSignature,
          deliverySignature: form.deliverySignature,
          gps: { lat: Number(form.lat), lng: Number(form.lng) },
          verificationStatus: 'verified',
        })
      }
    >
      <div className="grid sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {[
          ['packageId', 'Package ID'],
          ['orderId', 'Order ID'],
          ['otp', 'OTP'],
          ['qrCode', 'QR Code'],
          ['sellerSignature', 'Seller Signature'],
          ['deliverySignature', 'Delivery Signature'],
          ['lat', 'GPS Latitude'],
          ['lng', 'GPS Longitude'],
        ].map(([key, label]) => (
          <label key={key} className="block text-xs font-medium text-slate-500">
            {label}
            <input
              value={form[key]}
              onChange={(e) => set(key, e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 bg-page dark:bg-slate-950 text-sm"
            />
          </label>
        ))}
      </div>
      <p className="text-xs text-slate-500">Timestamp will be recorded automatically on confirm.</p>
    </ConfirmDialog>
  );
}
