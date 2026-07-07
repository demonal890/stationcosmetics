import { FAQ as FAQType } from '@/lib/queries/faqs';
import { FAQAccordion } from './FAQAccordion';

interface FAQProps {
  items?: FAQType[];
}

export async function FAQ({ items }: FAQProps) {
  let faqItems = items;

  // If no items provided, fetch from Supabase
  if (!faqItems) {
    try {
      const { getFAQs } = await import('@/lib/queries/faqs');
      faqItems = await getFAQs();
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
      faqItems = [];
    }
  }

  return (
    <section id="faq" className="max-w-2xl mx-auto px-5 py-8 md:py-12">
      <div className="text-center mb-6">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
          Pertanyaan yang Sering Diajukan
        </h2>
      </div>

      <FAQAccordion items={faqItems} />

      <div className="text-center mt-6">
        <a
          href={`https://wa.me/6281376147334?text=${encodeURIComponent('Halo Station Cosmetics, saya punya pertanyaan 😊')}`}
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
