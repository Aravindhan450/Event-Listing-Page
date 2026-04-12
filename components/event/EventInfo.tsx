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
      <div className="animate-fade-up delay-2 anim-fade-up d2 mt-3 mb-2">
        <h1 className="m-0 text-[clamp(20px,5.2vw,30px)] font-extrabold leading-tight text-slate-900">
          {title}
        </h1>
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

      <div className="pb-24 md:pb-0">
        <div className="event-streamer-row animate-fade-up delay-3 anim-fade-up d3 border-y border-slate-200 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {speaker.avatarInitials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-bold text-slate-900">{speaker.name}</div>
                <div className="text-xs text-slate-500">12.4K subscribers</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubscribeToggle}
              className={`${subscribePop ? 'subscribe-pop' : ''} shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                subscribed
                  ? 'border border-slate-200 bg-slate-100 text-slate-900'
                  : 'bg-slate-900 text-white'
              }`}
            >
              {subscribed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-label="Like event"
              onClick={handleLikeToggle}
              className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
            >
              <span
                className={`material-symbols-outlined text-[17px] transition-transform duration-150 ${
                  heartAnimating ? 'scale-[1.2]' : 'scale-100'
                } ${liked ? 'text-[#ef4444]' : 'text-slate-500'}`}
                style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
              {likeCount}
            </button>
            <button
              type="button"
              onClick={() => setShowShareModal(true)}
              className="inline-flex min-h-8 items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
            >
              Share
            </button>
            <button
              type="button"
              aria-label="More options"
              className="inline-flex min-h-8 items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700"
            >
              <span className="material-symbols-outlined text-[17px]">more_horiz</span>
            </button>
          </div>
        </div>

        <section className="animate-fade-up delay-4 anim-fade-up d4 mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
          <div className="space-y-1 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">{viewerCount.toLocaleString()} watching now</div>
            <div>Started {time ? `${date} ${time}` : date}</div>
            <div className="text-slate-600">
              {category} <span className="mx-1 text-slate-400">•</span> {eventType}
            </div>
            <div className="text-slate-500">4.8★ Rating <span className="mx-1 text-slate-400">•</span> 2.4K Followers</div>
          </div>

          <p
            className={`mt-3 text-sm leading-6 text-slate-700 ${isExpanded ? '' : 'line-clamp-3'}`}
          >
            {Array.isArray(description) ? description.join(' ') : description}
          </p>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="mt-1 text-sm font-semibold text-indigo-600"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>

          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: 'Slides', href: '#slides' },
              { label: 'Resource Repo', href: '#resources' },
              { label: 'Speaker Profile', href: '#speaker' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600"
              >
                <span className="material-symbols-outlined text-[14px]">link</span>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>

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

      `}</style>
    </>
  );
}
