'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const faqData = [
  {
    q: 'Apakah produk di Station Cosmetics 100% original?',
    a: 'Ya. Semua produk dijamin 100% original dan bergaransi resmi dari brand.',
  },
  {
    q: 'Bisa pesan online lalu ambil di toko?',
    a: 'Bisa. Chat kami via WhatsApp untuk reservasi produk, lalu ambil langsung di toko Medan Selayang.',
  },
  {
    q: 'Berapa lama proses pengiriman?',
    a: 'Pesanan diproses di hari yang sama dan dikirim cepat ke seluruh Indonesia via ekspedisi pilihanmu.',
  },
  {
    q: 'Apakah bisa COD (Cash on Delivery)?',
    a: 'COD tersedia untuk area tertentu di Medan. Silakan tanyakan ke kami via WhatsApp.',
  },
  {
    q: 'Bagaimana cara melakukan retur produk?',
    a: 'Hubungi kami maksimal 2x24 jam setelah barang diterima dengan menyertakan bukti pembelian.',
  },
  {
    q: 'Bagaimana cara tahu promo terbaru?',
    a: 'Ikuti Instagram & TikTok @station.cosmetics, atau minta info promo langsung via WhatsApp.',
  },
];

const whatsappNumber = '6281376147334';
const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Station Cosmetics, saya punya pertanyaan 😊')}`;

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="max-w-2xl mx-auto px-5 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
          Pertanyaan yang Sering Diajukan
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="space-y-2.5">
        {faqData.map((item, idx) => (
          <div key={idx} className="border border-accent rounded-2xl overflow-hidden bg-white">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between gap-3 text-left px-4 py-4 font-semibold text-foreground hover:bg-accent/30 transition-colors"
            >
              <span>{item.q}</span>
              {openIdx === idx ? (
                <ChevronUp size={18} className="text-primary flex-shrink-0" />
              ) : (
                <ChevronDown size={18} className="text-primary flex-shrink-0" />
              )}
            </button>
            {openIdx === idx && (
              <div className="px-4 pb-4 text-sm md:text-base text-gray-600 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-6">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:opacity-80 transition-opacity"
        >
          Masih ada pertanyaan? Chat kami <span>→</span>
        </a>
      </div>
    </section>
  );
}
