'use client';

import { useEffect, useState } from 'react';
import { Flame, MessageCircle, ShoppingBag, Clock, Check } from 'lucide-react';

const promoPerks = ['Diskon hingga 45%', 'Stok terbatas', 'Berlaku minggu ini'];

const whatsappNumber = '6281376147334';
const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo, saya mau pesan produk promo 😊')}`;
const shopeeUrl = 'https://shopee.co.id/';

export function Promo() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Calculate time until end of week (Sunday 23:59)
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
      const daysUntilSunday = (7 - currentDay) % 7 || 7; // Days until next Sunday
      const endOfWeek = new Date(now);
      endOfWeek.setDate(now.getDate() + daysUntilSunday);
      endOfWeek.setHours(23, 59, 59, 999);

      const diff = endOfWeek.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="promo" className="max-w-5xl mx-auto px-5 py-8 md:py-12 mt-4">
      <div className="bg-gradient-to-br from-accent to-accent/70 border border-primary/20 rounded-3xl p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Promo Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <Flame size={14} />
              <span>HANYA MINGGU INI</span>
            </div>

            <div className="mb-6">
              <p className="text-primary font-bold text-sm mb-2">DISKON HINGGA</p>
              <h2 className="font-heading font-bold text-6xl md:text-7xl text-foreground leading-none">
                45%
              </h2>
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 max-w-xs">
              Produk skincare & makeup pilihan dengan harga spesial. Stok terbatas — buruan sebelum kehabisan!
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} />
                <span>Belanja via WhatsApp</span>
              </a>
              <a
                href={shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-foreground border border-primary/20 font-bold py-3 px-6 rounded-full hover:border-primary transition-colors"
              >
                <ShoppingBag size={18} className="text-orange-600" />
                <span>Belanja di Shopee</span>
              </a>
            </div>
          </div>

          {/* Right: Countdown */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
            {/* Timer Header */}
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm font-semibold mb-4">
              <Clock size={16} className="text-primary" />
              <span>Promo berakhir dalam</span>
            </div>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { value: timeLeft.days, label: 'Hari' },
                { value: timeLeft.hours, label: 'Jam' },
                { value: timeLeft.minutes, label: 'Menit' },
                { value: timeLeft.seconds, label: 'Detik' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center bg-accent rounded-2xl py-3">
                  <div className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                    {pad(value)}
                  </div>
                  <div className="text-xs font-semibold text-gray-500 mt-1 uppercase">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Perks */}
            <div className="space-y-2">
              {promoPerks.map((perk) => (
                <div key={perk} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-primary flex-shrink-0" />
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
