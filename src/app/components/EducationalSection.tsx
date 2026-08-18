import React from 'react';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

const topics = [
{
  id: 'topic-cannabis',
  icon: 'BeakerIcon',
  title: 'Cannabis & High-THC Products',
  image: "https://images.unsplash.com/photo-1590374355393-219c294ebf46",
  imageAlt: 'Close-up of cannabis plant leaves representing controlled cannabis and high-THC products regulation',
  items: [
  'Cannabis flowers, hash, and resin',
  'THC vapes and concentrates',
  'Edibles, oils, and tinctures',
  'Synthetic cannabinoid products'],

  note: 'THC concentration thresholds vary significantly by jurisdiction.',
  anchor: '/cannabis-thc'
},
{
  id: 'topic-trafficking',
  icon: 'TruckIcon',
  title: 'Drug Trafficking Distinctions',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ef5e3fdc-1786997066622.png",
  imageAlt: 'Law enforcement officers representing drug trafficking investigation and legal distinctions between possession and distribution',
  items: [
  'Possession vs. personal purchase',
  'Importation and customs offences',
  'Supply and distribution',
  'Organized trafficking'],

  note: 'Actual offences and penalties depend on applicable national legislation.',
  anchor: '/drug-trafficking'
},
{
  id: 'topic-laws',
  icon: 'ScaleIcon',
  title: 'Laws & Penalties',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19d8c3f4d-1786997066823.png",
  imageAlt: 'Scales of justice and legal books representing drug laws, penalties, and jurisdiction-specific offence categories',
  items: [
  'Jurisdiction-specific offence categories',
  'Minimum and maximum penalties',
  'Fine and forfeiture provisions',
  'International legal references'],

  note: 'Legal information is regularly reviewed and updated.',
  anchor: '/laws'
}];


export default function EducationalSection() {
  return (
    <section id="education" className="bg-white border-y border-border py-16 lg:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">Educational Resources</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Understanding the Legal Landscape
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Legal classifications, procedures, and penalties vary significantly across jurisdictions. This information is provided for educational purposes only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic) =>
          <div key={topic.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Card Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                src={topic.image}
                alt={topic.imageAlt}
                width={600}
                height={176}
                className="w-full h-full object-cover" />
              
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Icon name={topic.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm drop-shadow">{topic.title}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <ul className="space-y-2 mb-4">
                  {topic.items.map((item) =>
                <li key={`${topic.id}-${item}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                )}
                </ul>
                <p className="text-xs text-muted-foreground/70 italic border-t border-border pt-3">
                  {topic.note}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-primary/5 border border-primary/10 rounded-lg p-6">
          <p className="text-primary/80 text-sm leading-relaxed text-center">
            <strong>Legal Disclaimer:</strong> Information published on this platform is provided for public awareness and official informational purposes. Legal classifications, procedures, and penalties vary according to jurisdiction and individual circumstances. Publication of an allegation or investigation notice does not by itself establish guilt. Formal determinations of guilt are made through the applicable legal process.
          </p>
        </div>
      </div>
    </section>);

}