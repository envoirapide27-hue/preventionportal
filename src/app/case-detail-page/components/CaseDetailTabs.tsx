'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import OverviewTab from './OverviewTab';
import PersonTab from './PersonTab';
import PurchaseTab from './PurchaseTab';
import EvidenceTab from './EvidenceTab';
import AllegationsTab from './AllegationsTab';
import ChargesTab from './ChargesTab';
import MessagesTab from './MessagesTab';
import PublicNoticeTab from './PublicNoticeTab';

const tabs = [
  { id: 'tab-overview', key: 'overview', label: 'Overview', icon: 'Squares2X2Icon' },
  { id: 'tab-person', key: 'person', label: 'Person', icon: 'UserIcon' },
  { id: 'tab-purchase', key: 'purchase', label: 'Purchase', icon: 'ShoppingCartIcon' },
  { id: 'tab-allegations', key: 'allegations', label: 'Allegations', icon: 'DocumentTextIcon' },
  { id: 'tab-evidence', key: 'evidence', label: 'Evidence', icon: 'PaperClipIcon' },
  { id: 'tab-messages', key: 'messages', label: 'Messages', icon: 'EnvelopeIcon' },
  { id: 'tab-charges', key: 'charges', label: 'Charges', icon: 'BanknotesIcon' },
  { id: 'tab-notice', key: 'notice', label: 'Public Notice', icon: 'MegaphoneIcon' },
];

export default function CaseDetailTabs() {
  const [active, setActive] = useState('overview');

  return (
    <div>
      {/* Tab Bar */}
      <div className="admin-card-bg border admin-border rounded-lg mb-4 overflow-x-auto scrollbar-thin">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-all duration-150 whitespace-nowrap ${
                active === tab.key
                  ? 'border-[#4A90D9] text-[#E2EAF2]'
                  : 'border-transparent text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#1E3A54]'
              }`}
            >
              <Icon name={tab.icon as Parameters<typeof Icon>[0]['name']} size={15} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {active === 'overview' && <OverviewTab />}
        {active === 'person' && <PersonTab />}
        {active === 'purchase' && <PurchaseTab />}
        {active === 'allegations' && <AllegationsTab />}
        {active === 'evidence' && <EvidenceTab />}
        {active === 'messages' && <MessagesTab />}
        {active === 'charges' && <ChargesTab />}
        {active === 'notice' && <PublicNoticeTab />}
      </div>
    </div>
  );
}