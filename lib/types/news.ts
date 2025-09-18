export interface NewsItem {
  id: string;
  title: string;
  image: string;
  date: string;
  category: string;
  href: string;
  content?: string;
  author?: string;
  summary?: string;
  readTime?: string;
}