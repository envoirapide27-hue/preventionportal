import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  return (
    <section className="bg-primary hero-pattern relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary/90 opacity-95" />
      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="max-w-2xl">
            {/* Official Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <Icon name="ShieldCheckIcon" size={14} className="text-white" />
              Official Government Prevention Agency
            </div>

            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight mb-6 text-balance">
              Think Before You Buy Controlled Substances Online
            </h1>

            <p className="text-white text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl">
              Purchasing controlled substances through websites, social networks, encrypted messaging services, or other online channels may expose individuals to serious health risks and significant legal consequences depending on applicable law in your jurisdiction.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#prevention"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-semibold px-6 py-3 rounded transition-all duration-150 hover:bg-primary-foreground/90 active:scale-95">
                
                <Icon name="InformationCircleIcon" size={18} />
                Understand the Risks
              </Link>
              <Link
                href="/public-notices-page"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 rounded transition-all duration-150 active:scale-95">
                
                <Icon name="MagnifyingGlassIcon" size={18} />
                Verify a Notice
              </Link>
            </div>

            {/* Quick Stats Row */}
            <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-primary-foreground/10">
              {[
              { value: '2,400+', label: 'Cases Recorded' },
              { value: '47', label: 'Jurisdictions' },
              { value: '890+', label: 'Notices Published' }]?.
              map((stat) =>
              <div key={`hero-stat-${stat?.label}`}>
                  <p className="text-2xl font-bold text-white font-mono-data mb-1">{stat?.value}</p>
                  <p className="text-white/80 text-sm">{stat?.label}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 scale-105" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_14bc24533-1786997064195.png"
                  alt="Scales of justice and legal books representing drug law enforcement and prevention"
                  width={640}
                  height={480}
                  className="w-full h-72 lg:h-96 object-cover"
                  priority />
                
                {/* Overlay caption */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 py-4">
                  <p className="text-white text-sm font-medium">Legal Consequences Are Real</p>
                  <p className="text-white/80 text-xs">Online purchases do not remove criminal liability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}