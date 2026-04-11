"use client";

import React, { useState } from 'react';
import ShareModal from './ShareModal';

type Speaker = {
  name: string;
  role: string;
  avatarInitials: string;
};

type EventInfoProps = {
  category: string;
  date: string;
  time: string;
  eventType: string;
  title: string;
  speaker: Speaker;
  viewerCount: number;
  description: string[];
  tags: string[];
};

export default function EventInfo({
  category,
  date,
  time,
  eventType,
  title,
  speaker,
  viewerCount,
  description,
  tags,
}: EventInfoProps) {
  const [liked, setLiked] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);
  const [likeCount, setLikeCount] = useState(128);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribePop, setSubscribePop] = useState(false);
  const [showUnsubConfirm, setShowUnsubConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLikeToggle = () => {
    setLikeCount((count) => (liked ? count - 1 : count + 1));
    setLiked((prev) => !prev);
    setHeartAnimating(true);
    window.setTimeout(() => setHeartAnimating(false), 150);
  };

  const handleSubscribeToggle = () => {
    if (!subscribed) {
      setSubscribed(true);
      setSubscribePop(true);
      window.setTimeout(() => setSubscribePop(false), 300);
      return;
    }

    setShowUnsubConfirm(true);
  };

  return (
    <>
      <div className="animate-fade-up delay-2 anim-fade-up d2" style={{ marginTop: '12px', marginBottom: '8px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>{title}</h1>
      </div>

      <ShareModal show={showShareModal} onClose={() => setShowShareModal(false)} />

      {showUnsubConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setShowUnsubConfirm(false)}
        >
          <div
            className="share-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px 24px',
              width: '360px',
              maxWidth: '90vw',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700 }}>
                {speaker.avatarInitials}
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center', marginTop: '12px' }}>
              Unsubscribe from
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>
              {speaker.name}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', width: '100%' }}>
              <button
                type="button"
                onClick={() => setShowUnsubConfirm(false)}
                style={{
                  flex: 1,
                  backgroundColor: '#f1f5f9',
                  color: '#374151',
                  borderRadius: '99px',
                  padding: '10px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubscribed(false);
                  setShowUnsubConfirm(false);
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  borderRadius: '99px',
                  padding: '10px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Unsubscribe
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="event-streamer-row animate-fade-up delay-3 anim-fade-up d3"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 0',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb',
          margin: '8px 0 0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {speaker.avatarInitials}
            </div>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{speaker.name}</span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>12.4K subscribers</span>
          <button
            type="button"
            onClick={handleSubscribeToggle}
            className={subscribePop ? 'subscribe-pop' : ''}
            style={{
              backgroundColor: subscribed ? '#f1f5f9' : '#0f172a',
              color: subscribed ? '#0f172a' : '#ffffff',
              borderRadius: '99px',
              padding: '6px 16px',
              border: subscribed ? '1px solid #e5e7eb' : 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px',
              transition: 'background-color 0.2s ease, color 0.2s ease, border 0.2s ease'
            }}
          >
            {subscribed ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <button
            type="button"
            aria-label="Like event"
            onClick={handleLikeToggle}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '999px',
              padding: '6px 12px',
              backgroundColor: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <span
              className={`material-symbols-outlined inline-block transition-transform duration-150 ${
                heartAnimating ? 'scale-[1.2]' : 'scale-100'
              } ${liked ? 'text-[#ef4444]' : 'text-on-surface-variant'}`}
              style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0", fontSize: '16px' }}
            >
              favorite
            </span>
            <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>{likeCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowShareModal(true)}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '999px',
              padding: '6px 12px',
              backgroundColor: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer'
            }}
          >
            Share
          </button>
          <button
            type="button"
            aria-label="More options"
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '999px',
              padding: '6px 10px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              color: '#374151'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>more_horiz</span>
          </button>
        </div>
      </div>

      <section
        className="animate-fade-up delay-4 anim-fade-up d4"
        style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '16px',
          marginTop: '12px'
        }}
      >
        <div className="anim-fade-up d3" style={{ fontSize: '13px', color: '#374151', marginBottom: '10px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          <span style={{ fontWeight: 600 }}>{viewerCount.toLocaleString()} watching now</span>
          <span style={{ color: '#9ca3af' }}>•</span>
          <span>Started {time ? `${date} ${time}` : date}</span>
          <span style={{ color: '#9ca3af' }}>•</span>
          <span>{category}</span>
          <span style={{ color: '#9ca3af' }}>•</span>
          <span>{eventType}</span>
        </div>

        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
          8 Events • 4.8★ Rating • 2.4K Followers
        </div>

        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#374151',
            ...(isExpanded
              ? {}
              : {
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden'
                })
          }}
        >
          {Array.isArray(description) ? description.join(' ') : description}
        </p>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          style={{
            background: 'none',
            border: 'none',
            color: '#4f46e5',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
            marginTop: '6px'
          }}
        >
          {isExpanded ? 'Show less' : '...more'}
        </button>

        <div style={{ marginTop: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: 'Slides', href: '#slides' },
            { label: 'Resource Repo', href: '#resources' },
            { label: 'Speaker Profile', href: '#speaker' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                color: '#4f46e5',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>link</span>
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes subscribePop {
          0% { transform: scale(1); }
          40% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        .subscribe-pop {
          animation: subscribePop 0.25s ease-out;
        }

        .share-modal { animation: modalIn 0.2s ease-out both; }

        @media (max-width: 639px) {
          .event-streamer-row {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}
