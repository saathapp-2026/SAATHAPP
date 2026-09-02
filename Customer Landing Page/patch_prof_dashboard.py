with open('./src/pages/professional/Dashboard.jsx', 'r') as f:
    content = f.read()

import re

# Add toaster and confirm dialog
content = content.replace(
    "import { Menu, X, Bell, User, MapPin, Clock, Calendar, Shield, CreditCard, Filter, ChevronDown, CheckCircle, Navigation, Phone, MessageSquare, AlertCircle, TrendingUp, Star, ChevronRight, Briefcase } from 'lucide-react';",
    "import { Menu, X, Bell, User, MapPin, Clock, Calendar, Shield, CreditCard, Filter, ChevronDown, CheckCircle, Navigation, Phone, MessageSquare, AlertCircle, TrendingUp, Star, ChevronRight, Briefcase } from 'lucide-react';\nimport toast, { Toaster } from 'react-hot-toast';\nimport ConfirmDialog from '../../components/seller/orders/ConfirmDialog';"
)

content = content.replace(
    "const [activeTab, setActiveTab] = useState('bookings');",
    "const [activeTab, setActiveTab] = useState('bookings');\n  const [confirmState, setConfirmState] = useState(null);"
)

content = content.replace(
    """  const handleConfirmBooking = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'confirmed', paymentStatus: 'secured' } : b));
    alert('Booking Confirmed! You can schedule the time with the customer if needed.');
  };""",
    """  const handleConfirmBooking = (bookingId) => {
    setConfirmState({
      title: 'Confirm Booking',
      message: 'Accept this booking and secure the payment?',
      confirmLabel: 'Confirm Booking',
      onConfirm: () => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'confirmed', paymentStatus: 'secured' } : b));
        toast.success('Booking Confirmed! You can schedule the time with the customer if needed.');
        setConfirmState(null);
      }
    });
  };"""
)

content = content.replace(
    """  const handleRejectBooking = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    alert('Booking Rejected.');
  };""",
    """  const handleRejectBooking = (bookingId) => {
    setConfirmState({
      title: 'Reject Booking',
      message: 'Are you sure you want to reject this booking?',
      danger: true,
      confirmLabel: 'Reject',
      onConfirm: () => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
        toast.success('Booking Rejected.');
        setConfirmState(null);
      }
    });
  };"""
)

content = content.replace(
    """  const handleSchedule = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'scheduled' } : b));
    alert('Booking Scheduled successfully.');
  };""",
    """  const handleSchedule = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'scheduled' } : b));
    toast.success('Booking Scheduled successfully.');
  };"""
)

content = content.replace(
    """  const handleNavigation = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'arrived' } : b));
    alert('Navigation initialized. Status set to Arrived.');
  };""",
    """  const handleNavigation = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'arrived' } : b));
    toast.success('Navigation initialized. Status set to Arrived.');
  };"""
)

content = content.replace(
    """  const handleStartService = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'in-progress' } : b));
    alert('Service Started!');
  };""",
    """  const handleStartService = (bookingId) => {
    setConfirmState({
      title: 'Start Service',
      message: 'Start this service now?',
      confirmLabel: 'Start',
      onConfirm: () => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'in-progress' } : b));
        toast.success('Service Started!');
        setConfirmState(null);
      }
    });
  };"""
)

content = content.replace(
    """  const handleCompleteService = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'completed', paymentStatus: 'released' } : b));
    alert('Service Completed. Payment Released.');
  };""",
    """  const handleCompleteService = (bookingId) => {
    setConfirmState({
      title: 'Complete Service',
      message: 'Mark this service as completed? Payment will be released.',
      confirmLabel: 'Complete',
      onConfirm: () => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'completed', paymentStatus: 'released' } : b));
        toast.success('Service Completed. Payment Released.');
        setConfirmState(null);
      }
    });
  };"""
)

content = content.replace(
    """  const handleReportIssue = (bookingId) => {
    alert(`Issue reported to support team for booking ${bookingId}.`);
  };""",
    """  const handleReportIssue = (bookingId) => {
    setConfirmState({
      title: 'Report Issue',
      message: 'Report an issue with this booking to the support team?',
      danger: true,
      confirmLabel: 'Report',
      onConfirm: () => {
        toast.success(`Issue reported to support team for booking ${bookingId}.`);
        setConfirmState(null);
      }
    });
  };"""
)

content = content.replace(
    """  const handleSupportTicket = (e) => {
    e.preventDefault();
    alert('Support ticket raised successfully!');
  };""",
    """  const handleSupportTicket = (e) => {
    e.preventDefault();
    toast.success('Support ticket raised successfully!');
  };"""
)

# Add ConfirmDialog in render
content = content.replace(
    """  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30">""",
    """  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30">
      <Toaster position="top-right" />
      <ConfirmDialog
        open={!!confirmState}
        title={confirmState?.title}
        message={confirmState?.message}
        danger={confirmState?.danger}
        confirmLabel={confirmState?.confirmLabel || 'Confirm'}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmState?.onConfirm}
      />"""
)

with open('./src/pages/professional/Dashboard.jsx', 'w') as f:
    f.write(content)
