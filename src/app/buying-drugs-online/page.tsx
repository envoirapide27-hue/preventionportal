import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function BuyingDrugsOnlinePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Public Awareness</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Buying Drugs Online: What You Need to Know</h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              Online platforms do not provide legal protection. Purchasing controlled substances through websites, social networks, or encrypted messaging services may expose individuals to serious legal consequences.
            </p>
          </div>
        </section>

        {/* How Online Purchases Work */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-4">How Online Drug Transactions Create Legal Exposure</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every step of an online drug transaction may generate records that can be used in investigations. The digital nature of these transactions does not make them anonymous or untraceable.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: 'GlobeAltIcon', title: 'Online Browsing', desc: 'IP addresses, browser fingerprints, and browsing history may be logged by service providers.' },
                { icon: 'CreditCardIcon', title: 'Payment Records', desc: 'Bank transfers, card payments, and cryptocurrency transactions create permanent financial records.' },
                { icon: 'EnvelopeIcon', title: 'Communications', desc: 'Messages on social platforms and encrypted apps may be subject to lawful interception.' },
                { icon: 'TruckIcon', title: 'Delivery Records', desc: 'Courier and postal services maintain records of shipments, including sender and recipient details.' },
                { icon: 'MapPinIcon', title: 'Location Data', desc: 'Mobile devices and delivery addresses can establish physical location at time of receipt.' },
                { icon: 'DocumentTextIcon', title: 'Order Records', desc: 'Platform order histories, confirmation emails, and receipts constitute documentary evidence.' },
              ].map((item) => (
                <div key={item.title} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Platforms */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Common Online Purchase Channels</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Social Media Platforms', risk: 'High', desc: 'Controlled substances are frequently advertised through social media accounts using coded language. Transactions conducted through social platforms leave extensive digital records.' },
                { title: 'Encrypted Messaging Apps', risk: 'High', desc: 'While messages may be encrypted in transit, device seizure, metadata, and lawful interception may still expose communications.' },
                { title: 'Darknet Marketplaces', risk: 'Very High', desc: 'Despite claims of anonymity, law enforcement agencies have successfully identified and prosecuted buyers and sellers on darknet platforms.' },
                { title: 'Websites & Online Shops', risk: 'High', desc: 'Websites selling controlled substances often collect payment and delivery information that can be obtained through legal processes.' },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-primary">{item.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.risk === 'Very High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                      Risk: {item.risk}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Warning */}
        <section className="py-10 px-4 bg-accent/5 border-y border-accent/20">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <Icon name="ExclamationTriangleIcon" size={24} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">Important Legal Notice</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The purchase, possession, importation, and distribution of controlled substances is subject to criminal law in most jurisdictions. Online transactions do not provide legal protection. Individuals who purchase controlled substances online may face criminal investigation, prosecution, and significant penalties including imprisonment and fines. Actual consequences depend on applicable national and local legislation, the substance involved, quantity, and individual circumstances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-primary text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Verify an Official Notice</h2>
            <p className="text-white/80 mb-6">If you have received an official notice, you can verify its authenticity using our secure verification system.</p>
            <Link href="/verify" className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-2.5 rounded transition-colors inline-flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={16} />
              Verify a Notice
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
