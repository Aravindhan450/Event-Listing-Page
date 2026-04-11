import type { Metadata } from 'next';
import EventPage from '../../../components/event/EventPage';
import { events } from '../../../data/events';

type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const parsedId = parseInt(id, 10);
  const matchedEvent = events.find((e: any) => e.id === parsedId);

  if (!matchedEvent) {
    return {
      title: 'Event — VickyBytes',
      description: 'Live technical event on VickyBytes.',
    };
  }

  const title = `${matchedEvent.title} — VickyBytes`;
  const eventDescription = (matchedEvent as any).description;
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
  return <EventPage id={id} />;
}
