'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '@/lib/queries/faqs';

interface FAQAccordionProps {
  items: FAQ[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>Tidak ada FAQ tersedia</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {items.map((item, idx) => (
        <div key={item.id} className="border border-accent rounded-2xl overflow-hidden bg-white">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between gap-3 text-left px-4 py-4 font-semibold text-foreground hover:bg-accent/30 transition-colors"
          >
            <span>{item.question}</span>
            {openIdx === idx ? (
              <ChevronUp size={18} className="text-primary flex-shrink-0" />
            ) : (
              <ChevronDown size={18} className="text-primary flex-shrink-0" />
            )}
          </button>
          {openIdx === idx && (
            <div className="px-4 pb-4 text-sm md:text-base text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
