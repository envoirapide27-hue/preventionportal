import React from 'react';
import Icon from '@/components/ui/AppIcon';

const activities = [
  { id: 'act-001', type: 'published', text: 'Notice DA-2026-001527 published', time: '18:14', icon: 'MegaphoneIcon', color: 'text-green-400' },
  { id: 'act-002', type: 'evidence', text: 'Evidence EV-003 uploaded to DA-2026-001521', time: '17:52', icon: 'PaperClipIcon', color: 'text-[#7A9BB5]' },
  { id: 'act-003', type: 'charge', text: 'Charge CH-2026-000187 marked paid', time: '16:30', icon: 'BanknotesIcon', color: 'text-green-400' },
  { id: 'act-004', type: 'case', text: 'New case DA-2026-001527 created', time: '14:05', icon: 'FolderPlusIcon', color: 'text-[#4A90D9]' },
  { id: 'act-005', type: 'message', text: 'Notice sent to M. Dubois', time: '13:48', icon: 'EnvelopeIcon', color: 'text-[#7A9BB5]' },
  { id: 'act-006', type: 'status', text: 'DA-2026-001489 status updated to Charged', time: '11:20', icon: 'ArrowPathIcon', color: 'text-amber-400' },
  { id: 'act-007', type: 'case', text: 'New case DA-2026-001526 created', time: '09:15', icon: 'FolderPlusIcon', color: 'text-[#4A90D9]' },
  { id: 'act-008', type: 'login', text: 'Administrator signed in', time: '08:59', icon: 'LockOpenIcon', color: 'text-[#7A9BB5]' },
];

export default function ActivityFeed() {
  return (
    <div className="admin-card-bg border admin-border rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="admin-text font-semibold text-sm">Recent Activity</h3>
        <span className="admin-text-muted text-xs">Today</span>
      </div>
      <div className="space-y-1">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-3 py-2.5 border-b border-[#1E3A54]/50 last:border-0">
            <div className="w-7 h-7 rounded-full bg-[#071527] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={13} className={item.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="admin-text text-xs leading-snug">{item.text}</p>
            </div>
            <span className="admin-text-muted text-xs font-mono-data flex-shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}