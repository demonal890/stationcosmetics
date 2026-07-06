import Link from 'next/link';
import { MessageCircle, ArrowDown, BadgeCheck, Store, Zap } from 'lucide-react';

const whatsappNumber = '6281376147334';
const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Station Cosmetics, saya mau tanya produk 😊')}`;

const trustItems = [
  { icon: BadgeCheck, label: '100% Original' },
  { icon: Store, label: 'Toko fisik nyata' },
  { icon: Zap, label: 'Respon cepat' },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen md:min-h-[82vh] flex items-end bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(28,20,18,.86) 0%, rgba(28,20,18,.55) 46%, rgba(28,20,18,.12) 100%), url('/uploads/img-1.jpg')`,
      }}
    >
      <div className="max-w-5xl mx-auto w-full px-5 pb-12 md:pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/14 border border-white/28 backdrop-blur-sm text-white text-xs font-bold tracking-wide py-1.5 px-3 rounded-full mb-5">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span>Toko fisik di Medan Selayang</span>
          </div>

          {/* Heading */}
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-4">
            Kosmetik & Skincare Terlengkap di Medan
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-white/88 leading-relaxed mb-6 max-w-lg">
            Makeup, skincare, bodycare & parfum original dari ratusan brand favorit — semua ada di Station Cosmetics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-7">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity shadow-lg"
            >
              <MessageCircle size={19} />
              <span>Chat via WhatsApp</span>
            </a>
            <Link
              href="#produk"
              className="inline-flex items-center justify-center gap-2 bg-white/12 border border-white/55 text-white font-bold py-3 px-6 rounded-full hover:bg-white/22 transition-colors backdrop-blur-sm"
            >
              <span>Lihat Katalog</span>
              <ArrowDown size={18} />
            </Link>
          </div>

          {/* Trust Items */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            {trustItems.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-white/90 text-sm font-medium"
              >
                <Icon size={15} className="text-accent" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
