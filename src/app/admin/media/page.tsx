'use client';
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Icon from '@/components/ui/AppIcon';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'logo';
  size: string;
  uploadDate: string;
  category: 'public-media' | 'profile-images' | 'legal-documents' | 'website-graphics';
  url: string;
}

const mockMedia: MediaItem[] = [
  { id: 'M-001', name: 'agency-logo.png', type: 'logo', size: '24 KB', uploadDate: '2026-01-10', category: 'website-graphics', url: '' },
  { id: 'M-002', name: 'prevention-banner.jpg', type: 'image', size: '142 KB', uploadDate: '2026-03-15', category: 'public-media', url: '' },
  { id: 'M-003', name: 'about-hero.jpg', type: 'image', size: '98 KB', uploadDate: '2026-04-02', category: 'website-graphics', url: '' },
  { id: 'M-004', name: 'legal-disclaimer-v2.pdf', type: 'document', size: '56 KB', uploadDate: '2026-05-20', category: 'legal-documents', url: '' },
  { id: 'M-005', name: 'person-profile-001.jpg', type: 'image', size: '34 KB', uploadDate: '2026-08-12', category: 'profile-images', url: '' },
  { id: 'M-006', name: 'cannabis-info-graphic.png', type: 'image', size: '210 KB', uploadDate: '2026-06-01', category: 'public-media', url: '' },
];

const categoryLabels: Record<string, string> = {
  'public-media': 'Public Media',
  'profile-images': 'Profile Images',
  'legal-documents': 'Legal Documents',
  'website-graphics': 'Website Graphics',
};

const typeIcons: Record<string, string> = {
  image: 'PhotoIcon',
  document: 'DocumentTextIcon',
  logo: 'StarIcon',
};

export default function MediaLibraryPage() {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = filter === 'all' ? mockMedia : mockMedia.filter((m) => m.category === filter);

  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#7A9BB5] text-xs mb-1">
              <span>Admin</span><span>/</span><span className="text-[#E2EAF2]">Media Library</span>
            </div>
            <h1 className="text-xl font-bold admin-text">Media Library</h1>
            <p className="admin-text-muted text-xs mt-0.5">Manage logos, images, documents, and website graphics</p>
          </div>
          <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium px-4 py-2.5 rounded transition-all duration-150 active:scale-95 whitespace-nowrap">
            <Icon name="ArrowUpTrayIcon" size={16} />
            Upload Files
          </button>
        </div>

        {/* Notice */}
        <div className="flex gap-3 p-3 bg-amber-900/20 border border-amber-700/30 rounded-lg mb-5">
          <Icon name="LockClosedIcon" size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-300 text-xs leading-relaxed">
            Sensitive evidence files are stored in a separate private evidence vault and do not appear in this media library. Only public-facing and administrative media is shown here.
          </p>
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap gap-2">
            {['all', 'public-media', 'profile-images', 'legal-documents', 'website-graphics'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filter === cat ? 'bg-primary text-white' : 'border admin-border text-[#7A9BB5] hover:text-[#E2EAF2]'}`}
              >
                {cat === 'all' ? 'All Files' : categoryLabels[cat]}
              </button>
            ))}
          </div>
          <div className="flex gap-1 border admin-border rounded-lg overflow-hidden">
            <button onClick={() => setView('grid')} className={`p-2 transition-colors ${view === 'grid' ? 'bg-secondary/60 admin-text' : 'text-[#7A9BB5] hover:text-[#E2EAF2]'}`}>
              <Icon name="Squares2X2Icon" size={16} />
            </button>
            <button onClick={() => setView('list')} className={`p-2 transition-colors ${view === 'list' ? 'bg-secondary/60 admin-text' : 'text-[#7A9BB5] hover:text-[#E2EAF2]'}`}>
              <Icon name="ListBulletIcon" size={16} />
            </button>
          </div>
        </div>

        {/* Grid View */}
        {view === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="admin-sidebar-bg border admin-border rounded-xl overflow-hidden group hover:border-[#7A9BB5] transition-colors">
                <div className="aspect-square bg-secondary/30 flex items-center justify-center">
                  <Icon name={typeIcons[item.type] as Parameters<typeof Icon>[0]['name']} size={32} className="text-[#7A9BB5]" />
                </div>
                <div className="p-3">
                  <p className="admin-text text-xs font-medium truncate mb-0.5">{item.name}</p>
                  <p className="text-[#7A9BB5] text-xs">{item.size}</p>
                  <p className="text-[#7A9BB5] text-xs">{categoryLabels[item.category]}</p>
                </div>
                <div className="px-3 pb-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 text-xs border admin-border text-[#7A9BB5] hover:text-[#E2EAF2] py-1 rounded transition-colors">View</button>
                  <button className="p-1 text-[#7A9BB5] hover:text-red-400 border admin-border rounded transition-colors">
                    <Icon name="TrashIcon" size={12} />
                  </button>
                </div>
              </div>
            ))}
            {/* Upload placeholder */}
            <button className="admin-sidebar-bg border-2 border-dashed admin-border rounded-xl aspect-square flex flex-col items-center justify-center gap-2 hover:border-[#7A9BB5] transition-colors">
              <Icon name="PlusIcon" size={24} className="text-[#7A9BB5]" />
              <span className="text-xs text-[#7A9BB5]">Upload</span>
            </button>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="admin-sidebar-bg border admin-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b admin-border">
                  <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">File</th>
                  <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden md:table-cell">Size</th>
                  <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Uploaded</th>
                  <th className="text-right px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b admin-border hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary/40 rounded flex items-center justify-center flex-shrink-0">
                          <Icon name={typeIcons[item.type] as Parameters<typeof Icon>[0]['name']} size={14} className="text-[#7A9BB5]" />
                        </div>
                        <div>
                          <p className="admin-text text-sm font-medium">{item.name}</p>
                          <p className="text-[#7A9BB5] text-xs">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs bg-secondary/40 text-[#7A9BB5] px-2 py-0.5 rounded-full">{categoryLabels[item.category]}</span>
                    </td>
                    <td className="px-4 py-3 admin-text-muted text-xs hidden md:table-cell">{item.size}</td>
                    <td className="px-4 py-3 admin-text-muted text-xs hidden lg:table-cell">{item.uploadDate}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors">
                          <Icon name="EyeIcon" size={14} />
                        </button>
                        <button className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors">
                          <Icon name="ArrowDownTrayIcon" size={14} />
                        </button>
                        <button className="p-1.5 text-[#7A9BB5] hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                          <Icon name="TrashIcon" size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
