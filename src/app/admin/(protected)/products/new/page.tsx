import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductFormSkeleton } from '@/components/admin/ProductFormSkeleton';

async function ProductFormContent() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .eq('is_active', true)
    .order('name');

  return <ProductForm categories={categories || []} />;
}

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Tambah Produk Baru</h1>
        <p className="text-gray-600 mt-2">Isi form di bawah untuk menambah produk baru</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow">
        <Suspense fallback={<ProductFormSkeleton />}>
          <ProductFormContent />
        </Suspense>
      </div>
    </div>
  );
}
