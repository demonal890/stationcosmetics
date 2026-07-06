'use client';

import Link from 'next/link';
import { Flame } from 'lucide-react';

export function PromoBar() {
  return (
    <Link
      href="#promo"
      className="flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold tracking-wide py-2 px-4 hover:bg-opacity-90 transition-colors"
    >
      <Flame size={15} />
      <span>Diskon minggu ini hingga 45% — klik untuk lihat promo</span>
    </Link>
  );
}
