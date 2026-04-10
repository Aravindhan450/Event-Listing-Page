"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Message = {
  id: number;
  initials: string;
  color: string;
  name: string;
  text: string;
  time: string;
};

type LiveChatProps = {
  viewerCount: number;
};

const USER_STYLES = [
  { name: 'Marco Lopez', initials: 'ML', color: 'text-blue-600 bg-blue-100' },
  { name: 'Jenny Wong', initials: 'JW', color: 'text-green-600 bg-green-100' },
  { name: 'Alex Brooks', initials: 'AB', color: 'text-purple-600 bg-purple-100' },
  { name: 'Sam Patel', initials: 'SP', color: 'text-orange-600 bg-orange-100' },
  { name: 'Erik Knudsen', initials: 'EK', color: 'text-teal-600 bg-teal-100' },
  { name: 'Maria Diaz', initials: 'MD', color: 'text-pink-600 bg-pink-100' },
  { name: 'Tom Yancey', initials: 'TY', color: 'text-gray-600 bg-gray-100' },
] as const;

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    name: 'Marco Lopez',
    initials: 'ML',
    color: 'text-blue-600 bg-blue-100',
    text: 'The bit about multi-region scheduling is exactly what I needed. Anyone using Istio for this?',
    time: '09:02',
  },
  {
    id: 2,
    name: 'Jenny Wong',
    initials: 'JW',
    color: 'text-green-600 bg-green-100',
    text: 'We moved from NGINX ingress to Gateway API last month and saw cleaner policy management.',
    time: '09:03',
  },
  {
    id: 3,
    name: 'Alex Brooks',
    initials: 'AB',
    color: 'text-purple-600 bg-purple-100',
    text: 'Great demo so far. Curious how they are handling failover drills without disrupting active sessions.',
    time: '09:04',
  },
  {
    id: 4,
    name: 'Sam Patel',
    initials: 'SP',
    color: 'text-orange-600 bg-orange-100',
    text: 'If anyone wants examples, I have Terraform modules for multi-region workers and queue routing.',
    time: '09:05',
  },
  {
    id: 5,
    name: 'Erik Knudsen',
    initials: 'EK',
    color: 'text-teal-600 bg-teal-100',
    text: 'Their observability setup is nice. OpenTelemetry + service graph made incident triage much faster for us.',
    time: '09:06',
  },
  {
    id: 6,
    name: 'Maria Diaz',
    initials: 'MD',
    color: 'text-pink-600 bg-pink-100',
    text: 'Would love a follow-up segment on cost controls when traffic spikes across regions.',
    time: '09:07',
  },
  {
    id: 7,
    name: 'Tom Yancey',
    initials: 'TY',
    color: 'text-gray-600 bg-gray-100',
    text: 'This is one of the most practical architecture talks I have seen this year.',
    time: '09:08',
  },
];

const RANDOM_MESSAGE_POOL = [
  'Anyone benchmarking queue latency between regions with this pattern?',
  'Their rollout strategy is clean. Blue/green plus canary gates seems to reduce blast radius a lot.',
  'We use Argo Rollouts for similar traffic shifting and it has been stable in production.',
  'Question for the room: are people preferring managed service mesh or self-hosted control planes now?',
  'The speaker notes on SLO budgets are gold. Definitely sharing this with my platform team.',
  'Would be great to see the same architecture with event replay and backfill workflows.',
  'We solved a similar issue by moving retries to the edge and reducing cross-region chatter.',
  'Nice reminder that observability should be part of the design, not bolted on after launch.',
  'This gives me ideas for improving our incident playbooks around regional degradation.',
  'I appreciate that they are showing tradeoffs instead of presenting one silver bullet.',
] as const;

function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getRandomDelayMs(): number {
  return 4000 + Math.floor(Math.random() * 2001);
}

export default function LiveChat({ viewerCount }: LiveChatProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');
  const [nextId, setNextId] = useState(INITIAL_MESSAGES.length + 1);
  const [intervalDelay, setIntervalDelay] = useState(getRandomDelayMs());
  const messagesListRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const meColor = useMemo(() => 'text-primary bg-primary/10', []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomUser = USER_STYLES[Math.floor(Math.random() * USER_STYLES.length)];
      const randomText = RANDOM_MESSAGE_POOL[Math.floor(Math.random() * RANDOM_MESSAGE_POOL.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          initials: randomUser.initials,
          color: randomUser.color,
          name: randomUser.name,
          text: randomText,
          time: getCurrentTime(),
        },
      ]);

      // Reset interval with a new random delay between 4s and 6s.
      setIntervalDelay(getRandomDelayMs());
    }, intervalDelay);

    return () => clearInterval(intervalId);
  }, [intervalDelay]);

  useEffect(() => {
    const list = messagesListRef.current;
    if (!list) {
      return;
    }

    list.scrollTo({
      top: list.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: nextId,
        initials: 'ME',
        color: meColor,
        name: 'You',
        text: trimmed,
        time: getCurrentTime(),
      },
    ]);
    setNextId((id) => id + 1);
    setDraft('');
  };

  return (
    <aside className="flex h-[600px] flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest">
      <div className="shrink-0 flex items-center justify-between border-b border-outline-variant/30 px-4 py-3">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface">
          <span>LIVE CHAT</span>
          <span
            className="h-2 w-2 rounded-full bg-green-500"
            style={{ animation: 'statusPulse 1.5s ease-in-out infinite' }}
            aria-hidden="true"
          />
        </div>
        <span className="text-xs font-semibold text-on-surface-variant">{viewerCount} VIEWERS</span>
      </div>

      <div ref={messagesListRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-4 [scrollbar-gutter:stable]">
        {messages.map((message) => {
          const [textClass, bgClass] = message.color.split(' ');
          return (
            <div key={message.id} className="flex items-start gap-3 animate-[messageIn_200ms_ease-out]">
              <div className={`h-8 w-8 rounded-full ${bgClass} ${textClass} text-xs font-semibold flex items-center justify-center`}>
                {message.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${textClass}`}>{message.name}</span>
                  <span className="text-xs text-on-surface-variant/70">{message.time}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{message.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 border-t border-outline-variant/30 p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Say something..."
            className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={sendMessage}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-colors hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes statusPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </aside>
  );
}
