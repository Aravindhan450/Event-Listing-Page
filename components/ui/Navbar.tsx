"use client";

import React, { useEffect, useRef, useState } from 'react';
import SearchBar from '../home/SearchBar';

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [signOutHovered, setSignOutHovered] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('.profile-dropdown')) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const input = mobileSearchInputRef.current;
    if (!input) {
      return;
    }

    const timer = window.setTimeout(() => {
      input.focus();
      input.select();
    }, 30);

    return () => window.clearTimeout(timer);
  }, [isSearchOpen]);

  const queryValue = searchQuery ?? '';
  const handleQueryChange = (value: string) => {
    if (onSearchQueryChange) {
      onSearchQueryChange(value);
    }
  };

  const profileButton = (
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
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>AB</div>
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
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>AB</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Aravindhan B</div>
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
  );

  return (
    <nav className="sticky top-0 z-[1000] overflow-visible border-b border-slate-200 bg-white animate-fade-in anim-slide-down">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {!isSearchOpen ? (
          <div className="sm:hidden flex items-center justify-between py-3">
            <div className="min-w-0">
              <span style={{ fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' }} className="text-indigo-900 tracking-tight">
                VickyBytes
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Open search"
                onClick={() => {
                  setShowProfile(false);
                  setIsSearchOpen(true);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-slate-100 active:scale-90"
              >
                <span className="material-symbols-outlined text-slate-700">search</span>
              </button>
              {profileButton}
            </div>
          </div>
        ) : (
          <div className="sm:hidden absolute inset-0 z-50 bg-white border-b border-slate-200 px-3 py-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setIsSearchOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={queryValue}
                onChange={(event) => handleQueryChange(event.target.value)}
                placeholder={placeholder}
                aria-label="Search events"
                className="h-10 w-full rounded-full border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mt-2 px-1 text-xs text-slate-500">
              Try: Cloud, AI/ML, DevOps
            </div>
          </div>
        )}

        <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_minmax(220px,640px)_minmax(0,1fr)] items-center gap-3 py-3 sm:gap-4 sm:py-4">
          <div className="min-w-0 justify-self-start">
            <span style={{ fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' }} className="text-indigo-900 tracking-tight">VickyBytes</span>
          </div>

          <div className="justify-self-center w-full">
            <SearchBar
              value={queryValue}
              onChange={handleQueryChange}
              placeholder={placeholder}
            />
          </div>

          <div className="min-w-0 justify-self-end">
            {profileButton}
          </div>
        </div>
      </div>
    </nav>
  );
}
