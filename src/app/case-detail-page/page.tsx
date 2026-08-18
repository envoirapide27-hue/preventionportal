import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import CaseDetailHeader from './components/CaseDetailHeader';
import CaseDetailTabs from './components/CaseDetailTabs';

export default function CaseDetailPage() {
  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        <CaseDetailHeader />
        <CaseDetailTabs />
      </div>
    </AdminLayout>
  );
}