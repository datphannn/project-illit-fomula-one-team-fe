export interface News {
  id: string;
  title: string;
  date: string;
  content: string;
  image?: string;
  source?: string;
  category?: 'race' | 'driver' | 'team' | 'general';
  relatedId?: string;
  description?: string;
  author?: string;
  views?: number;
}
