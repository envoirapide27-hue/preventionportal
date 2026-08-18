import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">About the Agency</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Our Mission: Prevention, Awareness &amp; Public Safety
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              We are an official public-awareness and case-management agency dedicated to educating the public about the serious health and legal consequences associated with the purchase, possession, and distribution of controlled substances.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Who We Are</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  PreventionPortal is an institutional agency established to address the growing challenge of online controlled-substance transactions. We operate at the intersection of public health, legal awareness, and digital safety.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our work focuses on informing individuals, families, and communities about the risks associated with purchasing controlled substances through online channels — including websites, social networks, encrypted messaging platforms, and darknet marketplaces.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We publish official case notices where legally authorized, maintain a public notice registry, and provide educational resources to support prevention efforts.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: 'ShieldCheckIcon', title: 'Public Safety', desc: 'Protecting communities through proactive awareness and official case documentation.' },
                  { icon: 'ScaleIcon', title: 'Legal Transparency', desc: 'Publishing lawfully authorized case notices with full respect for due process.' },
                  { icon: 'AcademicCapIcon', title: 'Education First', desc: 'Providing factual, jurisdiction-aware information about controlled substances and applicable law.' },
                  { icon: 'LockClosedIcon', title: 'Privacy Safeguards', desc: 'Strict separation between internal case data and publicly disclosed information.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary text-sm mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mandate */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">Our Mandate</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { num: '01', title: 'Prevention', desc: 'Reduce the incidence of controlled-substance purchases through targeted public education.' },
                { num: '02', title: 'Awareness', desc: 'Inform the public about the legal and health consequences of online drug transactions.' },
                { num: '03', title: 'Case Management', desc: 'Maintain accurate, secure records of cases within our jurisdiction.' },
                { num: '04', title: 'Notice Publication', desc: 'Publish official public notices where legally authorized and in the public interest.' },
                { num: '05', title: 'Legal Information', desc: 'Provide accessible, jurisdiction-specific information about applicable laws and penalties.' },
                { num: '06', title: 'Cooperation', desc: 'Support cooperation with relevant law-enforcement and public-health authorities.' },
              ].map((item) => (
                <div key={item.num} className="bg-white border border-gray-200 rounded-lg p-6">
                  <span className="text-3xl font-bold text-primary/20">{item.num}</span>
                  <h3 className="font-semibold text-primary mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-10 px-4 bg-primary/5 border-t border-primary/10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 text-sm leading-relaxed italic">
              Information published on this platform is provided for public awareness and official informational purposes. Legal classifications, procedures and penalties vary according to jurisdiction and individual circumstances. Publication of an allegation or investigation notice does not by itself establish guilt. Formal determinations of guilt are made through the applicable legal process.
            </p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
