import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/data/blog/posts';

export const metadata: Metadata = {
  title: 'Blog | Pride Electrical - Cable Accessories Guides & News',
  description:
    'Expert guides on cable lugs, glands, and electrical accessories. Learn selection tips, installation best practices, and industry news from India\'s largest Dowell\'s dealer.',
  openGraph: {
    title: 'Blog | Pride Electrical',
    description:
      'Expert guides on cable accessories, selection tips, and industry news.',
    type: 'website',
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Knowledge Center
            </h1>
            <p className="text-lg text-primary-100">
              Expert guides, tutorials, and industry insights on cable accessories.
              Learn from India&apos;s largest Dowell&apos;s dealer.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-4 py-4 overflow-x-auto">
            <Link
              href="/blog"
              className="px-4 py-2 bg-primary-700 text-white rounded-full text-sm font-medium whitespace-nowrap"
            >
              All Posts
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <Link href={`/blog/${featuredPost.slug}`}>
              <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 flex items-center justify-center min-h-[250px]">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 text-primary-600 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                      <span className="text-primary-700 font-semibold">Featured Article</span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {featuredPost.categories.map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 hover:text-primary-700 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                      {featuredPost.readingTime && (
                        <>
                          <span className="mx-2">·</span>
                          <span>{featuredPost.readingTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Other Posts */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow h-full border border-gray-200">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-6 flex items-center justify-center h-40">
                    <svg
                      className="w-12 h-12 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{formatDate(post.publishedAt)}</span>
                      {post.readingTime && (
                        <>
                          <span className="mx-2">·</span>
                          <span>{post.readingTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Stay Updated with Industry Insights
            </h2>
            <p className="text-primary-100 mb-6">
              Get the latest guides, product updates, and industry news delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent-500 text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
