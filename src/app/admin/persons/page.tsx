'use client';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { personService, type PersonRow } from '@/lib/services/edpcaService';

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-700',
  archived: 'bg-yellow-100 text-yellow-800',
};

export default function PersonsPage() {
  const [persons, setPersons] = useState<PersonRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((rows) => setPersons(rows))
      .catch(() => setLoadError('Failed to load persons. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#7A9BB5] text-xs mb-1">
              <span>Admin</span><span>/</span><span className="text-[#E2EAF2]">Persons</span>
            </div>
            <h1 className="text-xl font-bold admin-text">Persons Database</h1>
            <p className="admin-text-muted text-xs mt-0.5">{persons.length} persons on record</p>
          </div>
          <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium px-4 py-2.5 rounded transition-all duration-150 active:scale-95 whitespace-nowrap">
            <span className="text-base font-bold leading-none">+</span>
            Add Person
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A9BB5]" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              className="w-full admin-sidebar-bg border admin-border text-[#E2EAF2] placeholder-[#7A9BB5] text-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7A9BB5]"
            />
          </div>
          <select className="admin-sidebar-bg border admin-border text-[#E2EAF2] text-sm px-3 py-2 rounded-lg focus:outline-none">
            <option value="">All Countries</option>
            <option>United Kingdom</option>
            <option>Germany</option>
            <option>France</option>
            <option>Netherlands</option>
          </select>
          <select className="admin-sidebar-bg border admin-border text-[#E2EAF2] text-sm px-3 py-2 rounded-lg focus:outline-none">
            <option value="">All Statuses</option>
            <option>Active</option>
            <option>Closed</option>
            <option>Archived</option>
          </select>
        </div>

        {/* Table */}
        <div className="admin-sidebar-bg border admin-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center">
              <div className="w-8 h-8 border-2 border-[#4A90D9] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="admin-text-muted text-sm">Loading persons...</p>
            </div>
          ) : loadError ? (
            <div className="p-8 text-center">
              <Icon name="ExclamationTriangleIcon" size={32} className="text-red-400 mx-auto mb-3" />
              <p className="text-red-300 text-sm">{loadError}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b admin-border">
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Person</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden md:table-cell">Contact</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Country</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Cases</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Latest Case</th>
                    <th className="text-left px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Status</th>
                    <th className="text-right px-4 py-3 admin-text-muted font-medium text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {persons.map((person) => (
                    <tr key={person.id} className="border-b admin-border hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                            <Icon name="UserIcon" size={14} className="text-[#E2EAF2]" />
                          </div>
                          <div>
                            <p className="admin-text font-medium">{person.name}</p>
                            <p className="admin-text-muted text-xs">{person.personRef}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="admin-text-muted text-xs">{person.email}</p>
                        <p className="admin-text-muted text-xs">{person.phone}</p>
                      </td>
                      <td className="px-4 py-3 admin-text-muted text-xs hidden lg:table-cell">{person.country}</td>
                      <td className="px-4 py-3">
                        <span className="admin-text font-semibold">{person.caseCount}</span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="font-mono text-xs text-[#7A9BB5]">{person.latestCase}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[person.status] || statusColors.active}`}>
                          {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors" title="View">
                            <Icon name="EyeIcon" size={14} />
                          </button>
                          <button className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors" title="Edit">
                            <Icon name="PencilSquareIcon" size={14} />
                          </button>
                          <Link href="/case-management" className="p-1.5 text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/40 rounded transition-colors" title="View Cases">
                            <Icon name="FolderOpenIcon" size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="px-4 py-3 border-t admin-border flex items-center justify-between">
            <p className="admin-text-muted text-xs">Showing {persons.length} of {persons.length} persons</p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 text-xs admin-text-muted border admin-border rounded hover:bg-secondary/30 transition-colors">Previous</button>
              <button className="px-3 py-1.5 text-xs bg-secondary/60 admin-text rounded">1</button>
              <button className="px-3 py-1.5 text-xs admin-text-muted border admin-border rounded hover:bg-secondary/30 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
