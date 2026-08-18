'use client';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Icon from '@/components/ui/AppIcon';
import StatusBadge from '@/components/ui/StatusBadge';
import { chargeService, type ChargeRow } from '@/lib/services/edpcaService';

const statusMap: Record<string, 'pending' | 'paid' | 'overdue' | 'cancelled'> = {
  pending: 'pending',
  paid: 'paid',
  overdue: 'overdue',
  cancelled: 'cancelled',
};

const emptyForm = {
  caseRef: '',
  person: '',
  chargeType: 'Administrative Fee',
  legalBasis: '',
  amount: '',
  currency: 'EUR',
  issueDate: '',
  dueDate: '',
};

export default function ChargesPage() {
  const [charges, setCharges] = useState<ChargeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    chargeService
      .getAll()
      .then((rows) => setCharges(rows))
      .catch(() => setLoadError('Failed to load charges. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  const totalIssued = charges.filter((c) => c.status !== 'cancelled').length;
  const totalPaid = charges.filter((c) => c.status === 'paid').length;
  const totalPending = charges.filter((c) => c.status === 'pending').length;
  const totalOverdue = charges.filter((c) => c.status === 'overdue').length;

  const handleOpen = () => {
    setForm(emptyForm);
    setFormError('');
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.caseRef.trim() || !form.person.trim() || !form.amount.trim() || !form.issueDate || !form.dueDate) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      const newCharge = await chargeService.create({
        caseRef: form.caseRef.trim(),
        person: form.person.trim(),
        chargeType: form.chargeType,
        legalBasis: form.legalBasis.trim(),
        amount: form.amount.trim(),
        currency: form.currency,
        issueDate: form.issueDate,
        dueDate: form.dueDate,
      });
      setCharges((prev) => [newCharge, ...prev]);
      setShowModal(false);
      setSuccessMsg(`Charge ${newCharge.chargeRef} created successfully.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch {
      setFormError('Failed to create charge. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkPaid = async (charge: ChargeRow) => {
    try {
      await chargeService.markPaid(charge.id);
      setCharges((prev) =>
        prev.map((c) =>
          c.id === charge.id
            ? { ...c, status: 'paid', paymentDate: new Date().toISOString().split('T')[0] }
            : c
        )
      );
      setSuccessMsg(`Charge ${charge.chargeRef} marked as paid.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch {
      // silently fail
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#7A9BB5] text-xs mb-1">
              <span>Admin</span><span>/</span><span className="text-[#E2EAF2]">Charges &amp; Payments</span>
            </div>
            <h1 className="text-xl font-bold admin-text">Charges &amp; Payments</h1>
            <p className="admin-text-muted text-xs mt-0.5">Global view of all charges and payment records</p>
          </div>
          <button
            onClick={handleOpen}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium px-4 py-2.5 rounded transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            <span className="text-base font-bold leading-none">+</span>
            New Charge
          </button>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-700/30 rounded-xl mb-4">
            <Icon name="CheckCircleIcon" size={16} className="text-green-400 flex-shrink-0" />
            <p className="text-green-300 text-sm">{successMsg}</p>
          </div>
        )}

        {/* Important Notice */}
        <div className="flex gap-3 p-4 bg-amber-900/20 border border-amber-700/30 rounded-xl mb-6">
          <Icon name="ExclamationTriangleIcon" size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 text-sm font-medium mb-1">Important: Payment Status ≠ Case Status</p>
            <p className="text-amber-400/80 text-xs leading-relaxed">
              Payment of a charge does not automatically close, resolve, or affect the legal status of a case. Case status and payment status are maintained as separate records. Never imply that payment prevents prosecution or imprisonment.
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Issued', value: totalIssued, icon: 'DocumentTextIcon', color: 'text-blue-400' },
            { label: 'Paid', value: totalPaid, icon: 'CheckCircleIcon', color: 'text-green-400' },
            { label: 'Pending', value: totalPending, icon: 'ClockIcon', color: 'text-yellow-400' },
            { label: 'Overdue', value: totalOverdue, icon: 'ExclamationTriangleIcon', color: 'text-red-400' },
          ].map((kpi) => (
            <div key={kpi.label} className="admin-sidebar-bg border admin-border rounded-xl p-4">
              <Icon name={kpi.icon as Parameters<typeof Icon>[0]['name']} size={20} className={`${kpi.color} mb-2`} />
              <p className="text-2xl font-bold admin-text">{kpi.value}</p>
              <p className="admin-text-muted text-xs mt-0.5">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A9BB5]" />
            <input
              type="text"
              placeholder="Search by reference, person, case..."
              className="w-full admin-sidebar-bg border admin-border text-[#E2EAF2] placeholder-[#7A9BB5] text-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7A9BB5]"
            />
          </div>
          <select className="admin-sidebar-bg border admin-border text-[#E2EAF2] text-sm px-3 py-2 rounded-lg focus:outline-none">
            <option value="">All Statuses</option>
            <option>Pending</option>
            <option>Paid</option>
            <option>Overdue</option>
            <option>Cancelled</option>
          </select>
          <select className="admin-sidebar-bg border admin-border text-[#E2EAF2] text-sm px-3 py-2 rounded-lg focus:outline-none">
            <option value="">All Types</option>
            <option>Administrative Fee</option>
            <option>Court-Ordered Fine</option>
            <option>Processing Fee</option>
          </select>
        </div>

        {/* Table */}
        <div className="admin-sidebar-bg border admin-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center">
              <div className="w-8 h-8 border-2 border-[#4A90D9] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="admin-text-muted text-sm">Loading charges...</p>
            </div>
          ) : loadError ? (
            <div className="p-8 text-center">
              <Icon name="ExclamationTriangleIcon" size={32} className="text-red-400 mx-auto mb-3" />
              <p className="text-red-300 text-sm">{loadError}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b admin-border">
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Charge Ref</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Case Ref</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden md:table-cell">Person</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Type</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Amount</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Due Date</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Status</th>
                    <th className="text-right px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {charges.map((charge) => (
                    <tr key={charge.id} className="border-b admin-border hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-[#7A9BB5]">{charge.chargeRef}</span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="font-mono text-xs text-[#7A9BB5]">{charge.caseRef}</span>
                      </td>
                      <td className="px-4 py-3 admin-text text-sm hidden md:table-cell">{charge.person}</td>
                      <td className="px-4 py-3 admin-text-muted text-xs hidden lg:table-cell">{charge.chargeType}</td>
                      <td className="px-4 py-3">
                        <span className="admin-text font-semibold">{charge.currency} {charge.amount}</span>
                      </td>
                      <td className="px-4 py-3 admin-text-muted text-xs hidden sm:table-cell">{charge.dueDate}</td>
                      <td className="px-4 py-3">
                        <StatusBadge variant={statusMap[charge.status] || 'pending'} size="sm" />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors" title="View">
                            <Icon name="EyeIcon" size={14} />
                          </button>
                          {(charge.status === 'pending' || charge.status === 'overdue') && (
                            <button
                              onClick={() => handleMarkPaid(charge)}
                              className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded transition-colors"
                              title="Mark Paid"
                            >
                              <Icon name="CheckCircleIcon" size={14} />
                            </button>
                          )}
                          <button className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors" title="Edit">
                            <Icon name="PencilSquareIcon" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="px-4 py-3 border-t admin-border flex items-center justify-between">
            <p className="admin-text-muted text-xs">Showing {charges.length} charges</p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 text-xs admin-text-muted border admin-border rounded hover:bg-secondary/30 transition-colors">Previous</button>
              <button className="px-3 py-1.5 text-xs bg-secondary/60 admin-text rounded">1</button>
              <button className="px-3 py-1.5 text-xs admin-text-muted border admin-border rounded hover:bg-secondary/30 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* New Charge Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={handleClose} />
          <div className="relative w-full max-w-lg bg-[#0A1929] border border-[#1E3A54] rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E3A54]">
              <div>
                <h2 className="text-base font-bold text-[#E2EAF2]">New Charge</h2>
                <p className="text-xs text-[#7A9BB5] mt-0.5">Create a new charge record</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-[#1E3A54] transition-colors"
              >
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {formError && (
                <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                  <Icon name="ExclamationTriangleIcon" size={14} className="text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-xs">{formError}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Case Reference <span className="text-red-400">*</span></label>
                  <input
                    name="caseRef"
                    value={form.caseRef}
                    onChange={handleChange}
                    placeholder="e.g. DA-2026-001527"
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] placeholder-[#7A9BB5] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Person / Subject <span className="text-red-400">*</span></label>
                  <input
                    name="person"
                    value={form.person}
                    onChange={handleChange}
                    placeholder="e.g. J. Smith"
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] placeholder-[#7A9BB5] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Charge Type</label>
                  <select
                    name="chargeType"
                    value={form.chargeType}
                    onChange={handleChange}
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  >
                    <option>Administrative Fee</option>
                    <option>Court-Ordered Fine</option>
                    <option>Processing Fee</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Legal Basis</label>
                  <input
                    name="legalBasis"
                    value={form.legalBasis}
                    onChange={handleChange}
                    placeholder="e.g. Agency Administrative Order"
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] placeholder-[#7A9BB5] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Amount <span className="text-red-400">*</span></label>
                  <input
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="e.g. 1,200"
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] placeholder-[#7A9BB5] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Currency</label>
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  >
                    <option>EUR</option>
                    <option>USD</option>
                    <option>GBP</option>
                    <option>CHF</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Issue Date <span className="text-red-400">*</span></label>
                  <input
                    type="date"
                    name="issueDate"
                    value={form.issueDate}
                    onChange={handleChange}
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9] [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Due Date <span className="text-red-400">*</span></label>
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9] [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm text-[#7A9BB5] hover:text-[#E2EAF2] border border-[#1E3A54] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-white rounded-lg transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                  {submitting ? 'Creating...' : 'Create Charge'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
