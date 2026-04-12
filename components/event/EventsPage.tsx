"use client";

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { events } from '../../data/events';
import type { Event } from '../../types/event';
import { useEventSearch } from '../../hooks/useEventSearch';

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

export default function EventsPage() {
  const allEvents = events as Event[];
  const { query, setQuery, filteredEvents } = useEventSearch(allEvents);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar
        searchQuery={query}
        onSearchQueryChange={setQuery}
        placeholder="Search events by title, category, description, or tags..."
      />

      <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <section className="mb-5 sm:mb-6">
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
      </main>

      <Footer />
    </div>
  );
}
