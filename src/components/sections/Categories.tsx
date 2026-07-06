import Link from 'next/link';

const categories = [
  { id: 'skincare', name: 'Skincare', sub: 'Perawatan kulit' },
  { id: 'makeup', name: 'Makeup', sub: 'Riasan wajah' },
  { id: 'bodycare', name: 'Bodycare', sub: 'Perawatan tubuh' },
  { id: 'haircare', name: 'Haircare', sub: 'Perawatan rambut' },
  { id: 'parfum', name: 'Parfum', sub: 'Wewangian' },
  { id: 'tools', name: 'Beauty Tools', sub: 'Alat kecantikan' },
];

export function Categories() {
  return (
    <section id="produk" className="max-w-5xl mx-auto px-5 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
          Kategori Produk
        </h2>
        <div className="w-14 h-1 bg-primary rounded mx-auto"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map(({ id, name, sub }) => (
          <Link
            key={id}
            href={`/products?category=${id}`}
            className="block border border-accent rounded-2xl overflow-hidden bg-white hover:shadow-md hover:border-accent transition-all"
          >
            {/* Image Placeholder */}
            <div className="w-full h-32 bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-gray-400">
              <span className="text-xs text-center px-2">{name}</span>
            </div>

            {/* Content */}
            <div className="p-3 text-center">
              <div className="block font-bold text-sm text-foreground mb-1">{name}</div>
              <div className="block text-xs text-gray-500">{sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
