"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import EventInfo from '../event/EventInfo';

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
  eventType: string;
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
  eventType,
  title,
  speaker,
  viewerCount,
  description,
  tags,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <div
        className="bg-inverse-surface"
        style={{ width: '100%', borderRadius: '10px', overflow: 'hidden' }}
      >
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
          {isPlaying ? (
            <iframe
              src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div
              style={{ position: 'absolute', inset: 0, cursor: 'pointer', borderRadius: 'inherit' }}
              onClick={() => setIsPlaying(true)}
            >
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 70vw"
                  className="object-cover"
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#1f2937' }} />
              )}
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
      </div>

      <EventInfo
        category={category}
        date={date}
        time={time}
        eventType={eventType}
        title={title}
        speaker={speaker}
        viewerCount={viewerCount}
        description={description}
        tags={tags}
      />

      <style>{`
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
