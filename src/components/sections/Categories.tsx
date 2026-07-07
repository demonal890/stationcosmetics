import Link from 'next/link';
import { getCategories } from '@/lib/queries/products';
import { Category } from '@/lib/queries/products';

interface CategoriesProps {
  categories?: Category[];
}

export async function Categories({ categories: providedCategories }: CategoriesProps) {
  let categories = providedCategories;

  if (!categories) {
    try {
      categories = await getCategories();
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      categories = [];
    }
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section id="produk" className="max-w-5xl mx-auto px-5 py-8 md:py-12">
      <div className="text-center mb-6">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
          Kategori Produk
        </h2>
        <div className="w-14 h-1 bg-primary rounded mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="block border border-accent rounded-2xl overflow-hidden bg-white hover:shadow-md hover:border-accent transition-all"
          >
            <div className="w-full h-32 bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-gray-400">
              <span className="text-xs text-center px-2">{cat.name}</span>
            </div>

            <div className="p-3 text-center">
              <div className="block font-bold text-sm text-foreground mb-1">{cat.name}</div>
              {cat.description && (
                <div className="block text-xs text-gray-500">{cat.description}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
