"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { events } from '../data/events';
import { useDebounce } from '../hooks/useDebounce';
import WhyHostSection from './components/WhyHostSection';
import Footer from './components/Footer';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text: string, query: string): React.ReactNode {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return text;
  }

  const safeQuery = escapeRegExp(normalizedQuery);
  const regex = new RegExp(`(${safeQuery})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === normalizedQuery.toLowerCase()) {
      return (
        <span key={`${part}-${index}`} className="bg-yellow-200 rounded px-1">
          {part}
        </span>
      );
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        setLiked(!liked);
      }}
      className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm transition-colors duration-200 cursor-pointer active:scale-110"
    >
      <span 
        className={`material-symbols-outlined !text-xl ${liked ? 'text-[#ef4444]' : 'text-white'}`}
        style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
      >
        favorite
      </span>
    </button>
  );
}

function EventCard({ event, query }: { event: any; query: string }) {
  const router = useRouter();
  const categoryPillClasses =
    event.categoryClasses ||
    "text-[10px] uppercase tracking-widest font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10";
  const eventDate =
    event.date ||
    (typeof event.datetime === 'string' ? event.datetime.split('•')[0].trim() : '');
  const eventTime =
    event.time ||
    (typeof event.datetime === 'string' && event.datetime.includes('•')
      ? event.datetime.split('•')[1].trim()
      : '');

  return (
    <div
      className="group w-full h-full bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col cursor-pointer"
      onClick={() => router.push(`/events/${event.id}`)}
    >
      <div className="relative w-full aspect-video overflow-hidden" style={{ position: 'relative' }}>
        <img 
          alt={event.alt} 
          className="transition-transform group-hover:scale-105 rounded-t-xl" 
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          src={event.image}
          loading="lazy"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 100%)',
          borderRadius: 'inherit',
          pointerEvents: 'none'
        }} />
        <LikeButton />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span className={categoryPillClasses} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            <span>{event.category}</span>
          </span>
        </div>
        <span className="text-xs text-on-surface-variant" style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>{eventDate} • {eventTime}</span>
        <h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">
          {highlightText(event.title, query)}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
          <button className="inline-flex text-primary text-sm font-semibold hover:underline cursor-pointer transition-all duration-200 ease-in-out hover:text-indigo-600 hover:translate-x-1">View Details</button>
          <button className="inline-flex p-2 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer transition-all duration-200 ease-in-out hover:text-indigo-600 hover:scale-125">
            <span className="material-symbols-outlined text-on-surface-variant">share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  searchQuery,
  onClearSearch,
}: {
  searchQuery: string;
  onClearSearch: () => void;
}) {
  const trimmedQuery = searchQuery.trim();
  const message = trimmedQuery ? `No results found for "${trimmedQuery}"` : 'No events found';

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center editorial-shadow">
      <h3 className="text-xl font-bold text-on-surface mb-3">{message}</h3>
      <p className="text-on-surface-variant text-sm mb-4">
        Try one of the suggestions below to find relevant events.
      </p>
      <ul className="text-sm text-on-surface-variant space-y-2 mb-6">
        <li>Try a different keyword</li>
        <li>Check spelling</li>
        <li>Clear search</li>
      </ul>
      <button
        type="button"
        onClick={onClearSearch}
        className="px-4 py-2 rounded-lg bg-primary text-on-primary font-medium hover:opacity-90 transition-opacity"
      >
        Clear search
      </button>
    </div>
  );
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [eventTypeFilter, setEventTypeFilter] = useState('All Types');
  const [sortOption, setSortOption] = useState('Soonest');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const finalEvents = useMemo(() => {
    const normalizedSearchQuery = debouncedSearch.trim().toLowerCase();
    return events.filter((event: any) =>
      (event.title || '').toLowerCase().includes(normalizedSearchQuery)
    );
  }, [debouncedSearch]);

  if (loading) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        backgroundColor: '#0f0f1a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 9999
      }}>
        <h1 style={{ color: '#ffffff', fontSize: '28px', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.5px' }}>
          The Kinetic Curator
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '40px' }}>
          Curated engineering experiences
        </p>
        <div style={{
          width: '180px', height: '3px',
          backgroundColor: '#1f1f2e',
          borderRadius: '99px', overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: '40%',
            backgroundColor: '#4f46e5',
            borderRadius: '99px',
            animation: 'slide 1.4s ease-in-out infinite'
          }} />
        </div>
        <style>{`
          @keyframes slide {
            0% { transform: translateX(-100%) scaleX(0.5); }
            50% { transform: translateX(150%) scaleX(1.2); }
            100% { transform: translateX(400%) scaleX(0.5); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
<div style={{ animation: 'fadeIn 0.6s ease-in-out' }}>
{/*  TopNavBar Component  */}
<nav className="bg-surface/70 backdrop-blur-md nav-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%', padding: '16px 24px', borderBottom: '1px solid #e5e7eb', boxSizing: 'border-box' }}>
  {/* LEFT - column 1 */}
  <div style={{ justifySelf: 'start' }}>
    <span style={{ fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' }} className="text-indigo-900 tracking-tight">The Kinetic Curator</span>
  </div>

  {/* RIGHT - column 3 */}
  <div style={{ gridColumn: '3', justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '12px' }}>
    <button className="p-2 rounded-full hover:bg-slate-100/50 transition-all active:scale-90 duration-200">
      <span className="material-symbols-outlined text-slate-600">notifications</span>
    </button>
    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>AK</div>
  </div>
</nav>
<main className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full">
{/*  Hero Search Section  */}
<section className="mb-12">
<div className="max-w-4xl mx-auto text-center mb-10">
<h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-on-surface mb-6">Master the tech stack.</h1>
<p className="text-on-surface-variant text-lg">Curated engineering and software experiences for the modern developer.</p>
</div>
<div className="bg-surface-container-lowest rounded-xl editorial-shadow p-2 md:p-4 flex flex-col md:flex-row gap-4 items-center">
<div className="relative w-full md:flex-1">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface" placeholder="Search frameworks, summits, or workshops..." type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
</div>
</div>
<div className="flex gap-4 mt-6 flex-wrap">
  <select
    value={dateFilter}
    onChange={(e) => setDateFilter(e.target.value)}
    className="border rounded-lg px-3 py-2 bg-white"
  >
    <option>All Dates</option>
    <option>Today</option>
    <option>This Week</option>
    <option>This Month</option>
  </select>

  <select
    value={eventTypeFilter}
    onChange={(e) => setEventTypeFilter(e.target.value)}
    className="border rounded-lg px-3 py-2 bg-white"
  >
    <option>All Types</option>
    <option>Workshop</option>
    <option>Summit</option>
    <option>Bootcamp</option>
    <option>Masterclass</option>
    <option>Expo</option>
  </select>

  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="border rounded-lg px-3 py-2 bg-white"
  >
    <option>Soonest</option>
    <option>Newest</option>
  </select>
</div>
</section>
{/*  Events Grid  */}
{finalEvents.length === 0 ? (
  <EmptyState
    searchQuery={debouncedSearch}
    onClearSearch={() => {
      setSearch('');
    }}
  />
) : (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {finalEvents.map((event: any) => (
        <EventCard key={event.id} event={event} query={debouncedSearch} />
      ))}
    </div>
  </>
)}

<WhyHostSection />
</main>
<Footer />
</div>
<style>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>
    </>
  );
}
