import { Suspense } from 'react';
import { Edit, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';
import { ProductTableSkeleton } from '@/components/admin/ProductTableSkeleton';

async function ProductsList() {
  const supabase = await createClient();

  let products: any[] = [];
  let error: string | null = null;

  try {
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('id, name, brand, category_id, price, discount, is_active')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;
    products = data || [];
  } catch (err) {
    error = 'Gagal mengambil data produk';
    console.error(err);
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600 mb-4">Belum ada produk.</p>
        <a
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Tambah Produk Pertama
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
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Brand</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Harga</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Diskon</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Status</th>
            <th className="px-6 py-3 text-right text-sm font-bold text-foreground">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-foreground font-medium">{product.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{product.brand}</td>
              <td className="px-6 py-4 text-sm text-foreground">
                Rp {product.price?.toLocaleString('id-ID') || '0'}
              </td>
              <td className="px-6 py-4 text-sm text-foreground">
                {product.discount ? `${product.discount}%` : '-'}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {product.is_active ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                  <a
                    href={`/admin/products/${product.id}/edit`}
                    className="inline-flex items-center gap-1 text-primary hover:opacity-70 transition-opacity"
                  >
                    <Edit size={18} />
                  </a>
                  <DeleteProductButton productId={product.id} productName={product.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Kelola Produk</h1>
          <p className="text-gray-600 mt-2">Kelola semua produk di toko</p>
        </div>
        <a
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Tambah Produk
        </a>
      </div>

      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}
