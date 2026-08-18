import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import DashboardKPIs from './components/DashboardKPIs';
import DashboardCharts from './components/DashboardCharts';
import RecentCasesTable from './components/RecentCasesTable';
import ActivityFeed from './components/ActivityFeed';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="admin-text-muted text-xs uppercase tracking-wider mb-1">Administrator Console</p>
            <h1 className="text-xl font-bold admin-text">Operations Dashboard</h1>
            <p className="admin-text-muted text-xs mt-0.5">17 August 2026 — 18:27 UTC</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/case-management"
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium px-4 py-2 rounded transition-all duration-150 active:scale-95"
            >
              <span>+ New Case</span>
            </a>
          </div>
        </div>

        <DashboardKPIs />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">
          <div className="xl:col-span-2">
            <DashboardCharts />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>

        <div className="mt-5">
          <RecentCasesTable />
        </div>
      </div>
    </AdminLayout>
  );
}