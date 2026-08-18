'use client';
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Icon from '@/components/ui/AppIcon';
import CaseTable from './components/CaseTable';
import { caseService, type CaseRow } from '@/lib/services/edpcaService';

const emptyForm = {
  person: '',
  country: '',
  category: 'Cannabis Purchase',
  amount: '',
  currency: 'EUR',
  priority: 'normal',
};

export default function CaseManagementPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [newCase, setNewCase] = useState<CaseRow | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleOpen = () => {
    setForm(emptyForm);
    setFormError('');
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.person.trim() || !form.country.trim() || !form.amount.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      const currencySymbol =
        form.currency === 'EUR' ? '€' :
        form.currency === 'USD' ? '$' :
        form.currency === 'GBP' ? '£' :
        form.currency;
      const amountStr = `${currencySymbol}${form.amount.trim()}`;
      const nc = await caseService.create({
        person: form.person.trim(),
        country: form.country.trim(),
        category: form.category,
        amount: amountStr,
        priority: form.priority,
      });
      setNewCase(nc);
      setShowModal(false);
      setSuccessMsg(`Case ${nc.ref} created successfully.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch {
      setFormError('Failed to create case. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#7A9BB5] text-xs mb-1">
              <span>Admin</span>
              <span>/</span>
              <span className="text-[#E2EAF2]">Cases</span>
            </div>
            <h1 className="text-xl font-bold admin-text">Case Management</h1>
            <p className="admin-text-muted text-xs mt-0.5">Manage all investigation cases</p>
          </div>
          <button
            onClick={handleOpen}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium px-4 py-2.5 rounded transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            <span className="text-base font-bold leading-none">+</span>
            Create New Case
          </button>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-700/30 rounded-xl mb-4">
            <Icon name="CheckCircleIcon" size={16} className="text-green-400 flex-shrink-0" />
            <p className="text-green-300 text-sm">{successMsg}</p>
          </div>
        )}

        <CaseTable newCase={newCase} />
      </div>

      {/* Create New Case Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={handleClose} />
          <div className="relative w-full max-w-lg bg-[#0A1929] border border-[#1E3A54] rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E3A54]">
              <div>
                <h2 className="text-base font-bold text-[#E2EAF2]">Create New Case</h2>
                <p className="text-xs text-[#7A9BB5] mt-0.5">Open a new investigation case record</p>
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
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Full Name / Subject <span className="text-red-400">*</span></label>
                  <input
                    name="person"
                    value={form.person}
                    onChange={handleChange}
                    placeholder="e.g. John Marcus Smith"
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] placeholder-[#7A9BB5] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Country <span className="text-red-400">*</span></label>
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="e.g. Germany"
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] placeholder-[#7A9BB5] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Case Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  >
                    <option>Cannabis Purchase</option>
                    <option>High-THC Product</option>
                    <option>Drug Importation</option>
                    <option>Online Substance</option>
                    <option>Suspected Distribution</option>
                    <option>Drug Trafficking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Purchase Amount <span className="text-red-400">*</span></label>
                  <input
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="e.g. 850"
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

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#7A9BB5] mb-1.5">Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full bg-[#071527] border border-[#1E3A54] rounded-lg text-sm text-[#E2EAF2] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
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
                  className="px-5 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                  {submitting ? 'Creating...' : 'Create Case'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}