import type { Metadata } from 'next';
import HomePage from '../components/home/HomePage';

export const metadata: Metadata = {
  title: 'Browse Live Events — VickyBytes',
  description:
    'Explore 16+ curated tech events across Cloud, AI/ML, DevOps, Cybersecurity and more. Join live for free.',
};

export default function Page() {
  return <HomePage />;
}
