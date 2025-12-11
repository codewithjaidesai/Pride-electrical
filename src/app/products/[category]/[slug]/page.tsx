import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllProducts,
  getProductsByCategory,
  categoryDisplayNames,
  formatPrice,
  getCatalogMetadata,
} from '@/lib/products';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductCard from '@/components/products/ProductCard';

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const products = getProductsByCategory(category);
  const product = products.find((p) => p.catalog_no === slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const title = `${product.catalog_no} - ${product.size_sq_mm ? `${product.size_sq_mm} sq mm` : ''} ${product.category}`;

  return {
    title,
    description: `${product.catalog_no} - ${product.name}. Price: ${formatPrice(product.price_inr)}. Genuine Dowell's product available at Pride Electrical.`,
    keywords: [
      product.catalog_no,
      product.category,
      product.material || '',
      'Dowell\'s',
      'Pride Electrical',
    ].filter(Boolean),
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    category: p.categoryId,
    slug: p.catalog_no,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;
  const products = getProductsByCategory(category);
  const product = products.find((p) => p.catalog_no === slug);

  if (!product) {
    notFound();
  }

  const categoryName = categoryDisplayNames[category] || product.category;
  const catalogInfo = getCatalogMetadata().catalog_info;

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter((p) => p.catalog_no !== slug)
    .slice(0, 4);

  // Build specifications table
  const specifications: Array<{ label: string; value: string }> = [];

  if (product.size_sq_mm) {
    specifications.push({ label: 'Cable Size', value: `${product.size_sq_mm} sq mm` });
  }
  if (product.hole_size_mm) {
    specifications.push({ label: 'Hole Size', value: `${product.hole_size_mm} mm` });
  }
  if (product.material) {
    specifications.push({ label: 'Material', value: product.material });
  }
  if (product.type) {
    specifications.push({ label: 'Type', value: product.type });
  }
  if (product.series) {
    specifications.push({ label: 'Series', value: product.series });
  }
  if (product.subcategory) {
    specifications.push({ label: 'Variant', value: product.subcategory });
  }
  if (product.std_pkg) {
    specifications.push({ label: 'Standard Packaging', value: `${product.std_pkg} pcs` });
  }

  // Add specifications from the specifications object
  for (const [key, value] of Object.entries(product.specifications)) {
    if (value && !specifications.some((s) => s.label.toLowerCase().includes(key.toLowerCase()))) {
      const label = key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
      if (typeof value === 'string' || typeof value === 'number') {
        specifications.push({ label, value: String(value) });
      }
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: 'Products', href: '/products' },
              { label: categoryName, href: `/products/${category}` },
              { label: product.catalog_no },
            ]}
          />
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <div className="mb-8 lg:mb-0">
              <div className="aspect-square bg-white rounded-2xl border border-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-primary-600 mb-4">
                    {product.series || product.catalog_no.split('-')[0]}
                  </div>
                  <p className="text-lg text-gray-500">{product.material || "Dowell's"}</p>
                  <p className="text-sm text-gray-400 mt-2">Product Image</p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <svg className="h-6 w-6 mx-auto text-green-600 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  <p className="text-xs text-gray-600">100% Genuine</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <svg className="h-6 w-6 mx-auto text-primary-600 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <p className="text-xs text-gray-600">Pan India</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <svg className="h-6 w-6 mx-auto text-accent-500 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                  <p className="text-xs text-gray-600">Dowell&apos;s</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                  {categoryName}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.catalog_no}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {product.name}
              </p>

              {/* Price */}
              <div className="bg-gray-100 rounded-xl p-6 mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm text-gray-500">List Price</span>
                </div>
                <div className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price_inr)}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  * {catalogInfo.price_type} as per {catalogInfo.catalog_version}
                </p>
                <p className="text-sm text-primary-600 mt-1">
                  Contact us for bulk/dealer pricing
                </p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Specifications
                </h2>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">
                          Catalog Number
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                          {product.catalog_no}
                        </td>
                      </tr>
                      {specifications.map((spec, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-700">
                            {spec.label}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  Request Quote
                </Link>
                <Link
                  href={`/products/${category}`}
                  className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-xl font-semibold transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  Back to Category
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
