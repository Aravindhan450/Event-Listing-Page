"use client";

import React, { useState } from 'react';

type Speaker = {
  name: string;
  role: string;
  avatarInitials: string;
};

type VideoPlayerProps = {
  videoUrl?: string;
  category: string;
  date: string;
  time: string;
  title: string;
  speaker: Speaker;
};

export default function VideoPlayer({
  videoUrl,
  category,
  date,
  time,
  title,
  speaker,
}: VideoPlayerProps) {
  const [liked, setLiked] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);

  const handleLikeToggle = () => {
    setLiked((prev) => !prev);
    setHeartAnimating(true);
    window.setTimeout(() => setHeartAnimating(false), 150);
  };

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-inverse-surface">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            width="100%"
            height="100%"
            allowFullScreen
            title={title}
            className="h-full w-full border-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <button
              type="button"
              aria-label="Play video"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M6 4L16 10L6 16V4Z" fill="white" />
              </svg>
            </button>
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

        <div className="absolute right-3 top-3">
          <button
            type="button"
            aria-label="Share"
            className="rounded-full bg-black/40 p-2 transition-colors hover:bg-black/60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.25931 15.0329 5.51094 15.0948 5.75088L8.90961 9.22054C8.36434 8.47213 7.48038 8 6.5 8C4.84315 8 3.5 9.34315 3.5 11C3.5 12.6569 4.84315 14 6.5 14C7.48047 14 8.3645 13.5278 8.90976 12.7793L15.095 16.2491C15.033 16.4891 15 16.7407 15 17C15 18.6569 16.3431 20 18 20C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14C17.0195 14 16.1355 14.4722 15.5902 15.2207L9.40498 11.7509C9.46695 11.5109 9.5 11.2593 9.5 11C9.5 10.7407 9.46695 10.4891 9.40498 10.2491L15.5902 6.77934C16.1355 7.52781 17.0195 8 18 8Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {category}
        </span>
        <span className="text-sm text-on-surface-variant">
          {date} • {time}
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-bold text-on-surface">{title}</h1>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg bg-primary px-5 py-2 text-on-primary transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Register Now
        </button>
        <button
          type="button"
          aria-label="Like event"
          onClick={handleLikeToggle}
          className="rounded-lg border border-outline-variant/40 px-3 py-2 transition-colors hover:bg-surface-container-low"
        >
          <span
            className={`material-symbols-outlined inline-block transition-transform duration-150 ${
              heartAnimating ? 'scale-[1.2]' : 'scale-100'
            } ${liked ? 'text-[#ef4444]' : 'text-on-surface-variant'}`}
            style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
          {speaker.avatarInitials}
        </div>
        <div>
          <p className="font-semibold text-on-surface">{speaker.name}</p>
          <p className="text-sm text-on-surface-variant">{speaker.role}</p>
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
      `}</style>
    </div>
  );
}
