import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function CannabisPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Educational Information</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Cannabis &amp; High-THC Products</h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              Cannabis laws vary significantly by jurisdiction. This page provides factual information about cannabis products, THC concentrations, and the legal landscape across different regions.
            </p>
          </div>
        </section>

        {/* Jurisdiction Notice */}
        <section className="py-6 px-4 bg-amber-50 border-b border-amber-200">
          <div className="max-w-5xl mx-auto flex gap-3">
            <Icon name="InformationCircleIcon" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Important:</strong> Cannabis laws are not identical everywhere. Legal status, permitted quantities, and applicable penalties differ significantly between countries, states, and regions. Always verify the specific laws applicable in your jurisdiction.
            </p>
          </div>
        </section>

        {/* Product Types */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Cannabis Product Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: 'Cannabis Flower', desc: 'The dried plant material, typically smoked or vaporized. THC concentration varies widely by strain and cultivation method.' },
                { title: 'Hash & Resin', desc: 'Concentrated forms of cannabis resin. Generally contains higher THC concentrations than flower.' },
                { title: 'THC Vapes & Cartridges', desc: 'Vaporizer cartridges containing cannabis oil. Often contain very high THC concentrations and may include additional substances.' },
                { title: 'Concentrates', desc: 'Highly concentrated cannabis extracts including wax, shatter, and budder. Can contain extremely high THC levels.' },
                { title: 'Edibles', desc: 'Food and beverage products infused with cannabis. Effects are delayed and can be unpredictable, increasing overdose risk.' },
                { title: 'Cannabis Oils & Tinctures', desc: 'Liquid cannabis extracts taken orally. THC and CBD concentrations vary significantly between products.' },
                { title: 'Synthetic Cannabinoids', desc: 'Chemically synthesized compounds designed to mimic THC effects. Often significantly more potent and dangerous than natural cannabis.' },
                { title: 'CBD Products', desc: 'Products derived from hemp with low or no THC. Legal status varies — some jurisdictions regulate CBD products strictly.' },
                { title: 'High-THC Products', desc: 'Any product with THC concentration significantly above natural cannabis levels. Subject to stricter regulation in many jurisdictions.' },
              ]?.map((item) => (
                <div key={item?.title} className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-primary text-sm mb-2">{item?.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item?.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Health Considerations */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Health Considerations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Short-Term Effects</h3>
                <ul className="space-y-2">
                  {['Impaired cognitive function and memory', 'Altered perception and coordination', 'Increased heart rate', 'Anxiety and paranoia, particularly with high-THC products', 'Impaired driving ability']?.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Long-Term Concerns</h3>
                <ul className="space-y-2">
                  {['Cannabis use disorder and dependency', 'Potential impact on developing brains in young people', 'Respiratory issues from smoking', 'Mental health impacts including increased psychosis risk', 'Dependency concerns with regular high-THC use']?.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Landscape */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-4">Legal Landscape</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Cannabis is regulated differently across jurisdictions. The following categories represent common legal frameworks — actual laws in your jurisdiction may differ significantly.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Possession Laws', desc: 'Many jurisdictions criminalize possession of cannabis above certain thresholds. Even where personal use is decriminalized, possession of large quantities may still be treated as supply.' },
                { title: 'Importation Laws', desc: 'Importing cannabis across national borders is a serious offence in most jurisdictions, regardless of the legal status in the country of origin or destination.' },
                { title: 'Distribution Laws', desc: 'Supply, sale, or distribution of cannabis is a serious criminal offence in most jurisdictions, carrying significantly heavier penalties than possession.' },
                { title: 'High-THC Regulations', desc: 'Products with high THC concentrations may be subject to stricter regulation even in jurisdictions where standard cannabis is decriminalized or legal.' },
              ]?.map((item) => (
                <div key={item?.title} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="font-semibold text-primary mb-2">{item?.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item?.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Disclaimer:</strong> Actual offences and penalties depend on applicable national and local legislation, quantity, circumstances, and judicial decisions. This information is provided for educational purposes only and does not constitute legal advice.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-primary text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Learn About Applicable Laws</h2>
            <p className="text-white/80 mb-6">Our Laws &amp; Penalties section provides jurisdiction-specific legal information.</p>
            <Link href="/laws" className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-2.5 rounded transition-colors">
              View Laws &amp; Penalties
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
