"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { events } from '../data/events';
import WhyHostSection from './components/WhyHostSection';
import Footer from './components/Footer';

const ALLOWED_CATEGORIES = ['Development', 'DevOps', 'AI/ML', 'Cloud', 'Cybersecurity', 'Mobile', 'Web3', 'Backend', 'Design'];

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

function EventCard({ event, query, index }: { event: any; query: string; index: number }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animation: `fadeSlideUp 0.5s ease-out ${0.1 + index * 0.06}s both` }}
    >
      <div className="relative w-full h-72 overflow-hidden" style={{ position: 'relative' }}>
        <img 
          alt={event.alt} 
          className="transition-transform group-hover:scale-105 rounded-t-xl" 
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          src={event.image}
          loading="lazy"
        />
        {isHovered && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'inherit',
            animation: 'fadeIn 0.2s ease-out both',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              transform: isHovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.2s ease'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#4f46e5">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
          </div>
        )}
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('Default');
  const [timeRange, setTimeRange] = useState('Any Time');
  const [timeOfDay, setTimeOfDay] = useState('Any');
  const [eventType, setEventType] = useState('All Types');
  const [showTrending, setShowTrending] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    events.forEach((event: any) => {
      if (!ALLOWED_CATEGORIES.includes(event.category)) {
        console.warn(`Invalid category detected for event: ${event.title}`);
      }
    });
  }, []);

  const finalEvents = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const now = new Date();

    const normalizedEventDate = (datetime: string) => new Date((datetime || '').replace('•', ''));

    const inCurrentWeek = (eventDate: Date) => {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      start.setDate(now.getDate() - now.getDay());

      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      return eventDate >= start && eventDate < end;
    };

    const inCurrentMonth = (eventDate: Date) => (
      eventDate.getFullYear() === now.getFullYear() && eventDate.getMonth() === now.getMonth()
    );

    const parseHour = (datetime: string) => {
      const segment = (datetime || '').split('• ')[1] || '';
      const [rawHour] = segment.split(':');
      const parsedHour = parseInt(rawHour || '0', 10);
      if (Number.isNaN(parsedHour)) {
        return 0;
      }
      if (segment.includes('PM') && parsedHour !== 12) {
        return parsedHour + 12;
      }
      if (segment.includes('AM') && parsedHour === 12) {
        return 0;
      }
      return parsedHour;
    };

    let filteredEvents = events.filter((event: any) => {
      const matchesSearch = (event.title || '').toLowerCase().includes(normalizedSearchQuery);
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;

      const eventHour = parseHour(event.datetime || '');
      const matchesTimeOfDay =
        timeOfDay === 'Any' ||
        (timeOfDay === 'Morning' && eventHour < 12) ||
        (timeOfDay === 'Afternoon' && eventHour >= 12 && eventHour < 17) ||
        (timeOfDay === 'Evening' && eventHour >= 17);

      const titleLower = (event.title || '').toLowerCase();
      const typeLower = (event.type || '').toLowerCase();
      const matchesEventType =
        eventType === 'All Types' ||
        (eventType === 'Summit' && (typeLower === 'summit' || titleLower.includes('summit'))) ||
        (eventType === 'Workshop' && (typeLower === 'workshop' || titleLower.includes('workshop'))) ||
        (eventType === 'Conference' && (typeLower === 'conference' || titleLower.includes('conference') || titleLower.includes('expo'))) ||
        (eventType === 'Bootcamp' && (typeLower === 'bootcamp' || titleLower.includes('bootcamp'))) ||
        (eventType === 'Expo' && (typeLower === 'expo' || titleLower.includes('expo')));

      const eventDate = normalizedEventDate(event.datetime || '');
      const matchesTimeRange =
        timeRange === 'Any Time' ||
        (timeRange === 'Today' && eventDate.toDateString() === now.toDateString()) ||
        (timeRange === 'This Week' && inCurrentWeek(eventDate)) ||
        (timeRange === 'This Month' && inCurrentMonth(eventDate));

      return matchesSearch && matchesCategory && matchesTimeOfDay && matchesEventType && matchesTimeRange;
    });

    if (showUpcoming) {
      filteredEvents = filteredEvents.filter((event: any) => normalizedEventDate(event.datetime || '') > now);
    }

    if (showTrending) {
      filteredEvents = filteredEvents.filter((_: any, index: number) => index % 3 === 0);
    }

    if (sortBy === 'A → Z') {
      filteredEvents = [...filteredEvents].sort((a: any, b: any) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Z → A') {
      filteredEvents = [...filteredEvents].sort((a: any, b: any) => b.title.localeCompare(a.title));
    } else if (sortBy === 'Date: Earliest') {
      filteredEvents = [...filteredEvents].sort(
        (a: any, b: any) =>
          normalizedEventDate(a.datetime || '').getTime() - normalizedEventDate(b.datetime || '').getTime()
      );
    } else if (sortBy === 'Date: Latest') {
      filteredEvents = [...filteredEvents].sort(
        (a: any, b: any) =>
          normalizedEventDate(b.datetime || '').getTime() - normalizedEventDate(a.datetime || '').getTime()
      );
    }

    return filteredEvents;
  }, [searchQuery, activeCategory, sortBy, timeRange, timeOfDay, eventType, showTrending, showUpcoming]);

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
<main className="pt-28 pb-16 w-full" style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px', paddingTop: '7rem' }}>
{/*  Hero Search Section  */}
<section className="mb-12">
<div className="max-w-4xl mx-auto text-center mb-10">
<h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-on-surface mb-6" style={{ animation: 'fadeSlideUp 0.6s ease-out both' }}>Master the tech stack.</h1>
<p className="text-on-surface-variant text-lg" style={{ animation: 'fadeSlideUp 0.6s ease-out 0.15s both' }}>Curated engineering and software experiences for the modern developer.</p>
</div>
<div style={{
  display: 'flex', alignItems: 'center',
  backgroundColor: '#ffffff', borderRadius: '99px',
  padding: '12px 16px 12px 20px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  gap: '12px', width: '100%', maxWidth: '760px', margin: '0 auto'
}}>
  <svg width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
  <input
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search frameworks, summits, or workshops..."
    style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', color: '#111827', background: 'transparent' }}
  />
  <button style={{
    backgroundColor: '#4f46e5', color: '#ffffff',
    border: 'none', borderRadius: '99px',
    padding: '10px 24px', fontSize: '14px',
    fontWeight: 600, cursor: 'pointer',
    whiteSpace: 'nowrap'
  }}>Explore</button>
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
  {['All', 'Development', 'DevOps', 'AI/ML', 'Cloud', 'Cybersecurity', 'Mobile', 'Web3', 'Backend', 'Design'].map(cat => (
    <button key={cat} onClick={() => setActiveCategory(cat)} style={{
      padding: '7px 18px', borderRadius: '99px', fontSize: '13px', fontWeight: 500,
      cursor: 'pointer', border: '1.5px solid', transition: 'all 0.2s ease',
      backgroundColor: activeCategory === cat ? '#4f46e5' : 'transparent',
      borderColor: activeCategory === cat ? '#4f46e5' : '#d1d5db',
      color: activeCategory === cat ? '#ffffff' : '#374151'
    }}>{cat}</button>
  ))}
</div>

<div style={{ textAlign: 'center', marginTop: '14px' }}>
  <button onClick={() => setShowFilters(!showFilters)} style={{
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#4f46e5', fontSize: '14px', fontWeight: 600,
    display: 'inline-flex', alignItems: 'center', gap: '6px'
  }}>
    <svg width="16" height="16" fill="none" stroke="#4f46e5" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
      <line x1="11" y1="18" x2="13" y2="18"/>
    </svg>
    {showFilters ? 'Hide Filters' : 'Advanced Filters'}
  </button>
</div>

{showFilters && (
  <div style={{
    marginTop: '16px', padding: '20px 24px',
    backgroundColor: '#ffffff', borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    display: 'flex', flexDirection: 'column', gap: '16px',
    animation: 'fadeSlideUp 0.3s ease-out both'
  }}>

    {/* Row 1 - Sort */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: '90px' }}>Sort By</span>
      {['Default', 'A → Z', 'Z → A', 'Date: Earliest', 'Date: Latest'].map(opt => (
        <button key={opt} onClick={() => setSortBy(opt)} style={{
          padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
          border: '1.5px solid', transition: 'all 0.2s ease',
          backgroundColor: sortBy === opt ? '#4f46e5' : 'transparent',
          borderColor: sortBy === opt ? '#4f46e5' : '#d1d5db',
          color: sortBy === opt ? '#ffffff' : '#374151'
        }}>{opt}</button>
      ))}
    </div>

    {/* Row 2 - Time Range */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: '90px' }}>Time Range</span>
      {['Any Time', 'Today', 'This Week', 'This Month'].map(opt => (
        <button key={opt} onClick={() => setTimeRange(opt)} style={{
          padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
          border: '1.5px solid', transition: 'all 0.2s ease',
          backgroundColor: timeRange === opt ? '#4f46e5' : 'transparent',
          borderColor: timeRange === opt ? '#4f46e5' : '#d1d5db',
          color: timeRange === opt ? '#ffffff' : '#374151'
        }}>{opt}</button>
      ))}
    </div>

    {/* Row 3 - Time of Day */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: '90px' }}>Time of Day</span>
      {['Any', 'Morning', 'Afternoon', 'Evening'].map(opt => (
        <button key={opt} onClick={() => setTimeOfDay(opt)} style={{
          padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
          border: '1.5px solid', transition: 'all 0.2s ease',
          backgroundColor: timeOfDay === opt ? '#4f46e5' : 'transparent',
          borderColor: timeOfDay === opt ? '#4f46e5' : '#d1d5db',
          color: timeOfDay === opt ? '#ffffff' : '#374151'
        }}>{opt}</button>
      ))}
    </div>

    {/* Row 4 - Event Type */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: '90px' }}>Event Type</span>
      {['All Types', 'Summit', 'Workshop', 'Conference', 'Bootcamp', 'Expo'].map(opt => (
        <button key={opt} onClick={() => setEventType(opt)} style={{
          padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
          border: '1.5px solid', transition: 'all 0.2s ease',
          backgroundColor: eventType === opt ? '#4f46e5' : 'transparent',
          borderColor: eventType === opt ? '#4f46e5' : '#d1d5db',
          color: eventType === opt ? '#ffffff' : '#374151'
        }}>{opt}</button>
      ))}
    </div>

    {/* Row 5 - Toggles */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: '90px' }}>Quick</span>
      <button onClick={() => setShowTrending(!showTrending)} style={{
        padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        border: '1.5px solid', transition: 'all 0.2s ease',
        backgroundColor: showTrending ? '#4f46e5' : 'transparent',
        borderColor: showTrending ? '#4f46e5' : '#d1d5db',
        color: showTrending ? '#ffffff' : '#374151'
      }}>🔥 Trending</button>
      <button onClick={() => setShowUpcoming(!showUpcoming)} style={{
        padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        border: '1.5px solid', transition: 'all 0.2s ease',
        backgroundColor: showUpcoming ? '#4f46e5' : 'transparent',
        borderColor: showUpcoming ? '#4f46e5' : '#d1d5db',
        color: showUpcoming ? '#ffffff' : '#374151'
      }}>📅 Upcoming Only</button>
      <button onClick={() => {
        setSortBy('Default'); setTimeRange('Any Time');
        setTimeOfDay('Any'); setEventType('All Types');
        setShowTrending(false); setShowUpcoming(false); setActiveCategory('All');
      }} style={{
        padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        border: '1.5px solid #ef4444', color: '#ef4444', background: 'transparent', transition: 'all 0.2s ease'
      }}>✕ Clear All</button>
    </div>

  </div>
)}
</section>
{/*  Events Grid  */}
{finalEvents.length === 0 ? (
  <EmptyState
    searchQuery={searchQuery}
    onClearSearch={() => {
      setSearchQuery('');
    }}
  />
) : (
  <>
    <p className="text-sm text-gray-500 mb-4">{finalEvents.length} events found</p>
    <div
      className="event-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
         gap: '28px',
        width: '100%'
      }}
    >
      {finalEvents.map((event: any, index: number) => (
        <EventCard key={event.id} event={event} query={searchQuery} index={index} />
      ))}
    </div>
  </>
)}

<WhyHostSection />
</main>
<Footer />
</div>
<style>{`
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (max-width: 1024px) {
    .event-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (max-width: 640px) {
    .event-grid { grid-template-columns: repeat(1, 1fr) !important; }
  }
`}</style>
    </>
  );
}
