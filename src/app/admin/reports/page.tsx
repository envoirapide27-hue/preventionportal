import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import Icon from '@/components/ui/AppIcon';

const kpiData = [
  { label: 'Total Cases', value: '2,847', change: '+12%', icon: 'FolderOpenIcon', color: 'text-blue-400' },
  { label: 'Active Cases', value: '312', change: '+5%', icon: 'ClockIcon', color: 'text-green-400' },
  { label: 'Cases Closed', value: '2,401', change: '+8%', icon: 'CheckCircleIcon', color: 'text-gray-400' },
  { label: 'Notices Published', value: '187', change: '+3%', icon: 'MegaphoneIcon', color: 'text-purple-400' },
  { label: 'Charges Issued', value: '94', change: '+2%', icon: 'BanknotesIcon', color: 'text-yellow-400' },
  { label: 'Charges Paid', value: '61', change: '+15%', icon: 'CheckBadgeIcon', color: 'text-green-400' },
  { label: 'Pending Charges', value: '33', change: '-4%', icon: 'ExclamationCircleIcon', color: 'text-orange-400' },
  { label: 'Overdue Charges', value: '8', change: '+1%', icon: 'ExclamationTriangleIcon', color: 'text-red-400' },
];

const casesByCountry = [
  { country: 'United Kingdom', cases: 847, pct: 30 },
  { country: 'Germany', cases: 612, pct: 22 },
  { country: 'Netherlands', cases: 498, pct: 17 },
  { country: 'France', cases: 389, pct: 14 },
  { country: 'Belgium', cases: 234, pct: 8 },
  { country: 'Other', cases: 267, pct: 9 },
];

const casesBySubstance = [
  { substance: 'High-THC Cannabis', cases: 1102, pct: 39 },
  { substance: 'Cannabis Flower', cases: 784, pct: 28 },
  { substance: 'THC Vapes', cases: 456, pct: 16 },
  { substance: 'Concentrates', cases: 312, pct: 11 },
  { substance: 'Other', cases: 193, pct: 6 },
];

const chargesByStatus = [
  { status: 'Paid', count: 61, color: 'bg-green-500' },
  { status: 'Pending', count: 33, color: 'bg-yellow-500' },
  { status: 'Overdue', count: 8, color: 'bg-red-500' },
  { status: 'Cancelled', count: 12, color: 'bg-gray-500' },
];

export default function ReportsPage() {
  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#7A9BB5] text-xs mb-1">
              <span>Admin</span><span>/</span><span className="text-[#E2EAF2]">Reports</span>
            </div>
            <h1 className="text-xl font-bold admin-text">Reports</h1>
            <p className="admin-text-muted text-xs mt-0.5">Platform-wide statistics and analytics</p>
          </div>
          <div className="flex gap-2">
            <select className="admin-sidebar-bg border admin-border text-[#E2EAF2] text-sm px-3 py-2 rounded-lg focus:outline-none">
              <option>All Time</option>
              <option>This Year</option>
              <option>This Month</option>
              <option>Last 90 Days</option>
            </select>
            <button className="flex items-center gap-2 border admin-border text-[#7A9BB5] hover:text-[#E2EAF2] text-sm px-4 py-2 rounded-lg transition-colors">
              <Icon name="ArrowDownTrayIcon" size={14} />
              Export
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiData.map((kpi) => (
            <div key={kpi.label} className="admin-sidebar-bg border admin-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon name={kpi.icon as Parameters<typeof Icon>[0]['name']} size={18} className={kpi.color} />
                <span className={`text-xs font-medium ${kpi.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{kpi.change}</span>
              </div>
              <p className="text-2xl font-bold admin-text">{kpi.value}</p>
              <p className="admin-text-muted text-xs mt-0.5">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Cases by Country */}
          <div className="admin-sidebar-bg border admin-border rounded-xl p-5">
            <h2 className="admin-text font-semibold mb-4">Cases by Country</h2>
            <div className="space-y-3">
              {casesByCountry.map((item) => (
                <div key={item.country}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="admin-text text-sm">{item.country}</span>
                    <span className="admin-text-muted text-xs">{item.cases.toLocaleString()} ({item.pct}%)</span>
                  </div>
                  <div className="h-2 bg-secondary/40 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cases by Substance */}
          <div className="admin-sidebar-bg border admin-border rounded-xl p-5">
            <h2 className="admin-text font-semibold mb-4">Cases by Substance</h2>
            <div className="space-y-3">
              {casesBySubstance.map((item) => (
                <div key={item.substance}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="admin-text text-sm">{item.substance}</span>
                    <span className="admin-text-muted text-xs">{item.cases.toLocaleString()} ({item.pct}%)</span>
                  </div>
                  <div className="h-2 bg-secondary/40 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Charges by Status */}
          <div className="admin-sidebar-bg border admin-border rounded-xl p-5">
            <h2 className="admin-text font-semibold mb-4">Charges by Status</h2>
            <div className="space-y-3">
              {chargesByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="admin-text text-sm">{item.status}</span>
                  </div>
                  <span className="admin-text font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase Stats */}
          <div className="admin-sidebar-bg border admin-border rounded-xl p-5">
            <h2 className="admin-text font-semibold mb-4">Purchase Statistics</h2>
            <div className="space-y-4">
              {[
                { label: 'Total Recorded Value', value: '€2.4M' },
                { label: 'Average Transaction', value: '€843' },
                { label: 'Highest Transaction', value: '€12,500' },
                { label: 'Most Common Payment', value: 'Bank Transfer' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b admin-border pb-3 last:border-0 last:pb-0">
                  <span className="admin-text-muted text-xs">{item.label}</span>
                  <span className="admin-text font-semibold text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notice Stats */}
          <div className="admin-sidebar-bg border admin-border rounded-xl p-5">
            <h2 className="admin-text font-semibold mb-4">Notice Statistics</h2>
            <div className="space-y-4">
              {[
                { label: 'Published Notices', value: '187' },
                { label: 'Unpublished / Draft', value: '43' },
                { label: 'Archived Notices', value: '89' },
                { label: 'Notices This Month', value: '12' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b admin-border pb-3 last:border-0 last:pb-0">
                  <span className="admin-text-muted text-xs">{item.label}</span>
                  <span className="admin-text font-semibold text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Common Products */}
        <div className="admin-sidebar-bg border admin-border rounded-xl p-5">
          <h2 className="admin-text font-semibold mb-4">Most Common Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b admin-border">
                  <th className="text-left px-3 py-2 admin-text-muted font-medium text-xs uppercase tracking-wider">Product</th>
                  <th className="text-left px-3 py-2 admin-text-muted font-medium text-xs uppercase tracking-wider">Category</th>
                  <th className="text-left px-3 py-2 admin-text-muted font-medium text-xs uppercase tracking-wider">Cases</th>
                  <th className="text-left px-3 py-2 admin-text-muted font-medium text-xs uppercase tracking-wider">Avg. Value</th>
                  <th className="text-left px-3 py-2 admin-text-muted font-medium text-xs uppercase tracking-wider">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { product: 'High-THC Cannabis Flower', category: 'Cannabis', cases: 892, avg: '€780', total: '€695,760' },
                  { product: 'THC Vape Cartridges', category: 'THC Vapes', cases: 456, avg: '€340', total: '€155,040' },
                  { product: 'Cannabis Resin (Hash)', category: 'Hash/Resin', cases: 312, avg: '€520', total: '€162,240' },
                  { product: 'Cannabis Concentrate', category: 'Concentrates', cases: 198, avg: '€1,200', total: '€237,600' },
                  { product: 'Cannabis Edibles', category: 'Edibles', cases: 145, avg: '€290', total: '€42,050' },
                ].map((row) => (
                  <tr key={row.product} className="border-b admin-border hover:bg-secondary/20 transition-colors">
                    <td className="px-3 py-3 admin-text font-medium">{row.product}</td>
                    <td className="px-3 py-3 admin-text-muted text-xs">{row.category}</td>
                    <td className="px-3 py-3 admin-text">{row.cases}</td>
                    <td className="px-3 py-3 admin-text-muted">{row.avg}</td>
                    <td className="px-3 py-3 admin-text font-semibold">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
