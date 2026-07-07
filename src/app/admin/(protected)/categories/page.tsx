import { Suspense } from 'react';
import { Edit, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { DeleteCategoryButton } from '@/components/admin/DeleteCategoryButton';
import { ProductTableSkeleton } from '@/components/admin/ProductTableSkeleton';

async function CategoriesList() {
  const supabase = await createClient();

  let categories: any[] = [];
  let error: string | null = null;

  try {
    const { data, error: fetchError } = await supabase
      .from('categories')
      .select('id, name, slug, is_active')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;
    categories = data || [];
  } catch (err) {
    error = 'Gagal mengambil data kategori';
    console.error(err);
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600 mb-4">Belum ada kategori.</p>
        <a
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Tambah Kategori Pertama
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Nama</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Slug</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Status</th>
            <th className="px-6 py-3 text-right text-sm font-bold text-foreground">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-foreground font-medium">{category.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{category.slug}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    category.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {category.is_active ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                  <a
                    href={`/admin/categories/${category.id}/edit`}
                    className="inline-flex items-center gap-1 text-primary hover:opacity-70 transition-opacity"
                  >
                    <Edit size={18} />
                  </a>
                  <DeleteCategoryButton categoryId={category.id} categoryName={category.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Kelola Kategori</h1>
          <p className="text-gray-600 mt-2">Atur kategori produk di toko</p>
        </div>
        <a
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Tambah Kategori
        </a>
      </div>

      <Suspense fallback={<ProductTableSkeleton />}>
        <CategoriesList />
      </Suspense>
    </div>
  );
}
