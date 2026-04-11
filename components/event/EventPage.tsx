"use client";

import { useState } from 'react';
import VideoPlayer from '../ui/VideoPlayer';
import LiveChat from './LiveChat';
import Navbar from '../ui/Navbar';
import { events } from '../../data/events';
import type { Event } from '../../types/event';
import Link from 'next/link';

type EventPageProps = {
  id: string;
};

export default function EventPage({ id }: EventPageProps) {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isTabletChatOpen, setIsTabletChatOpen] = useState(false);
  const parsedId = parseInt(id, 10);
  const matchedEvent = (events as Event[]).find((e) => e.id === parsedId);

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
    <div className="event-page min-h-screen overflow-x-hidden bg-background text-on-background">
      <Navbar />

      <main className="mx-auto w-full max-w-370 px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-5 lg:px-8 lg:pb-10 lg:pt-6">
        <div className="event-page-layout grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="min-w-0">
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
                <div className="mt-3 h-115 overflow-hidden rounded-xl border border-[rgba(15,23,42,0.24)]">
                  <LiveChat viewerCount={event.viewerCount} />
                </div>
              )}
            </section>
          </section>

          <aside className="event-chat-column anim-fade-left d2 animate-fade-left sticky top-20 hidden h-[calc(100vh-6rem)] min-h-136 overflow-hidden rounded-xl border border-[rgba(15,23,42,0.24)] lg:flex">
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
