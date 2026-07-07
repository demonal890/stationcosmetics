import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { ProductFormSkeleton } from '@/components/admin/ProductFormSkeleton';

async function EditCategoryFormContent({ categoryId }: { categoryId: string }) {
  const supabase = await createClient();

  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();

  if (error || !category) {
    notFound();
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Edit Kategori</h1>
        <p className="text-gray-600 mt-2">{category.name}</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow">
        <CategoryForm initialData={category} />
      </div>
    </>
  );
}

export default function EditCategoryPage({ params }: { params: { id: string } }) {
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
      <EditCategoryFormContent categoryId={params.id} />
    </Suspense>
  );
}
