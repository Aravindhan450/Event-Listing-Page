import React from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search events...',
  inputClassName,
  wrapperClassName,
}: SearchBarProps) {
  return (
    <div
      className={wrapperClassName}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '99px',
        padding: '12px 16px 12px 20px',
        border: '1px solid rgba(15, 23, 42, 0.18)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        gap: '12px',
        width: '100%',
      }}
    >
      <svg width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search events"
        className={inputClassName}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontSize: '15px',
          color: '#111827',
          background: 'transparent',
        }}
      />
    </div>
  );
}
