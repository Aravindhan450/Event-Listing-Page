export type Event = {
  id: number;
  title: string;
  image: string;
  category: string;
  datetime: string;
  type: string;
  alt: string;
  categoryClasses?: string;
  date?: string;
  time?: string;
  description?: string | string[];
  tags?: string[];
  viewers?: number;
  videoUrl?: string;
};
