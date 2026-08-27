import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  UserCheck,
  CheckCircle,
  TrendingUp,
  Search,
  Filter,
  ArrowLeft,
  ChevronDown,
  Plus,
  RefreshCw,
  Gift,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';
import {
  getStoredReferrals,
  updateReferralStatus,
  REFERRAL_STATUSES,
  REFERRAL_TYPES,
  getReferralMetrics,
} from '../../services/referralService';
import ReferralModal from '../../components/ReferralModal';

export default function AdminReferrals() {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    total: 1250,
    pending: 420,
    registered: 380,
    verified: 290,
    converted: 160,
  });

  const loadData = () => {
    const list = getStoredReferrals();
    setReferrals(list);
    const m = getReferralMetrics();
    setMetrics(m);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateReferralStatus(id, newStatus);
    setReferrals(updated);
    setMetrics(getReferralMetrics());
  };

  const filteredReferrals = referrals.filter((item) => {
    const matchesSearch =
      item.referredName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.referrerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.referredPhone.includes(searchQuery) ||
      (item.referredEmail && item.referredEmail.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'All' || item.referralStatus === selectedStatus;
    const matchesType = selectedType === 'All' || item.referralType === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200';
      case 'Registered':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200';
      case 'Verified':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-200';
      case 'Activated':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200';
      case 'Converted':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 text-left">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button
                onClick={() => navigate(-1)}
                className="hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Admin Portal</span>
              </button>
              <span>/</span>
              <span>Growth</span>
              <span>/</span>
              <span className="text-emerald-600 font-bold">Referrals</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <Gift className="text-emerald-600 shrink-0" size={28} />
              Growth Referrals Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              title="Refresh Referral Data"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Referral</span>
            </button>
          </div>
        </div>

        {/* Metric Cards (PDF Page 5 Specification) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Total Referrals */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Referrals</span>
              <Users size={16} className="text-blue-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {metrics.total.toLocaleString()}
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-1">
            <div className="flex items-center justify-between text-amber-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending</span>
              <Clock size={16} />
            </div>
            <p className="text-2xl font-black text-amber-600">
              {metrics.pending.toLocaleString()}
            </p>
          </div>

          {/* Registered */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-1">
            <div className="flex items-center justify-between text-purple-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered</span>
              <UserCheck size={16} />
            </div>
            <p className="text-2xl font-black text-purple-600">
              {metrics.registered.toLocaleString()}
            </p>
          </div>

          {/* Verified */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-1">
            <div className="flex items-center justify-between text-teal-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Verified</span>
              <CheckCircle size={16} />
            </div>
            <p className="text-2xl font-black text-teal-600">
              {metrics.verified.toLocaleString()}
            </p>
          </div>

          {/* Converted */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-1 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-emerald-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Converted</span>
              <TrendingUp size={16} />
            </div>
            <p className="text-2xl font-black text-emerald-600">
              {metrics.converted.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar Strip */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search referrer, phone, or candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400">
              <Filter size={14} />
              <span>Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-9 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                {REFERRAL_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400">
              <span>Category:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-9 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {REFERRAL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Referral Data Table (PDF Page 5 Layout: Referrer | Referred Person | Type | Status | Date | Action) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-extrabold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Referrer</th>
                  <th className="py-3.5 px-4">Referred Person</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                {filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                      No referrals found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredReferrals.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Referrer */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {item.referrerName}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Code: {item.referrerCode}
                        </div>
                      </td>

                      {/* Referred Person */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {item.referredName}
                        </div>
                        <div className="flex flex-col text-[11px] text-slate-500 space-y-0.5 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Phone size={11} className="shrink-0" />
                            {item.referredPhone}
                          </span>
                          {item.referredEmail && (
                            <span className="flex items-center gap-1 text-slate-400">
                              <Mail size={11} className="shrink-0" />
                              {item.referredEmail}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg text-[11px]">
                          {item.referralType}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${getStatusBadgeClass(
                            item.referralStatus
                          )}`}
                        >
                          {item.referralStatus}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="shrink-0 text-slate-400" />
                          <span>{new Date(item.createdAt).toLocaleDateString('en-IN')}</span>
                        </div>
                      </td>

                      {/* Action (Update Status Dropdown) */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-block relative">
                          <select
                            value={item.referralStatus}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className="h-8 pl-2.5 pr-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-300 dark:border-slate-700 text-[11px] font-bold text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none appearance-none cursor-pointer"
                          >
                            {REFERRAL_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                Mark as {st}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ReferralModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          loadData();
        }}
      />
    </div>
  );
}
