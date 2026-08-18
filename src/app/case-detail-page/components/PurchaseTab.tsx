'use client';
import React from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';

const purchases = [
  {
    id: 'purch-001',
    product: 'Cannabis Flower — High-THC',
    category: 'Cannabis',
    thc: '28% THC',
    quantity: '100g',
    amount: '€850.00',
    currency: 'EUR',
    date: '12 Aug 2026',
    time: '14:32',
    vendor: '[Encrypted Messaging Platform — Identity Withheld]',
    platform: 'Telegram',
    paymentMethod: 'Bank Transfer',
    deliveryMethod: 'International Courier',
    deliveryStatus: 'Intercepted',
    destination: 'Brussels, Belgium',
    orderRef: '[INTERNAL RECORD]',
  },
];

export default function PurchaseTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="admin-text font-semibold text-sm">Purchase Records</h3>
        <button
          onClick={() => toast?.info('Opening add purchase form...')}
          className="flex items-center gap-2 text-xs border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9] px-3 py-2 rounded transition-colors"
        >
          <Icon name="PlusIcon" size={14} />
          Add Purchase
        </button>
      </div>

      <div className="space-y-4">
        {purchases?.map((p) => (
          <div key={p?.id} className="admin-card-bg border admin-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b admin-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon name="ArchiveBoxIcon" size={18} className="text-[#7A9BB5]" />
                </div>
                <div>
                  <p className="admin-text font-semibold text-sm">{p?.product}</p>
                  <p className="admin-text-muted text-xs">{p?.category} — {p?.thc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toast?.info('Opening edit purchase form...')}
                  className="w-7 h-7 rounded flex items-center justify-center text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-[#1E3A54] transition-colors"
                  title="Edit purchase"
                >
                  <Icon name="PencilSquareIcon" size={14} />
                </button>
                <button
                  onClick={() => toast?.warning('Delete this purchase record?')}
                  className="w-7 h-7 rounded flex items-center justify-center text-[#7A9BB5] hover:text-red-400 hover:bg-[#1E3A54] transition-colors"
                  title="Delete purchase"
                >
                  <Icon name="TrashIcon" size={14} />
                </button>
              </div>
            </div>

            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Quantity', value: p?.quantity },
                { label: 'Purchase Amount', value: p?.amount },
                { label: 'Purchase Date', value: `${p?.date} ${p?.time}` },
                { label: 'Payment Method', value: p?.paymentMethod },
                { label: 'Platform / Source', value: p?.platform },
                { label: 'Vendor Description', value: p?.vendor },
                { label: 'Delivery Method', value: p?.deliveryMethod },
                { label: 'Delivery Status', value: p?.deliveryStatus },
                { label: 'Destination', value: p?.destination },
                { label: 'Order Reference', value: p?.orderRef },
              ]?.map((field) => (
                <div key={`${p?.id}-${field?.label}`} className="bg-[#071527] border border-[#1E3A54] rounded p-3">
                  <p className="admin-text-muted text-xs mb-1">{field?.label}</p>
                  <p className="admin-text text-sm font-medium truncate">{field?.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}