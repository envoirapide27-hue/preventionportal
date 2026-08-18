'use client';
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Icon from '@/components/ui/AppIcon';

interface Message {
  id: string;
  caseRef: string;
  recipient: string;
  email: string;
  messageType: string;
  subject: string;
  sentDate: string;
  status: 'sent' | 'delivered' | 'failed' | 'queued';
}

const mockMessages: Message[] = [
  { id: 'MSG-001', caseRef: 'DA-2026-001527', recipient: 'J. Morrison', email: 'j.morrison@email.com', messageType: 'Case Notification', subject: 'Official Case Notification — DA-2026-001527', sentDate: '2026-08-17 14:32', status: 'delivered' },
  { id: 'MSG-002', caseRef: 'DA-2026-000891', recipient: 'A. Bergmann', email: 'a.bergmann@email.de', messageType: 'Official Notice', subject: 'Official Notice — DA-2026-000891', sentDate: '2026-07-10 09:15', status: 'delivered' },
  { id: 'MSG-003', caseRef: 'DA-2026-002100', recipient: 'R. van der Berg', email: 'r.vdberg@email.nl', messageType: 'Charge Notice', subject: 'Charge Notice — CH-2026-000201', sentDate: '2026-08-15 16:45', status: 'sent' },
  { id: 'MSG-004', caseRef: 'DA-2025-003412', recipient: 'M. Dubois', email: 'm.dubois@email.fr', messageType: 'Awareness Notice', subject: 'Public Awareness Notice', sentDate: '2026-06-01 11:00', status: 'failed' },
];

const statusColors: Record<string, string> = {
  sent: 'bg-blue-900/40 text-blue-400',
  delivered: 'bg-green-900/40 text-green-400',
  failed: 'bg-red-900/40 text-red-400',
  queued: 'bg-yellow-900/40 text-yellow-400',
};

const messageTypes = ['Awareness Notice', 'Case Notification', 'Official Notice', 'Charge Notice', 'Custom Message'];

export default function MessagesPage() {
  const [showCompose, setShowCompose] = useState(false);
  const [activeTab, setActiveTab] = useState<'history' | 'templates'>('history');

  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#7A9BB5] text-xs mb-1">
              <span>Admin</span><span>/</span><span className="text-[#E2EAF2]">Messages</span>
            </div>
            <h1 className="text-xl font-bold admin-text">Messages</h1>
            <p className="admin-text-muted text-xs mt-0.5">Send official notices and manage message history</p>
          </div>
          <button
            onClick={() => setShowCompose(true)}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium px-4 py-2.5 rounded transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            <Icon name="PaperAirplaneIcon" size={16} />
            Compose Notice
          </button>
        </div>

        {/* Compose Modal */}
        {showCompose && (
          <div className="admin-sidebar-bg border admin-border rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="admin-text font-semibold">Compose Official Notice</h2>
              <button onClick={() => setShowCompose(false)} className="text-[#7A9BB5] hover:text-[#E2EAF2] transition-colors">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs admin-text-muted mb-1.5">Case Reference</label>
                <input type="text" placeholder="DA-YYYY-XXXXXX" className="w-full bg-secondary/20 border admin-border rounded-lg px-3 py-2 text-sm admin-text placeholder-[#7A9BB5] font-mono focus:outline-none focus:ring-1 focus:ring-[#7A9BB5]" />
              </div>
              <div>
                <label className="block text-xs admin-text-muted mb-1.5">Message Type</label>
                <select className="w-full bg-secondary/20 border admin-border rounded-lg px-3 py-2 text-sm admin-text focus:outline-none focus:ring-1 focus:ring-[#7A9BB5]">
                  {messageTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs admin-text-muted mb-1.5">Recipient Name</label>
                <input type="text" placeholder="Full name" className="w-full bg-secondary/20 border admin-border rounded-lg px-3 py-2 text-sm admin-text placeholder-[#7A9BB5] focus:outline-none focus:ring-1 focus:ring-[#7A9BB5]" />
              </div>
              <div>
                <label className="block text-xs admin-text-muted mb-1.5">Recipient Email</label>
                <input type="email" placeholder="recipient@email.com" className="w-full bg-secondary/20 border admin-border rounded-lg px-3 py-2 text-sm admin-text placeholder-[#7A9BB5] focus:outline-none focus:ring-1 focus:ring-[#7A9BB5]" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs admin-text-muted mb-1.5">Subject</label>
                <input type="text" placeholder="Official Notice — DA-YYYY-XXXXXX" className="w-full bg-secondary/20 border admin-border rounded-lg px-3 py-2 text-sm admin-text placeholder-[#7A9BB5] focus:outline-none focus:ring-1 focus:ring-[#7A9BB5]" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs admin-text-muted mb-1.5">Message Body</label>
                <textarea
                  rows={8}
                  placeholder="Enter the official notice content..."
                  className="w-full bg-secondary/20 border admin-border rounded-lg px-3 py-2 text-sm admin-text placeholder-[#7A9BB5] focus:outline-none focus:ring-1 focus:ring-[#7A9BB5] resize-none"
                />
              </div>
            </div>
            <div className="p-3 bg-secondary/20 border admin-border rounded-lg mb-4">
              <p className="text-xs text-[#7A9BB5] leading-relaxed">
                <strong className="admin-text">Auto-included:</strong> The case reference and a &quot;Verify this notice&quot; link pointing to <span className="font-mono">/verify</span> will be automatically appended to all outgoing notices.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium px-5 py-2 rounded transition-colors">
                <Icon name="PaperAirplaneIcon" size={14} />
                Send Notice
              </button>
              <button className="border admin-border text-[#7A9BB5] hover:text-[#E2EAF2] text-sm px-4 py-2 rounded transition-colors">
                Save Draft
              </button>
              <button onClick={() => setShowCompose(false)} className="border admin-border text-[#7A9BB5] hover:text-[#E2EAF2] text-sm px-4 py-2 rounded transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 border-b admin-border mb-5">
          {(['history', 'templates'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors capitalize border-b-2 -mb-px ${activeTab === tab ? 'border-accent text-[#E2EAF2]' : 'border-transparent text-[#7A9BB5] hover:text-[#E2EAF2]'}`}
            >
              {tab === 'history' ? 'Message History' : 'Templates'}
            </button>
          ))}
        </div>

        {/* Message History */}
        {activeTab === 'history' && (
          <div className="admin-sidebar-bg border admin-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b admin-border">
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Message</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Case Ref</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden md:table-cell">Recipient</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Type</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Sent</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Status</th>
                    <th className="text-right px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMessages.map((msg) => (
                    <tr key={msg.id} className="border-b admin-border hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3">
                        <p className="admin-text text-sm font-medium truncate max-w-xs">{msg.subject}</p>
                        <p className="text-[#7A9BB5] text-xs font-mono">{msg.id}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="font-mono text-xs text-[#7A9BB5]">{msg.caseRef}</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="admin-text text-sm">{msg.recipient}</p>
                        <p className="text-[#7A9BB5] text-xs">{msg.email}</p>
                      </td>
                      <td className="px-4 py-3 admin-text-muted text-xs hidden lg:table-cell">{msg.messageType}</td>
                      <td className="px-4 py-3 admin-text-muted text-xs hidden sm:table-cell">{msg.sentDate}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[msg.status]}`}>
                          {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors">
                          <Icon name="EyeIcon" size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Templates */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="flex items-center gap-2 border admin-border text-[#7A9BB5] hover:text-[#E2EAF2] text-sm px-4 py-2 rounded transition-colors">
                <span className="text-base font-bold leading-none">+</span>
                New Template
              </button>
            </div>
            {messageTypes.map((type) => (
              <div key={type} className="admin-sidebar-bg border admin-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="admin-text font-semibold">{type}</h3>
                  <div className="flex gap-1">
                    <button className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors">
                      <Icon name="PencilSquareIcon" size={14} />
                    </button>
                  </div>
                </div>
                <p className="admin-text-muted text-xs leading-relaxed">
                  Template for {type.toLowerCase()} messages. Includes automatic case reference and verification link insertion.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['{{case_reference}}', '{{recipient_name}}', '{{issue_date}}', '{{verify_link}}'].map((v) => (
                    <span key={v} className="text-xs font-mono bg-secondary/40 text-[#7A9BB5] px-2 py-0.5 rounded">{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
