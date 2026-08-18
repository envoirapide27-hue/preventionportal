'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navGroups = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/admin-dashboard', icon: 'Squares2X2Icon', badge: null },
      { label: 'Cases', href: '/case-management', icon: 'FolderOpenIcon', badge: '12' },
      { label: 'Persons', href: '/admin/persons', icon: 'UsersIcon', badge: null },
    ],
  },
  {
    label: 'Notices',
    items: [
      { label: 'Public Notices', href: '/public-notices-page', icon: 'MegaphoneIcon', badge: '3' },
      { label: 'Charges & Payments', href: '/admin/charges', icon: 'BanknotesIcon', badge: '2' },
      { label: 'Messages', href: '/admin/messages', icon: 'EnvelopeIcon', badge: null },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Legal Information', href: '/admin/legal-information', icon: 'ScaleIcon', badge: null },
      { label: 'Reports', href: '/admin/reports', icon: 'ChartBarIcon', badge: null },
      { label: 'Website Content', href: '/admin/content', icon: 'DocumentTextIcon', badge: null },
      { label: 'Media', href: '/admin/media', icon: 'PhotoIcon', badge: null },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', href: '/admin-dashboard', icon: 'Cog6ToothIcon', badge: null },
    ],
  },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center ${collapsed ? 'justify-center px-3' : 'gap-3 px-4'} py-4 border-b admin-border`}>
        <AppLogo size={32} />
        {!collapsed && (
          <div className="min-w-0">
            <p className="admin-text font-semibold text-sm leading-tight truncate">EDPCA</p>
            <p className="admin-text-muted text-xs leading-tight">Admin Console</p>
          </div>
        )}
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navGroups.map((group) => (
          <div key={`group-${group.label}`} className="mb-4">
            {!collapsed && (
              <p className="admin-text-muted text-xs font-medium uppercase tracking-widest px-3 mb-1.5">
                {group.label}
              </p>
            )}
            {group.items.map((item) => (
              <Link
                key={`nav-item-${item.label}`}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-md mb-0.5 transition-all duration-150 group relative
                  ${isActive(item.href)
                    ? 'bg-secondary/60 admin-text' :'text-[#7A9BB5] hover:bg-secondary/30 hover:text-[#E2EAF2]'
                  }`}
              >
                <Icon
                  name={item.icon as Parameters<typeof Icon>[0]['name']}
                  size={18}
                  className={isActive(item.href) ? 'text-[#E2EAF2]' : 'text-[#7A9BB5] group-hover:text-[#E2EAF2]'}
                />
                {!collapsed && (
                  <>
                    <span className="text-sm flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-accent text-accent-foreground text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t admin-border p-3">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-md">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <Icon name="UserIcon" size={16} className="text-[#E2EAF2]" />
            </div>
            <div className="min-w-0">
              <p className="admin-text text-sm font-medium truncate">Administrator</p>
              <p className="admin-text-muted text-xs truncate">admin@edpca.eu</p>
            </div>
          </div>
        )}
        <Link
          href="/admin-login"
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-3'} py-2 rounded-md text-[#7A9BB5] hover:text-[#E2EAF2] hover:bg-secondary/30 transition-colors text-sm`}
        >
          <Icon name="ArrowLeftOnRectangleIcon" size={18} />
          {!collapsed && 'Logout'}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col admin-sidebar-bg border-r admin-border transition-all duration-300 flex-shrink-0 ${collapsed ? 'w-16' : 'w-60'}`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 -right-3 w-6 h-6 bg-secondary border admin-border rounded-full flex items-center justify-center text-[#7A9BB5] hover:text-[#E2EAF2] transition-colors z-10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={collapsed ? 'ChevronRightIcon' : 'ChevronLeftIcon'} size={12} />
        </button>
      </aside>

      {/* Mobile Topbar */}
      <div className="lg:hidden flex items-center justify-between admin-sidebar-bg border-b admin-border px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <AppLogo size={28} />
          <span className="admin-text font-semibold text-sm">EDPCA Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="admin-text-muted hover:admin-text p-2 rounded transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="admin-sidebar-bg w-64 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b admin-border">
              <div className="flex items-center gap-3">
                <AppLogo size={28} />
                <span className="admin-text font-semibold text-sm">Admin Console</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="admin-text-muted p-1 rounded">
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}