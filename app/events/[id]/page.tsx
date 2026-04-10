import type { Metadata } from 'next';
import VideoPlayer from '../../../components/VideoPlayer';
import LiveChat from '../../../components/LiveChat';

type EventPageProps = {
  params: { id: string };
};

const EVENT_DATA = {
  id: 'event-001',
  title: 'Cloud Native Systems Summit 2024',
  category: 'CLOUD',
  date: 'Nov 15, 2024',
  time: '09:00 AM PST',
  description: [
    'Join a global lineup of engineers, architects, and platform leaders for a deep dive into cloud-native systems, resilient infrastructure, and modern service operations.',
    'This event explores practical implementation patterns for scalable distributed systems, secure platform design, and high-performance workloads in production environments.',
    'Expect actionable sessions, live technical walkthroughs, and strategic discussions focused on building reliable platforms for the next decade of software delivery.',
  ],
  tags: ['Cloud', 'Kubernetes', 'Platform Engineering', 'DevOps'],
  speaker: {
    name: 'Avery Kim',
    role: 'Principal Cloud Architect',
    avatarInitials: 'AK',
  },
  videoUrl: '',
  viewerCount: 1248,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${EVENT_DATA.title} | The Kinetic Curator`,
    description:
      `Watch ${EVENT_DATA.title} on The Kinetic Curator. Live on ${EVENT_DATA.date} at ${EVENT_DATA.time}.`,
  };
}

export default function EventDetailPage({ params }: EventPageProps) {
  const event = {
    ...EVENT_DATA,
    id: params.id,
  };

  return (
    <div className="event-page min-h-screen bg-background text-on-background">
      <nav className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="text-lg font-bold text-on-surface">The Kinetic Curator</div>

          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="#"
              className="text-sm font-medium text-primary underline decoration-2 decoration-primary underline-offset-8"
            >
              Streaming Guide
            </a>
            <a
              href="#"
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface hover:underline hover:decoration-2 hover:decoration-primary hover:underline-offset-8"
            >
              Browse Events
            </a>
            <a
              href="#"
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface hover:underline hover:decoration-2 hover:decoration-primary hover:underline-offset-8"
            >
              Technical Support
            </a>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search events..."
              className="hidden w-40 rounded-full bg-surface-container-low px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary lg:block"
            />
            <button
              type="button"
              aria-label="Log out"
              className="group cursor-pointer p-2 rounded-full hover:bg-surface-container-low hover:ring-2 hover:ring-primary/40 hover:-translate-y-0.5 transition-all active:scale-90 duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="material-symbols-outlined text-on-surface-variant transition-colors group-hover:text-primary">logout</span>
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
              AK
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-[1fr_340px]">
        <section className="space-y-6 lg:col-start-1">
            <VideoPlayer
              videoUrl={event.videoUrl}
              category={event.category}
              date={event.date}
              time={event.time}
              title={event.title}
              speaker={event.speaker}
            />
        </section>

        <div className="self-start lg:col-start-2 lg:row-start-1 lg:h-[600px]">
          <div className="lg:fixed lg:top-[72px] lg:w-[340px] lg:right-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
            <LiveChat viewerCount={event.viewerCount} />
          </div>
        </div>

        <section className="border-t mt-8 pt-6 lg:col-start-1 lg:mt-0">
          <p className="text-xs font-semibold tracking-widest text-on-surface-variant">ABOUT THIS EVENT</p>
          <div className="mt-4">
            {event.description.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-base leading-relaxed text-on-surface-variant ${
                  index < event.description.length - 1 ? 'mb-4' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="cursor-pointer rounded-full border border-outline-variant/40 px-3 py-1 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-low"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant/30 bg-surface-container-low">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-on-surface">The Kinetic Curator</h3>
            <p className="mt-3 text-sm text-on-surface-variant">
              Curating the world&#39;s most trusted technical broadcasts, expert sessions, and engineering conversations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-on-surface">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-primary">Browse Events</a></li>
              <li><a href="#" className="hover:text-primary">Streaming Guide</a></li>
              <li><a href="#" className="hover:text-primary">Technical Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-on-surface">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Use</a></li>
              <li><a href="#" className="hover:text-primary">Code of Conduct</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-on-surface">Connect</h4>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-base">share</span>
              Share
            </div>
          </div>
        </div>
        <div className="border-t border-outline-variant/30 px-6 py-4 text-center text-xs font-semibold tracking-wide text-on-surface-variant">
          © 2024 THE KINETIC CURATOR. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
