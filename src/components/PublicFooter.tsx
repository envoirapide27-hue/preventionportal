import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function PublicFooter() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Agency */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AppLogo size={32} />
              <span className="text-white font-semibold text-sm">EDPCA</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              European Drug Prevention & Compliance Agency — official public awareness and case management platform.
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
              <Link href="/about" className="text-white/80 hover:text-white transition-colors">Mission</Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Public Information */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Public Information</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="/drug-abuse-prevention" className="text-white/80 hover:text-white transition-colors">Drug Abuse Prevention</Link>
              <Link href="/cannabis-thc" className="text-white/80 hover:text-white transition-colors">Cannabis &amp; THC</Link>
              <Link href="/drug-trafficking" className="text-white/80 hover:text-white transition-colors">Drug Trafficking</Link>
              <Link href="/laws" className="text-white/80 hover:text-white transition-colors">Laws &amp; Penalties</Link>
            </div>
          </div>

          {/* Notices */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Notices</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="/public-notices-page" className="text-white/80 hover:text-white transition-colors">Public Notices</Link>
              <Link href="/verify" className="text-white/80 hover:text-white transition-colors">Verify a Notice</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">Terms of Use</Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">Legal Disclaimer</Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/70">
              © 2026 EDPCA — European Drug Prevention & Compliance Agency. All Rights Reserved.
            </p>
            <p className="text-xs text-white/70 text-center max-w-2xl">
              Information published on this platform is provided for public awareness purposes. Legal classifications and penalties vary by jurisdiction. Publication of an allegation does not establish guilt.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}