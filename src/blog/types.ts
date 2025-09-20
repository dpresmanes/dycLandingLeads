export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO date e.g. 2025-09-20
  excerpt: string;
  content: string[]; // párrafos en orden
  tags?: string[];
  readingTime?: string; // e.g. "4 min"
};