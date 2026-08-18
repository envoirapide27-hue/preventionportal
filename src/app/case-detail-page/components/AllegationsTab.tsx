import React from 'react';
import Icon from '@/components/ui/AppIcon';

const allegations = [
  {
    id: 'alleg-001',
    type: 'Online Purchase',
    offence: 'Alleged online purchase of controlled cannabis products',
    description: 'Subject is alleged to have purchased 100g of high-THC cannabis flower through an encrypted messaging platform on 12 August 2026. Transaction records and payment evidence have been obtained and are under review.',
    legalRef: 'Belgian Narcotics Act 1921 — Article 2bis',
    date: '17 Aug 2026',
    status: 'Under Investigation',
    notes: 'Case referred to national prosecution authority for further assessment.',
  },
  {
    id: 'alleg-002',
    type: 'Importation',
    offence: 'Alleged importation of controlled substances',
    description: 'The parcel containing the alleged controlled substance was dispatched from outside Belgium and intercepted by customs authorities at Brussels Airport on 15 August 2026.',
    legalRef: 'Belgian Narcotics Act 1921 — Article 4',
    date: '17 Aug 2026',
    status: 'Under Investigation',
    notes: 'Customs seizure report obtained.',
  },
];

const statusColor: Record<string, string> = {
  'Under Investigation': 'badge-investigation',
  'Charged': 'badge-charged',
  'Under Review': 'badge-review',
  'Convicted': 'badge-convicted',
};

export default function AllegationsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="admin-text font-semibold text-sm">Allegations</h3>
        <button className="flex items-center gap-2 text-xs border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9] px-3 py-2 rounded transition-colors">
          <Icon name="PlusIcon" size={14} />
          Add Allegation
        </button>
      </div>

      <div className="bg-amber-900/15 border border-amber-500/25 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Icon name="ExclamationTriangleIcon" size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-300 text-xs leading-relaxed">
            These are allegations under investigation. The subject is presumed innocent unless formally convicted by a competent court. Use accurate legal language when recording allegations.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {allegations.map((a) => (
          <div key={a.id} className="admin-card-bg border admin-border rounded-lg p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium bg-secondary px-2 py-0.5 rounded text-[#E2EAF2]">{a.type}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[a.status] || 'badge-draft'}`}>{a.status}</span>
                </div>
                <h4 className="admin-text font-semibold text-sm">{a.offence}</h4>
              </div>
              <span className="admin-text-muted text-xs font-mono-data flex-shrink-0">{a.date}</span>
            </div>
            <p className="admin-text text-sm leading-relaxed mb-3">{a.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#071527] border border-[#1E3A54] rounded p-3">
                <p className="admin-text-muted text-xs mb-1">Legal Reference</p>
                <p className="admin-text text-xs font-medium font-mono-data">{a.legalRef}</p>
              </div>
              <div className="bg-[#071527] border border-[#1E3A54] rounded p-3">
                <p className="admin-text-muted text-xs mb-1">Notes</p>
                <p className="admin-text text-xs">{a.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}