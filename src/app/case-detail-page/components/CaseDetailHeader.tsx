'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';

export default function CaseDetailHeader() {
  const [publishing, setPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const handlePublishToggle = () => {
    setPublishing(true);
    setTimeout(() => {
      setIsPublished(!isPublished);
      toast?.success(isPublished ? 'Notice unpublished successfully.' : 'Notice published to public website.');
      setPublishing(false);
    }, 900);
  };

  return (
    <div className="mb-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[#7A9BB5] text-xs mb-3">
        <Link href="/admin-dashboard" className="hover:text-[#E2EAF2] transition-colors">Admin</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <Link href="/case-management" className="hover:text-[#E2EAF2] transition-colors">Cases</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <span className="text-[#E2EAF2] font-mono-data">DA-2026-001527</span>
      </div>

      <div className="admin-card-bg border admin-border rounded-lg p-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-xl font-bold admin-text font-mono-data">DA-2026-001527</h1>
              <span className="badge-investigation text-xs font-medium px-2.5 py-1 rounded-full">Under Investigation</span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isPublished ? 'badge-published' : 'badge-unpublished'}`}>
                {isPublished ? 'Published' : 'Unpublished'}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full badge-review">Charge Pending</span>
              <span className="text-xs font-semibold priority-high">HIGH PRIORITY</span>
            </div>
            <h2 className="admin-text text-base font-medium mb-1">Online Cannabis Purchase — Marcus Thierry Dubois</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs admin-text-muted">
              <span className="flex items-center gap-1"><Icon name="MapPinIcon" size={13} />Brussels, Belgium</span>
              <span className="flex items-center gap-1"><Icon name="CalendarIcon" size={13} />Opened 17 Aug 2026</span>
              <span className="flex items-center gap-1"><Icon name="ClockIcon" size={13} />Last updated 17 Aug 2026, 18:14</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => toast?.info('Opening send notice dialog...')}
              className="flex items-center gap-2 border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9] text-sm px-3 py-2 rounded transition-colors"
            >
              <Icon name="EnvelopeIcon" size={15} />
              Send Notice
            </button>
            <button
              onClick={() => toast?.info('Opening edit form...')}
              className="flex items-center gap-2 border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9] text-sm px-3 py-2 rounded transition-colors"
            >
              <Icon name="PencilSquareIcon" size={15} />
              Edit Case
            </button>
            <button
              onClick={handlePublishToggle}
              disabled={publishing}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded font-medium transition-all duration-150 active:scale-95 disabled:opacity-60 ${
                isPublished
                  ? 'bg-amber-600/20 border border-amber-500/40 text-amber-400 hover:bg-amber-600/30' :'bg-green-600/20 border border-green-500/40 text-green-400 hover:bg-green-600/30'
              }`}
            >
              {publishing ? (
                <Icon name="ArrowPathIcon" size={15} className="animate-spin" />
              ) : (
                <Icon name={isPublished ? 'EyeSlashIcon' : 'EyeIcon'} size={15} />
              )}
              {isPublished ? 'Unpublish Notice' : 'Publish Notice'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}