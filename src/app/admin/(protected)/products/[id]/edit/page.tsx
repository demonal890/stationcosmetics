import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductFormSkeleton } from '@/components/admin/ProductFormSkeleton';

async function EditProductFormContent({ productId }: { productId: string }) {
  const supabase = await createClient();

  const [productResult, categoriesResult] = await Promise.all([
    supabase.from('products').select('*').eq('id', productId).single(),
    supabase.from('categories').select('id, name').eq('is_active', true).order('name'),
  ]);

  if (productResult.error || !productResult.data) {
    notFound();
  }

  const product = productResult.data;
  const categories = categoriesResult.data || [];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Edit Produk</h1>
        <p className="text-gray-600 mt-2">{product.name}</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow">
        <ProductForm initialData={product} categories={categories} />
      </div>
    </>
  );
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div>
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-40 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
        <div className="bg-white rounded-lg p-8 shadow">
          <ProductFormSkeleton />
        </div>
      </div>
    }>
      <EditProductFormContent productId={params.id} />
    </Suspense>
  );
}
