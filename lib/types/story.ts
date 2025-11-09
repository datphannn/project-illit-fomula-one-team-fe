export interface Story {
  id: string;
  title: string;
  image: string;
  link: string;
  summary: string;
  content: string;
  category?: string;
  publishedAt?: string;
  author?: string;
  readTime?: number;
}
