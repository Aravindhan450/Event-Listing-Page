"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { events } from '../../data/events';
import WhyHostSection from './WhyHostSection';
import Footer from '../ui/Footer';
import Navbar from '../ui/Navbar';
import type { Event } from '../../types/event';

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
      type="button"
      aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
      onClick={(e) => {
        e.preventDefault();
        setLiked(!liked);
      }}
      className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm transition-colors duration-200 cursor-pointer active:scale-110"
    >
      <span 
        className={`material-symbols-outlined text-xl! ${liked ? 'text-[#ef4444]' : 'text-white'}`}
        style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
      >
        favorite
      </span>
    </button>
  );
}

function EventCard({ event, query, viewMode }: { event: Event; query: string; viewMode: string }) {
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
    <article
      role="button"
      tabIndex={0}
      aria-label={`Open event ${event.title}`}
      className={`group w-full h-full bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden hover:scale-[1.02] border border-outline-variant/10 flex cursor-pointer ${
        viewMode === 'list' ? 'flex-col sm:flex-row sm:h-[140px]' : 'flex-col'
      }`}
      onClick={() => router.push(`/events/${event.id}`)}
      onKeyDown={(eventKey) => {
        if (eventKey.key === 'Enter' || eventKey.key === ' ') {
          eventKey.preventDefault();
          router.push(`/events/${event.id}`);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      <div
        className={`relative overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.03] ${
          viewMode === 'list' ? 'w-full sm:w-[200px] sm:h-full sm:shrink-0' : 'w-full'
        }`}
        style={{
          height: viewMode === 'list' ? undefined : undefined
        }}
      >
        <Image
          alt={event.alt} 
          className="rounded-t-xl object-cover"
          width={600}
          height={340}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{
            width: '100%',
            height: viewMode === 'list' ? '100%' : 'auto',
            aspectRatio: viewMode === 'list' ? undefined : '16 / 9',
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
      <div className="p-4 sm:p-5 flex flex-col flex-1 min-h-42.5 sm:min-h-47.5">
        <div className="mb-2" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span className={categoryPillClasses} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            <span>{event.category}</span>
          </span>
        </div>
        <span className="text-xs text-on-surface-variant block" style={{ whiteSpace: viewMode === 'list' ? 'nowrap' : 'normal', fontSize: '12px' }}>
          {eventTime ? `${eventDate} • ${eventTime}` : eventDate}
        </span>
        <h3 className="text-base sm:text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">
          {highlightText(event.title, query)}
        </h3>
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pt-3 sm:pt-4 border-t border-outline-variant/10">
          <button type="button" className="inline-flex text-primary text-sm font-semibold hover:underline cursor-pointer transition-all duration-200 ease-in-out hover:text-indigo-600 hover:translate-x-1 min-h-10 items-center">View Details</button>
          <button type="button" aria-label="Share event" className="inline-flex p-2 rounded-lg hover:bg-surface-container-high cursor-pointer transition-all duration-200 ease-in-out hover:text-indigo-600 hover:scale-125 min-h-10 min-w-10 items-center justify-center self-start sm:self-auto">
            <span className="material-symbols-outlined text-on-surface-variant">share</span>
          </button>
        </div>
      </div>
    </article>
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
  const allEvents = events as Event[];

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    allEvents.forEach((event) => {
      if (!ALLOWED_CATEGORIES.includes(event.category)) {
        console.warn(`Invalid category detected for event: ${event.title}`);
      }
    });
  }, [allEvents]);

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

    let filteredEvents = allEvents.filter((event) => {
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
      filteredEvents = filteredEvents.filter((event) => {
        const d = parseEventDate(event.datetime);
        return d >= startOfToday && d <= endOfToday;
      });
    } else if (timeRange === 'This Week') {
      filteredEvents = filteredEvents.filter((event) => {
        const d = parseEventDate(event.datetime);
        return d >= startOfToday && d <= endOfWeek;
      });
    } else if (timeRange === 'This Month') {
      filteredEvents = filteredEvents.filter((event) => {
        const d = parseEventDate(event.datetime);
        return d >= startOfToday && d <= endOfMonth;
      });
    }

    if (showUpcoming) {
      filteredEvents = filteredEvents.filter((event) => parseEventDate(event.datetime) > startOfToday);
    }

    if (showTrending) {
      filteredEvents = filteredEvents.filter((_, index: number) => index % 3 === 0);
    }

    if (sortBy === 'A → Z') {
      filteredEvents = [...filteredEvents].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Z → A') {
      filteredEvents = [...filteredEvents].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'Date: Earliest') {
      filteredEvents = [...filteredEvents].sort(
        (a, b) =>
          parseEventDate(a.datetime).getTime() - parseEventDate(b.datetime).getTime()
      );
    } else if (sortBy === 'Date: Latest') {
      filteredEvents = [...filteredEvents].sort(
        (a, b) =>
          parseEventDate(b.datetime).getTime() - parseEventDate(a.datetime).getTime()
      );
    }

    return filteredEvents;
  }, [searchQuery, activeCategory, sortBy, timeRange, timeOfDay, eventType, showTrending, showUpcoming, allEvents]);

  const filteredEvents = finalEvents;

  return (
    <>
<div style={{ animation: 'fadeIn 0.6s ease-in-out' }}>
{/*  TopNavBar Component  */}
<Navbar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
<main className="pt-24 sm:pt-28 pb-12 sm:pb-16 w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
{/*  Hero Search Section  */}
<section className="mb-12">
<div className="w-full px-0 sm:px-2 lg:px-4 pt-2 sm:pt-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
<div className="flex flex-col gap-5 sm:gap-6">
  <span className="animate-fade-up delay-1 anim-fade-up d1" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#6b7280', textTransform: 'uppercase' }}>
    LIVE EVENTS PLATFORM
  </span>

  <h1 className="animate-fade-up delay-2 anim-fade-up d2 text-4xl sm:text-5xl lg:text-6xl" style={{ fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-2px', maxWidth: '700px', margin: 0 }}>
    The platform where
    <br />
    developers level up.
  </h1>

  <p className="animate-fade-up delay-3 anim-fade-up d3 text-sm sm:text-base" style={{ color: '#6b7280', maxWidth: '480px', margin: 0 }}>
    Live summits, workshops, and bootcamps from senior engineers — free to attend.
  </p>
</div>

  <div className="animate-scale-in delay-4 anim-scale-in d3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 w-full h-auto lg:h-90 rounded-2xl overflow-hidden mt-1 lg:mt-2">
    <div className="mosaic-wrap">
      <Image src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=400&fit=crop" className="mosaic-img object-cover" width={400} height={400} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" style={{ width: '100%', height: '100%', transform: 'scale(1)', transition: 'transform 0.4s ease' }} alt="Tech conference audience" loading="lazy" />
    </div>
    <div className="mosaic-wrap">
      <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop" className="mosaic-img object-cover" width={800} height={400} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" style={{ width: '100%', height: '100%', transform: 'scale(1)', transition: 'transform 0.4s ease' }} alt="Developers collaborating at office" loading="lazy" />
    </div>
    <div className="mosaic-wrap">
      <Image src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop" className="mosaic-img object-cover" width={600} height={400} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" style={{ width: '100%', height: '100%', transform: 'scale(1)', transition: 'transform 0.4s ease' }} alt="Presenter on stage with screen" loading="lazy" />
    </div>
    <div className="mosaic-wrap">
      <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop" className="mosaic-img object-cover" width={400} height={400} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" style={{ width: '100%', height: '100%', transform: 'scale(1)', transition: 'transform 0.4s ease' }} alt="Developer coding at night setup" loading="lazy" />
    </div>
  </div>
</div>

  <div className="stats-row animate-fade-up delay-5 anim-fade-up d4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mx-auto mt-8 sm:mt-10">
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
        className="stats-card stat-card w-full"
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid #e5e7eb',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
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

<div className="mt-8 px-0 sm:px-2 lg:px-4">
<div style={{ textAlign: 'center' }}>
  <h2 className="text-xl font-semibold text-gray-900">Explore Events</h2>
  <p className="text-gray-600 mt-2 max-w-xl mx-auto font-normal" style={{ lineHeight: 1.75 }}>Find technical events across cloud, AI, DevOps, and emerging technologies.</p>
</div>
<div className="animate-fade-up delay-3 mt-5 anim-fade-up d2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
  <div className="category-scroll flex sm:flex-wrap justify-start sm:justify-center gap-3 overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal pb-1 sm:pb-0" style={{ flex: 1 }}>
    {['All', 'Development', 'DevOps', 'AI/ML', 'Cloud', 'Cybersecurity', 'Mobile', 'Web3', 'Backend', 'Design'].map(cat => (
      <button key={cat} onClick={() => setActiveCategory(cat)} style={{
        padding: '7px 18px', borderRadius: '99px', fontSize: '13px', fontWeight: 500,
        cursor: 'pointer', border: '1.5px solid', transition: 'all 0.2s ease',
        backgroundColor: activeCategory === cat ? '#4f46e5' : 'transparent',
        borderColor: activeCategory === cat ? '#4f46e5' : '#d1d5db',
        color: activeCategory === cat ? '#ffffff' : '#374151'
      }} className="interactive-btn" type="button" aria-pressed={activeCategory === cat}>{cat}</button>
    ))}
  </div>

  <div className="mt-0 text-right sm:ml-auto w-full sm:w-auto">
  <button type="button" onClick={() => setShowFilters(!showFilters)} className="interactive-btn animate-fade-up delay-4 anim-fade-up d3" style={{
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
    <span className="hidden sm:inline">{showFilters ? 'Hide Filters' : 'Advanced Filters'}</span>
  </button>
  </div>
</div>

{showFilters && (
  <div className="w-full overflow-hidden" style={{
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
        <button key={opt} type="button" onClick={() => setSortBy(opt)} style={{
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
        <button key={opt} type="button" onClick={() => setTimeRange(opt)} style={{
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
        <button key={opt} type="button" onClick={() => setTimeOfDay(opt)} style={{
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
        <button key={opt} type="button" onClick={() => setEventType(opt)} style={{
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
      <button type="button" onClick={() => setShowTrending(!showTrending)} style={{
        padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        border: '1.5px solid', transition: 'all 0.2s ease',
        backgroundColor: showTrending ? '#4f46e5' : 'transparent',
        borderColor: showTrending ? '#4f46e5' : '#d1d5db',
        color: showTrending ? '#ffffff' : '#374151'
      }} className="interactive-btn">🔥 Trending</button>
      <button type="button" onClick={() => setShowUpcoming(!showUpcoming)} style={{
        padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        border: '1.5px solid', transition: 'all 0.2s ease',
        backgroundColor: showUpcoming ? '#4f46e5' : 'transparent',
        borderColor: showUpcoming ? '#4f46e5' : '#d1d5db',
        color: showUpcoming ? '#ffffff' : '#374151'
      }} className="interactive-btn">📅 Upcoming Only</button>
      <button type="button" onClick={() => {
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

<div className="mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
  <p className="text-sm text-gray-500">{filteredEvents.length} events found</p>

  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', borderRadius: '10px', padding: '4px' }}>
    <button
      type="button"
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
      type="button"
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
      className={`event-grid mt-4 w-full grid gap-5 sm:gap-6 lg:gap-7 ${
        viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
      }`}
    >
      {finalEvents.map((event) => (
        <EventCard key={event.id} event={event} query={searchQuery} viewMode={viewMode} />
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

  .category-scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .category-scroll::-webkit-scrollbar {
    display: none;
  }

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

  @media (max-width: 640px) {
    .mosaic-wrap {
      min-height: 110px;
    }

    .stats-card {
      padding: 16px 14px !important;
    }
  }
`}</style>
    </>
  );
}
