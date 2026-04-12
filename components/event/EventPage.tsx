"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import VideoPlayer from '../ui/VideoPlayer';
import LiveChat from './LiveChat';
import Navbar from '../ui/Navbar';
import { events } from '../../data/events';
import type { Event } from '../../types/event';
import Link from 'next/link';
import { useEventSearch } from '../../hooks/useEventSearch';

type EventPageProps = {
  id: string;
};

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
      { id: 'explore-events', label: 'Explore Events', icon: 'travel_explore', kind: 'route', value: '/events' },
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

export default function EventPage({ id }: EventPageProps) {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isTabletChatOpen, setIsTabletChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [manualActiveItemId, setManualActiveItemId] = useState<string | null>(null);
  const [desktopChatHeight, setDesktopChatHeight] = useState<number | null>(null);
  const leftContentRef = useRef<HTMLElement | null>(null);
  const allEvents = events as Event[];
  const { query, setQuery } = useEventSearch(allEvents);
  const pathname = usePathname();
  const router = useRouter();
  const parsedId = parseInt(id, 10);
  const matchedEvent = allEvents.find((e) => e.id === parsedId);
  const normalizedQuery = query.trim().toLowerCase();

  const derivedActiveItemId = useMemo(() => {
    if (pathname === '/') {
      return 'home';
    }

    if (pathname.startsWith('/events/') && !normalizedQuery) {
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
      router.push(item.value ?? '/events');
      return;
    }

    if (item.kind === 'query') {
      setManualActiveItemId(null);
      setQuery(item.value ?? '');
      setIsSidebarOpen(false);
      if (!pathname.startsWith('/events')) {
        router.push('/events');
      } else if (pathname !== '/events') {
        router.push('/events');
      }
      return;
    }

    setManualActiveItemId(item.id);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const leftColumn = leftContentRef.current;
    if (!leftColumn) {
      return;
    }

    const updateHeight = () => {
      const nextHeight = Math.ceil(leftColumn.getBoundingClientRect().height);
      setDesktopChatHeight((prev) => (prev === nextHeight ? prev : nextHeight));
    };

    updateHeight();

    const observer = new ResizeObserver(() => updateHeight());
    observer.observe(leftColumn);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [matchedEvent?.id]);

  if (!matchedEvent) {
    return (
      <div className="event-page min-h-screen bg-background text-on-background">
        <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-on-surface">Event not found</h1>
            <Link href="/" className="mt-4 inline-block text-primary hover:underline">Go back home</Link>
          </div>
        </main>
      </div>
    );
  }

  const [date, time] = (matchedEvent.datetime || '').split('•').map((value: string) => value.trim());
  const speakerName = matchedEvent.alt || matchedEvent.title;
  const speakerInitials = speakerName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0])
    .join('')
    .toUpperCase();

  const event = {
    id: matchedEvent.id,
    title: matchedEvent.title,
    category: matchedEvent.category,
    eventType: matchedEvent.type,
    date,
    time,
    description: [
      `${matchedEvent.title} is part of our curated ${matchedEvent.category} track for modern engineering teams.`,
      `Explore practical patterns, implementation strategies, and production lessons from experienced builders in this ${matchedEvent.type} session.`,
      `Use this event to deepen your understanding and connect with developers working on similar challenges.`,
    ],
    tags: [matchedEvent.category, matchedEvent.type],
    speaker: {
      name: speakerName,
      role: `${matchedEvent.category} Session Host`,
      avatarInitials: speakerInitials || 'EV',
    },
    videoUrl: matchedEvent.videoUrl,
    viewerCount: 1000 + matchedEvent.id * 37,
    image: matchedEvent.image,
  };

  return (
    <div className="event-page min-h-screen bg-background text-on-background">
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

      <main className="mx-auto w-full max-w-370 overflow-x-hidden px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-5 md:ml-16 lg:ml-60 lg:px-8 lg:pb-10 lg:pt-6">
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

        <div className="event-page-layout grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section ref={leftContentRef} className="min-w-0">
            <div className="anim-scale-in d1 animate-scale-in mb-3 w-full sm:mb-4">
              <div className="w-full">
                <VideoPlayer
                  videoUrl={event.videoUrl}
                  thumbnail={event.image}
                  category={event.category}
                  date={event.date}
                  time={event.time}
                  eventType={event.eventType}
                  title={event.title}
                  speaker={event.speaker}
                  viewerCount={event.viewerCount}
                  description={event.description}
                  tags={event.tags}
                />
            </div>
            </div>

            <section className="mt-3 hidden md:block lg:hidden">
              <button
                type="button"
                onClick={() => setIsTabletChatOpen((prev) => !prev)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                {isTabletChatOpen ? 'Hide live chat' : 'Show live chat'}
              </button>

              {isTabletChatOpen && (
                <div className="mt-3 flex h-115 min-h-0 flex-col overflow-hidden rounded-xl border border-[rgba(15,23,42,0.24)]">
                  <LiveChat viewerCount={event.viewerCount} />
                </div>
              )}
            </section>
          </section>

          <aside
            className="event-chat-column anim-fade-left d2 animate-fade-left hidden min-h-0 self-start overflow-hidden rounded-xl border border-[rgba(15,23,42,0.24)] lg:flex lg:h-[calc(100vh-6rem)]"
            style={desktopChatHeight ? { height: `${desktopChatHeight}px` } : undefined}
          >
            <LiveChat viewerCount={event.viewerCount} />
          </aside>
        </div>
      </main>

      <button
        type="button"
        onClick={() => setIsMobileChatOpen(true)}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg md:hidden"
      >
        <span className="material-symbols-outlined text-base">chat</span>
        Live chat
      </button>

      {isMobileChatOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 animate-[fadeIn_200ms_ease-out] bg-black/40"
            onClick={() => setIsMobileChatOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 flex h-[72vh] max-h-[80vh] flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white animate-[sheetUp_240ms_cubic-bezier(0.22,1,0.36,1)] overscroll-contain">
            <div className="flex justify-center bg-white pb-1 pt-2">
              <span className="h-1.5 w-12 rounded-full bg-slate-300" aria-hidden="true" />
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
              <div className="text-sm font-bold uppercase tracking-wide text-slate-800">Live chat</div>
              <button
                type="button"
                aria-label="Close live chat"
                onClick={() => setIsMobileChatOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100"
              >
                <span className="material-symbols-outlined text-slate-600">close</span>
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <LiveChat viewerCount={event.viewerCount} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes sheetUp {
          from {
            transform: translateY(24px);
            opacity: 0.88;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 1280px) and (min-width: 1024px) {
          .event-chat-column {
            width: 280px !important;
            min-width: 280px !important;
          }
        }
      `}</style>
    </div>
  );
}
