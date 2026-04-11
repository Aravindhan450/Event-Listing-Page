"use client";

import React, { useState } from 'react';

type ShareModalProps = {
  show: boolean;
  onClose: () => void;
};

export default function ShareModal({ show, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (!show) {
    return null;
  }

  const handleCopyLink = async () => {
    if (!currentUrl) return;
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
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
      onClick={onClose}
    >
      <div
        className="share-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '28px',
          width: '420px',
          maxWidth: '90vw',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Share this event</div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#6b7280',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', margin: '20px 0' }}>
          {[
            { label: 'WhatsApp', bg: '#25D366', icon: 'W' },
            { label: 'Twitter/X', bg: '#000000', icon: 'X' },
            { label: 'Facebook', bg: '#1877F2', icon: 'f' },
            { label: 'LinkedIn', bg: '#0A66C2', icon: 'in' },
            { label: 'Email', bg: '#6b7280', icon: '@' },
            { label: 'Copy Link', bg: '#4f46e5', icon: '⧉' },
          ].map((platform) => (
            <div key={platform.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: platform.bg,
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {platform.icon}
              </button>
              <span style={{ fontSize: '11px', color: '#6b7280' }}>{platform.label}</span>
            </div>
          ))}
        </div>

        <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: '16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            readOnly
            value={currentUrl}
            style={{
              flex: 1,
              border: '1px solid #e5e7eb',
              borderRadius: '99px',
              padding: '10px 16px',
              fontSize: '13px',
              color: '#374151',
              backgroundColor: '#f8fafc',
              outline: 'none'
            }}
          />
          <button
            type="button"
            onClick={handleCopyLink}
            style={{
              border: 'none',
              borderRadius: '999px',
              padding: '10px 16px',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        .share-modal { animation: modalIn 0.2s ease-out both; }
      `}</style>
    </div>
  );
}
