/**
 * Sanity CMS Client Configuration
 *
 * To connect to Sanity:
 * 1. Create a project at sanity.io
 * 2. Get your project ID and dataset name
 * 3. Add environment variables:
 *    - NEXT_PUBLIC_SANITY_PROJECT_ID
 *    - NEXT_PUBLIC_SANITY_DATASET
 *    - SANITY_API_TOKEN (for write operations)
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Check if Sanity is configured
export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_DATASET
);

// Create Sanity client
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  // Get all blog posts
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->{name, image},
    "categories": categories[]->title
  }`,

  // Get single post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    mainImage,
    "author": author->{name, image, bio},
    "categories": categories[]->title,
    seoTitle,
    seoDescription
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`,

  // Get FAQs
  allFaqs: `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }`,
};
