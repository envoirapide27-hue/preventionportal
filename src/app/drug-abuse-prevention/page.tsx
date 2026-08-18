import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function DrugAbusePreventionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Public Education</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Drug Abuse Prevention</h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              Understanding the risks of controlled substances is the first step toward prevention. This page provides factual, evidence-based information to help individuals make informed decisions.
            </p>
          </div>
        </section>

        {/* Understanding Risks */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Understanding the Risks</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Health Consequences</h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    'Dependency and addiction can develop rapidly with many controlled substances.',
                    'Unregulated online products may contain unknown adulterants or incorrect dosages.',
                    'Overdose risk is significantly elevated with substances purchased from unverified sources.',
                    'Mental health impacts including anxiety, psychosis, and depression are well-documented.',
                    'Long-term physical health consequences including organ damage.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Legal Consequences</h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    'Purchasing controlled substances online does not remove criminal liability.',
                    'Digital transaction records, delivery records, and payment trails may be used as evidence.',
                    'Importation across national borders may trigger additional serious offences.',
                    'Penalties vary significantly by jurisdiction, substance type, and quantity.',
                    'A criminal record can have lasting consequences on employment, travel, and housing.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Warning Signs of Substance Dependency</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: 'ExclamationTriangleIcon', title: 'Behavioural Changes', desc: 'Withdrawal from social activities, secrecy, and changes in routine.' },
                { icon: 'HeartIcon', title: 'Physical Symptoms', desc: 'Unexplained weight changes, altered sleep patterns, physical deterioration.' },
                { icon: 'BanknotesIcon', title: 'Financial Strain', desc: 'Unexplained financial difficulties or requests for money.' },
                { icon: 'UserGroupIcon', title: 'Relationship Issues', desc: 'Deteriorating relationships with family, friends, and colleagues.' },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prevention Strategies */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Prevention Strategies</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Education & Awareness', points: ['Learn about the legal status of substances in your jurisdiction', 'Understand the health risks before making any decisions', 'Stay informed about online drug market risks'] },
                { title: 'Community Support', points: ['Engage with local prevention programs', 'Support family members showing signs of dependency', 'Report suspicious online activity to appropriate authorities'] },
                { title: 'Seeking Help', points: ['Contact substance abuse helplines in your country', 'Speak with a healthcare professional confidentially', 'Explore treatment and rehabilitation options early'] },
              ].map((item) => (
                <div key={item.title} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-primary mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.points.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <Icon name="CheckCircleIcon" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-primary text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
            <p className="text-white/80 mb-6">Visit our Resources page for support organizations, helplines, and educational materials.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/resources" className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-2.5 rounded transition-colors">
                View Resources
              </Link>
              <Link href="/laws" className="border border-white/30 hover:border-white/60 text-white font-medium px-6 py-2.5 rounded transition-colors">
                Laws &amp; Penalties
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
