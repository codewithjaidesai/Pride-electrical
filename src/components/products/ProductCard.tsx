import Link from 'next/link';
import { NormalizedProduct } from '@/lib/types';
import { formatPrice } from '@/lib/products';

interface ProductCardProps {
  product: NormalizedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.categoryId}/${product.catalog_no}`}
      className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-primary-500 hover:shadow-lg transition-all duration-200"
    >
      {/* Product Image Placeholder */}
      <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
        <div className="text-center p-4">
          <span className="text-2xl font-bold text-gray-400 group-hover:text-primary-600 transition-colors">
            {product.series || product.catalog_no.split('-')[0]}
          </span>
          <p className="text-xs text-gray-400 mt-1">
            {product.material || 'Dowell\'s'}
          </p>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <p className="text-xs text-primary-600 font-medium mb-1">
          {product.catalog_no}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {product.size_sq_mm ? `${product.size_sq_mm} sq mm` : ''}{' '}
          {product.hole_size_mm ? `- ${product.hole_size_mm}mm hole` : ''}
          {!product.size_sq_mm && product.name.split(' - ').slice(-1)[0]}
        </h3>

        {/* Specifications */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.size_sq_mm && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
              {product.size_sq_mm} sq mm
            </span>
          )}
          {product.hole_size_mm && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
              {product.hole_size_mm}mm hole
            </span>
          )}
          {product.subcategory && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary-50 text-primary-700">
              {product.subcategory}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price_inr)}
          </span>
          {product.std_pkg && (
            <span className="text-xs text-gray-500">
              Pkg: {product.std_pkg}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
