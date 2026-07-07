import { Metadata } from 'next';
import { BadgeCheck, Gift, Shield, Flame } from 'lucide-react';
import { getDiscountedProducts, Product } from '@/lib/queries/products';
import { getSiteSettings, SiteSettings } from '@/lib/queries/settings';
import { BestSellersGrid } from '@/components/sections/BestSellersGrid';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Promo & Diskon — Station Cosmetics',
  description: 'Temukan berbagai promo spesial dan penawaran terbatas. Diskon hingga 45% setiap minggu!',
};

const campaigns = [
  {
    title: 'Skincare Week',
    description: 'Diskon hingga 40% untuk semua produk skincare favorit kamu.',
    period: 'Periode: 12 - 18 Mei 2025',
  },
  {
    title: 'Bundle Hemat',
    description: 'Paket bundling pilihan dengan harga lebih hemat.',
    period: 'Periode: 12 - 25 Mei 2025',
  },
  {
    title: 'Makeup Special Price',
    description: 'Makeup favorit dengan harga spesial, mulai dari Rp.19.000!',
    period: 'Periode: 12 - 18 Mei 2025',
  },
  {
    title: 'Weekend Deals',
    description: 'Flash sale akhir pekan, diskon tambahan hingga 30%!',
    period: 'Periode: Setiap Sabtu - Minggu',
  },
];

export default async function PromoPage() {
  let promoProducts: Product[] = [];
  let settings: SiteSettings = {};

  try {
    [promoProducts, settings] = await Promise.all([
      getDiscountedProducts(8),
      getSiteSettings(),
    ]);
  } catch (error) {
    console.error('Failed to fetch promo data:', error);
  }

  const waLink = `https://wa.me/${settings.whatsapp_number || '6281376147334'}`;
  const shopeeUrl = settings.shopee_url || 'https://shopee.co.id/';

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-accent/50 px-5 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-3">
            Promo & Diskon
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Temukan berbagai promo spesial dan penawaran terbatas dari Station Cosmetics. Kulit sehat,
            cantik maksimal dengan harga terbaik!
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-5xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 border border-accent rounded-lg p-4">
            <BadgeCheck size={24} className="text-primary flex-shrink-0" />
            <div>
              <div className="font-bold text-foreground">Harga Terbaik</div>
              <div className="text-sm text-gray-600">Selalu lebih murah dari kompetitor</div>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-accent rounded-lg p-4">
            <Gift size={24} className="text-primary flex-shrink-0" />
            <div>
              <div className="font-bold text-foreground">Promo Besaraan</div>
              <div className="text-sm text-gray-600">Diskon up to 45% setiap minggu</div>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-accent rounded-lg p-4">
            <Shield size={24} className="text-primary flex-shrink-0" />
            <div>
              <div className="font-bold text-foreground">Aman & Terpercaya</div>
              <div className="text-sm text-gray-600">100% original bergaransi resmi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Promo */}
      <section className="max-w-5xl mx-auto px-5 py-8">
        <div className="bg-linear-to-br from-accent to-accent/70 rounded-3xl p-8 md:p-12 border border-primary/20">
          <div className="flex items-center gap-2 bg-primary text-white w-fit px-3 py-1.5 rounded-full font-bold text-sm mb-4">
            <Flame size={16} />
            <span>SUPER SALE MINGGU INI</span>
          </div>

          <h2 className="font-heading font-bold text-6xl md:text-7xl text-foreground mb-4">
            45% OFF
          </h2>
          <p className="text-gray-700 text-lg mb-6 max-w-md">
            Produk skincare & makeup pilihan dengan harga spesial. Stok terbatas — buruan sebelum
            kehabisan!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity"
            >
              Belanja via WhatsApp
            </a>
            <a
              href={shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-foreground border-2 border-primary font-bold py-3 px-6 rounded-full hover:bg-primary/10 transition-colors"
            >
              Belanja di Shopee
            </a>
          </div>
        </div>
      </section>

      {/* Campaign Cards */}
      <section className="max-w-5xl mx-auto px-5 py-8">
        <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
          Kampanye Promo Spesial
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map((campaign) => (
            <div key={campaign.title} className="border border-accent rounded-2xl p-6 bg-white">
              <h3 className="font-bold text-xl text-foreground mb-2">{campaign.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
              <p className="text-xs text-gray-500 mb-4">{campaign.period}</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:opacity-80 transition-opacity"
              >
                Lihat Promo <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Product Selection */}
      <section className="max-w-5xl mx-auto px-5 py-8">
        <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
          Produk Pilihan Diskon
        </h2>
        {promoProducts.length > 0 ? (
          <BestSellersGrid products={promoProducts} whatsappNumber={settings.whatsapp_number} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Tidak ada produk promo tersedia saat ini</p>
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="max-w-5xl mx-auto px-5 py-8">
        <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
          Manfaat Berbelanja Sekarang
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-accent rounded-2xl p-6">
            <p className="text-foreground font-bold mb-2">✓ Diskon hingga 45%</p>
            <p className="text-sm text-gray-600">Hemat hingga Rp. 100.000 per pembelian</p>
          </div>
          <div className="bg-accent rounded-2xl p-6">
            <p className="text-foreground font-bold mb-2">✓ Stok Terbatas</p>
            <p className="text-sm text-gray-600">Produk cepat habis, jangan sampai kehabisan</p>
          </div>
          <div className="bg-accent rounded-2xl p-6">
            <p className="text-foreground font-bold mb-2">✓ Gratis Konsultasi</p>
            <p className="text-sm text-gray-600">Tanya ke customer care kami untuk rekomendasi</p>
          </div>
          <div className="bg-accent rounded-2xl p-6">
            <p className="text-foreground font-bold mb-2">✓ Garansi Resmi</p>
            <p className="text-sm text-gray-600">Semua produk 100% original & bergaransi</p>
          </div>
        </div>
      </section>
    </div>
  );
}
