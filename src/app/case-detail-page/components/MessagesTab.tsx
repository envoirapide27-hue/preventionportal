'use client';
import React from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';

const messages = [
  {
    id: 'msg-001',
    type: 'Official Notice',
    subject: 'Official Case Notification — DA-2026-001527',
    recipient: 'm.dubois.88@protonmail.com',
    date: '17 Aug 2026',
    time: '16:30',
    status: 'Delivered',
    ref: 'DA-2026-001527',
  },
];

const statusColor: Record<string, string> = {
  Delivered: 'badge-active',
  Sent: 'badge-investigation',
  Queued: 'badge-review',
  Failed: 'badge-charged',
};

export default function MessagesTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="admin-text font-semibold text-sm">Messages & Notices</h3>
        <button
          onClick={() => toast.info('Opening send notice dialog...')}
          className="flex items-center gap-2 text-xs bg-accent hover:bg-accent/90 text-accent-foreground px-3 py-2 rounded transition-colors font-medium"
        >
          <Icon name="PaperAirplaneIcon" size={14} />
          Send Notice
        </button>
      </div>

      <div className="admin-card-bg border admin-border rounded-lg overflow-hidden mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b admin-border">
              {['Date', 'Type', 'Subject', 'Recipient', 'Status', 'Case Ref'].map((h) => (
                <th key={`mh-${h}`} className="text-left px-4 py-3 admin-text-muted text-xs font-medium uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} className="border-b admin-border hover:bg-[#0F2A42]/80 transition-colors">
                <td className="px-4 py-3.5">
                  <p className="admin-text text-xs font-mono-data">{m.date}</p>
                  <p className="admin-text-muted text-xs">{m.time}</p>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs bg-secondary text-[#E2EAF2] px-2 py-0.5 rounded">{m.type}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="admin-text text-sm">{m.subject}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="admin-text-muted text-xs font-mono-data">{m.recipient}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[m.status] || 'badge-draft'}`}>{m.status}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="case-ref text-[#4A90D9] text-xs">{m.ref}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-card-bg border admin-border rounded-lg p-4">
        <h4 className="admin-text font-semibold text-sm mb-3">Message Requirements</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs admin-text-muted">
          <div className="flex items-start gap-2">
            <Icon name="CheckCircleIcon" size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
            <span>All notices automatically include the case reference number</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="CheckCircleIcon" size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
            <span>Verification link to /verify is included in every notice</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="CheckCircleIcon" size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
            <span>Message history is maintained for audit purposes</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="ExclamationCircleIcon" size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Do not send automated repeated follow-up notices</span>
          </div>
        </div>
      </div>
    </div>
  );
}