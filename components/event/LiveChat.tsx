"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Message = {
  id: number;
  initials: string;
  color: string;
  name: string;
  text: string;
  time: string;
  isHost?: boolean;
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
    isHost: true,
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
  const [reactions, setReactions] = useState<Record<number, Record<string, number>>>({});
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [nextId, setNextId] = useState(INITIAL_MESSAGES.length + 1);
  const [intervalDelay, setIntervalDelay] = useState(getRandomDelayMs());
  const [isPaused, setIsPaused] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [slowMode, setSlowMode] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [newMessagesStartIndex, setNewMessagesStartIndex] = useState<number | null>(null);
  const messagesListRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(isPaused);

  const meColor = useMemo(() => 'text-primary bg-primary/10', []);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomUser = USER_STYLES[Math.floor(Math.random() * USER_STYLES.length)];
      const randomText = RANDOM_MESSAGE_POOL[Math.floor(Math.random() * RANDOM_MESSAGE_POOL.length)];

      setMessages((prev) => {
        if (isPausedRef.current) {
          setHasNewMessages(true);
        }

        return [
          ...prev,
          {
            id: Date.now(),
            initials: randomUser.initials,
            color: randomUser.color,
            name: randomUser.name,
            text: randomText,
            time: getCurrentTime(),
          },
        ];
      });

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

    if (isPaused) {
      return;
    }

    list.scrollTo({
      top: list.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isPaused]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('.emoji-picker-panel') || target?.closest('.emoji-picker-toggle')) {
        return;
      }
      setShowEmojiPicker(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  const sendMessage = () => {
    const trimmed = draft.trim();
    if (!trimmed || cooldown) {
      return;
    }

    setMessages((prev) => {
      if (isPausedRef.current) {
        setHasNewMessages(true);
      }

      return [
        ...prev,
        {
          id: nextId,
          initials: 'ME',
          color: meColor,
          name: 'You',
          text: trimmed,
          time: getCurrentTime(),
        },
      ];
    });
    setNextId((id) => id + 1);
    setDraft('');

    if (slowMode) {
      setCooldown(true);
      window.setTimeout(() => setCooldown(false), 3000);
    }
  };

  const addReaction = (messageId: number, emoji: string) => {
    setReactions((prev) => ({
      ...prev,
      [messageId]: {
        [emoji]: 1,
      },
    }));
  };

  const removeReaction = (messageId: number, emoji: string) => {
    setReactions((prev) => {
      if (!prev[messageId]?.[emoji]) {
        return prev;
      }

      const next = { ...prev };
      delete next[messageId];
      return next;
    });
  };

  return (
    <aside
      className="flex h-full min-h-0 w-full max-h-full flex-col overflow-hidden"
      style={{
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
      }}
    >
      <div
        className="px-3 py-3 sm:px-4"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #e5e7eb',
          backgroundColor: '#ffffff',
          flexShrink: 0,
          gap: '10px'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
            aria-hidden="true"
          />
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-900 sm:text-xs" style={{ color: '#0f172a' }}>
            LIVE CHAT
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2" style={{ minWidth: 0 }}>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 sm:text-xs" style={{ color: '#6b7280' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M16 11c1.66 0 2.99-1.57 2.99-3.5S17.66 4 16 4s-3 1.57-3 3.5S14.34 11 16 11Zm-8 0c1.66 0 2.99-1.57 2.99-3.5S9.66 4 8 4 5 5.57 5 7.5 6.34 11 8 11Zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.96 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5Z" fill="currentColor"/>
            </svg>
            <span className="whitespace-nowrap">{viewerCount} viewers</span>
          </span>

          {slowMode && (
            <span
              style={{
                backgroundColor: '#fef9c3',
                color: '#854d0e',
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '99px'
              }}
            >
              🐢 Slow Mode
            </span>
          )}

          <button
            type="button"
            aria-label="Toggle slow mode"
            onClick={() => setSlowMode((prev) => !prev)}
            style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', padding: '2px 4px' }}
          >
            ⚙️
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#eff6ff',
          borderBottom: '1px solid #dbeafe',
          padding: '8px 12px',
          fontSize: '12px',
          color: '#1d4ed8',
          flexShrink: 0
        }}
      >
        📌 Keep chat constructive and on-topic.
      </div>

      <div
        ref={messagesListRef}
        onMouseEnter={() => {
          setNewMessagesStartIndex(messages.length);
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setHasNewMessages(false);
        }}
        className="relative min-h-0 flex-1 space-y-2 overflow-y-auto [scrollbar-gutter:stable]"
        style={{ backgroundColor: '#f8fafc', padding: '8px 0' }}
      >
        {messages.map((message, index) => {
          const [textClass, bgClass] = message.color.split(' ');
          const messageReactions = reactions[message.id];
          const showNewMessagesDivider = (isPaused || hasNewMessages)
            && newMessagesStartIndex !== null
            && newMessagesStartIndex < messages.length
            && index === newMessagesStartIndex;

          return (
            <React.Fragment key={message.id}>
              {showNewMessagesDivider && (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 8px' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
                  <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, padding: '0 8px' }}>New messages</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
                </div>
              )}

              <div
                onMouseEnter={() => setHoveredMessage(message.id)}
                onMouseLeave={() => setHoveredMessage(null)}
                className={`chat-message-row flex items-start gap-2.5 sm:gap-3 ${
                  index === messages.length - 1 && messages.length > INITIAL_MESSAGES.length
                    ? 'chat-message-new'
                    : ''
                } ${message.isHost ? 'chat-message-host' : ''}`}
                style={{ position: 'relative', padding: '6px 12px', borderRadius: '8px' }}
              >
                {hoveredMessage === message.id && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-32px',
                      left: 0,
                      backgroundColor: '#ffffff',
                      borderRadius: '99px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                      border: '1px solid #e5e7eb',
                      padding: '4px 8px',
                      display: 'flex',
                      gap: '4px',
                      zIndex: 10
                    }}
                  >
                    {['👍', '🔥', '❤️', '😄'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => addReaction(message.id, emoji)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '16px',
                          cursor: 'pointer',
                          padding: '0'
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                <div className={`h-8 w-8 shrink-0 rounded-full ${bgClass} ${textClass} text-xs font-semibold flex items-center justify-center`}>
                  {message.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={textClass} style={{ fontSize: '13px', fontWeight: 700 }}>{message.name}</span>
                    {message.isHost && (
                      <span
                        style={{
                          backgroundColor: '#4f46e5',
                          color: '#ffffff',
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        HOST
                      </span>
                    )}
                    <span className="message-time" style={{ fontSize: '11px', color: '#9ca3af', opacity: 0 }}>
                      {message.time}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>{message.text}</p>
                  {messageReactions && Object.keys(messageReactions).length > 0 && (
                    <div style={{ marginTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {Object.entries(messageReactions).map(([emoji, count]) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => removeReaction(message.id, emoji)}
                          style={{
                            backgroundColor: '#f1f5f9',
                            borderRadius: '99px',
                            padding: '2px 8px',
                            fontSize: '11px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <span>{emoji}</span>
                          <span>{count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />

        {hasNewMessages && isPaused && (
          <div
            onClick={() => {
              const list = messagesListRef.current;
              if (list) {
                list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
              }
              setHasNewMessages(false);
              setIsPaused(false);
            }}
            style={{
              position: 'sticky',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'table',
              margin: '0 auto',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              borderRadius: '99px',
              padding: '6px 16px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            ↓ New messages
          </div>
        )}
      </div>

      <div className="shrink-0 px-2.5 py-2.5 sm:px-3 sm:py-2.5" style={{ borderTop: '2px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <div className="flex items-center gap-1.5 sm:gap-2" style={{ position: 'relative' }}>
          {showEmojiPicker && (
            <div
              className="emoji-picker-panel"
              style={{
                position: 'absolute',
                bottom: '64px',
                left: 0,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                border: '1px solid #e5e7eb',
                padding: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                width: 'min(260px, calc(100vw - 32px))',
                zIndex: 20
              }}
            >
              {['👋', '🔥', '👏', '💡', '❤️', '😄', '🚀', '👍', '🤔', '💻', '⚡', '🎯', '😂', '🙌', '✅', '❓', '💯', '🛠️', '📦', '🌐'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setDraft((prev) => `${prev}${emoji}`);
                    setShowEmojiPicker(false);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '6px'
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <input
            type="text"
            value={draft}
            maxLength={150}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && draft.trim()) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Say something..."
            style={{
              width: '100%',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '99px',
              padding: '8px 12px',
              fontSize: '13px',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = '1px solid #4f46e5';
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = '1px solid #e2e8f0';
            }}
          />
          <button
            type="button"
            className="emoji-picker-toggle"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '4px 8px',
              color: '#6b7280'
            }}
          >
            🙂
          </button>
          <button
            type="button"
            onClick={sendMessage}
            disabled={cooldown || !draft.trim()}
            style={{
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              borderRadius: '99px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              border: 'none',
              cursor: cooldown || !draft.trim() ? 'not-allowed' : 'pointer',
              opacity: cooldown || !draft.trim() ? 0.5 : 1
            }}
          >
            Send
          </button>
        </div>
        {draft.length > 100 && (
          <div
            style={{
              fontSize: '11px',
              color: draft.length > 130 ? '#ef4444' : '#9ca3af',
              textAlign: 'right',
              marginTop: '6px'
            }}
          >
            {draft.length}/150
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes messageSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chat-message-new {
          animation: messageSlideIn 0.25s ease-out both;
        }

        .chat-message-row {
          transition: background 0.15s ease;
        }

        .chat-message-row:hover {
          background-color: #f8fafc;
        }

        .chat-message-row:hover .message-time {
          opacity: 1;
        }

        .chat-message-host {
          border-left: 3px solid #4f46e5;
          background-color: #f5f3ff;
        }

        @media (min-width: 640px) {
          .emoji-picker-panel {
            width: 260px !important;
          }
        }
      `}</style>
    </aside>
  );
}
