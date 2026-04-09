"use client";
import React, { useState } from 'react';
import { events } from '../data/events';

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

function EventCard({ event }: { event: any }) {
  return (
    <div className="group w-full bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img 
          alt={event.alt} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 rounded-t-xl" 
          src={event.image}
          loading="lazy"
        />
        <LikeButton />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className={event.categoryClasses}>
            {event.category}
          </span>
          <span className="text-xs text-on-surface-variant">{event.datetime}</span>
        </div>
        <h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">
          {event.title}
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

export default function Page() {
  return (
    <>
{/*  TopNavBar Component  */}
<nav className="bg-surface/70 backdrop-blur-md" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
  {/* LEFT */}
  <div style={{ flexShrink: 0 }}>
    <span style={{ fontWeight: 700, fontSize: '18px' }} className="text-indigo-900 tracking-tight">The Kinetic Curator</span>
  </div>

  {/* CENTER — absolutely centered to full navbar width */}
  <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '32px' }} className="hidden md:flex">
    <a className="text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1 transition-all" href="#">Explore</a>
    <a className="text-slate-500 hover:text-indigo-500 py-1 transition-all" href="#">Trending</a>
    <a className="text-slate-500 hover:text-indigo-500 py-1 transition-all" href="#">Collections</a>
  </div>

  {/* RIGHT */}
  <div style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
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
<input className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface" placeholder="Search frameworks, summits, or workshops..." type="text"/>
</div>
<div className="flex flex-wrap justify-center gap-2 px-2">
<button className="px-6 py-2 rounded-full bg-secondary-container text-on-secondary-container text-sm font-medium hover:bg-secondary-fixed transition-colors">Development</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-secondary-container transition-colors">DevOps</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-secondary-container transition-colors">AI/ML</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-secondary-container transition-colors">Cloud</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-secondary-container transition-colors">Cybersecurity</button>
</div>
<div className="flex items-center gap-3 pl-4 border-l border-outline-variant/20">
<span className="text-sm font-medium text-on-surface-variant">Live</span>
<button className="w-12 h-6 bg-primary-container rounded-full relative p-1 transition-colors">
<div className="w-4 h-4 bg-primary rounded-full absolute right-1"></div>
</button>
</div>
</div>
</section>
{/*  Events Grid  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {events.map((event: any) => (
    <EventCard key={event.id} event={event} />
  ))}
</div>
</main>
<footer className="mt-auto bg-surface-container-lowest border-t border-outline-variant/10" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', padding: '40px 24px' }}>
  {/* LEFT */}
  <div style={{ flexShrink: 0 }}>
    <span className="text-xl font-bold text-indigo-900 tracking-tight">The Kinetic Curator</span>
  </div>

  {/* CENTER */}
  <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '32px' }} className="hidden md:flex text-sm text-on-surface-variant">
    <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
    <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
    <a className="hover:text-primary transition-colors" href="#">Support</a>
  </div>

  {/* RIGHT */}
  <div style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
    <span className="text-sm text-on-surface-variant">© 2024 Kinetic Media Group.</span>
  </div>
</footer>
    </>
  );
}
