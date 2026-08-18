'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import StatusBadge from '@/components/ui/StatusBadge';
import Link from 'next/link';

const mockNotices = [
  {
    id: 'notice-001527',
    ref: 'DA-2026-001527',
    name: 'Marcus Thierry Dubois',
    country: 'Belgium',
    city: 'Brussels',
    category: 'Cannabis Purchase',
    date: '17 Aug 2026',
    status: 'investigation' as const,
    summary: 'Subject of a public notice relating to alleged online purchase of high-THC cannabis products via an encrypted messaging platform. Delivery intercepted by customs authorities.',
    noticeStatus: 'published' as const,
  },
  {
    id: 'notice-001489',
    ref: 'DA-2026-001489',
    name: 'Aleksander Nowak',
    country: 'Poland',
    city: 'Warsaw',
    category: 'High-THC Product Purchase',
    date: '14 Aug 2026',
    status: 'notice' as const,
    summary: 'Alleged purchase of concentrated THC vape products via an online marketplace. Purchase records and payment transactions identified.',
    noticeStatus: 'published' as const,
  },
  {
    id: 'notice-001452',
    ref: 'DA-2026-001452',
    name: 'Valentina Cruz Herrera',
    country: 'Spain',
    city: 'Barcelona',
    category: 'Drug Importation',
    date: '11 Aug 2026',
    status: 'charged' as const,
    summary: 'Charged in connection with alleged importation of controlled cannabis resin via international postal services. Case referred to national prosecution authorities.',
    noticeStatus: 'published' as const,
  },
  {
    id: 'notice-001421',
    ref: 'DA-2026-001421',
    name: 'Tobias Müller',
    country: 'Germany',
    city: 'Hamburg',
    category: 'Suspected Distribution',
    date: '08 Aug 2026',
    status: 'investigation' as const,
    summary: 'Under investigation for alleged supply and distribution of controlled substances. Online transaction records and delivery evidence under review.',
    noticeStatus: 'published' as const,
  },
  {
    id: 'notice-001398',
    ref: 'DA-2026-001398',
    name: 'Fatima Al-Hassan',
    country: 'Netherlands',
    city: 'Amsterdam',
    category: 'Online Controlled Substance Purchase',
    date: '04 Aug 2026',
    status: 'review' as const,
    summary: 'Subject of a public awareness notice in connection with alleged purchase of controlled substances through an online darknet marketplace.',
    noticeStatus: 'published' as const,
  },
  {
    id: 'notice-001362',
    ref: 'DA-2026-001362',
    name: 'Dmitri Volkov',
    country: 'Czech Republic',
    city: 'Prague',
    category: 'Cannabis Purchase',
    date: '29 Jul 2026',
    status: 'notice' as const,
    summary: 'Public notice issued regarding alleged purchase of cannabis products via social media channels. Multiple purchases recorded over a four-week period.',
    noticeStatus: 'published' as const,
  },
  {
    id: 'notice-001334',
    ref: 'DA-2026-001334',
    name: 'Isabelle Fontaine',
    country: 'France',
    city: 'Lyon',
    category: 'High-THC Product Purchase',
    date: '22 Jul 2026',
    status: 'charged' as const,
    summary: 'Charged with alleged possession and importation of high-THC cannabis concentrates. Case currently before the competent judicial authority.',
    noticeStatus: 'published' as const,
  },
  {
    id: 'notice-001312',
    ref: 'DA-2026-001312',
    name: 'Sven Eriksson',
    country: 'Sweden',
    city: 'Stockholm',
    category: 'Drug Trafficking',
    date: '18 Jul 2026',
    status: 'wanted' as const,
    summary: 'Subject of an active public notice in connection with alleged trafficking of controlled substances across multiple European jurisdictions.',
    noticeStatus: 'published' as const,
  },
];

const statusOptions = ['All Statuses', 'Under Review', 'Under Investigation', 'Notice Issued', 'Charged', 'Wanted', 'Convicted'];
const countryOptions = ['All Countries', 'Belgium', 'Poland', 'Spain', 'Germany', 'Netherlands', 'Czech Republic', 'France', 'Sweden'];
const categoryOptions = ['All Categories', 'Cannabis Purchase', 'High-THC Product Purchase', 'Drug Importation', 'Suspected Distribution', 'Online Controlled Substance Purchase', 'Drug Trafficking'];

export default function NoticesContent() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('All Countries');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Statuses');

  const filtered = mockNotices.filter((n) => {
    const matchSearch = !search || n.name.toLowerCase().includes(search.toLowerCase()) || n.ref.toLowerCase().includes(search.toLowerCase());
    const matchCountry = country === 'All Countries' || n.country === country;
    const matchCategory = category === 'All Categories' || n.category === category;
    return matchSearch && matchCountry && matchCategory;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="bg-primary border-b border-primary/20 py-10">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-3">
            <Icon name="HomeIcon" size={14} />
            <span>/</span>
            <span className="text-primary-foreground">Public Notices</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">Official Public Notices</h1>
          <p className="text-primary-foreground/70 text-sm max-w-xl">
            Published case notices from PreventionPortal. Each notice has been reviewed and approved for publication by the agency administrator.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-start gap-2">
            <Icon name="ExclamationTriangleIcon" size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-xs">
              Publication of a notice does not establish guilt. All persons are presumed innocent unless formally convicted by a competent court. Legal consequences depend on the facts of each case and the applicable jurisdiction.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-1">
              <label htmlFor="notices-search" className="sr-only">Search notices</label>
              <div className="relative">
                <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="notices-search"
                  type="text"
                  placeholder="Search name or reference..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-border rounded bg-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label htmlFor="filter-country" className="sr-only">Filter by country</label>
              <select
                id="filter-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded bg-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {countryOptions.map((c) => (
                  <option key={`country-${c}`} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-category" className="sr-only">Filter by category</label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded bg-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categoryOptions.map((c) => (
                  <option key={`cat-${c}`} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-status" className="sr-only">Filter by status</label>
              <select
                id="filter-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded bg-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {statusOptions.map((s) => (
                  <option key={`status-${s}`} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground text-sm">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> published notices
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="ClockIcon" size={14} />
            Last updated: 17 Aug 2026, 18:27
          </div>
        </div>

        {/* Notice Cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5 mb-8">
            {filtered.map((notice) => (
              <div
                key={notice.id}
                className="bg-card border border-border rounded-lg overflow-hidden notice-card-hover transition-all duration-200"
              >
                {/* Card Header */}
                <div className="bg-primary/5 border-b border-border px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="DocumentTextIcon" size={14} className="text-muted-foreground" />
                    <span className="case-ref text-primary font-semibold">{notice.ref}</span>
                  </div>
                  <StatusBadge variant={notice.status} size="sm" />
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold text-primary text-base">{notice.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Icon name="MapPinIcon" size={12} />
                          {notice.city}, {notice.country}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon name="UserIcon" size={18} className="text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{notice.category}</span>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {notice.summary}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon name="CalendarIcon" size={13} />
                      Published {notice.date}
                    </div>
                    <Link
                      href={`/public-notices/${notice.ref}`}
                      className="inline-flex items-center gap-1.5 text-primary hover:text-secondary font-medium text-sm transition-colors"
                    >
                      View Notice
                      <Icon name="ArrowRightIcon" size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-16 text-center">
            <Icon name="DocumentMagnifyingGlassIcon" size={40} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-primary font-semibold text-lg mb-2">No notices match your search</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Page 1 of 3 — 24 total notices</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-2 border border-border rounded text-sm text-muted-foreground hover:bg-muted transition-colors disabled:opacity-40" disabled>
              <Icon name="ChevronLeftIcon" size={16} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={`page-${p}`}
                className={`w-9 h-9 rounded text-sm font-medium transition-colors ${p === 1 ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted'}`}
              >
                {p}
              </button>
            ))}
            <button className="px-3 py-2 border border-border rounded text-sm text-muted-foreground hover:bg-muted transition-colors">
              <Icon name="ChevronRightIcon" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}