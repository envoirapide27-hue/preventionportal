import React from 'react';
import Icon from '@/components/ui/AppIcon';

const summaryCards = [
  { id: 'ov-status', label: 'Case Status', value: 'Under Investigation', icon: 'MagnifyingGlassCircleIcon', cls: 'badge-investigation' },
  { id: 'ov-priority', label: 'Priority', value: 'High', icon: 'BoltIcon', cls: 'priority-high' },
  { id: 'ov-person', label: 'Person', value: 'Marcus Thierry Dubois', icon: 'UserIcon', cls: 'admin-text' },
  { id: 'ov-jurisdiction', label: 'Jurisdiction', value: 'Belgium — Brussels', icon: 'MapPinIcon', cls: 'admin-text' },
  { id: 'ov-value', label: 'Purchase Value', value: '€850.00', icon: 'BanknotesIcon', cls: 'admin-text' },
  { id: 'ov-substance', label: 'Substance', value: 'Cannabis — High-THC', icon: 'BeakerIcon', cls: 'admin-text' },
  { id: 'ov-charge', label: 'Charge Status', value: 'Pending', icon: 'ScaleIcon', cls: 'badge-review' },
  { id: 'ov-notice', label: 'Public Notice', value: 'Published', icon: 'MegaphoneIcon', cls: 'badge-published' },
];

const timeline = [
  { id: 'tl-001', date: '17 Aug 2026', time: '18:14', event: 'Public notice published to website', icon: 'MegaphoneIcon', color: 'text-green-400' },
  { id: 'tl-002', date: '17 Aug 2026', time: '17:52', event: 'Evidence EV-003 uploaded — shipping record', icon: 'PaperClipIcon', color: 'text-[#4A90D9]' },
  { id: 'tl-003', date: '17 Aug 2026', time: '16:30', event: 'Case notice sent to subject via email', icon: 'EnvelopeIcon', color: 'text-[#7A9BB5]' },
  { id: 'tl-004', date: '17 Aug 2026', time: '15:05', event: 'Charge CH-2026-000187 issued — €250.00', icon: 'BanknotesIcon', color: 'text-amber-400' },
  { id: 'tl-005', date: '17 Aug 2026', time: '14:20', event: 'Allegation added — Alleged online cannabis purchase', icon: 'DocumentTextIcon', color: 'text-[#7A9BB5]' },
  { id: 'tl-006', date: '17 Aug 2026', time: '13:48', event: 'Evidence EV-001 and EV-002 uploaded', icon: 'PaperClipIcon', color: 'text-[#4A90D9]' },
  { id: 'tl-007', date: '17 Aug 2026', time: '13:05', event: 'Purchase record added — €850, cannabis flower', icon: 'ShoppingCartIcon', color: 'text-[#7A9BB5]' },
  { id: 'tl-008', date: '17 Aug 2026', time: '12:30', event: 'Case DA-2026-001527 created', icon: 'FolderPlusIcon', color: 'text-[#4A90D9]' },
];

export default function OverviewTab() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      {/* Summary Cards */}
      <div className="xl:col-span-2">
        <div className="admin-card-bg border admin-border rounded-lg p-5 mb-4">
          <h3 className="admin-text font-semibold text-sm mb-4">Case Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <div key={card.id} className="bg-[#071527] border border-[#1E3A54] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={card.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-[#7A9BB5]" />
                  <p className="admin-text-muted text-xs">{card.label}</p>
                </div>
                <p className={`text-sm font-medium ${card.cls}`}>{card.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Notes */}
        <div className="admin-card-bg border admin-border rounded-lg p-5">
          <h3 className="admin-text font-semibold text-sm mb-3">Case Notes</h3>
          <p className="admin-text text-sm leading-relaxed">
            Subject identified through online purchase records obtained from an encrypted messaging platform. Payment was made via bank transfer on 12 August 2026. Product — high-THC cannabis flower, 100g — was intercepted by customs authorities at Brussels Airport on 15 August 2026. Digital evidence obtained includes transaction records, delivery tracking, and product photographs. Case referred to national authorities for further action.
          </p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="admin-card-bg border admin-border rounded-lg p-5">
        <h3 className="admin-text font-semibold text-sm mb-4">Activity Timeline</h3>
        <div className="space-y-0">
          {timeline.map((item, index) => (
            <div key={item.id} className="flex gap-3 relative">
              {index < timeline.length - 1 && (
                <div className="absolute left-3.5 top-7 w-px h-full bg-[#1E3A54]" />
              )}
              <div className="w-7 h-7 rounded-full bg-[#071527] border border-[#1E3A54] flex items-center justify-center flex-shrink-0 z-10">
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={13} className={item.color} />
              </div>
              <div className="flex-1 pb-4">
                <p className="admin-text text-xs leading-snug mb-0.5">{item.event}</p>
                <p className="admin-text-muted text-xs font-mono-data">{item.date} — {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}