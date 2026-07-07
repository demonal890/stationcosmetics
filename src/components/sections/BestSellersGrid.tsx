'use client';

import { MessageCircle, Star } from 'lucide-react';
import { Product } from '@/lib/queries/products';

interface BestSellersGridProps {
  products: Product[];
  whatsappNumber?: string;
}

export function BestSellersGrid({ products, whatsappNumber = '6281376147334' }: BestSellersGridProps) {
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Station Cosmetics, saya mau tanya produk 😊')}`;

  const formatPrice = (price?: number) => {
    if (!price) return '0';
    return price.toLocaleString('id-ID');
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-accent rounded-2xl overflow-hidden bg-white flex flex-col hover:shadow-lg transition-shadow"
        >
          {/* Image */}
          <div className="relative w-full h-40 md:h-44 bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center">
            {product.is_best_seller && (
              <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                BEST SELLER
              </span>
            )}
            {product.discount && product.discount > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
            <span className="text-xs text-gray-500">{product.brand || 'Produk'}</span>
          </div>

          {/* Content */}
          <div className="p-3 flex flex-col flex-1">
            <span className="text-xs font-bold uppercase text-gray-400 tracking-wide mb-1">
              {product.brand || 'Brand'}
            </span>
            <p className="text-sm md:text-base font-semibold text-foreground line-clamp-2 mb-2 min-h-10">
              {product.name}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500">({formatCount(product.count)})</span>
            </div>

            {/* Price */}
            <div className="mb-3">
              {product.original_price && product.original_price > (product.price || 0) ? (
                <>
                  <span className="text-xs text-gray-500 line-through">
                    Rp {formatPrice(product.original_price)}
                  </span>
                  <div className="text-lg font-bold text-primary">
                    Rp {formatPrice(product.price)}
                  </div>
                </>
              ) : (
                <div className="text-lg font-bold text-foreground">
                  Rp {formatPrice(product.price)}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-auto">
              <a
                href={product.shopee_url || waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 bg-primary text-white font-bold text-xs py-2 px-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={15} />
                <span className="hidden sm:inline">Order</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
