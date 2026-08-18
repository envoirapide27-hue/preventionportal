'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

interface VerifyForm {
  reference: string;
}

// Backend integration point: replace with API call to verify case reference
const mockVerify = (ref: string): 'valid' | 'private' | 'invalid' => {
  const valid = ['DA-2026-001527', 'DA-2026-001489', 'DA-2026-001312'];
  const upper = ref.trim().toUpperCase();
  if (valid.includes(upper)) return 'valid';
  if (upper === 'DA-2026-001100') return 'private';
  return 'invalid';
};

export default function VerifySection() {
  const [result, setResult] = useState<'valid' | 'private' | 'invalid' | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<VerifyForm>();

  const onSubmit = (data: VerifyForm) => {
    setLoading(true);
    setTimeout(() => {
      setResult(mockVerify(data.reference));
      setLoading(false);
    }, 800);
  };

  return (
    <section id="verify" className="bg-background py-16 lg:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="ShieldCheckIcon" size={28} className="text-primary" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">Verify an Official Notice</h2>
            <p className="text-muted-foreground text-sm">
              Enter a case or notice reference number to verify its authenticity. Example: <span className="font-mono-data font-medium text-primary">DA-2026-001527</span>
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="reference" className="sr-only">Case / Notice Reference</label>
                <input
                  id="reference"
                  type="text"
                  placeholder="e.g. DA-2026-001527"
                  className="w-full px-4 py-3 border border-border rounded bg-input text-foreground font-mono-data placeholder:font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  {...register('reference', {
                    required: 'Please enter a reference number',
                    pattern: { value: /^[A-Za-z]{2}-\d{4}-\d{6}$/i, message: 'Format: DA-YYYY-XXXXXX' },
                  })}
                />
                {errors.reference && (
                  <p className="text-accent text-xs mt-1">{errors.reference.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-primary-foreground font-semibold px-6 py-3 rounded transition-all duration-150 active:scale-95 disabled:opacity-60 whitespace-nowrap text-sm"
              >
                {loading ? (
                  <Icon name="ArrowPathIcon" size={18} className="animate-spin" />
                ) : (
                  <Icon name="MagnifyingGlassIcon" size={18} />
                )}
                Verify Notice
              </button>
            </form>

            {/* Results */}
            {result === 'valid' && (
              <div className="mt-5 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="CheckBadgeIcon" size={20} className="text-success" />
                  <span className="text-success font-bold text-sm uppercase tracking-wider">Valid Notice</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground text-xs">Reference</p>
                    <p className="font-mono-data font-medium text-primary">DA-2026-001527</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Issue Date</p>
                    <p className="font-medium text-primary">17 Aug 2026</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Current Status</p>
                    <p className="font-medium text-primary">Active</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Notice Type</p>
                    <p className="font-medium text-primary">Case Notification</p>
                  </div>
                </div>
                <a
                  href="/public-notices-page"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded hover:bg-secondary transition-colors"
                >
                  <Icon name="ArrowTopRightOnSquareIcon" size={16} />
                  View Public Notice
                </a>
              </div>
            )}

            {result === 'private' && (
              <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="LockClosedIcon" size={18} className="text-blue-700" />
                  <span className="text-blue-700 font-semibold text-sm">Notice Exists — Restricted</span>
                </div>
                <p className="text-blue-800 text-sm">This reference is valid but the associated notice is not currently published publicly. The notice has been verified as authentic.</p>
              </div>
            )}

            {result === 'invalid' && (
              <div className="mt-5 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="XCircleIcon" size={18} className="text-accent" />
                  <span className="text-accent font-semibold text-sm">Reference Not Found</span>
                </div>
                <p className="text-red-800 text-sm">We could not verify this reference. Please check the number and try again. Contact the agency if you believe this is an error.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}