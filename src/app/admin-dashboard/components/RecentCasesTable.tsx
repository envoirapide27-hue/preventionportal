import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const recentCases = [
  { id: 'rc-001527', ref: 'DA-2026-001527', person: 'Marcus Dubois', country: 'Belgium', category: 'Cannabis Purchase', amount: '€850', status: 'investigation', noticeStatus: 'published' },
  { id: 'rc-001526', ref: 'DA-2026-001526', person: 'Yuki Tanaka', country: 'Japan', category: 'High-THC Product', amount: '¥42,000', status: 'review', noticeStatus: 'draft' },
  { id: 'rc-001525', ref: 'DA-2026-001525', person: 'Omar Ibrahim', country: 'UAE', category: 'Drug Importation', amount: '€1,200', status: 'charged', noticeStatus: 'published' },
  { id: 'rc-001524', ref: 'DA-2026-001524', person: 'Ana Beatriz Santos', country: 'Brazil', category: 'Online Substance', amount: 'R$3,400', status: 'notice', noticeStatus: 'published' },
  { id: 'rc-001523', ref: 'DA-2026-001523', person: 'Luca Bianchi', country: 'Italy', category: 'Cannabis Purchase', amount: '€620', status: 'draft', noticeStatus: 'unpublished' },
];

const statusBadge: Record<string, string> = {
  investigation: 'badge-investigation',
  review: 'badge-review',
  charged: 'badge-charged',
  notice: 'badge-investigation',
  draft: 'badge-draft',
};

const statusLabel: Record<string, string> = {
  investigation: 'Under Investigation',
  review: 'Under Review',
  charged: 'Charged',
  notice: 'Notice Issued',
  draft: 'Draft',
};

const noticeBadge: Record<string, string> = {
  published: 'badge-published',
  draft: 'badge-draft',
  unpublished: 'badge-unpublished',
};

export default function RecentCasesTable() {
  return (
    <div className="admin-card-bg border admin-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b admin-border">
        <h3 className="admin-text font-semibold text-sm">Recent Cases</h3>
        <Link href="/case-management" className="text-xs text-[#4A90D9] hover:text-[#7AB8E8] transition-colors flex items-center gap-1">
          View all cases
          <Icon name="ArrowRightIcon" size={13} />
        </Link>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead>
            <tr className="border-b admin-border">
              {['Case Reference', 'Person', 'Country', 'Category', 'Amount', 'Case Status', 'Notice'].map((col) => (
                <th key={`rch-${col}`} className="text-left px-5 py-3 admin-text-muted text-xs font-medium uppercase tracking-wide whitespace-nowrap">
                  {col}
                </th>
              ))}
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {recentCases.map((c) => (
              <tr key={c.id} className="border-b admin-border hover:bg-[#0F2A42]/80 transition-colors group">
                <td className="px-5 py-3.5">
                  <span className="case-ref text-[#4A90D9]">{c.ref}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="admin-text text-sm">{c.person}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="admin-text-muted text-sm">{c.country}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="admin-text-muted text-sm">{c.category}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="admin-text font-mono-data text-sm">{c.amount}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadge[c.status]}`}>
                    {statusLabel[c.status]}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${noticeBadge[c.noticeStatus]}`}>
                    {c.noticeStatus}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <Link
                    href="/case-detail-page"
                    className="opacity-0 group-hover:opacity-100 text-[#4A90D9] hover:text-[#7AB8E8] transition-all duration-150"
                  >
                    <Icon name="ArrowTopRightOnSquareIcon" size={15} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}