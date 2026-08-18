import React from 'react';

const stats = [
  {
    id: 'stat-cases',
    value: '2,847',
    label: 'Cases Recorded',
    sub: 'Since agency establishment',
    color: 'border-primary',
  },
  {
    id: 'stat-notices',
    value: '891',
    label: 'Public Notices Issued',
    sub: 'Across 47 jurisdictions',
    color: 'border-accent',
  },
  {
    id: 'stat-countries',
    value: '47',
    label: 'Countries Covered',
    sub: 'International case reach',
    color: 'border-secondary',
  },
];

export default function StatsSection() {
  return (
    <section className="bg-primary py-14">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats?.map((stat) => (
            <div key={stat?.id} className={`border-l-4 ${stat?.color} pl-6`}>
              <p className="text-4xl font-bold text-white font-mono-data mb-1">{stat?.value}</p>
              <p className="text-white font-semibold text-base mb-1">{stat?.label}</p>
              <p className="text-white/70 text-sm">{stat?.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}