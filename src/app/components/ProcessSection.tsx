import React from 'react';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

const steps = [
{
  id: 'step-purchase',
  number: '01',
  icon: 'ShoppingCartIcon',
  title: 'Online Purchase',
  description: 'Transaction records are created on the platform, payment processor, and seller systems.'
},
{
  id: 'step-payment',
  number: '02',
  icon: 'CreditCardIcon',
  title: 'Payment',
  description: 'Payment creates financial records with banks, payment processors, or blockchain networks.'
},
{
  id: 'step-processing',
  number: '03',
  icon: 'ClipboardDocumentListIcon',
  title: 'Order Processing',
  description: 'Order details, addresses, and communications are logged by the vendor.'
},
{
  id: 'step-shipment',
  number: '04',
  icon: 'ArchiveBoxIcon',
  title: 'Shipment',
  description: 'Courier and postal records identify sender, recipient, and parcel contents.'
},
{
  id: 'step-delivery',
  number: '05',
  icon: 'HomeIcon',
  title: 'Delivery',
  description: 'Delivery confirmation creates a direct link between the individual and the controlled substance.'
},
{
  id: 'step-investigation',
  number: '06',
  icon: 'MagnifyingGlassCircleIcon',
  title: 'Possible Investigation',
  description: 'Digital, payment, and delivery records can be obtained and used as evidence by authorities.'
}];


export default function ProcessSection() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">How Legal Exposure Develops</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            How Online Purchases Can Create Legal Exposure
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            Online transactions create digital trails. Payment records, delivery addresses, and order histories can be identified and used in investigations. The following illustrates how a single online purchase can generate multiple evidence points.
          </p>
        </div>

        {/* Visual Banner */}
        <div className="relative rounded-xl overflow-hidden mb-10 shadow-md">
          <Image
            src="https://img.rocket.new/generatedImages/rocket_gen_img_12bb8e4c6-1786997064739.png"
            alt="Digital surveillance and online transaction monitoring showing how digital trails are created during online purchases"
            width={1200}
            height={320}
            className="w-full h-44 lg:h-56 object-cover object-center" />
          
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/65 to-primary/35 flex items-center px-8 lg:px-12">
            <div className="max-w-lg">
              <p className="text-white font-bold text-lg lg:text-2xl leading-snug mb-1">Every Online Transaction Leaves a Trail</p>
              <p className="text-white/90 text-sm lg:text-base">Digital, payment, and delivery records can be used as evidence by authorities.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step, index) =>
          <div key={step.id} className="relative">
              <div className="bg-card border border-border rounded-lg p-5 h-full hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Icon name={step.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-primary-foreground" />
                  </div>
                  <span className="text-xs font-mono-data text-muted-foreground font-medium">{step.number}</span>
                </div>
                <h3 className="font-semibold text-primary text-sm mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex gap-3">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Important:</strong> Online transactions may create digital, payment, and delivery records that can be identified and used as evidence. Believing a transaction is anonymous does not guarantee legal protection.
            </p>
          </div>
        </div>
      </div>
    </section>);

}