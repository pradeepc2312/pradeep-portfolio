export interface Project {
  slug: string;
  title: string;
  year: number;
  role: string;
  cover: string;
  coverAlt: string;
  tags: string[];
  tech: string[];
  summary: string;
  body: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}
