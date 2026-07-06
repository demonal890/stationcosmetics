import Link from 'next/link';
import { MessageCircle, Star } from 'lucide-react';

const products = [
  {
    id: 'p1',
    brand: 'Skintific',
    name: '5X Ceramide Barrier Moisturizer Gel',
    price: '129.000',
    rate: 4.9,
    count: '1.2K',
    bestSeller: true,
  },
  {
    id: 'p2',
    brand: 'Somethinc',
    name: 'Niacinamide Brightening Serum',
    price: '139.000',
    rate: 4.8,
    count: '980',
    bestSeller: false,
  },
  {
    id: 'p3',
    brand: 'ESQA',
    name: 'Flawless Liquid Concealer',
    price: '95.000',
    rate: 4.7,
    count: '760',
    bestSeller: false,
  },
  {
    id: 'p4',
    brand: 'Dear Me Beauty',
    name: 'Airy Poreless Powder',
    price: '109.000',
    rate: 4.8,
    count: '1.1K',
    bestSeller: true,
  },
  {
    id: 'p5',
    brand: 'Azarine',
    name: 'Hydrasoothe Sunscreen Gel SPF 45',
    price: '65.000',
    rate: 4.9,
    count: '2K',
    bestSeller: false,
  },
  {
    id: 'p6',
    brand: 'Evangeline',
    name: 'Eau De Parfum Black Vanilla',
    price: '35.000',
    rate: 4.7,
    count: '540',
    bestSeller: false,
  },
];

const whatsappNumber = '6281376147334';
const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Station Cosmetics, saya mau tanya produk 😊')}`;
const shopeeUrl = 'https://shopee.co.id/';

export function BestSellers() {
  return (
    <section id="terlaris" className="max-w-5xl mx-auto px-5 py-8 md:py-12">
      {/* Header */}
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

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {products.map(({ id, brand, name, price, rate, count, bestSeller }) => (
          <div
            key={id}
            className="border border-accent rounded-2xl overflow-hidden bg-white flex flex-col hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            <div className="relative w-full h-40 md:h-44 bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center">
              {bestSeller && (
                <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                  BEST SELLER
                </span>
              )}
              <span className="text-xs text-gray-500">{brand}</span>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
              <span className="text-xs font-bold uppercase text-gray-400 tracking-wide mb-1">
                {brand}
              </span>
              <p className="text-sm md:text-base font-semibold text-foreground line-clamp-2 mb-2 min-h-10">
                {name}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-gray-700">{rate}</span>
                <span className="text-xs text-gray-500">({count})</span>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between gap-2">
                <span className="font-heading font-bold text-lg text-foreground">
                  Rp {price}
                </span>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 bg-primary text-white font-bold text-xs py-2 px-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={15} />
                  <span className="hidden sm:inline">Order</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
