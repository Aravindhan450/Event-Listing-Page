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
      <div className="mt-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            aria-label="Like event"
            onClick={handleLikeToggle}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '999px',
              padding: '8px 14px',
              backgroundColor: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <span
              className={`material-symbols-outlined inline-block transition-transform duration-150 ${
                heartAnimating ? 'scale-[1.2]' : 'scale-100'
              } ${liked ? 'text-[#ef4444]' : 'text-on-surface-variant'}`}
              style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0", fontSize: '18px' }}
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
              padding: '8px 14px',
              backgroundColor: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Share
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>share</span>
            </span>
          </button>
        </div>
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

      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#6b7280', flexWrap: 'wrap' }}>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {category}
        </span>
        <span>{time ? `${date} • ${time}` : date}</span>
        <span style={{ color: '#9ca3af' }}>•</span>
        <span>{(viewerCount / 1000).toFixed(1)}K watching</span>
      </div>

      <div style={{ height: '1px', backgroundColor: '#e5e7eb', width: '100%', margin: '16px 0' }} />

      <div className="mt-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
            {speaker.avatarInitials}
          </div>
          <div>
            <p style={{ fontWeight: 600, color: '#0f172a', margin: 0 }}>{speaker.name}</p>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0' }}>{speaker.role}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubscribeToggle}
          className={subscribePop ? 'subscribe-pop' : ''}
          style={{
            backgroundColor: subscribed ? '#f1f5f9' : '#0f172a',
            color: subscribed ? '#0f172a' : '#ffffff',
            borderRadius: '99px',
            padding: '8px 20px',
            border: subscribed ? '1px solid #e5e7eb' : 'none',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'background-color 0.2s ease, color 0.2s ease, border 0.2s ease'
          }}
        >
          {subscribed ? 'Subscribed ✓' : 'Subscribe'}
        </button>
      </div>

      <div style={{ height: '1px', backgroundColor: '#e5e7eb', width: '100%', margin: '16px 0' }} />

      <section className="bg-white border border-gray-200 rounded-xl p-6 mt-6 shadow-sm lg:col-span-2">
        <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3">
          ABOUT THIS EVENT
        </p>
        <div>
          {Array.isArray(description)
            ? description.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-sm text-gray-700 leading-relaxed ${index < description.length - 1 ? 'mb-3' : ''}`}
                >
                  {paragraph}
                </p>
              ))
            : typeof description === 'string'
              ? (
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {description}
                </p>
                )
              : null}
        </div>
        <div className="mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs mr-2"
            >
              {tag}
            </span>
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
      `}</style>
    </>
  );
}
