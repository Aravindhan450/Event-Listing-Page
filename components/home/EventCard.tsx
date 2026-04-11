import React from 'react';

type EventCardProps = {
  children?: React.ReactNode;
};

export default function EventCard({ children }: EventCardProps) {
  return <>{children}</>;
}
