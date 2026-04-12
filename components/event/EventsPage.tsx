"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { events } from '../../data/events';
import type { Event } from '../../types/event';
import { useEventSearch } from '../../hooks/useEventSearch';

type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  kind: 'route' | 'query' | 'static';
  value?: string;
};

type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    items: [
      { id: 'home', label: 'Home', icon: 'home', kind: 'route', value: '/' },
      { id: 'explore-events', label: 'Explore Events', icon: 'travel_explore', kind: 'query', value: '' },
      { id: 'live-events', label: 'Live Events', icon: 'radio_button_checked', kind: 'query', value: 'live' },
    ],
  },
  {
    title: 'My Activity',
    items: [
      { id: 'saved-events', label: 'Saved Events', icon: 'star', kind: 'static' },
      { id: 'registered-events', label: 'Registered Events', icon: 'event', kind: 'static' },
      { id: 'watch-later', label: 'Watch Later', icon: 'schedule', kind: 'static' },
    ],
  },
  {
    title: 'Explore',
    items: [
      { id: 'cloud', label: 'Cloud', icon: 'cloud', kind: 'query', value: 'Cloud' },
      { id: 'ai-ml', label: 'AI / ML', icon: 'psychology', kind: 'query', value: 'AI/ML' },
      { id: 'devops', label: 'DevOps', icon: 'settings', kind: 'query', value: 'DevOps' },
      { id: 'cybersecurity', label: 'Cybersecurity', icon: 'shield_lock', kind: 'query', value: 'Cybersecurity' },
      { id: 'web3', label: 'Web3', icon: 'language', kind: 'query', value: 'Web3' },
      { id: 'backend', label: 'Backend', icon: 'dns', kind: 'query', value: 'Backend' },
    ],
  },
];

function getDescriptionSnippet(event: Event): string {
  if (typeof event.description === 'string') {
    return event.description;
  }

  if (Array.isArray(event.description) && event.description.length > 0) {
    return event.description[0];
  }

  const tags = event.tags?.join(', ');
  if (tags) {
    return `Topics: ${tags}`;
  }

  return `${event.type} event in ${event.category}`;
}

function SidebarContent({
  sections,
  activeItemId,
  condensed,
  onSelect,
}: {
  sections: SidebarSection[];
  activeItemId: string;
  condensed?: boolean;
  onSelect: (item: SidebarItem) => void;
}) {
  return (
    <div className={condensed ? 'px-2 pb-4' : 'px-3 pb-6'}>
      {sections.map((section) => (
        <div key={section.title ?? 'main'} className="mb-4">
          {!condensed && section.title && (
            <div className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {section.title}
            </div>
          )}

          <div className="space-y-1">
            {section.items.map((item) => {
              const isActive = activeItemId === item.id;
              const isLive = item.id === 'live-events';
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item)}
                  aria-label={item.label}
                  className={`flex w-full items-center rounded-xl transition-colors ${
                    condensed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'
                  } ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isLive ? 'text-red-500' : isActive ? 'text-indigo-700' : 'text-slate-500'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!condensed && <span className="truncate text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventsPage() {
  const allEvents = events as Event[];
  const { query, setQuery, filteredEvents } = useEventSearch(allEvents);
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [manualActiveItemId, setManualActiveItemId] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const derivedActiveItemId = useMemo(() => {
    if (pathname === '/') {
      return 'home';
    }

    if (!normalizedQuery) {
      return 'explore-events';
    }

    const matched = SIDEBAR_SECTIONS.flatMap((section) => section.items).find((item) => {
      if (item.kind !== 'query') {
        return false;
      }
      return (item.value ?? '').toLowerCase() === normalizedQuery;
    });

    return matched?.id ?? '';
  }, [normalizedQuery, pathname]);

  const activeItemId = derivedActiveItemId || manualActiveItemId || '';

  const handleSidebarSelect = (item: SidebarItem) => {
    if (item.kind === 'route') {
      setManualActiveItemId(null);
      setIsSidebarOpen(false);

      if (item.value === '/') {
        router.push('/');
        return;
      }

      if (item.value === '/events') {
        setQuery('');
      }
      router.push(item.value ?? '/events');
      return;
    }

    if (item.kind === 'query') {
      setManualActiveItemId(null);
      setQuery(item.value ?? '');
      setIsSidebarOpen(false);
      return;
    }

    setManualActiveItemId(item.id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar
        searchQuery={query}
        onSearchQueryChange={setQuery}
        placeholder="Search events by title, category, description, or tags..."
      />

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 overflow-y-auto border-r border-slate-200 bg-slate-50/95 pb-5 pt-[76px] backdrop-blur lg:block">
        <SidebarContent
          sections={SIDEBAR_SECTIONS}
          activeItemId={activeItemId}
          onSelect={handleSidebarSelect}
        />
      </aside>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-16 overflow-y-auto border-r border-slate-200 bg-slate-50/95 pb-5 pt-[76px] md:block lg:hidden">
        <div className="px-2 pb-2">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsSidebarOpen(true)}
            className="flex w-full items-center justify-center rounded-xl px-2 py-2.5 text-slate-700 transition-colors hover:bg-slate-200/70"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
        <SidebarContent
          sections={SIDEBAR_SECTIONS}
          activeItemId={activeItemId}
          condensed
          onSelect={handleSidebarSelect}
        />
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-[1200] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation drawer"
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="absolute left-0 top-0 h-full w-[240px] overflow-y-auto border-r border-slate-200 bg-slate-50 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <span className="text-base font-bold tracking-tight text-slate-900">Navigation</span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setIsSidebarOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-200/70"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <SidebarContent
              sections={SIDEBAR_SECTIONS}
              activeItemId={activeItemId}
              onSelect={handleSidebarSelect}
            />
          </aside>
        </div>
      )}

      <main className="pb-10 pt-6 md:ml-16 sm:pt-8 lg:ml-60">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="mb-5 sm:mb-6">
            <div className="mb-3 flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                <span className="material-symbols-outlined text-[18px]">menu</span>
                Browse
              </button>
            </div>
            <h1 className="text-2xl font-bold text-on-surface sm:text-3xl">Events</h1>
            <p className="mt-2 text-sm text-on-surface-variant sm:text-base">
              {query.trim()
                ? `Showing ${filteredEvents.length} result${filteredEvents.length === 1 ? '' : 's'} for "${query}"`
                : `Showing all ${filteredEvents.length} events`}
            </p>
          </section>

          {filteredEvents.length === 0 ? (
            <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center">
              <h2 className="text-lg font-semibold text-on-surface">No events match your search</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Try a different keyword or clear the search.</p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.alt || event.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-500">
                        No thumbnail
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="mb-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                      {event.category}
                    </div>
                    <h2 className="line-clamp-2 text-base font-semibold text-on-surface">{event.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm text-on-surface-variant">{getDescriptionSnippet(event)}</p>
                    <p className="mt-3 text-xs text-on-surface-variant">{event.datetime}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
