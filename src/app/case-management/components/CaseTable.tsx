'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import { caseService, type CaseRow } from '@/lib/services/edpcaService';

interface CaseTableProps {
  newCase?: CaseRow | null;
}

const caseStatusMap: Record<string, { label: string; cls: string }> = {
  draft: { label: 'Draft', cls: 'badge-draft' },
  review: { label: 'Under Review', cls: 'badge-review' },
  investigation: { label: 'Under Investigation', cls: 'badge-investigation' },
  notice: { label: 'Notice Issued', cls: 'badge-investigation' },
  charged: { label: 'Charged', cls: 'badge-charged' },
  wanted: { label: 'Wanted', cls: 'badge-wanted' },
  convicted: { label: 'Convicted', cls: 'badge-convicted' },
  closed: { label: 'Closed', cls: 'badge-closed' },
};

const chargeStatusMap: Record<string, { label: string; cls: string }> = {
  'not-issued': { label: '—', cls: 'text-[#7A9BB5]' },
  issued: { label: 'Issued', cls: 'badge-review' },
  pending: { label: 'Pending', cls: 'badge-review' },
  paid: { label: 'Paid', cls: 'badge-active' },
  overdue: { label: 'Overdue', cls: 'badge-charged' },
  cancelled: { label: 'Cancelled', cls: 'badge-closed' },
};

const noticeMap: Record<string, { label: string; cls: string }> = {
  published: { label: 'Published', cls: 'badge-published' },
  draft: { label: 'Draft', cls: 'badge-draft' },
  unpublished: { label: 'Unpublished', cls: 'badge-unpublished' },
};

const priorityMap: Record<string, string> = {
  critical: 'priority-critical',
  high: 'priority-high',
  normal: 'priority-normal',
  low: 'priority-low',
};

const statusFilters = [
  { key: 'filter-all', label: 'All Cases', value: 'all' },
  { key: 'filter-active', label: 'Active', value: 'active' },
  { key: 'filter-review', label: 'Under Review', value: 'review' },
  { key: 'filter-investigation', label: 'Under Investigation', value: 'investigation' },
  { key: 'filter-charged', label: 'Charged', value: 'charged' },
  { key: 'filter-published', label: 'Published', value: 'published' },
];

export default function CaseTable({ newCase }: CaseTableProps) {
  const [cases, setCases] = useState<CaseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    caseService
      .getAll()
      .then((rows) => setCases(rows))
      .catch(() => setError('Failed to load cases. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (newCase) {
      setCases((prev) => {
        if (prev.find((c) => c.id === newCase.id)) return prev;
        return [newCase, ...prev];
      });
    }
  }, [newCase]);

  const filtered = cases.filter((c) => {
    const matchSearch =
      !search ||
      c.ref.toLowerCase().includes(search.toLowerCase()) ||
      c.person.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === 'all' ||
      (activeFilter === 'active' && !['closed', 'archived', 'draft'].includes(c.caseStatus)) ||
      (activeFilter === 'published' && c.noticeStatus === 'published') ||
      c.caseStatus === activeFilter;
    return matchSearch && matchFilter;
  });

  const allSelected = selected.length === filtered.length && filtered.length > 0;

  const toggleAll = () => {
    setSelected(allSelected ? [] : filtered.map((c) => c.id));
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) {
    return (
      <div className="admin-card-bg border admin-border rounded-lg p-16 text-center">
        <div className="w-8 h-8 border-2 border-[#4A90D9] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="admin-text-muted text-sm">Loading cases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-card-bg border border-red-700/30 rounded-lg p-8 text-center">
        <Icon name="ExclamationTriangleIcon" size={32} className="text-red-400 mx-auto mb-3" />
        <p className="text-red-300 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters & Search */}
      <div className="admin-card-bg border admin-border rounded-lg p-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A9BB5]" />
            <input
              type="text"
              placeholder="Search case ref, person, country..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2.5 bg-[#071527] border border-[#1E3A54] rounded text-sm text-[#E2EAF2] placeholder:text-[#7A9BB5] focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
            />
          </div>

          {/* Status Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {statusFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => { setActiveFilter(f.value); setPage(1); }}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-150 ${
                  activeFilter === f.value
                    ? 'bg-secondary text-[#E2EAF2]'
                    : 'bg-[#071527] border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Country Filter */}
          <select
            className="bg-[#071527] border border-[#1E3A54] rounded text-sm text-[#7A9BB5] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#4A90D9]"
            defaultValue=""
          >
            <option value="">All Countries</option>
            <option value="Belgium">Belgium</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Spain">Spain</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 bg-secondary border admin-border rounded-lg px-4 py-3 mb-3 transition-all duration-200">
          <span className="admin-text text-sm font-medium">{selected.length} selected</span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => { toast.success(`${selected.length} cases archived`); setSelected([]); }}
              className="flex items-center gap-1.5 text-xs text-[#7A9BB5] hover:text-[#E2EAF2] border border-[#1E3A54] px-3 py-1.5 rounded transition-colors"
            >
              <Icon name="ArchiveBoxIcon" size={14} />
              Archive
            </button>
            <button
              onClick={() => setSelected([])}
              className="text-xs text-[#7A9BB5] hover:text-[#E2EAF2] transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="admin-card-bg border admin-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b admin-border">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-[#1E3A54] bg-[#071527] accent-[#4A90D9]"
                    aria-label="Select all cases"
                  />
                </th>
                {[
                  { col: 'ref', label: 'Case Reference' },
                  { col: 'person', label: 'Person' },
                  { col: 'country', label: 'Country' },
                  { col: 'category', label: 'Category' },
                  { col: 'amount', label: 'Purchase Amt.' },
                  { col: 'caseStatus', label: 'Case Status' },
                  { col: 'chargeStatus', label: 'Charge Status' },
                  { col: 'noticeStatus', label: 'Notice' },
                  { col: 'priority', label: 'Priority' },
                  { col: 'created', label: 'Created' },
                ].map((h) => (
                  <th
                    key={`th-${h.col}`}
                    onClick={() => handleSort(h.col)}
                    className="text-left px-4 py-3 admin-text-muted text-xs font-medium uppercase tracking-wide whitespace-nowrap cursor-pointer hover:text-[#E2EAF2] transition-colors select-none"
                  >
                    <div className="flex items-center gap-1">
                      {h.label}
                      {sortCol === h.col && (
                        <Icon name={sortDir === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={12} className="text-[4A90D9]" />
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 w-24 text-center admin-text-muted text-xs font-medium uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr
                  key={c.id}
                  className={`border-b admin-border hover:bg-[#0F2A42]/80 transition-colors group ${selected.includes(c.id) ? 'bg-secondary/20' : ''}`}
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(c.id)}
                      onChange={() => toggleRow(c.id)}
                      className="w-4 h-4 rounded border-[#1E3A54] bg-[#071527] accent-[#4A90D9]"
                      aria-label={`Select case ${c.ref}`}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <Link href="/case-detail-page" className="case-ref text-[#4A90D9] hover:text-[#7AB8E8] transition-colors">
                      {c.ref}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="admin-text text-sm">{c.person}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="admin-text-muted text-sm">{c.country}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="admin-text-muted text-sm truncate max-w-[140px] block">{c.category}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="admin-text font-mono-data text-sm">{c.amount}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${caseStatusMap[c.caseStatus]?.cls || 'badge-draft'}`}>
                      {caseStatusMap[c.caseStatus]?.label || c.caseStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {c.chargeStatus === 'not-issued' ? (
                      <span className="admin-text-muted text-sm">—</span>
                    ) : (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${chargeStatusMap[c.chargeStatus]?.cls || 'badge-draft'}`}>
                        {chargeStatusMap[c.chargeStatus]?.label || c.chargeStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${noticeMap[c.noticeStatus]?.cls || 'badge-draft'}`}>
                      {noticeMap[c.noticeStatus]?.label || c.noticeStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-medium capitalize ${priorityMap[c.priority] || 'priority-normal'}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="admin-text-muted text-xs font-mono-data">{c.created}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <Link
                        href="/case-detail-page"
                        title="View case"
                        className="w-7 h-7 rounded flex items-center justify-center text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-[#1E3A54] transition-colors"
                      >
                        <Icon name="EyeIcon" size={14} />
                      </Link>
                      <button
                        title="Edit case"
                        className="w-7 h-7 rounded flex items-center justify-center text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-[#1E3A54] transition-colors"
                        onClick={() => toast.info(`Editing ${c.ref}`)}
                      >
                        <Icon name="PencilSquareIcon" size={14} />
                      </button>
                      <button
                        title="Archive case"
                        className="w-7 h-7 rounded flex items-center justify-center text-[#7A9BB5] hover:text-amber-400 hover:bg-[#1E3A54] transition-colors"
                        onClick={() => toast.warning(`Archive ${c.ref}?`)}
                      >
                        <Icon name="ArchiveBoxIcon" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t admin-border">
          <div className="flex items-center gap-3">
            <span className="admin-text-muted text-xs">
              Showing {filtered.length === 0 ? 0 : Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} cases
            </span>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="bg-[#071527] border border-[#1E3A54] rounded text-xs text-[#7A9BB5] px-2 py-1 focus:outline-none"
              aria-label="Rows per page"
            >
              {[10, 25, 50].map((n) => (
                <option key={`perpage-${n}`} value={n}>{n} per page</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded flex items-center justify-center border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="ChevronLeftIcon" size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={`pg-${p}`}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                  p === page
                    ? 'bg-secondary text-[#E2EAF2] border border-[#4A90D9]'
                    : 'border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9]'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="w-8 h-8 rounded flex items-center justify-center border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="ChevronRightIcon" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && !loading && (
        <div className="admin-card-bg border admin-border rounded-lg p-16 text-center mt-4">
          <Icon name="FolderOpenIcon" size={40} className="text-[#1E3A54] mx-auto mb-4" />
          <h3 className="admin-text font-semibold text-lg mb-2">No cases match your search</h3>
          <p className="admin-text-muted text-sm mb-4">Try adjusting your filters or search terms.</p>
          <button
            onClick={() => { setSearch(''); setActiveFilter('all'); }}
            className="text-sm text-[#4A90D9] hover:text-[#7AB8E8] transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}