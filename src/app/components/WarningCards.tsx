import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

const cards = [
{
  id: 'card-online',
  icon: 'GlobeAltIcon',
  title: 'Online Drug Purchases',
  color: 'text-accent',
  bg: 'bg-red-50 border-red-100',
  description:
  'Online transactions do not remove criminal liability. Purchasing controlled substances through websites, social media platforms, or messaging applications may still constitute an offence under applicable national legislation, regardless of where the seller is located.'
},
{
  id: 'card-cannabis',
  icon: 'ExclamationTriangleIcon',
  title: 'Controlled Cannabis Products',
  color: 'text-amber-600',
  bg: 'bg-amber-50 border-amber-100',
  description:
  'THC-containing products are regulated differently across jurisdictions. Products that appear legal in one country may be classified as controlled substances in another. High-THC concentrations may carry enhanced penalties in many legal systems.'
},
{
  id: 'card-importation',
  icon: 'TruckIcon',
  title: 'Importation & Delivery',
  color: 'text-blue-700',
  bg: 'bg-blue-50 border-blue-100',
  description:
  'Receiving controlled substances through national or international postal or courier services may create additional legal exposure, including importation and customs offences, which can carry substantially more serious consequences than simple possession.'
},
{
  id: 'card-trafficking',
  icon: 'ScaleIcon',
  title: 'Drug Distribution & Trafficking',
  color: 'text-primary',
  bg: 'bg-slate-50 border-slate-200',
  description:
  'Supply, resale, transport, or distribution of controlled substances may carry substantially more serious legal consequences than personal possession. Quantities above personal-use thresholds are frequently treated as supply or trafficking under most legal systems.'
}];


export default function WarningCards() {
  return (
    <section id="prevention" className="bg-white border-b border-border py-16 lg:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">Public Safety Information</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary">What You Need to Know</h2>
        </div>

        {/* Awareness Banner Image */}
        <div className="relative rounded-xl overflow-hidden mb-8 shadow-sm">
          <Image
            src="https://img.rocket.new/generatedImages/rocket_gen_img_15b91c8e8-1786997066640.png"
            alt="Medical and law enforcement professionals working together on drug prevention and public safety awareness"
            width={1200}
            height={280}
            className="w-full h-36 lg:h-48 object-cover object-top" />
          
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/30 flex items-center px-8 lg:px-12">
            <div>
              <p className="text-white font-bold text-base lg:text-xl mb-1">Know the Risks Before You Act</p>
              <p className="text-white/90 text-sm max-w-md">Legal consequences apply regardless of where or how a purchase is made online.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {cards.map((card) =>
          <div key={card.id} className={`border rounded-lg p-6 ${card.bg} transition-shadow duration-200 hover:shadow-md`}>
              <div className="mb-4">
                <Icon name={card.icon as Parameters<typeof Icon>[0]['name']} size={28} className={card.color} />
              </div>
              <h3 className="font-semibold text-primary text-base mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            href="#laws"
            className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium px-5 py-2.5 rounded transition-all duration-150 active:scale-95 text-sm">
            
            <Icon name="BookOpenIcon" size={16} />
            Learn About Applicable Laws
          </Link>
        </div>
      </div>
    </section>);

}