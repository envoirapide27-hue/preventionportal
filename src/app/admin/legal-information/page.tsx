'use client';
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Icon from '@/components/ui/AppIcon';

interface LegalEntry {
  id: string;
  country: string;
  region?: string;
  legalTitle: string;
  offence: string;
  description: string;
  fine: string;
  imprisonment: string;
  legalRef: string;
  source: string;
  effectiveDate: string;
  lastVerified: string;
}

const mockEntries: LegalEntry[] = [
  { id: 'L-001', country: 'United Kingdom', legalTitle: 'Misuse of Drugs Act 1971', offence: 'Possession of Class B Drug', description: 'Unlawful possession of a controlled drug classified as Class B, including cannabis.', fine: 'Unlimited fine', imprisonment: 'Up to 5 years', legalRef: 'MDA 1971, s.5(2)', source: 'legislation.gov.uk', effectiveDate: '1971-07-27', lastVerified: '2024-01-15' },
  { id: 'L-002', country: 'United Kingdom', legalTitle: 'Misuse of Drugs Act 1971', offence: 'Supply of Class B Drug', description: 'Unlawful supply, offering to supply, or being concerned in the supply of a Class B controlled drug.', fine: 'Unlimited fine', imprisonment: 'Up to 14 years', legalRef: 'MDA 1971, s.4(3)', source: 'legislation.gov.uk', effectiveDate: '1971-07-27', lastVerified: '2024-01-15' },
  { id: 'L-003', country: 'Germany', legalTitle: 'Betäubungsmittelgesetz (BtMG)', offence: 'Possession of Narcotics', description: 'Unauthorized possession of narcotic substances.', fine: 'Fine may apply', imprisonment: 'Up to 5 years', legalRef: 'BtMG §29', source: 'gesetze-im-internet.de', effectiveDate: '1981-01-01', lastVerified: '2024-03-01' },
  { id: 'L-004', country: 'Netherlands', legalTitle: 'Opium Act (Opiumwet)', offence: 'Trafficking Hard Drugs', description: 'Production, trade, import, export, or possession of hard drugs.', fine: 'Fifth category fine', imprisonment: 'Up to 12 years', legalRef: 'Opiumwet Art. 2', source: 'wetten.overheid.nl', effectiveDate: '1928-01-01', lastVerified: '2024-02-10' },
];

export default function LegalInformationPage() {
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState<LegalEntry | null>(null);

  const handleEdit = (entry: LegalEntry) => {
    setEditEntry(entry);
    setShowForm(true);
  };

  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#7A9BB5] text-xs mb-1">
              <span>Admin</span><span>/</span><span className="text-[#E2EAF2]">Legal Information</span>
            </div>
            <h1 className="text-xl font-bold admin-text">Legal Information CMS</h1>
            <p className="admin-text-muted text-xs mt-0.5">Manage jurisdiction-specific legal references displayed publicly</p>
          </div>
          <button
            onClick={() => { setEditEntry(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium px-4 py-2.5 rounded transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            <span className="text-base font-bold leading-none">+</span>
            Add Legal Entry
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="admin-sidebar-bg border admin-border rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="admin-text font-semibold">{editEntry ? 'Edit Legal Entry' : 'New Legal Entry'}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#7A9BB5] hover:text-[#E2EAF2] transition-colors">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Country', placeholder: 'e.g. United Kingdom', defaultVal: editEntry?.country },
                { label: 'Region / State', placeholder: 'Optional', defaultVal: editEntry?.region },
                { label: 'Legal Title', placeholder: 'e.g. Misuse of Drugs Act 1971', defaultVal: editEntry?.legalTitle },
                { label: 'Offence', placeholder: 'e.g. Possession of Class B Drug', defaultVal: editEntry?.offence },
                { label: 'Legal Reference', placeholder: 'e.g. MDA 1971, s.5(2)', defaultVal: editEntry?.legalRef },
                { label: 'Official Source', placeholder: 'e.g. legislation.gov.uk', defaultVal: editEntry?.source },
                { label: 'Fine', placeholder: 'e.g. Unlimited fine', defaultVal: editEntry?.fine },
                { label: 'Imprisonment Range', placeholder: 'e.g. Up to 5 years', defaultVal: editEntry?.imprisonment },
                { label: 'Effective Date', placeholder: 'YYYY-MM-DD', defaultVal: editEntry?.effectiveDate },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs admin-text-muted mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    defaultValue={field.defaultVal || ''}
                    className="w-full bg-secondary/20 border admin-border rounded-lg px-3 py-2 text-sm admin-text placeholder-[#7A9BB5] focus:outline-none focus:ring-1 focus:ring-[#7A9BB5]"
                  />
                </div>
              ))}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs admin-text-muted mb-1.5">Description</label>
                <textarea
                  rows={3}
                  defaultValue={editEntry?.description || ''}
                  placeholder="Describe the offence and its legal context..."
                  className="w-full bg-secondary/20 border admin-border rounded-lg px-3 py-2 text-sm admin-text placeholder-[#7A9BB5] focus:outline-none focus:ring-1 focus:ring-[#7A9BB5] resize-none"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-accent hover:bg-accent/90 text-white text-sm font-medium px-5 py-2 rounded transition-colors">
                {editEntry ? 'Update Entry' : 'Save Entry'}
              </button>
              <button onClick={() => setShowForm(false)} className="border admin-border text-[#7A9BB5] hover:text-[#E2EAF2] text-sm px-4 py-2 rounded transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Entries */}
        <div className="space-y-4">
          {mockEntries.map((entry) => (
            <div key={entry.id} className="admin-sidebar-bg border admin-border rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b admin-border flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#7A9BB5] bg-secondary/40 px-2 py-0.5 rounded">{entry.id}</span>
                  <span className="admin-text font-semibold text-sm">{entry.country}{entry.region ? ` — ${entry.region}` : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#7A9BB5]">Verified: {entry.lastVerified}</span>
                  <button onClick={() => handleEdit(entry)} className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors">
                    <Icon name="PencilSquareIcon" size={14} />
                  </button>
                  <button className="p-1.5 text-[#7A9BB5] hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                    <Icon name="TrashIcon" size={14} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-start gap-2 mb-3">
                  <h3 className="admin-text font-semibold">{entry.offence}</h3>
                  <span className="text-xs font-mono text-[#7A9BB5] bg-secondary/40 px-2 py-0.5 rounded">{entry.legalRef}</span>
                </div>
                <p className="admin-text-muted text-sm leading-relaxed mb-4">{entry.description}</p>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-[#7A9BB5] uppercase tracking-wider mb-1">Legal Title</p>
                    <p className="admin-text text-xs">{entry.legalTitle}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A9BB5] uppercase tracking-wider mb-1">Imprisonment</p>
                    <p className="text-accent text-xs font-medium">{entry.imprisonment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A9BB5] uppercase tracking-wider mb-1">Fine</p>
                    <p className="admin-text text-xs">{entry.fine}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A9BB5] uppercase tracking-wider mb-1">Source</p>
                    <p className="admin-text text-xs">{entry.source}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
