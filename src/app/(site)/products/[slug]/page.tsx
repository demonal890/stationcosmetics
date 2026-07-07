import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProductSlugs, Product } from '@/lib/queries/products';
import { getSiteSettings } from '@/lib/queries/settings';
import { ProductDetail } from '@/components/products/ProductDetail';

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
        type: 'website',
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
      <ProductDetail product={product} waLink={waLink} settings={settings} />

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
