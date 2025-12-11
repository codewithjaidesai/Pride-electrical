import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProductsByCategory,
  getCategories,
  categoryDisplayNames,
  formatPrice,
} from '@/lib/products';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductCard from '@/components/products/ProductCard';
import CategoryFilters from './CategoryFilters';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ subcategory?: string; size?: string; page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const displayName = categoryDisplayNames[category] || category;
  const products = getProductsByCategory(category);

  if (products.length === 0) {
    return { title: 'Category Not Found' };
  }

  return {
    title: displayName,
    description: `Browse ${products.length} ${displayName} products from Dowell's. Find cable lugs, terminals, and accessories with specifications and pricing.`,
    keywords: [displayName, 'Dowell\'s', 'cable accessories', 'Pride Electrical'],
  };
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const filters = await searchParams;

  let products = getProductsByCategory(category);

  if (products.length === 0) {
    notFound();
  }

  const displayName = categoryDisplayNames[category] || products[0]?.category || category;

  // Get unique subcategories and sizes for filters
  const subcategories = [...new Set(products.map((p) => p.subcategory).filter(Boolean))] as string[];
  const sizes = [...new Set(products.map((p) => p.size_sq_mm).filter(Boolean))].sort((a, b) => (a as number) - (b as number)) as number[];

  // Apply filters
  if (filters.subcategory) {
    products = products.filter((p) => p.subcategory === filters.subcategory);
  }
  if (filters.size) {
    const sizeNum = parseFloat(filters.size);
    products = products.filter((p) => p.size_sq_mm === sizeNum);
  }

  // Pagination
  const page = parseInt(filters.page || '1', 10);
  const perPage = 24;
  const totalPages = Math.ceil(products.length / perPage);
  const paginatedProducts = products.slice((page - 1) * perPage, page * perPage);

  // Price range
  const minPrice = Math.min(...products.map((p) => p.price_inr));
  const maxPrice = Math.max(...products.map((p) => p.price_inr));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Products', href: '/products' },
              { label: displayName },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{displayName}</h1>
          <p className="text-lg text-gray-300">
            {products.length} product{products.length === 1 ? '' : 's'} available
            {minPrice !== maxPrice && (
              <span className="ml-2">
                • {formatPrice(minPrice)} - {formatPrice(maxPrice)}
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 mb-8 lg:mb-0">
              <CategoryFilters
                category={category}
                subcategories={subcategories}
                sizes={sizes}
                currentSubcategory={filters.subcategory}
                currentSize={filters.size}
              />
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing {paginatedProducts.length} of {products.length} products
                </p>
              </div>

              {/* Products */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-2">
                    {page > 1 && (
                      <a
                        href={`/products/${category}?${new URLSearchParams({
                          ...(filters.subcategory && { subcategory: filters.subcategory }),
                          ...(filters.size && { size: filters.size }),
                          page: String(page - 1),
                        }).toString()}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </a>
                    )}

                    <span className="px-4 py-2 text-gray-600">
                      Page {page} of {totalPages}
                    </span>

                    {page < totalPages && (
                      <a
                        href={`/products/${category}?${new URLSearchParams({
                          ...(filters.subcategory && { subcategory: filters.subcategory }),
                          ...(filters.size && { size: filters.size }),
                          page: String(page + 1),
                        }).toString()}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Next
                      </a>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
