import VideoPlayer from '../ui/VideoPlayer';
import LiveChat from './LiveChat';
import Navbar from '../ui/Navbar';
import { events } from '../../data/events';

type EventPageProps = {
  id: string;
};

export default function EventPage({ id }: EventPageProps) {
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
      <Navbar />

      <div style={{ maxWidth: '1600px', margin: '24px auto', padding: '0 32px', width: '100%' }}>
        <main className="event-main-row" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', width: '100%' }}>
          <section style={{ flex: 1, minWidth: 0 }}>
            <div style={{ width: '100%' }}>
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
            </div>
          </section>

          <div style={{ width: '380px', flexShrink: 0 }}>
            <LiveChat viewerCount={event.viewerCount} />
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .event-main-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
