import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getAllProducts } from '@/lib/products';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductSearch from './ProductSearch';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse our complete range of Dowell\'s cable accessories including copper lugs, aluminium lugs, cable glands, bi-metallic terminals, and crimping tools. Over 2500+ products available.',
  keywords: [
    'Dowell\'s products',
    'cable lugs',
    'copper lugs',
    'aluminium lugs',
    'cable glands',
    'bi-metallic',
    'crimping tools',
  ],
};

// Group categories for better navigation
const categoryGroups = [
  {
    name: 'Copper Products',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
    ),
    categories: [
      'copper-tube-terminals-medium-duty',
      'copper-tube-terminals-heavy-duty-bs4579',
      'copper-tube-terminals-heavy-duty-long-barrel',
      'copper-sector-lugs-long-barrel',
      'copper-sector-lugs-short-barrel',
      'copper-connectors',
    ],
  },
  {
    name: 'Aluminium Products',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    categories: [
      'aluminium-tube-terminals',
      'aluminium-sector-lugs',
      'aluminium-connectors',
    ],
  },
  {
    name: 'Bi-Metallic',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    categories: ['bimetallic'],
  },
  {
    name: 'Terminals',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    categories: ['ring-terminals', 'pin-terminals', 'fork-terminals', 'end-sealing-ferrules'],
  },
  {
    name: 'Cable Glands',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    categories: ['brass-cable-glands-double-compression', 'cable-glands-ss316', 'cable-glands-nylon'],
  },
  {
    name: 'Tools & Equipment',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    categories: ['crimping-tools'],
  },
];

export default function ProductsPage() {
  const categories = getCategories();
  const allProducts = getAllProducts();
  const totalProducts = allProducts.length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Products' }]} />
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Product Catalog</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Browse our complete range of {totalProducts.toLocaleString()}+ Dowell&apos;s cable accessories.
            All products come with genuine quality assurance.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductSearch />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>

          <div className="space-y-12">
            {categoryGroups.map((group) => {
              const groupCategories = categories.filter((c) =>
                group.categories.includes(c.slug)
              );

              if (groupCategories.length === 0) return null;

              return (
                <div key={group.name}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                      {group.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products/${category.slug}`}
                        className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-500 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-2">
                              {category.name}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              {category.description}
                            </p>
                            <span className="inline-flex items-center text-sm text-primary-600 font-medium">
                              {category.productCount} products
                              <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-2xl p-8 text-white">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent-400">{totalProducts.toLocaleString()}+</div>
                <div className="text-gray-300 mt-1">Products</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-400">{categories.length}</div>
                <div className="text-gray-300 mt-1">Categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-400">100%</div>
                <div className="text-gray-300 mt-1">Genuine Dowell&apos;s</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-400">Pan India</div>
                <div className="text-gray-300 mt-1">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
