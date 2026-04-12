import { Suspense } from 'react';
import type { Metadata } from 'next';
import EventPage from '../../../components/event/EventPage';
import { events } from '../../../data/events';
import type { Event } from '../../../types/event';

type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const parsedId = parseInt(id, 10);
  const matchedEvent = (events as Event[]).find((e) => e.id === parsedId);

  if (!matchedEvent) {
    return {
      title: 'Event — VickyBytes',
      description: 'Live technical event on VickyBytes.',
    };
  }

  const title = `${matchedEvent.title} — VickyBytes`;
  const eventDescription = matchedEvent.description;
  const description =
    typeof eventDescription === 'string'
      ? eventDescription
      : Array.isArray(eventDescription)
        ? eventDescription.join(' ')
        : `${matchedEvent.title} live event on VickyBytes.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [matchedEvent.image],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [matchedEvent.image],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <EventPage id={id} />
    </Suspense>
  );
}
