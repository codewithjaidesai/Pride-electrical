import type { Metadata } from 'next';
import { searchProducts } from '@/lib/products';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductCard from '@/components/products/ProductCard';
import ProductSearch from '../ProductSearch';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || '';
  return {
    title: query ? `Search: ${query}` : 'Search Products',
    description: `Search results for "${query}" in Dowell's cable accessories catalog.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const results = query ? searchProducts(query) : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Products', href: '/products' },
              { label: 'Search Results' },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {query ? `Search: "${query}"` : 'Search Products'}
          </h1>
          <p className="text-lg text-gray-300">
            {results.length > 0
              ? `Found ${results.length} product${results.length === 1 ? '' : 's'}`
              : query
              ? 'No products found'
              : 'Enter a search term to find products'}
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductSearch />
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {results.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h2>
              <p className="text-gray-600 mb-6">
                Try searching with different keywords or browse our categories.
              </p>
              <a
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Browse All Categories
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
