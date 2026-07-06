import { BadgeCheck, Tag, Store, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: BadgeCheck,
    title: '100% Original',
    description: 'Produk asli & bergaransi resmi.',
  },
  {
    icon: Tag,
    title: 'Harga Terbaik',
    description: 'Bersaing dan terjangkau.',
  },
  {
    icon: Store,
    title: 'Bisa Ambil di Toko',
    description: 'Datang langsung ke Medan.',
  },
  {
    icon: Headphones,
    title: 'Customer Care',
    description: 'Ramah dan siap membantu.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="max-w-5xl mx-auto px-5 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
          Kenapa Belanja di Station?
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {reasons.map(({ icon: Icon, title, description }) => (
          <div key={title} className="border border-accent rounded-2xl bg-white p-5 text-center">
            <span className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-accent mb-3">
              <Icon size={24} className="text-primary" />
            </span>
            <h3 className="font-bold text-base text-foreground mb-1">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
