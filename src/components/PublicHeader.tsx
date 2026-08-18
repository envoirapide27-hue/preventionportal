'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Drug Prevention', href: '/drug-abuse-prevention' },
  { label: 'Public Notices', href: '/public-notices-page' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-primary border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <AppLogo size={36} />
            <div className="hidden sm:block">
              <p className="text-primary-foreground font-semibold text-sm leading-tight">EDPCA</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks?.map((link) => (
              <Link
                key={`nav-${link?.label}`}
                href={link?.href}
                className="text-white hover:text-white/90 text-sm px-3 py-2 rounded transition-colors duration-150"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/public-notices-page"
              className="hidden sm:flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium px-4 py-2 rounded transition-all duration-150 active:scale-95"
            >
              <Icon name="ShieldCheckIcon" size={16} />
              Verify a Notice
            </Link>
            <Link
              href="/admin-login"
              className="hidden sm:flex items-center gap-2 border border-primary-foreground/30 text-white hover:text-white hover:border-primary-foreground/60 text-sm px-3 py-2 rounded transition-colors duration-150"
            >
              <Icon name="LockClosedIcon" size={14} />
              Admin
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white hover:text-white/80 p-2 rounded transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-primary-foreground/10 bg-secondary">
          <nav className="max-w-screen-2xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks?.map((link) => (
              <Link
                key={`mobile-nav-${link?.label}`}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className="text-white hover:text-white/90 text-sm px-3 py-2.5 rounded hover:bg-primary/30 transition-colors"
              >
                {link?.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-primary-foreground/10 mt-1">
              <Link
                href="/public-notices-page"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 bg-accent text-accent-foreground text-sm font-medium px-4 py-2.5 rounded"
              >
                <Icon name="ShieldCheckIcon" size={16} />
                Verify a Notice
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}