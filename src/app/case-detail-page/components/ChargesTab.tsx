'use client';
import React from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';

const charges = [
  {
    id: 'ch-001',
    ref: 'CH-2026-000187',
    type: 'Administrative Processing Fee',
    basis: 'Agency administrative charge — case processing',
    description: 'Administrative fee for case investigation and processing.',
    amount: '€250.00',
    currency: 'EUR',
    issued: '17 Aug 2026',
    due: '31 Aug 2026',
    status: 'pending',
    paymentMethod: '—',
    paymentDate: '—',
    paymentRef: '—',
  },
];

const chargeStatusMap: Record<string, { label: string; cls: string }> = {
  pending: { label: 'Pending', cls: 'badge-review' },
  paid: { label: 'Paid', cls: 'badge-active' },
  overdue: { label: 'Overdue', cls: 'badge-charged' },
  issued: { label: 'Issued', cls: 'badge-investigation' },
  cancelled: { label: 'Cancelled', cls: 'badge-closed' },
};

export default function ChargesTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="admin-text font-semibold text-sm">Charges & Payments</h3>
        <button
          onClick={() => toast.info('Opening create charge form...')}
          className="flex items-center gap-2 text-xs border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9] px-3 py-2 rounded transition-colors"
        >
          <Icon name="PlusIcon" size={14} />
          Issue Charge
        </button>
      </div>

      <div className="bg-amber-900/15 border border-amber-500/25 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Icon name="ExclamationTriangleIcon" size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-300 text-xs leading-relaxed">
            Payment status and legal case status are separate. Recording a payment does not close the legal case or imply that prosecution will not proceed. Do not imply that payment prevents arrest or imprisonment.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {charges.map((ch) => (
          <div key={ch.id} className="admin-card-bg border admin-border rounded-lg p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="case-ref text-[#4A90D9] font-bold">{ch.ref}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${chargeStatusMap[ch.status]?.cls || 'badge-draft'}`}>
                    {chargeStatusMap[ch.status]?.label}
                  </span>
                </div>
                <h4 className="admin-text font-semibold text-sm">{ch.type}</h4>
                <p className="admin-text-muted text-xs">{ch.basis}</p>
              </div>
              <div className="text-right">
                <p className="admin-text font-bold text-xl font-mono-data">{ch.amount}</p>
                <p className="admin-text-muted text-xs">Due: {ch.due}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Issue Date', value: ch.issued },
                { label: 'Due Date', value: ch.due },
                { label: 'Payment Method', value: ch.paymentMethod },
                { label: 'Payment Date', value: ch.paymentDate },
              ].map((f) => (
                <div key={`${ch.id}-${f.label}`} className="bg-[#071527] border border-[#1E3A54] rounded p-3">
                  <p className="admin-text-muted text-xs mb-1">{f.label}</p>
                  <p className="admin-text text-sm">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.success(`Payment recorded for ${ch.ref}`)}
                className="flex items-center gap-2 text-xs bg-green-800/30 border border-green-600/30 text-green-400 hover:bg-green-800/50 px-3 py-2 rounded transition-colors"
              >
                <Icon name="BanknotesIcon" size={13} />
                Mark Payment Received
              </button>
              <button
                onClick={() => toast.info(`Editing charge ${ch.ref}`)}
                className="flex items-center gap-2 text-xs border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] px-3 py-2 rounded transition-colors"
              >
                <Icon name="PencilSquareIcon" size={13} />
                Edit
              </button>
              <button
                onClick={() => toast.warning(`Cancel charge ${ch.ref}?`)}
                className="flex items-center gap-2 text-xs border border-[#1E3A54] text-[#7A9BB5] hover:text-red-400 px-3 py-2 rounded transition-colors"
              >
                <Icon name="XMarkIcon" size={13} />
                Cancel Charge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}