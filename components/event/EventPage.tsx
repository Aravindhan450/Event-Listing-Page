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
    <div className="event-page min-h-screen bg-background text-on-background">
      <Navbar />

      <div
        className="event-page-layout"
        style={{
          display: 'flex',
          gap: '24px',
          padding: '20px 24px',
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          alignItems: 'flex-start',
          boxSizing: 'border-box'
        }}
      >
        <section
          style={{
            flex: 1,
            minWidth: 0
          }}
        >
          <div className="animate-scale-in delay-1 anim-scale-in d1" style={{ width: '100%', marginBottom: '12px' }}>
            <div style={{ width: '100%' }}>
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
        </section>

        <div
          className="event-chat-column animate-fade-left delay-2 anim-fade-left d2"
          style={{
            width: '320px',
            minWidth: '320px',
            flexShrink: 0,
            position: 'sticky',
            top: '72px',
            height: 'calc(100vh - 88px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '12px',
            border: '1px solid rgba(15, 23, 42, 0.24)'
          }}
        >
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <LiveChat viewerCount={event.viewerCount} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1280px) and (min-width: 1024px) {
          .event-chat-column {
            width: 280px !important;
            min-width: 280px !important;
          }
        }

        @media (max-width: 1023px) {
          .event-page-layout {
            flex-direction: column;
          }

          .event-chat-column {
            width: 100% !important;
            min-width: 100% !important;
            position: relative !important;
            top: auto !important;
            height: 480px !important;
            max-height: 480px !important;
          }
        }

        @media (max-width: 768px) {
          .event-page-layout {
            padding: 12px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
