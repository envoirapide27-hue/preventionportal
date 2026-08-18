import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface LegalEntry {
  country: string;
  region?: string;
  offence: string;
  legalRef: string;
  description: string;
  maxPenalty: string;
  fine?: string;
  source: string;
  lastUpdated: string;
}

const legalEntries: LegalEntry[] = [
  {
    country: 'United Kingdom',
    offence: 'Possession of Class B Drug (Cannabis)',
    legalRef: 'Misuse of Drugs Act 1971, s.5(2)',
    description: 'Unlawful possession of a controlled drug classified as Class B, including cannabis.',
    maxPenalty: 'Up to 5 years imprisonment',
    fine: 'Unlimited fine',
    source: 'legislation.gov.uk',
    lastUpdated: '2024-01-15',
  },
  {
    country: 'United Kingdom',
    offence: 'Supply of Class B Drug',
    legalRef: 'Misuse of Drugs Act 1971, s.4(3)',
    description: 'Unlawful supply, offering to supply, or being concerned in the supply of a Class B controlled drug.',
    maxPenalty: 'Up to 14 years imprisonment',
    fine: 'Unlimited fine',
    source: 'legislation.gov.uk',
    lastUpdated: '2024-01-15',
  },
  {
    country: 'Germany',
    offence: 'Possession of Narcotics',
    legalRef: 'Betäubungsmittelgesetz (BtMG) §29',
    description: 'Unauthorized possession of narcotic substances. Small quantities for personal use may be treated differently.',
    maxPenalty: 'Up to 5 years imprisonment',
    fine: 'Fine may apply',
    source: 'gesetze-im-internet.de',
    lastUpdated: '2024-03-01',
  },
  {
    country: 'Netherlands',
    offence: 'Trafficking Hard Drugs',
    legalRef: 'Opium Act (Opiumwet) Art. 2',
    description: 'Production, trade, import, export, or possession of hard drugs (List I substances).',
    maxPenalty: 'Up to 12 years imprisonment',
    fine: 'Fifth category fine',
    source: 'wetten.overheid.nl',
    lastUpdated: '2024-02-10',
  },
  {
    country: 'United States',
    region: 'Federal',
    offence: 'Drug Trafficking (Schedule I)',
    legalRef: '21 U.S.C. § 841',
    description: 'Manufacturing, distributing, or dispensing a controlled substance. Penalties vary significantly by substance and quantity.',
    maxPenalty: 'Up to life imprisonment (large quantities)',
    fine: 'Up to $10 million (individual)',
    source: 'uscode.house.gov',
    lastUpdated: '2024-01-01',
  },
  {
    country: 'Australia',
    region: 'Federal',
    offence: 'Importing Controlled Drugs',
    legalRef: 'Criminal Code Act 1995, s.307.1',
    description: 'Importing or exporting a controlled drug in a commercial quantity.',
    maxPenalty: 'Life imprisonment',
    fine: 'Significant financial penalties',
    source: 'legislation.gov.au',
    lastUpdated: '2023-12-01',
  },
];

export default function LawsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Legal Reference</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Laws &amp; Penalties</h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              A reference guide to drug-related legislation across jurisdictions. This information is provided for educational purposes and is subject to change.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-5 px-4 bg-amber-50 border-b border-amber-200">
          <div className="max-w-5xl mx-auto flex gap-3">
            <Icon name="InformationCircleIcon" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Legal Disclaimer:</strong> This information is provided for public awareness purposes only. Laws change frequently. Always consult the official legislation of the relevant jurisdiction and seek qualified legal advice for your specific situation. This does not constitute legal advice.
            </p>
          </div>
        </section>

        {/* Legal Entries */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-primary">Legal Reference Database</h2>
              <span className="text-sm text-gray-500">{legalEntries.length} entries</span>
            </div>
            <div className="space-y-4">
              {legalEntries.map((entry, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-primary text-sm">{entry.country}{entry.region ? ` — ${entry.region}` : ''}</span>
                      <span className="text-xs text-gray-500 font-mono bg-gray-200 px-2 py-0.5 rounded">{entry.legalRef}</span>
                    </div>
                    <span className="text-xs text-gray-500">Updated: {entry.lastUpdated}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-primary mb-2">{entry.offence}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{entry.description}</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Maximum Penalty</p>
                        <p className="text-sm font-medium text-accent">{entry.maxPenalty}</p>
                      </div>
                      {entry.fine && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Fine</p>
                          <p className="text-sm font-medium text-gray-700">{entry.fine}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Source</p>
                        <p className="text-sm text-gray-700">{entry.source}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="py-10 px-4 bg-primary/5 border-t border-primary/10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 text-sm leading-relaxed italic">
              Legal consequences depend on the facts of each case and the applicable jurisdiction. The information above is provided for general awareness only. Consult a qualified legal professional for advice specific to your situation.
            </p>
            <Link href="/resources" className="inline-flex items-center gap-2 mt-4 text-primary font-medium text-sm hover:underline">
              <Icon name="ArrowRightIcon" size={14} />
              Find Legal Support Resources
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
