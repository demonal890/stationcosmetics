'use client';

import { Star, MessageCircle, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/queries/products';
import { ShareButton } from './ShareButton';

interface ProductDetailProps {
  product: Product;
  waLink: string;
  settings?: any;
}

export function ProductDetail({ product, waLink, settings }: ProductDetailProps) {
  const discountPercentage = product.discount || 0;

  return (
    <section className="max-w-5xl mx-auto px-5 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="flex items-center justify-center">
          <div className="w-full aspect-square bg-gradient-to-br from-accent to-accent/40 rounded-3xl flex items-center justify-center relative">
            {product.discount && product.discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{product.discount}%
              </div>
            )}
            {product.is_best_seller && (
              <div className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                BEST SELLER
              </div>
            )}
            <span className="text-gray-500 text-center">
              {product.brand || 'Produk'} <br />
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <span className="text-sm">[Foto produk]</span>
              )}
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-bold uppercase text-gray-500 tracking-wide">
            {product.brand || 'Brand'}
          </span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground my-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-foreground">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-600">
              ({product.count.toLocaleString('id-ID')} ulasan)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6 p-4 bg-accent rounded-2xl">
            <div className="flex items-baseline gap-3">
              <span className="font-heading font-bold text-4xl text-primary">
                Rp {product.price?.toLocaleString('id-ID') || '0'}
              </span>
              {product.original_price && product.original_price > (product.price || 0) && (
                <span className="text-lg text-gray-500 line-through">
                  Rp {product.original_price.toLocaleString('id-ID')}
                </span>
              )}
            </div>
            {product.discount && product.discount > 0 && (
              <p className="text-sm text-primary font-semibold mt-2">
                Hemat {discountPercentage}% dari harga normal!
              </p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-2">Deskripsi Produk</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* How to Use */}
          {product.how_to_use && (
            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-2">Cara Penggunaan</h3>
              <p className="text-gray-700 leading-relaxed">{product.how_to_use}</p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={20} />
              Chat WhatsApp
            </a>
            {product.shopee_url && (
              <a
                href={product.shopee_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-foreground font-bold py-3 px-6 rounded-full hover:bg-primary/10 transition-colors"
              >
                <ShoppingBag size={20} />
                Beli di Shopee
              </a>
            )}
          </div>

          {/* Share */}
          <div className="mt-6 pt-6 border-t border-accent">
            <p className="text-sm text-gray-600 mb-3">Bagikan produk ini</p>
            <ShareButton title={product.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
