"use client";

import React, { useState } from 'react';

type Speaker = {
  name: string;
  role: string;
  avatarInitials: string;
};

type VideoPlayerProps = {
  videoUrl?: string;
  thumbnail?: string;
  category: string;
  date: string;
  time: string;
  title: string;
  speaker: Speaker;
  viewerCount: number;
  description: string[];
  tags: string[];
};

export default function VideoPlayer({
  videoUrl,
  thumbnail,
  category,
  date,
  time,
  title,
  speaker,
  viewerCount,
  description,
  tags,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);
  const likeCount = 128;

  const handleLikeToggle = () => {
    setLiked((prev) => !prev);
    setHeartAnimating(true);
    window.setTimeout(() => setHeartAnimating(false), 150);
  };

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-inverse-surface">
        {isPlaying ? (
          <iframe
            src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div
            style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer', borderRadius: 'inherit' }}
            onClick={() => setIsPlaying(true)}
          >
            <img src={thumbnail} width="100%" height="100%" style={{ objectFit: 'cover' }} alt={title} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#4f46e5" aria-hidden="true">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
            <span
              className="h-2 w-2 rounded-full bg-red-300"
              style={{ animation: 'statusPulse 1.5s ease-in-out infinite' }}
              aria-hidden="true"
            />
            LIVE
          </span>
        </div>

      </div>

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
          style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            borderRadius: '99px',
            padding: '8px 20px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Subscribe
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
      `}</style>
    </div>
  );
}
