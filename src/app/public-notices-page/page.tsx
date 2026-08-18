import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import NoticesContent from './components/NoticesContent';

export default function PublicNoticesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <NoticesContent />
      </main>
      <PublicFooter />
    </div>
  );
}