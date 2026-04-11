"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { events } from '../../data/events';
import WhyHostSection from './WhyHostSection';
import Footer from '../ui/Footer';
import Navbar from '../ui/Navbar';

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

function EventCard({ event, query, index, viewMode }: { event: any; query: string; index: number; viewMode: string }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      className="group w-full h-full bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden hover:scale-[1.02] border border-outline-variant/10 flex flex-col cursor-pointer"
      onClick={() => router.push(`/events/${event.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        flexDirection: viewMode === 'list' ? 'row' : 'column',
        height: viewMode === 'list' ? '140px' : undefined
      }}
    >
      <div
        className="relative overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        style={{
          width: viewMode === 'list' ? '200px' : '100%',
          height: viewMode === 'list' ? '100%' : '18rem',
          flexShrink: viewMode === 'list' ? 0 : undefined
        }}
      >
        <img 
          alt={event.alt} 
          className="rounded-t-xl" 
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            opacity: imageLoaded ? 1 : 0.5,
            filter: imageLoaded ? 'blur(0px)' : 'blur(8px)',
            transition: 'opacity 0.35s ease, filter 0.35s ease, transform 0.35s ease'
          }}
          src={event.image}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(110deg, #e5e7eb 8%, #f3f4f6 18%, #e5e7eb 33%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.2s linear infinite'
            }}
          />
        )}
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
        <span className="text-xs text-on-surface-variant" style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>
          {eventTime ? `${eventDate} • ${eventTime}` : eventDate}
        </span>
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('Default');
  const [timeRange, setTimeRange] = useState('Any Time');
  const [timeOfDay, setTimeOfDay] = useState('Any');
  const [eventType, setEventType] = useState('All Types');
  const [viewMode, setViewMode] = useState('grid');
  const [showTrending, setShowTrending] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);

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
    const parseEventDate = (datetime: string) => {
      const datePart = datetime.split('•')[0].trim();
      return new Date(datePart);
    };

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

      return matchesSearch && matchesCategory && matchesTimeOfDay && matchesEventType;
    });

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    const endOfWeek = new Date(startOfToday);
    endOfWeek.setDate(startOfToday.getDate() + 7);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    if (timeRange === 'Today') {
      filteredEvents = filteredEvents.filter((event: any) => {
        const d = parseEventDate(event.datetime);
        return d >= startOfToday && d <= endOfToday;
      });
    } else if (timeRange === 'This Week') {
      filteredEvents = filteredEvents.filter((event: any) => {
        const d = parseEventDate(event.datetime);
        return d >= startOfToday && d <= endOfWeek;
      });
    } else if (timeRange === 'This Month') {
      filteredEvents = filteredEvents.filter((event: any) => {
        const d = parseEventDate(event.datetime);
        return d >= startOfToday && d <= endOfMonth;
      });
    }

    if (showUpcoming) {
      filteredEvents = filteredEvents.filter((event: any) => parseEventDate(event.datetime) > startOfToday);
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
          parseEventDate(a.datetime).getTime() - parseEventDate(b.datetime).getTime()
      );
    } else if (sortBy === 'Date: Latest') {
      filteredEvents = [...filteredEvents].sort(
        (a: any, b: any) =>
          parseEventDate(b.datetime).getTime() - parseEventDate(a.datetime).getTime()
      );
    }

    return filteredEvents;
  }, [searchQuery, activeCategory, sortBy, timeRange, timeOfDay, eventType, showTrending, showUpcoming]);

  const filteredEvents = finalEvents;

  return (
    <>
<div style={{ animation: 'fadeIn 0.6s ease-in-out' }}>
{/*  TopNavBar Component  */}
<Navbar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
<main className="pt-28 pb-16 w-full" style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px', paddingTop: '7rem' }}>
{/*  Hero Search Section  */}
<section className="mb-12">
<div style={{ width: '100%', padding: '16px 48px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
  <span className="animate-fade-up delay-1 anim-fade-up d1" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#6b7280', textTransform: 'uppercase' }}>
    LIVE EVENTS PLATFORM
  </span>

  <h1 className="animate-fade-up delay-2 anim-fade-up d2" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-2px', maxWidth: '700px', margin: 0 }}>
    The platform where
    <br />
    developers level up.
  </h1>

  <p className="animate-fade-up delay-3 anim-fade-up d3" style={{ fontSize: '16px', color: '#6b7280', maxWidth: '480px', margin: 0 }}>
    Live summits, workshops, and bootcamps from senior engineers — free to attend.
  </p>

  <div className="animate-scale-in delay-4 anim-scale-in d3" style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.5fr 0.8fr', gap: '8px', width: '100%', height: '360px', marginTop: '8px', borderRadius: '16px', overflow: 'hidden' }}>
    <div className="mosaic-wrap">
      <img src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=400&fit=crop" className="mosaic-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1)', transition: 'transform 0.4s ease' }} alt="Tech conference audience" loading="lazy" />
    </div>
    <div className="mosaic-wrap">
      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop" className="mosaic-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1)', transition: 'transform 0.4s ease' }} alt="Developers collaborating at office" loading="lazy" />
    </div>
    <div className="mosaic-wrap">
      <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop" className="mosaic-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1)', transition: 'transform 0.4s ease' }} alt="Presenter on stage with screen" loading="lazy" />
    </div>
    <div className="mosaic-wrap">
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop" className="mosaic-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1)', transition: 'transform 0.4s ease' }} alt="Developer coding at night setup" loading="lazy" />
    </div>
  </div>

  <div className="stats-row animate-fade-up delay-5 anim-fade-up d4" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', width: '100%', maxWidth: '760px', margin: '32px auto' }}>
    {[
      ['16 Events', 'Across 8 categories'],
      ['3 Live Today', 'Join now free'],
      ['2,400+ Devs', 'Active this month'],
    ].map(([stat, subLabel]) => {
      const [statNumber, ...statLabelParts] = stat.split(' ');
      const statLabel = statLabelParts.join(' ');

      return (
      <div
        key={stat}
        className="stats-card stat-card"
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid #e5e7eb',
          borderRadius: '16px',
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          flex: 1,
          minWidth: '160px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
        }}
      >
        <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-1px' }}>{statNumber}</div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{statLabel}</div>
        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{subLabel}</div>
      </div>
      );
    })}
  </div>
</div>

<div className="mt-8" style={{ padding: '0 48px' }}>
<div style={{ textAlign: 'center' }}>
  <h2 className="text-xl font-semibold text-gray-900">Explore Events</h2>
  <p className="text-gray-600 mt-2 max-w-xl mx-auto font-normal" style={{ lineHeight: 1.75 }}>Find technical events across cloud, AI, DevOps, and emerging technologies.</p>
</div>
<div className="animate-fade-up delay-3 mt-5 anim-fade-up d2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
  <div className="flex flex-wrap justify-center gap-3" style={{ flex: 1 }}>
    {['All', 'Development', 'DevOps', 'AI/ML', 'Cloud', 'Cybersecurity', 'Mobile', 'Web3', 'Backend', 'Design'].map(cat => (
      <button key={cat} onClick={() => setActiveCategory(cat)} style={{
        padding: '7px 18px', borderRadius: '99px', fontSize: '13px', fontWeight: 500,
        cursor: 'pointer', border: '1.5px solid', transition: 'all 0.2s ease',
        backgroundColor: activeCategory === cat ? '#4f46e5' : 'transparent',
        borderColor: activeCategory === cat ? '#4f46e5' : '#d1d5db',
        color: activeCategory === cat ? '#ffffff' : '#374151'
      }} className="interactive-btn">{cat}</button>
    ))}
  </div>

  <div className="mt-0 text-center" style={{ marginLeft: 'auto' }}>
  <button onClick={() => setShowFilters(!showFilters)} className="interactive-btn animate-fade-up delay-4 anim-fade-up d3" style={{
    backgroundColor: showFilters ? '#4f46e5' : '#ffffff',
    border: '1.5px solid #4f46e5',
    color: showFilters ? '#ffffff' : '#4f46e5',
    borderRadius: '999px',
    padding: '10px 18px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.15)',
    transition: 'all 0.2s ease'
  }}>
    <svg width="16" height="16" fill="none" stroke={showFilters ? '#ffffff' : '#4f46e5'} strokeWidth="2" viewBox="0 0 24 24">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
      <line x1="11" y1="18" x2="13" y2="18"/>
    </svg>
    {showFilters ? 'Hide Filters' : 'Advanced Filters'}
  </button>
  </div>
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
        }} className="interactive-btn">{opt}</button>
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
        }} className="interactive-btn">{opt}</button>
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
        }} className="interactive-btn">{opt}</button>
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
        }} className="interactive-btn">{opt}</button>
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
      }} className="interactive-btn">🔥 Trending</button>
      <button onClick={() => setShowUpcoming(!showUpcoming)} style={{
        padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        border: '1.5px solid', transition: 'all 0.2s ease',
        backgroundColor: showUpcoming ? '#4f46e5' : 'transparent',
        borderColor: showUpcoming ? '#4f46e5' : '#d1d5db',
        color: showUpcoming ? '#ffffff' : '#374151'
      }} className="interactive-btn">📅 Upcoming Only</button>
      <button onClick={() => {
        setSortBy('Default'); setTimeRange('Any Time');
        setTimeOfDay('Any'); setEventType('All Types');
        setShowTrending(false); setShowUpcoming(false); setActiveCategory('All');
      }} style={{
        padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        border: '1.5px solid #ef4444', color: '#ef4444', background: 'transparent', transition: 'all 0.2s ease'
      }} className="interactive-btn">✕ Clear All</button>
    </div>

  </div>
)}
</div>
</section>

<div className="flex justify-between items-center" style={{ marginTop: '8px' }}>
  <p className="text-sm text-gray-500">{filteredEvents.length} events found</p>

  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', borderRadius: '10px', padding: '4px' }}>
    <button
      onClick={() => setViewMode('grid')}
      style={{
        padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
        fontSize: '13px', fontWeight: 600,
        backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
        color: viewMode === 'grid' ? '#0f172a' : '#9ca3af',
        boxShadow: viewMode === 'grid' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.2s ease',
        display: 'flex', alignItems: 'center', gap: '6px'
      }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
      Grid
    </button>
    <button
      onClick={() => setViewMode('list')}
      style={{
        padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
        fontSize: '13px', fontWeight: 600,
        backgroundColor: viewMode === 'list' ? '#ffffff' : 'transparent',
        color: viewMode === 'list' ? '#0f172a' : '#9ca3af',
        boxShadow: viewMode === 'list' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.2s ease',
        display: 'flex', alignItems: 'center', gap: '6px'
      }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
      List
    </button>
  </div>
</div>

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
    <div
      className="event-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'grid' ? 'repeat(4, 1fr)' : '1fr',
        gap: '28px',
        marginTop: '16px',
        width: '100%'
      }}
    >
      {finalEvents.map((event: any, index: number) => (
        <EventCard key={event.id} event={event} query={searchQuery} index={index} viewMode={viewMode} />
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
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-up {
    opacity: 0;
    animation: fadeUp 0.5s ease-out forwards;
  }

  .animate-fade-in {
    opacity: 0;
    animation: fadeIn 0.4s ease-out forwards;
  }

  .mosaic-img { transition: transform 0.4s ease; }

  .mosaic-img:hover { transform: scale(1.05); }

  .mosaic-wrap { overflow: hidden; }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    border-color: #4f46e5;
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .interactive-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
  }

  .interactive-btn:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 768px) {
    .minimal-hero {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 16px !important;
      padding: 48px 24px 32px !important;
    }

    .minimal-hero-pills {
      justify-content: flex-start !important;
    }
  }

  @media (max-width: 1024px) {
    .event-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (max-width: 640px) {
    .event-grid { grid-template-columns: repeat(1, 1fr) !important; }
    .stats-card { min-width: 140px !important; }
  }
`}</style>
    </>
  );
}
