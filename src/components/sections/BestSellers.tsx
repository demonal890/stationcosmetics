import { Star } from 'lucide-react';
import { getBestSellers, Product } from '@/lib/queries/products';
import { getSiteSettings } from '@/lib/queries/settings';
import { BestSellersGrid } from './BestSellersGrid';

interface BestSellersProps {
  products?: Product[];
}

export async function BestSellers({ products: providedProducts }: BestSellersProps) {
  let products = providedProducts;
  let shopeeUrl = 'https://shopee.co.id/';

  if (!products) {
    try {
      products = await getBestSellers(6);
      const settings = await getSiteSettings();
      if (settings.shopee_url) shopeeUrl = settings.shopee_url;
    } catch (error) {
      console.error('Failed to fetch best sellers:', error);
      products = [];
    }
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section id="terlaris" className="max-w-5xl mx-auto px-5 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-4 mb-6">
        <div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-1">
            Produk Terlaris
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Paling banyak diburu pelanggan kami.
          </p>
        </div>
        <a
          href={shopeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold text-sm hover:opacity-80 transition-opacity whitespace-nowrap inline-flex items-center gap-1"
        >
          Lihat semua <span>›</span>
        </a>
      </div>

      <BestSellersGrid products={products} />
    </section>
  );
}
