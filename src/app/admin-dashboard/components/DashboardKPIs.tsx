import React from 'react';
import Icon from '@/components/ui/AppIcon';

// Backend integration point: replace with API call to fetch dashboard KPI metrics
const kpis = [
  {
    id: 'kpi-total',
    label: 'Total Cases',
    value: '2,847',
    sub: '+34 this month',
    icon: 'FolderOpenIcon',
    trend: 'up',
    span: 'lg:col-span-2',
    highlight: true,
  },
  {
    id: 'kpi-active',
    label: 'Active Cases',
    value: '312',
    sub: '11.0% of total',
    icon: 'BoltIcon',
    trend: 'neutral',
    span: '',
    highlight: false,
  },
  {
    id: 'kpi-published',
    label: 'Published Notices',
    value: '891',
    sub: '+8 this week',
    icon: 'MegaphoneIcon',
    trend: 'up',
    span: '',
    highlight: false,
  },
  {
    id: 'kpi-charges',
    label: 'Charges Issued',
    value: '147',
    sub: '23 pending payment',
    icon: 'BanknotesIcon',
    trend: 'neutral',
    span: '',
    highlight: false,
  },
  {
    id: 'kpi-overdue',
    label: 'Overdue Charges',
    value: '18',
    sub: 'Requires attention',
    icon: 'ExclamationTriangleIcon',
    trend: 'alert',
    span: '',
    highlight: false,
  },
  {
    id: 'kpi-month',
    label: 'Cases This Month',
    value: '34',
    sub: 'Aug 2026 — ongoing',
    icon: 'CalendarIcon',
    trend: 'up',
    span: '',
    highlight: false,
  },
  {
    id: 'kpi-pending',
    label: 'Pending Publication',
    value: '11',
    sub: 'Awaiting review',
    icon: 'ClockIcon',
    trend: 'warning',
    span: '',
    highlight: false,
  },
];

const trendColors: Record<string, string> = {
  up: 'text-green-400',
  down: 'text-red-400',
  alert: 'text-red-400',
  warning: 'text-amber-400',
  neutral: 'text-[#7A9BB5]',
};

const trendBg: Record<string, string> = {
  up: '',
  down: '',
  alert: 'ring-1 ring-red-500/30 bg-red-900/20',
  warning: 'ring-1 ring-amber-500/30 bg-amber-900/20',
  neutral: '',
};

export default function DashboardKPIs() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className={`admin-card-bg border admin-border rounded-lg p-4 ${kpi.span} ${trendBg[kpi.trend]} ${kpi.highlight ? 'ring-1 ring-[#1E3A54]' : ''}`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="admin-text-muted text-xs font-medium uppercase tracking-wide">{kpi.label}</p>
            <Icon
              name={kpi.icon as Parameters<typeof Icon>[0]['name']}
              size={16}
              className={kpi.trend === 'alert' ? 'text-red-400' : kpi.trend === 'warning' ? 'text-amber-400' : 'text-[#7A9BB5]'}
            />
          </div>
          <p className={`font-bold font-mono-data mb-1 admin-text ${kpi.highlight ? 'text-3xl' : 'text-2xl'}`}>{kpi.value}</p>
          <p className={`text-xs ${trendColors[kpi.trend]}`}>{kpi.sub}</p>
        </div>
      ))}
    </div>
  );
}