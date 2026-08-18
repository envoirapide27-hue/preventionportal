'use client';
import React, { useState } from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

type VerifyState = 'idle' | 'loading' | 'valid' | 'invalid';

interface NoticeResult {
  reference: string;
  issueDate: string;
  status: string;
  noticeType: string;
  isPublic: boolean;
}

const mockNotices: Record<string, NoticeResult> = {
  'DA-2026-001527': { reference: 'DA-2026-001527', issueDate: '17 August 2026', status: 'Active', noticeType: 'Case Notification', isPublic: true },
  'DA-2026-000891': { reference: 'DA-2026-000891', issueDate: '3 June 2026', status: 'Active', noticeType: 'Official Notice', isPublic: false },
  'DA-2025-003412': { reference: 'DA-2025-003412', issueDate: '12 November 2025', status: 'Closed', noticeType: 'Public Notice', isPublic: true },
};

export default function VerifyPage() {
  const [reference, setReference] = useState('');
  const [state, setState] = useState<VerifyState>('idle');
  const [result, setResult] = useState<NoticeResult | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      const found = mockNotices[reference.trim().toUpperCase()];
      if (found) {
        setResult(found);
        setState('valid');
      } else {
        setResult(null);
        setState('invalid');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShieldCheckIcon" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Verify an Official Notice</h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto">
              Enter a case or notice reference number to verify its authenticity and current status.
            </p>
          </div>
        </section>

        {/* Verify Form */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleVerify} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-2">Notice Reference</h2>
              <p className="text-gray-600 text-sm mb-6">Enter the reference number exactly as it appears on the notice. Example: <span className="font-mono text-primary">DA-2026-001527</span></p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="DA-YYYY-XXXXXX"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary uppercase"
                  required
                />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap flex items-center gap-2"
                >
                  {state === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Icon name="MagnifyingGlassIcon" size={16} />
                      Verify Notice
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Valid Result */}
            {state === 'valid' && result && (
              <div className="mt-6 border border-green-200 rounded-xl overflow-hidden">
                <div className="bg-green-600 text-white px-6 py-4 flex items-center gap-3">
                  <Icon name="CheckCircleIcon" size={24} />
                  <div>
                    <p className="font-bold text-lg">VALID NOTICE</p>
                    <p className="text-green-100 text-sm">This reference has been verified as authentic.</p>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reference</p>
                      <p className="font-mono font-semibold text-primary">{result.reference}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Issue Date</p>
                      <p className="font-medium text-gray-800">{result.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Status</p>
                      <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${result.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                        {result.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Notice Type</p>
                      <p className="font-medium text-gray-800">{result.noticeType}</p>
                    </div>
                  </div>
                  {result.isPublic && (
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <Link
                        href={`/public-notices/${result.reference}`}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
                      >
                        <Icon name="DocumentTextIcon" size={16} />
                        View Public Notice
                      </Link>
                    </div>
                  )}
                  {!result.isPublic && (
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Icon name="LockClosedIcon" size={16} className="text-gray-400" />
                        This notice exists but is not publicly available. Authenticity has been confirmed.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Invalid Result */}
            {state === 'invalid' && (
              <div className="mt-6 border border-red-200 rounded-xl overflow-hidden">
                <div className="bg-accent text-white px-6 py-4 flex items-center gap-3">
                  <Icon name="XCircleIcon" size={24} />
                  <div>
                    <p className="font-bold text-lg">NOTICE NOT FOUND</p>
                    <p className="text-white/80 text-sm">We could not verify this reference.</p>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    We could not verify the reference <span className="font-mono font-semibold">{reference}</span>. Please check the number and try again. If you believe this is an error, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Info */}
        <section className="py-12 px-4 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-primary mb-6 text-center">About Notice Verification</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { icon: 'ShieldCheckIcon', title: 'Authentic Notices', desc: 'All official notices issued by this agency carry a unique reference number that can be verified here.' },
                { icon: 'LockClosedIcon', title: 'Privacy Protected', desc: 'Verification only confirms authenticity. Private case information is never exposed through this tool.' },
                { icon: 'ExclamationTriangleIcon', title: 'Suspicious Notices', desc: 'If you receive a notice that cannot be verified, do not make any payments. Contact us immediately.' },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
