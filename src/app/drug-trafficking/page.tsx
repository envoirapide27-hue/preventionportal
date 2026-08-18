import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function DrugTraffickingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Legal Information</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Drug Trafficking</h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              Understanding the legal distinctions between possession, personal use, and trafficking is critical. This page explains how different activities are classified and the potential consequences.
            </p>
          </div>
        </section>

        {/* Disclaimer Banner */}
        <section className="py-5 px-4 bg-accent/10 border-b border-accent/20">
          <div className="max-w-5xl mx-auto flex gap-3">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <p className="text-gray-800 text-sm font-medium leading-relaxed">
              Actual offences and penalties depend on applicable national and local legislation, quantity, circumstances and judicial decisions. This information is provided for educational purposes only.
            </p>
          </div>
        </section>

        {/* Activity Spectrum */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-4">Understanding the Legal Spectrum</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Drug-related offences exist on a spectrum from personal possession to organized trafficking. The legal classification of an activity significantly affects the potential penalties.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Personal Possession', severity: 'Variable', color: 'bg-blue-100 text-blue-800', desc: 'Holding a controlled substance for personal use. Penalties vary widely — from decriminalization in some jurisdictions to significant criminal penalties in others. Quantity is a key factor.' },
                { label: 'Personal Purchase', severity: 'Variable', color: 'bg-blue-100 text-blue-800', desc: 'Acquiring a controlled substance for personal use. Online purchases create additional digital evidence trails. May be treated as possession or as a more serious offence depending on quantity and circumstances.' },
                { label: 'Importation', severity: 'Serious', color: 'bg-orange-100 text-orange-800', desc: 'Bringing controlled substances across national borders. Typically treated as a serious offence regardless of quantity. International delivery of controlled substances is generally illegal.' },
                { label: 'Supply', severity: 'Serious', color: 'bg-orange-100 text-orange-800', desc: 'Providing controlled substances to others, even without commercial intent. Sharing or gifting controlled substances may be classified as supply in many jurisdictions.' },
                { label: 'Distribution', severity: 'Very Serious', color: 'bg-red-100 text-red-800', desc: 'Commercial or systematic supply of controlled substances. Carries significantly heavier penalties than personal possession. Evidence of distribution includes large quantities, packaging materials, and financial records.' },
                { label: 'Resale', severity: 'Very Serious', color: 'bg-red-100 text-red-800', desc: 'Selling controlled substances for profit. Treated as a serious criminal offence in virtually all jurisdictions. Financial records of sales may be used as evidence.' },
                { label: 'Organized Trafficking', severity: 'Extremely Serious', color: 'bg-red-200 text-red-900', desc: 'Systematic, large-scale supply and distribution of controlled substances. Carries the most severe penalties in most legal systems. May involve organized crime legislation with additional consequences.' },
              ]?.map((item) => (
                <div key={item?.label} className="flex gap-4 border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex-shrink-0 w-36">
                    <h3 className="font-semibold text-primary text-sm mb-1">{item?.label}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item?.color}`}>{item?.severity}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item?.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aggravating Factors */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Factors That May Increase Severity</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: 'Quantity', desc: 'Larger quantities are typically associated with supply rather than personal use, triggering more serious charges.' },
                { title: 'Substance Type', desc: 'Different substances are classified at different levels of severity. High-THC products may be treated differently from standard cannabis.' },
                { title: 'Prior Convictions', desc: 'Previous drug-related convictions typically result in more severe penalties for subsequent offences.' },
                { title: 'Location', desc: 'Offences committed near schools, youth facilities, or other protected locations may carry enhanced penalties.' },
                { title: 'Use of Technology', desc: 'Using online platforms, encrypted communications, or cryptocurrency for drug transactions may be treated as an aggravating factor.' },
                { title: 'International Element', desc: 'Cross-border transactions typically trigger more serious offences and may involve multiple jurisdictions.' },
              ]?.map((item) => (
                <div key={item?.title} className="bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-primary text-sm mb-2">{item?.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item?.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-primary text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">View Laws &amp; Penalties</h2>
            <p className="text-white/80 mb-6">Access jurisdiction-specific legal information in our Laws &amp; Penalties database.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/laws" className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-2.5 rounded transition-colors">
                Laws &amp; Penalties
              </Link>
              <Link href="/verify" className="border border-white/30 hover:border-white/60 text-white font-medium px-6 py-2.5 rounded transition-colors">
                Verify a Notice
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
