import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import HeroSection from './components/HeroSection';
import WarningCards from './components/WarningCards';
import ProcessSection from './components/ProcessSection';
import StatsSection from './components/StatsSection';
import EducationalSection from './components/EducationalSection';
import VerifySection from './components/VerifySection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <HeroSection />
        <WarningCards />
        <ProcessSection />
        <StatsSection />
        <EducationalSection />
        <VerifySection />
      </main>
      <PublicFooter />
    </div>
  );
}