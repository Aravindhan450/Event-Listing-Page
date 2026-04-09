"use client";
import React, { useMemo, useState } from 'react';
import { events } from '../data/events';
import { useDebounce } from '../hooks/useDebounce';

const categories = ['All', 'Development', 'DevOps', 'AI/ML', 'Cloud', 'Cybersecurity'];

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
    <div className="group w-full h-full bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
      <div className="relative w-full aspect-video object-cover overflow-hidden bg-slate-200">
        <img 
          alt={event.alt} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 rounded-t-xl" 
          src={event.image}
          loading="lazy"
        />
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
  activeCategory,
  onClearFilters,
}: {
  searchQuery: string;
  activeCategory: string;
  onClearFilters: () => void;
}) {
  const trimmedQuery = searchQuery.trim();
  const message = trimmedQuery
    ? `No results found for "${trimmedQuery}"`
    : 'No events found in this category';

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center editorial-shadow">
      <h3 className="text-xl font-bold text-on-surface mb-3">{message}</h3>
      <p className="text-on-surface-variant text-sm mb-4">
        Try one of the suggestions below to find relevant events.
      </p>
      <ul className="text-sm text-on-surface-variant space-y-2 mb-6">
        <li>Try a different keyword</li>
        <li>Change the selected category</li>
        <li>Clear filters</li>
      </ul>
      <button
        type="button"
        onClick={onClearFilters}
        className="px-4 py-2 rounded-lg bg-primary text-on-primary font-medium hover:opacity-90 transition-opacity"
      >
        Clear filters
      </button>
      {activeCategory !== 'All' && !trimmedQuery && (
        <p className="text-xs text-on-surface-variant mt-4">
          Current category: {activeCategory}
        </p>
      )}
    </div>
  );
}

export default function Page() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const debouncedSearch = useDebounce(search, 300);
  const normalizedSearchQuery = debouncedSearch.trim().toLowerCase();

  const filteredEvents = useMemo(() => events.filter((event: any) => {
    const searchableText = [
      event.title,
      event.category,
      event.description,
      Array.isArray(event.tags) ? event.tags.join(' ') : event.tags,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = searchableText.includes(normalizedSearchQuery);
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  }), [normalizedSearchQuery, activeCategory]);

  return (
    <>
{/*  TopNavBar Component  */}
<nav className="bg-surface/70 backdrop-blur-md nav-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%', padding: '16px 24px', borderBottom: '1px solid #e5e7eb', boxSizing: 'border-box' }}>
  {/* LEFT - column 1 */}
  <div style={{ justifySelf: 'start' }}>
    <span style={{ fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' }} className="text-indigo-900 tracking-tight">The Kinetic Curator</span>
  </div>

  {/* CENTER - column 2, naturally centered */}
  <div style={{ display: 'flex', gap: '32px', justifySelf: 'center' }} className="nav-center-links">
    <a className="text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1 transition-all" href="#">Explore</a>
    <a className="text-slate-500 hover:text-indigo-500 py-1 transition-all" href="#">Trending</a>
    <a className="text-slate-500 hover:text-indigo-500 py-1 transition-all" href="#">Collections</a>
  </div>

  {/* RIGHT - column 3 */}
  <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '12px' }}>
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
<div className="flex flex-wrap justify-center gap-2 px-2">
{categories.map((category) => (
  <button
    key={category}
    className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-150 ${
      activeCategory === category
        ? 'bg-indigo-600 text-white'
        : 'bg-transparent text-gray-600 hover:bg-gray-100'
    }`}
    onClick={() => setActiveCategory(category)}
  >
    {category}
  </button>
))}
</div>
</div>
</section>
{/*  Events Grid  */}
{filteredEvents.length === 0 ? (
  <EmptyState
    searchQuery={search}
    activeCategory={activeCategory}
    onClearFilters={() => {
      setSearch('');
      setActiveCategory('All');
    }}
  />
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
    {filteredEvents.map((event: any) => (
      <EventCard key={event.id} event={event} query={search} />
    ))}
  </div>
)}
</main>
<footer className="mt-auto bg-surface-container-lowest border-t border-outline-variant/10 footer-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%', padding: '40px 24px', boxSizing: 'border-box' }}>
  {/* LEFT - column 1 */}
  <div style={{ justifySelf: 'start' }}>
    <span style={{ whiteSpace: 'nowrap' }} className="text-xl font-bold text-indigo-900 tracking-tight">The Kinetic Curator</span>
  </div>

  {/* CENTER - column 2 */}
  <div style={{ display: 'flex', justifySelf: 'center' }} className="footer-center-links text-sm text-on-surface-variant gap-6">
    <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
    <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
    <a className="hover:text-primary transition-colors" href="#">Support</a>
  </div>

  {/* RIGHT - column 3 */}
  <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center' }}>
    <span className="text-sm text-on-surface-variant">© 2024 Kinetic Media Group.</span>
  </div>
</footer>
    </>
  );
}
