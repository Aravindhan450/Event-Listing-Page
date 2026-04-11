"use client";

import React, { useEffect, useMemo, useState } from 'react';

type NavbarProps = {
  searchQuery?: string;
  onSearchQueryChange?: (value: string) => void;
  placeholder?: string;
};

const menuItems = [
  { id: 'profile', label: 'Your Profile', icon: 'person' },
  { id: 'liked', label: 'Liked Events', icon: 'favorite' },
  { id: 'registered', label: 'Registered Events', icon: 'event' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
] as const;

export default function Navbar({
  searchQuery,
  onSearchQueryChange,
  placeholder = 'Search frameworks, summits, or workshops...',
}: NavbarProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [signOutHovered, setSignOutHovered] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('.profile-dropdown')) {
        setShowProfile(false);
      }
      if (!target?.closest('.mobile-search-wrap')) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  const inputBinding = useMemo(
    () =>
      onSearchQueryChange
        ? {
            value: searchQuery ?? '',
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              onSearchQueryChange(event.target.value),
          }
        : {},
    [onSearchQueryChange, searchQuery]
  );

  return (
    <nav className="sticky top-0 z-[1000] overflow-visible border-b border-slate-200 bg-white animate-fade-in anim-slide-down">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3 sm:gap-4 sm:py-4">
          <div className="min-w-0 justify-self-start">
            <span style={{ fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' }} className="text-indigo-900 tracking-tight">VickyBytes</span>
          </div>

          <div className="justify-self-center w-full max-w-[600px]">
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setShowMobileSearch((prev) => !prev)}
              className="mobile-search-wrap mx-auto flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 transition-all active:scale-90 sm:hidden"
            >
              <span className="material-symbols-outlined text-slate-700">search</span>
            </button>

            <div className="hidden sm:block">
            <div style={{
              display: 'flex', alignItems: 'center',
              backgroundColor: '#ffffff', borderRadius: '99px',
              padding: '12px 16px 12px 20px',
              border: '1px solid rgba(15, 23, 42, 0.18)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              gap: '12px', width: '100%'
            }}>
              <svg width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                {...inputBinding}
                placeholder={placeholder}
                aria-label="Search events"
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', color: '#111827', background: 'transparent' }}
              />
            </div>
            </div>
          </div>

          <div className="min-w-0 justify-self-end">
              <button
                type="button"
                className="profile-dropdown relative"
                aria-label="Open profile menu"
                aria-expanded={showProfile}
                onClick={(event) => {
                  event.stopPropagation();
                  setShowProfile((prev) => !prev);
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>AK</div>
                {showProfile && (
                  <div style={{
                    position: 'absolute',
                    top: '44px',
                    right: '0',
                    width: '280px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
                    border: '1px solid #e5e7eb',
                    zIndex: 1100,
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 14px 12px', borderBottom: '1px solid #e5e7eb' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>AK</div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Aravindhan K</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>@aravindhan · Developer</div>
                      </div>
                    </div>

                    <div style={{ padding: '8px' }}>
                      {menuItems.map((item) => (
                        <div
                          key={item.id}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            backgroundColor: hoveredItem === item.id ? '#f8fafc' : 'transparent'
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#64748b' }}>{item.icon}</span>
                          <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{item.label}</span>
                        </div>
                      ))}

                      <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '8px 2px' }} />

                      <div
                        onMouseEnter={() => setSignOutHovered(true)}
                        onMouseLeave={() => setSignOutHovered(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 10px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          backgroundColor: signOutHovered ? '#fef2f2' : 'transparent'
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#dc2626' }}>logout</span>
                        <span style={{ fontSize: '14px', color: '#dc2626', fontWeight: 600 }}>Sign Out</span>
                      </div>
                    </div>
                  </div>
                )}
              </button>
          </div>
        </div>

        {showMobileSearch && (
          <div className="mobile-search-wrap sm:hidden pb-3">
            <div style={{
              display: 'flex', alignItems: 'center',
              backgroundColor: '#ffffff', borderRadius: '99px',
              padding: '10px 14px 10px 16px',
              border: '1px solid rgba(15, 23, 42, 0.18)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              gap: '10px', width: '100%'
            }}>
              <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                {...inputBinding}
                placeholder={placeholder}
                aria-label="Search events"
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#111827', background: 'transparent' }}
              />
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
