/**
 * Blog and CMS Types for Pride Electrical
 */

export interface Author {
  name: string;
  image?: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content for static, PortableText for Sanity
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  categories: string[];
  tags?: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  readingTime?: number;
}

export interface BlogCategory {
  id: string;
  slug: string;
  title: string;
  description?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface LocationPage {
  id: string;
  slug: string;
  city: string;
  state: string;
  title: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
  content: string;
  servicesHighlights: string[];
}
