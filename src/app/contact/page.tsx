'use client';
import React, { useState } from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Contact Us</h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              For general inquiries, public information requests, or to report concerns. Do not submit sensitive personal or financial information through this form.
            </p>
          </div>
        </section>

        {/* Warning */}
        <section className="py-5 px-4 bg-amber-50 border-b border-amber-200">
          <div className="max-w-5xl mx-auto flex gap-3">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Security Notice:</strong> Do not submit passwords, PINs, bank account numbers, card numbers, identification documents, or any sensitive financial credentials through this contact form. This is a public communication channel.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10">
              {/* Contact Info */}
              <div className="md:col-span-1">
                <h2 className="text-lg font-bold text-primary mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {[
                    { icon: 'EnvelopeIcon', label: 'General Inquiries', value: 'info@edpca.co' },
                    { icon: 'ShieldCheckIcon', label: 'Notice Verification', value: 'Use the online verification tool at /verify' },
                    { icon: 'ScaleIcon', label: 'Legal Matters', value: 'legal@edpca.co' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                        <p className="text-sm text-gray-800 font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-primary text-sm mb-2">Response Times</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    General inquiries are typically responded to within 5–10 business days. For urgent matters related to an active case notice, please reference your case number.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-bold text-primary mb-6">Send a Message</h2>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Icon name="CheckCircleIcon" size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Message Received</h3>
                    <p className="text-gray-600 text-sm max-w-sm">
                      Thank you for your message. We will review your inquiry and respond within 5–10 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-accent">*</span></label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-accent">*</span></label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject <span className="text-accent">*</span></label>
                      <select
                        id="subject"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="notice">Public Notice Inquiry</option>
                        <option value="legal">Legal Information Request</option>
                        <option value="media">Media Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-accent">*</span></label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Icon name="LockClosedIcon" size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Do not include passwords, PINs, bank account numbers, card numbers, or any sensitive financial or identification information in this message.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
