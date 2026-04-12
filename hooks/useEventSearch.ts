"use client";

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from './useDebounce';
import type { Event } from '../types/event';

function toSearchableText(value?: string | string[]): string {
  if (!value) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.join(' ');
  }

  return value;
}

export function filterEventsByQuery(events: Event[], query: string): Event[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return events;
  }

  return events.filter((event) => {
    const searchableBlob = [
      event.title,
      event.category,
      toSearchableText(event.description),
      toSearchableText(event.tags),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableBlob.includes(normalizedQuery);
  });
}

export function useEventSearch(events: Event[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(urlQuery);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const normalizedDebounced = debouncedQuery.trim();

    if (pathname === '/events') {
      if (normalizedDebounced === (urlQuery || '').trim()) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      if (normalizedDebounced) {
        params.set('q', normalizedDebounced);
      } else {
        params.delete('q');
      }

      const nextQuery = params.toString();
      const nextUrl = nextQuery ? `/events?${nextQuery}` : '/events';
      router.replace(nextUrl, { scroll: false });
      return;
    }

    if (!normalizedDebounced) {
      return;
    }

    const encoded = encodeURIComponent(normalizedDebounced);
    router.push(`/events?q=${encoded}`);
  }, [debouncedQuery, pathname, router, searchParams, urlQuery]);

  const filteredEvents = useMemo(() => filterEventsByQuery(events, debouncedQuery), [events, debouncedQuery]);

  return {
    query,
    setQuery,
    debouncedQuery,
    filteredEvents,
  };
}
