'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';

const fields = [
  { id: 'pnf-name', key: 'publishName', label: 'Publish Full Name', value: 'Marcus Thierry Dubois', enabled: true },
  { id: 'pnf-photo', key: 'publishPhoto', label: 'Publish Photograph', value: 'No photo uploaded', enabled: false },
  { id: 'pnf-city', key: 'publishCity', label: 'Publish City', value: 'Brussels', enabled: true },
  { id: 'pnf-country', key: 'publishCountry', label: 'Publish Country', value: 'Belgium', enabled: true },
  { id: 'pnf-product', key: 'publishProduct', label: 'Publish Product', value: 'Cannabis Flower — High-THC, 100g', enabled: true },
  { id: 'pnf-productimg', key: 'publishProductImage', label: 'Publish Product Image', value: 'No image', enabled: false },
  { id: 'pnf-quantity', key: 'publishQuantity', label: 'Publish Quantity', value: '100g', enabled: true },
  { id: 'pnf-purchasedate', key: 'publishPurchaseDate', label: 'Publish Purchase Date', value: '12 Aug 2026', enabled: true },
  { id: 'pnf-amount', key: 'publishPurchaseAmount', label: 'Publish Purchase Amount', value: '€850', enabled: true },
  { id: 'pnf-payment', key: 'publishPaymentMethod', label: 'Publish Payment Method', value: 'Bank Transfer', enabled: true },
  { id: 'pnf-summary', key: 'publishCaseSummary', label: 'Publish Case Summary', value: 'Subject of a public notice relating to alleged online cannabis purchase.', enabled: true },
  { id: 'pnf-allegations', key: 'publishAllegations', label: 'Publish Allegations', value: 'Alleged online purchase and importation', enabled: true },
  { id: 'pnf-law', key: 'publishApplicableLaw', label: 'Publish Applicable Law', value: 'Belgian Narcotics Act 1921', enabled: true },
];

export default function PublicNoticeTab() {
  const [fieldStates, setFieldStates] = useState<Record<string, boolean>>(
    fields.reduce((acc, f) => ({ ...acc, [f.key]: f.enabled }), {})
  );
  const [saving, setSaving] = useState(false);

  const toggle = (key: string) => {
    setFieldStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      toast.success('Public notice settings saved.');
      setSaving(false);
    }, 800);
  };

  const handlePublish = () => {
    toast.success('Public notice published to website.');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {/* Field Selector */}
      <div className="admin-card-bg border admin-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="admin-text font-semibold text-sm">Publication Field Control</h3>
          <span className="text-xs admin-text-muted">
            {Object.values(fieldStates).filter(Boolean).length} of {fields.length} enabled
          </span>
        </div>

        <div className="bg-[#071527] border border-[#1E3A54] rounded p-3 mb-4">
          <div className="flex items-start gap-2">
            <Icon name="ShieldExclamationIcon" size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-300 text-xs">
              Only fields explicitly enabled here will appear on the public notice. Never enable sensitive financial credentials, complete identification numbers, or private addresses.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {fields.map((field) => (
            <div
              key={field.id}
              className="flex items-center justify-between py-2.5 px-3 rounded hover:bg-[#071527] transition-colors"
            >
              <div className="flex-1 min-w-0 mr-3">
                <p className="admin-text text-sm font-medium">{field.label}</p>
                <p className="admin-text-muted text-xs truncate">{field.value}</p>
              </div>
              <button
                onClick={() => toggle(field.key)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
                  fieldStates[field.key] ? 'bg-green-600' : 'bg-[#1E3A54]'
                }`}
                role="switch"
                aria-checked={fieldStates[field.key]}
                aria-label={`Toggle ${field.label}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                    fieldStates[field.key] ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-5 pt-4 border-t admin-border">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-[#E2EAF2] text-sm font-medium px-4 py-2 rounded transition-colors disabled:opacity-60"
          >
            {saving ? <Icon name="ArrowPathIcon" size={15} className="animate-spin" /> : <Icon name="CheckIcon" size={15} />}
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
          >
            <Icon name="MegaphoneIcon" size={15} />
            Publish Notice
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="admin-card-bg border admin-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="admin-text font-semibold text-sm">Notice Preview</h3>
          <span className="text-xs badge-published px-2 py-0.5 rounded-full">Live</span>
        </div>

        <div className="bg-white rounded-lg p-5 text-foreground">
          <div className="text-center border-b border-border pb-4 mb-4">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Official Public Notice</p>
            <p className="font-mono-data font-bold text-primary text-lg">DA-2026-001527</p>
            <span className="inline-block mt-1 badge-investigation text-xs px-2 py-0.5 rounded-full">Under Investigation</span>
          </div>

          {fieldStates.publishName && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Person</p>
              <p className="font-semibold text-primary text-sm">Marcus Thierry Dubois</p>
            </div>
          )}
          {(fieldStates.publishCity || fieldStates.publishCountry) && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Location</p>
              <p className="text-sm text-foreground">
                {fieldStates.publishCity && 'Brussels'}
                {fieldStates.publishCity && fieldStates.publishCountry && ', '}
                {fieldStates.publishCountry && 'Belgium'}
              </p>
            </div>
          )}
          {fieldStates.publishProduct && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Alleged Product</p>
              <p className="text-sm text-foreground">Cannabis Flower — High-THC, 100g</p>
            </div>
          )}
          {fieldStates.publishPurchaseAmount && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Purchase Amount</p>
              <p className="font-mono-data text-sm font-semibold text-foreground">€850.00</p>
            </div>
          )}
          {fieldStates.publishCaseSummary && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Summary</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Subject of a public notice relating to alleged online cannabis purchase via encrypted messaging platform.</p>
            </div>
          )}
          <div className="border-t border-border pt-3 mt-3">
            <p className="text-xs text-muted-foreground italic">Publication of this notice does not establish guilt. Verify at preventionportal.gov/verify</p>
          </div>
        </div>
      </div>
    </div>
  );
}