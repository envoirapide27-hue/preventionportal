'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const CasesAreaChart = dynamic(() => import('./CasesAreaChart'), { ssr: false });
const CasesStatusPie = dynamic(() => import('./CasesStatusPie'), { ssr: false });

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 admin-card-bg border admin-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="admin-text font-semibold text-sm">Cases by Month</h3>
            <p className="admin-text-muted text-xs">Aug 2025 – Aug 2026</p>
          </div>
        </div>
        <CasesAreaChart />
      </div>
      <div className="admin-card-bg border admin-border rounded-lg p-4">
        <div className="mb-4">
          <h3 className="admin-text font-semibold text-sm">Cases by Status</h3>
          <p className="admin-text-muted text-xs">Current distribution</p>
        </div>
        <CasesStatusPie />
      </div>
    </div>
  );
}