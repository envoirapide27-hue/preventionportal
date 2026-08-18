import React from 'react';
import Icon from '@/components/ui/AppIcon';

const personFields = [
  { id: 'pf-fname', label: 'First Name', value: 'Marcus' },
  { id: 'pf-mname', label: 'Middle Name', value: 'Thierry' },
  { id: 'pf-lname', label: 'Last Name', value: 'Dubois' },
  { id: 'pf-alias', label: 'Alias / Username', value: 'mthd_88 (Telegram)' },
  { id: 'pf-dob', label: 'Date of Birth', value: '14 March 1988' },
  { id: 'pf-gender', label: 'Gender', value: 'Male' },
  { id: 'pf-nationality', label: 'Nationality', value: 'Belgian' },
  { id: 'pf-email', label: 'Email Address', value: 'm.dubois.88@protonmail.com' },
  { id: 'pf-phone', label: 'Phone', value: '+32 477 XXX XXX' },
  { id: 'pf-country', label: 'Country', value: 'Belgium' },
  { id: 'pf-city', label: 'City', value: 'Brussels' },
  { id: 'pf-postal', label: 'Postal Code', value: '1000' },
  { id: 'pf-idtype', label: 'ID Type', value: 'National Identity Card' },
  { id: 'pf-idnum', label: 'ID Reference', value: '[RESTRICTED — Internal Record]' },
];

export default function PersonTab() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      {/* Profile Card */}
      <div className="admin-card-bg border admin-border rounded-lg p-5">
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-3">
            <Icon name="UserIcon" size={36} className="text-[#7A9BB5]" />
          </div>
          <h3 className="admin-text font-semibold text-base">Marcus Thierry Dubois</h3>
          <p className="admin-text-muted text-sm">Belgian National</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="badge-investigation text-xs font-medium px-2 py-0.5 rounded-full">Under Investigation</span>
          </div>
        </div>

        <div className="space-y-2 border-t admin-border pt-4">
          <div className="flex items-center gap-2 text-xs">
            <Icon name="EnvelopeIcon" size={13} className="text-[#7A9BB5]" />
            <span className="admin-text-muted">m.dubois.88@protonmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Icon name="MapPinIcon" size={13} className="text-[#7A9BB5]" />
            <span className="admin-text-muted">Brussels, Belgium</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Icon name="FolderOpenIcon" size={13} className="text-[#7A9BB5]" />
            <span className="admin-text-muted">1 associated case</span>
          </div>
        </div>

        <button className="w-full mt-4 flex items-center justify-center gap-2 border border-[#1E3A54] text-[#7A9BB5] hover:text-[#E2EAF2] hover:border-[#4A90D9] text-sm py-2 rounded transition-colors">
          <Icon name="PencilSquareIcon" size={14} />
          Edit Person
        </button>
      </div>

      {/* Details Grid */}
      <div className="xl:col-span-2 admin-card-bg border admin-border rounded-lg p-5">
        <h3 className="admin-text font-semibold text-sm mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {personFields?.map((field) => (
            <div key={field?.id} className="bg-[#071527] border border-[#1E3A54] rounded p-3">
              <p className="admin-text-muted text-xs mb-1">{field?.label}</p>
              <p className="admin-text text-sm font-medium">{field?.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-amber-900/20 border border-amber-500/30 rounded p-3">
          <div className="flex items-start gap-2">
            <Icon name="LockClosedIcon" size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-300 text-xs">
              Sensitive identification details are stored in restricted internal records and are not exposed through public interfaces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}