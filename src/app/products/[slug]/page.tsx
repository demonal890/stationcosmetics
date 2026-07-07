import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Star, MessageCircle, Share2, ShoppingBag } from 'lucide-react';
import { getProductBySlug, getAllProductSlugs, Product } from '@/lib/queries/products';
import { getSiteSettings } from '@/lib/queries/settings';

export const revalidate = 60; // ISR

interface ProductDetailProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  try {
    const product = await getProductBySlug(params.slug);
    return {
      title: `${product.name} — Station Cosmetics`,
      description: product.description || `Beli ${product.name} dari ${product.brand} di Station Cosmetics. 100% original, harga terbaik.`,
      openGraph: {
        title: product.name,
        description: product.description,
        type: 'product',
        images: product.image_url ? [{ url: product.image_url }] : [],
      },
    };
  } catch {
    return {
      title: 'Produk tidak ditemukan — Station Cosmetics',
    };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  let product: Product;
  let settings;

  try {
    [product, settings] = await Promise.all([
      getProductBySlug(params.slug),
      getSiteSettings(),
    ]);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    notFound();
  }

  const waLink = `https://wa.me/${settings?.whatsapp_number || '6281376147334'}?text=${encodeURIComponent(`Halo Station Cosmetics, saya tertarik dengan ${product.name} 😊`)}`;
  const discountPercentage = product.discount || 0;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-accent/50 px-5 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-primary transition-colors">
              Produk
            </a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-semibold">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
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
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: `Cek produk ${product.name} dari Station Cosmetics!`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link disalin ke clipboard!');
                  }
                }}
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:opacity-80 transition-opacity"
              >
                <Share2 size={16} />
                Bagikan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-accent py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6 text-center">
            Kenapa Belanja di Station Cosmetics?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '✓', title: '100% Original', desc: 'Produk resmi & bergaransi' },
              { icon: '✓', title: 'Harga Terbaik', desc: 'Harga paling kompetitif' },
              { icon: '✓', title: 'Pengiriman Cepat', desc: 'Proses cepat ke seluruh Indonesia' },
              { icon: '✓', title: 'Customer Care', desc: 'Tim support siap membantu' },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="text-3xl text-primary mb-2">{benefit.icon}</div>
                <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
