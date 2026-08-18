import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Support & Information</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Resources</h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              A curated collection of support organizations, educational materials, and legal information resources to help individuals, families, and communities.
            </p>
          </div>
        </section>

        {/* Prevention Resources */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Substance Abuse Prevention</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { org: 'UNODC — UN Office on Drugs and Crime', desc: 'Global authority on drug policy, providing research, statistics, and prevention resources.', url: 'unodc.org', type: 'International' },
                { org: 'WHO — World Health Organization', desc: 'International health authority with extensive resources on substance use disorders and treatment.', url: 'who.int', type: 'International' },
                { org: 'EMCDDA — European Monitoring Centre', desc: 'European agency providing drug-related information, research, and best practices.', url: 'emcdda.europa.eu', type: 'European' },
                { org: 'NIDA — National Institute on Drug Abuse', desc: 'US federal research institute providing science-based information on drug use and addiction.', url: 'nida.nih.gov', type: 'United States' },
              ].map((item) => (
                <div key={item.org} className="border border-gray-200 rounded-lg p-5 flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="GlobeAltIcon" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-primary text-sm">{item.org}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap">{item.type}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.desc}</p>
                    <span className="text-xs text-primary/70 font-mono">{item.url}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatment & Support */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Treatment &amp; Support</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: 'PhoneIcon', title: 'Helplines', desc: 'Most countries operate national substance abuse helplines providing confidential support 24/7. Contact your national health authority for local numbers.' },
                { icon: 'HeartIcon', title: 'Rehabilitation', desc: 'Residential and outpatient rehabilitation programs are available in most countries. Your GP or local health authority can provide referrals.' },
                { icon: 'UserGroupIcon', title: 'Support Groups', desc: 'Peer support groups such as Narcotics Anonymous operate internationally and provide community-based recovery support.' },
                { icon: 'HomeIcon', title: 'Family Support', desc: 'Organizations such as Al-Anon and Nar-Anon provide support for families and friends of individuals with substance use disorders.' },
                { icon: 'AcademicCapIcon', title: 'Youth Programs', desc: 'Specialized prevention and support programs exist for young people. Schools and youth organizations can provide local referrals.' },
                { icon: 'BuildingOfficeIcon', title: 'Workplace Programs', desc: 'Many employers offer Employee Assistance Programs (EAPs) providing confidential counseling and referral services.' },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-green-700" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Resources */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Legal Information Resources</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: 'Legal Aid Services', desc: 'If you have received an official notice or are subject to investigation, you may be entitled to legal aid. Contact your national legal aid authority.' },
                { title: 'Citizens Advice', desc: 'Many countries operate citizens advice services providing free, confidential guidance on legal rights and procedures.' },
                { title: 'Bar Associations', desc: 'National and regional bar associations can provide referrals to qualified criminal defense lawyers in your jurisdiction.' },
                { title: 'Court Information Services', desc: 'Court services in most jurisdictions provide public information about legal processes and procedures.' },
              ].map((item) => (
                <div key={item.title} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex gap-3">
                    <Icon name="ScaleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-primary text-sm mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Materials */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Educational Materials</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: 'Drug Abuse Prevention', href: '/drug-abuse-prevention', desc: 'Comprehensive information on prevention strategies and risk factors.' },
                { title: 'Buying Drugs Online', href: '/buying-drugs-online', desc: 'How online drug transactions create legal and health risks.' },
                { title: 'Cannabis & High-THC', href: '/cannabis-thc', desc: 'Information on cannabis products, health effects, and legal status.' },
                { title: 'Drug Trafficking', href: '/drug-trafficking', desc: 'Understanding the legal spectrum from possession to trafficking.' },
                { title: 'Laws & Penalties', href: '/laws', desc: 'Jurisdiction-specific legal reference information.' },
                { title: 'Public Notices', href: '/public-notices-page', desc: 'View official published case notices.' },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-primary/30 hover:shadow-sm transition-all group">
                  <h3 className="font-semibold text-primary text-sm mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-primary text-xs font-medium">
                    Learn more <Icon name="ArrowRightIcon" size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
