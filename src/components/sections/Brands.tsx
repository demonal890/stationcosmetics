'use client';

import Link from 'next/link';

const brands = [
  'Wardah',
  'Make Over',
  'Emina',
  'Somethinc',
  'Skintific',
  'Safi',
  'LT Pro',
  'Luxcrime',
  'Dazzle Me',
  'Azarine',
  'You',
  'Implora',
  'NAMA',
  'ESQA',
  'Dear Me',
];

// Duplicate for marquee effect
const brandsLoop = [...brands, ...brands];

const whatsappNumber = '6281376147334';
const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Station Cosmetics, saya mau tanya brand 😊')}`;

export function Brands() {
  return (
    <section className="py-8 md:py-10 bg-accent mt-4">
      <div className="max-w-5xl mx-auto px-5 text-center mb-5">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
          Ratusan Brand, Satu Toko
        </h2>
        <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
          Brand lokal & Asia terlengkap — dari drugstore favorit sampai skincare viral.
        </p>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}>
        <div className="flex gap-3 w-max animate-marquee">
          {brandsLoop.map((brand, idx) => (
            <span
              key={idx}
              className="whitespace-nowrap bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2 rounded-full"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-5">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:opacity-80 transition-opacity"
        >
          Cari brand favoritmu? Tanya stok ke kami
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
