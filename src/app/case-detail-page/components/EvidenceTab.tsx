'use client';
import React from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';

const evidenceItems = [
  {
    id: 'ev-001',
    ref: 'EV-001',
    title: 'Product Purchase Record',
    type: 'Transaction Record',
    description: 'Screenshot of purchase confirmation from encrypted messaging platform. Shows product description, quantity (100g), and price (€850).',
    date: '17 Aug 2026',
    source: 'Online Purchase Record',
    fileType: 'PNG',
    isPrivate: true,
  },
  {
    id: 'ev-002',
    ref: 'EV-002',
    title: 'Bank Transfer Evidence',
    type: 'Payment Record',
    description: 'Payment transaction record showing bank transfer of €850 on 12 August 2026. Transaction reference obtained from financial records.',
    date: '17 Aug 2026',
    source: 'Financial Transaction Record',
    fileType: 'PDF',
    isPrivate: true,
  },
  {
    id: 'ev-003',
    ref: 'EV-003',
    title: 'Customs Seizure Report',
    type: 'Official Document',
    description: 'Official customs authority seizure report for parcel intercepted at Brussels Airport on 15 August 2026. Contains parcel details and substance identification.',
    date: '17 Aug 2026',
    source: 'Belgian Customs Authority',
    fileType: 'PDF',
    isPrivate: true,
  },
  {
    id: 'ev-004',
    ref: 'EV-004',
    title: 'Product Photograph',
    type: 'Product Image',
    description: 'Photograph of intercepted product taken by customs authority. Confirms product type and approximate quantity.',
    date: '17 Aug 2026',
    source: 'Customs Authority Evidence',
    fileType: 'JPG',
    isPrivate: true,
  },
];

const fileTypeIcon: Record<string, string> = {
  PDF: 'DocumentIcon',
  PNG: 'PhotoIcon',
  JPG: 'PhotoIcon',
  DOC: 'DocumentTextIcon',
};

export default function EvidenceTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="admin-text font-semibold text-sm">Evidence ({evidenceItems.length} items)</h3>
        <button
          onClick={() => toast.info('Opening evidence upload dialog...')}
          className="flex items-center gap-2 text-xs bg-secondary border border-[#1E3A54] text-[#E2EAF2] hover:bg-secondary/80 px-3 py-2 rounded transition-colors"
        >
          <Icon name="ArrowUpTrayIcon" size={14} />
          Upload Evidence
        </button>
      </div>

      <div className="bg-[#071527] border border-[#1E3A54] rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Icon name="LockClosedIcon" size={14} className="text-[#4A90D9] flex-shrink-0 mt-0.5" />
          <p className="admin-text-muted text-xs">
            All evidence items are stored in private secure storage. Evidence files are not accessible through public interfaces. Only lawfully obtained evidence should be recorded.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
        {evidenceItems.map((ev) => (
          <div key={ev.id} className="admin-card-bg border admin-border rounded-lg overflow-hidden hover:border-[#4A90D9]/40 transition-colors group">
            {/* Evidence Preview Area */}
            <div className="bg-[#071527] h-32 flex flex-col items-center justify-center border-b admin-border">
              <Icon
                name={fileTypeIcon[ev.fileType] as Parameters<typeof Icon>[0]['name'] || 'DocumentIcon'}
                size={36}
                className="text-[#1E3A54] group-hover:text-[#4A90D9] transition-colors mb-2"
              />
              <span className="text-xs font-mono-data text-[#7A9BB5] bg-[#0B1F33] px-2 py-0.5 rounded">{ev.fileType}</span>
            </div>

            {/* Evidence Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="case-ref text-[#4A90D9] text-xs font-bold">{ev.ref}</span>
                <div className="flex items-center gap-1">
                  <Icon name="LockClosedIcon" size={12} className="text-[#7A9BB5]" />
                  <span className="text-xs text-[#7A9BB5]">Private</span>
                </div>
              </div>
              <h4 className="admin-text text-sm font-semibold mb-1 leading-tight">{ev.title}</h4>
              <p className="admin-text-muted text-xs mb-2">{ev.type}</p>
              <p className="admin-text text-xs leading-relaxed line-clamp-2 mb-3">{ev.description}</p>
              <div className="flex items-center justify-between text-xs admin-text-muted">
                <span>{ev.date}</span>
                <div className="flex items-center gap-1">
                  <button
                    title="View evidence details"
                    onClick={() => toast.info(`Viewing ${ev.ref}`)}
                    className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#1E3A54] hover:text-[#E2EAF2] transition-colors"
                  >
                    <Icon name="EyeIcon" size={13} />
                  </button>
                  <button
                    title="Delete evidence"
                    onClick={() => toast.warning(`Delete ${ev.ref}? This cannot be undone.`)}
                    className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#1E3A54] hover:text-red-400 transition-colors"
                  >
                    <Icon name="TrashIcon" size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}