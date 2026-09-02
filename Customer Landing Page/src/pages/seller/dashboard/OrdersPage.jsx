import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  OrderSummaryCards,
  OrderFilters,
  OrdersTable,
  OrderDetailsDrawer,
  DeliveryAssignModal,
  HandoverModal,
  ConfirmDialog,
  ReasonDialog,
  OrderAnalytics,
  BulkActionsBar,
  printInvoice,
  printShippingLabel,
  printBarcode,
  printQR,
  printPackingSlip,
  downloadPdfPlaceholder,
} from '../../../components/seller/orders';
import { ExportReportButton } from '../../../components/seller/export';
import {
  getOrderSummary,
  getOrders,
  updateOrderStatus,
  rejectOrder,
  cancelOrder,
  assignDeliveryAgent,
  confirmHandover,
  updateReturnFlow,
  bulkUpdateOrders,
  saveOrderNotes,
  blockCustomer,
  exportOrders,
} from '../../../services/seller/sellerOrdersService';
import { addNotification } from '../../../services/sellerNotificationService';
import { ORDER_STATUS } from '../../../config/seller/orderConstants';

const DEFAULT_FILTERS = {
  dateFilter: 'all',
  customRange: { from: '', to: '' },
  statuses: [],
  paymentModes: [],
  deliveryModes: [],
  other: [],
};

function playNotifySound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.value = 0.05;
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 180);
  } catch {
    // ignore audio errors
  }
}

export default function OrdersPage() {
  const [summary, setSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [loadingAction, setLoadingAction] = useState(null);
  const [confirmState, setConfirmState] = useState(null);
  const [reasonState, setReasonState] = useState(null);
  const [assignOrder, setAssignOrder] = useState(null);
  const [handoverOrder, setHandoverOrder] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const queryFilters = useMemo(
    () => ({
      ...filters,
      search,
      sortBy,
      sortDir,
      page,
      pageSize,
    }),
    [filters, search, sortBy, sortDir, page, pageSize]
  );

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await getOrderSummary();
      setSummary(res.data || []);
    } catch {
      toast.error('Failed to load summary');
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadOrders = useCallback(async () => {
    setListLoading(true);
    setError(null);
    try {
      const res = await getOrders(queryFilters);
      if (!res.success) throw new Error(res.error || 'Failed');
      setOrders(res.data || []);
      setMeta(res.meta || { total: 0, totalPages: 1 });
    } catch (e) {
      setError(e.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setListLoading(false);
    }
  }, [queryFilters]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !e.target.matches('input, textarea, select')) {
        e.preventDefault();
        document.querySelector('input[aria-label="Search orders"]')?.focus();
      }
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setAssignOrder(null);
        setHandoverOrder(null);
        setConfirmState(null);
        setReasonState(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const refreshAll = async () => {
    await Promise.all([loadSummary(), loadOrders()]);
  };

  const notify = (title, body) => {
    addNotification({ title, body });
    playNotifySound();
    toast.success(title);
  };

  const runWithLoading = async (key, fn, successMsg) => {
    setLoadingAction(key);
    try {
      const res = await fn();
      if (!res?.success) throw new Error(res?.error || 'Action failed');
      if (successMsg) toast.success(successMsg);
      if (res.data) {
        setSelectedOrder((prev) => (prev?.id === res.data.id ? res.data : prev));
        setOrders((prev) => prev.map((o) => (o.id === res.data.id ? res.data : o)));
      }
      await refreshAll();
      return res;
    } catch (e) {
      toast.error(e.message || 'Unable to update order details. Please try again.');
      return null;
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCardClick = (card) => {
    setActiveCard(card.key);
    setPage(1);
    if (card.filterStatus) {
      setFilters((f) => ({ ...f, statuses: [card.filterStatus], other: [], paymentModes: [] }));
    } else if (card.filterExtra?.late) {
      setFilters((f) => ({ ...f, statuses: [], other: ['late'], paymentModes: [] }));
    } else if (card.filterExtra?.paymentMode) {
      setFilters((f) => ({
        ...f,
        statuses: [],
        other: [],
        paymentModes: [card.filterExtra.paymentMode],
      }));
    } else if (card.filterExtra?.paymentStatus === 'received') {
      setFilters((f) => ({ ...f, statuses: [], other: [], paymentModes: ['online', 'upi', 'wallet', 'credit_card', 'debit_card'] }));
    }
  };

  const handleSort = (key) => {
    if (sortBy === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy(key);
      setSortDir('desc');
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (orders.every((o) => prev.has(o.id))) return new Set();
      return new Set(orders.map((o) => o.id));
    });
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleAction = async (actionId, order) => {
    const key = `${order.id}:${actionId}`;

    const statusMap = {
      accept: { status: ORDER_STATUS.ACCEPTED, label: 'Accepted', msg: 'Order accepted' },
      preparing: { status: ORDER_STATUS.PREPARING, label: 'Preparing', msg: 'Marked as preparing' },
      packed: { status: ORDER_STATUS.PACKED, label: 'Packed', msg: 'Order packed' },
      ready: { status: ORDER_STATUS.READY, label: 'Ready for Pickup', msg: 'Ready for pickup' },
    };

    if (statusMap[actionId]) {
      setConfirmState({
        title: statusMap[actionId].label,
        message: `Confirm "${statusMap[actionId].label}" for order ${order.id}?`,
        onConfirm: async () => {
          setConfirmState(null);
          const res = await runWithLoading(
            key,
            () =>
              updateOrderStatus(order.id, statusMap[actionId].status, {
                label: statusMap[actionId].label,
              }),
            statusMap[actionId].msg
          );
          if (res?.success) {
            notify(statusMap[actionId].label, `Order ${order.id}`);
          }
        },
      });
      return;
    }

    if (actionId === 'reject') {
      setReasonState({ mode: 'reject', order, key });
      return;
    }
    if (actionId === 'cancel') {
      setReasonState({ mode: 'cancel', order, key });
      return;
    }
    if (actionId === 'assign') {
      setAssignOrder(order);
      return;
    }
    if (actionId === 'handover') {
      setHandoverOrder(order);
      return;
    }
    if (actionId === 'details' || actionId === 'timeline') {
      openDetails(order);
      return;
    }
    if (actionId === 'print_invoice') {
      printInvoice(order);
      toast.success('Invoice preview opened');
      return;
    }
    if (actionId === 'print_label') {
      printShippingLabel(order);
      toast.success('Shipping label preview opened');
      return;
    }
    if (actionId === 'print_barcode') {
      printBarcode(order);
      return;
    }
    if (actionId === 'print_qr') {
      printQR(order);
      return;
    }
    if (actionId === 'gst_invoice') {
      printInvoice(order, { gst: true });
      downloadPdfPlaceholder(order, 'gst-invoice');
      toast.success('GST invoice ready');
      return;
    }
    if (actionId === 'packing_slip') {
      printPackingSlip(order);
      return;
    }
    if (actionId === 'call') {
      window.open(`tel:${order.customer.phone.replace(/\s/g, '')}`);
      return;
    }
    if (actionId === 'whatsapp') {
      const phone = order.customer.phone.replace(/\D/g, '').replace(/^91/, '91');
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Hello regarding order ${order.id}`)}`, '_blank');
      return;
    }
    if (actionId === 'chat') {
      setConfirmState({
        title: 'In-app chat',
        message: `Start a support chat with ${order.customer?.name || 'customer'} about order ${order.id}?`,
        confirmLabel: 'Open Chat',
        onConfirm: () => {
          setConfirmState(null);
          openDetails(order);
          toast.success('Chat panel ready in order details');
          notify('Chat', `Conversation started for ${order.id}`);
        },
      });
      return;
    }
    if (actionId === 'directions') {
      window.open(`https://www.google.com/maps?q=${order.customer.lat},${order.customer.lng}`, '_blank');
      return;
    }
    if (actionId === 'track') {
      toast.success(order.agent ? `Tracking ${order.agent.name}` : 'Tracking unavailable');
      openDetails(order);
      return;
    }
    if (actionId === 'refund' || actionId === 'replace') {
      setConfirmState({
        title: actionId === 'refund' ? 'Refund Order' : 'Replace Order',
        message: `Confirm ${actionId} for ${order.id}?`,
        danger: true,
        onConfirm: async () => {
          setConfirmState(null);
          toast.success(`${actionId === 'refund' ? 'Refund' : 'Replace'} marked on order (frontend)`);
          notify(actionId === 'refund' ? 'Refund' : 'Replace', `Order ${order.id}`);
          await runWithLoading(key, () => updateOrderStatus(order.id, order.status, { label: actionId === 'refund' ? 'Refund requested' : 'Replace requested', remarks: `${actionId} logged` }), `${actionId} logged`);
        },
      });
      return;
    }

    toast.success(`Action "${actionId}" applied`);
    notify(labelizeAction(actionId), `Order ${order.id}`);
    openDetails(order);
  };

  function labelizeAction(id) {
    return String(id || '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  const handleReasonConfirm = async ({ reason, customReason }) => {
    if (!reasonState) return;
    const { mode, order, key } = reasonState;
    setReasonState(null);
    const fn =
      mode === 'reject'
        ? () => rejectOrder(order.id, reason, customReason)
        : () => cancelOrder(order.id, reason, customReason);
    const res = await runWithLoading(key, fn, mode === 'reject' ? 'Order rejected' : 'Order cancelled');
    if (res?.success) notify(mode === 'reject' ? 'Rejected' : 'Cancelled', `Order ${order.id}: ${reason}`);
  };

  const handleBulk = (actionId) => {
    const ids = [...selectedIds];
    if (!ids.length) return;

    setConfirmState({
      title: 'Bulk action',
      message: `Apply "${actionId}" to ${ids.length} order(s)?`,
      danger: ['reject', 'cancel', 'refund'].includes(actionId),
      onConfirm: async () => {
        setConfirmState(null);
        setLoadingAction('bulk');
        try {
          if (actionId === 'export') {
            const res = await exportOrders('csv', queryFilters);
            const blob = new Blob([res.data.content], { type: res.data.mime });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = res.data.filename;
            a.click();
            URL.revokeObjectURL(url);
            toast.success('Exported');
          } else if (actionId === 'print_invoice' || actionId === 'print_labels') {
            const selected = orders.filter((o) => selectedIds.has(o.id));
            selected.forEach((o) => (actionId === 'print_invoice' ? printInvoice(o) : printShippingLabel(o)));
            toast.success('Print jobs opened');
          } else if (actionId === 'assign') {
            toast('Open an order and use Assign Delivery for agent selection', { icon: '🚚' });
          } else if (actionId === 'refund') {
            toast.success('Bulk refund logged on selected orders');
            notify('Bulk refund', `${ids.length} orders`);
            await refreshAll();
          } else {
            const map = { accept: 'accept', reject: 'reject', packed: 'packed', ready: 'ready', cancel: 'cancel' };
            const res = await bulkUpdateOrders(ids, map[actionId] || actionId, {
              reason: actionId === 'reject' ? 'Out of Stock' : 'Seller Requested',
            });
            if (res.success) toast.success('Bulk update completed');
            await refreshAll();
          }
          setSelectedIds(new Set());
        } catch (e) {
          toast.error(e.message || 'Bulk action failed');
        } finally {
          setLoadingAction(null);
        }
      },
    });
  };

  const newOrdersCount = summary.find((c) => c.key === 'new')?.today || 0;

  const statusCounts = useMemo(() => {
    const map = {};
    summary.forEach((c) => {
      if (c.filterStatus) map[c.filterStatus] = c.today;
    });
    return map;
  }, [summary]);

  return (
    <div className="space-y-4 pb-28">
      <Toaster position="top-right" toastOptions={{ duration: 2800 }} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and fulfill customer orders efficiently.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ExportReportButton moduleKey="orders" filters={queryFilters} />
          <button
            type="button"
            onClick={() => {
              setConfirmState({
                title: 'Import orders',
                message: 'Import a CSV of orders into your Seller Hub?',
                confirmLabel: 'Import Sample',
                onConfirm: async () => {
                  setConfirmState(null);
                  toast.success('Sample orders imported into local view');
                  notify('Import', 'Orders CSV imported');
                  refreshAll?.();
                },
              });
            }}
            className="px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-surface hover:bg-page"
          >
            Import
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '/seller/dashboard/orders/saathpack'}
            className="px-3.5 py-2 rounded-lg text-sm font-semibold border border-primary text-primary bg-primary/5 hover:bg-primary/10"
          >
            SaathPack Orders
          </button>
          <button
            type="button"
            onClick={() => setShowAnalytics((v) => !v)}
            className="px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-surface hover:bg-page"
          >
            {showAnalytics ? 'Hide Reports' : 'Reports'}
          </button>
          <button
            type="button"
            onClick={() => {
              setConfirmState({
                title: 'Create manual order',
                message: 'Create a draft manual order for walk-in / phone customers? (frontend)',
                confirmLabel: 'Create Draft',
                onConfirm: async () => {
                  setConfirmState(null);
                  toast.success('Draft order created — continue fulfillment from the list');
                  notify('Order created', 'Manual draft order added');
                  await refreshAll();
                },
              });
            }}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
          >
            Create Order
          </button>
        </div>
      </div>

      <OrderSummaryCards
        cards={summary}
        loading={summaryLoading}
        onCardClick={handleCardClick}
        activeKey={activeCard}
        primaryOnly
      />

      {showAnalytics && <OrderAnalytics filters={queryFilters} />}

      <OrderFilters
        filters={filters}
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        onChange={(f) => { setFilters(f); setPage(1); }}
        onReset={() => { setFilters(DEFAULT_FILTERS); setSearch(''); setActiveCard(null); setPage(1); }}
        statusCounts={statusCounts}
      />

      {error ? (
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-6 text-center" role="alert">
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <button type="button" onClick={loadOrders} className="text-sm font-medium text-red-600 hover:underline">
            Try again
          </button>
        </div>
      ) : (
        <OrdersTable
          orders={orders}
          loading={listLoading}
          search={search}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          sortBy={sortBy}
          sortDir={sortDir}
          onSort={handleSort}
          page={page}
          pageSize={pageSize}
          totalPages={meta.totalPages}
          total={meta.total}
          onPageChange={setPage}
          onPageSizeChange={(n) => { setPageSize(n); setPage(1); }}
          onAction={handleAction}
          loadingAction={loadingAction}
          onRowClick={openDetails}
        />
      )}

      <BulkActionsBar
        count={selectedIds.size}
        onAction={handleBulk}
        loading={loadingAction === 'bulk'}
      />

      <OrderDetailsDrawer
        open={drawerOpen}
        order={selectedOrder}
        onClose={() => setDrawerOpen(false)}
        onAction={handleAction}
        loadingAction={loadingAction}
        onCustomerAction={async (id) => {
          if (!selectedOrder) return;
          if (id === 'call') handleAction('call', selectedOrder);
          else if (id === 'whatsapp') handleAction('whatsapp', selectedOrder);
          else if (id === 'chat') handleAction('chat', selectedOrder);
          else if (id === 'directions') handleAction('directions', selectedOrder);
          else if (id === 'previous') {
            setSearch(selectedOrder.customer.phone);
            setDrawerOpen(false);
            toast('Showing previous orders for customer');
          } else if (id === 'profile') toast(`Customer profile: ${selectedOrder.customer.name}`);
          else if (id === 'block') {
            await blockCustomer(selectedOrder.customer.id, !selectedOrder.customer.blocked);
            toast.success(selectedOrder.customer.blocked ? 'Customer unblocked' : 'Customer blocked');
            await refreshAll();
          } else if (id === 'notes') toast('Notes section is in the drawer overview');
        }}
        onReturnAdvance={async (next) => {
          const res = await runWithLoading(
            `${selectedOrder.id}:return`,
            () => updateReturnFlow(selectedOrder.id, next),
            'Return workflow updated'
          );
          if (res?.data) setSelectedOrder(res.data);
        }}
        onSaveNotes={async (notes) => {
          const res = await saveOrderNotes(selectedOrder.id, notes);
          if (res.success) {
            toast.success('Notes saved');
            setSelectedOrder(res.data);
          }
        }}
      />

      <DeliveryAssignModal
        open={!!assignOrder}
        order={assignOrder}
        loading={!!loadingAction}
        onClose={() => setAssignOrder(null)}
        onAssign={async (agentId) => {
          const order = assignOrder;
          setAssignOrder(null);
          const res = await runWithLoading(
            `${order.id}:assign`,
            () => assignDeliveryAgent(order.id, agentId),
            'Delivery agent assigned'
          );
          if (res?.success) notify('Pickup Assigned', `Order ${order.id}`);
        }}
      />

      <HandoverModal
        open={!!handoverOrder}
        order={handoverOrder}
        loading={!!loadingAction}
        onClose={() => setHandoverOrder(null)}
        onConfirm={async (data) => {
          const order = handoverOrder;
          setHandoverOrder(null);
          const res = await runWithLoading(
            `${order.id}:handover`,
            () => confirmHandover(order.id, data),
            'Handover verified — out for delivery'
          );
          if (res?.data) notify('Agent Arrived / Handover', `Order ${order.id}`);
        }}
      />

      <ReasonDialog
        open={!!reasonState}
        mode={reasonState?.mode || 'cancel'}
        loading={!!loadingAction}
        onCancel={() => setReasonState(null)}
        onConfirm={handleReasonConfirm}
      />

      <ConfirmDialog
        open={!!confirmState}
        title={confirmState?.title}
        message={confirmState?.message}
        danger={confirmState?.danger}
        loading={!!loadingAction}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmState?.onConfirm}
      />

      {/* Subtle badge for new orders — matches mock sidebar badge intent */}
      {newOrdersCount > 0 && (
        <span className="sr-only">{newOrdersCount} new orders</span>
      )}
    </div>
  );
}
