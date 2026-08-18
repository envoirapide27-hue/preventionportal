'use client';
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Icon from '@/components/ui/AppIcon';

interface ContentPage {
  id: string;
  title: string;
  slug: string;
  lastEdited: string;
  status: 'published' | 'draft';
}

const contentPages: ContentPage[] = [
  { id: '1', title: 'Homepage', slug: '/', lastEdited: '2026-08-15', status: 'published' },
  { id: '2', title: 'About', slug: '/about', lastEdited: '2026-08-10', status: 'published' },
  { id: '3', title: 'Drug Abuse Prevention', slug: '/drug-abuse-prevention', lastEdited: '2026-08-08', status: 'published' },
  { id: '4', title: 'Cannabis & High-THC', slug: '/cannabis-thc', lastEdited: '2026-08-08', status: 'published' },
  { id: '5', title: 'Drug Trafficking', slug: '/drug-trafficking', lastEdited: '2026-08-05', status: 'published' },
  { id: '6', title: 'Resources', slug: '/resources', lastEdited: '2026-08-01', status: 'published' },
  { id: '7', title: 'Contact Information', slug: '/contact', lastEdited: '2026-07-20', status: 'published' },
  { id: '8', title: 'Legal Disclaimer', slug: '/disclaimer', lastEdited: '2026-07-15', status: 'draft' },
  { id: '9', title: 'Footer Content', slug: '/footer', lastEdited: '2026-08-12', status: 'published' },
];

const sampleContent: Record<string, string> = {
  '1': 'Think Before You Buy Controlled Substances Online\n\nPurchasing controlled substances through websites, social networks, encrypted messaging services or other online channels may expose individuals to serious health and legal consequences depending on applicable law.\n\nThis platform is maintained by an official drug-abuse prevention and case-management agency.',
  '2': 'About PreventionPortal\n\nPreventionPortal is an institutional agency established to address the growing challenge of online controlled-substance transactions. We operate at the intersection of public health, legal awareness, and digital safety.',
};

export default function WebsiteContentPage() {
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  const [editContent, setEditContent] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSelect = (page: ContentPage) => {
    setSelectedPage(page);
    setEditContent(sampleContent[page.id] || `Content for ${page.title}\n\nEdit this content using the editor below.`);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[#7A9BB5] text-xs mb-1">
            <span>Admin</span><span>/</span><span className="text-[#E2EAF2]">Website Content</span>
          </div>
          <h1 className="text-xl font-bold admin-text">Website Content Management</h1>
          <p className="admin-text-muted text-xs mt-0.5">Edit public-facing page content</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Page List */}
          <div className="admin-sidebar-bg border admin-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b admin-border">
              <h2 className="admin-text font-semibold text-sm">Pages</h2>
            </div>
            <div className="divide-y admin-border">
              {contentPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handleSelect(page)}
                  className={`w-full text-left px-4 py-3 hover:bg-secondary/20 transition-colors ${selectedPage?.id === page.id ? 'bg-secondary/30' : ''}`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm font-medium ${selectedPage?.id === page.id ? 'admin-text' : 'text-[#7A9BB5]'}`}>{page.title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${page.status === 'published' ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
                      {page.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#7A9BB5]">Last edited: {page.lastEdited}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            {selectedPage ? (
              <div className="admin-sidebar-bg border admin-border rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b admin-border flex items-center justify-between">
                  <div>
                    <h2 className="admin-text font-semibold">{selectedPage.title}</h2>
                    <p className="text-xs text-[#7A9BB5] font-mono">{selectedPage.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 border admin-border text-[#7A9BB5] hover:text-[#E2EAF2] text-xs px-3 py-1.5 rounded transition-colors">
                      <Icon name="EyeIcon" size={12} />
                      Preview
                    </button>
                    <button
                      onClick={handleSave}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-colors ${saved ? 'bg-green-700 text-white' : 'bg-accent hover:bg-accent/90 text-white'}`}
                    >
                      <Icon name={saved ? 'CheckIcon' : 'CloudArrowUpIcon'} size={12} />
                      {saved ? 'Saved!' : 'Save Changes'}
                    </button>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="px-4 py-2 border-b admin-border flex flex-wrap gap-1">
                  {['Bold', 'Italic', 'Underline', 'H1', 'H2', 'H3', 'List', 'Link'].map((tool) => (
                    <button key={tool} className="px-2.5 py-1 text-xs admin-text-muted hover:admin-text hover:bg-secondary/40 rounded transition-colors">
                      {tool}
                    </button>
                  ))}
                </div>

                <div className="p-4">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={20}
                    className="w-full bg-secondary/20 border admin-border rounded-lg p-4 text-sm admin-text placeholder-[#7A9BB5] focus:outline-none focus:ring-1 focus:ring-[#7A9BB5] resize-none font-mono leading-relaxed"
                  />
                </div>

                <div className="px-5 py-3 border-t admin-border flex items-center justify-between">
                  <p className="text-xs text-[#7A9BB5]">Last edited: {selectedPage.lastEdited}</p>
                  <div className="flex gap-2">
                    <button className="text-xs text-[#7A9BB5] hover:text-[#E2EAF2] px-3 py-1.5 border admin-border rounded transition-colors">
                      Discard Changes
                    </button>
                    <button
                      onClick={handleSave}
                      className={`text-xs px-4 py-1.5 rounded transition-colors ${saved ? 'bg-green-700 text-white' : 'bg-accent hover:bg-accent/90 text-white'}`}
                    >
                      {saved ? 'Saved!' : 'Save & Publish'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="admin-sidebar-bg border admin-border rounded-xl flex flex-col items-center justify-center py-20 text-center">
                <Icon name="DocumentTextIcon" size={40} className="text-[#7A9BB5] mb-4" />
                <h3 className="admin-text font-semibold mb-2">Select a Page to Edit</h3>
                <p className="admin-text-muted text-sm max-w-xs">Choose a page from the list on the left to begin editing its content.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
