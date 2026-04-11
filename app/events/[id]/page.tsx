"use client";

import VideoPlayer from '../../../components/VideoPlayer';
import LiveChat from '../../../components/LiveChat';
import { useParams } from 'next/navigation';
import { events } from '../../../data/events';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id, 10);
  const matchedEvent = events.find((e: any) => e.id === parsedId);

  if (!matchedEvent) {
    return (
      <div className="event-page min-h-screen bg-background text-on-background">
        <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-on-surface">Event not found</h1>
            <a href="/" className="mt-4 inline-block text-primary hover:underline">Go back home</a>
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
      <nav className="bg-surface/70 backdrop-blur-md nav-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 1000, backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255, 255, 255, 0.85)', borderBottom: '1px solid #e5e7eb', boxSizing: 'border-box' }}>
        <div style={{ justifySelf: 'start' }}>
          <span style={{ fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' }} className="text-indigo-900 tracking-tight">VickyBytes</span>
        </div>

        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px' }}>
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
              placeholder="Search frameworks, summits, or workshops..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', color: '#111827', background: 'transparent' }}
            />
          </div>
        </div>

        <div style={{ gridColumn: '3', justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="p-2 rounded-full hover:bg-slate-100/50 transition-all active:scale-90 duration-200">
            <span className="material-symbols-outlined text-slate-600">notifications</span>
          </button>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>AK</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <section className="space-y-6 lg:col-span-2 w-full">
            <VideoPlayer
              videoUrl={event.videoUrl}
              thumbnail={event.image}
              category={event.category}
              date={event.date}
              time={event.time}
              title={event.title}
              speaker={event.speaker}
              viewerCount={event.viewerCount}
              description={event.description}
              tags={event.tags}
            />
          </section>

          <div className="lg:col-span-1 w-full h-full lg:h-[520px]">
            <LiveChat viewerCount={event.viewerCount} />
          </div>

        </main>
      </div>

    </div>
  );
}
