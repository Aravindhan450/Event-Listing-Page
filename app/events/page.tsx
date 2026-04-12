import { Suspense } from 'react';
import type { Metadata } from 'next';
import EventsPage from '../../components/event/EventsPage';

export const metadata: Metadata = {
  title: 'Events Search — VickyBytes',
  description: 'Search technical events by title, category, description, and tags.',
};

export default function EventsRoutePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <EventsPage />
    </Suspense>
  );
}
