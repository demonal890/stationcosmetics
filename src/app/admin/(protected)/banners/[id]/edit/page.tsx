import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { BannerForm } from '@/components/admin/BannerForm';
import { ProductFormSkeleton } from '@/components/admin/ProductFormSkeleton';

async function EditBannerFormContent({ bannerId }: { bannerId: string }) {
  const supabase = await createClient();

  const { data: banner, error } = await supabase
    .from('banners')
    .select('*')
    .eq('id', bannerId)
    .single();

  if (error || !banner) {
    notFound();
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Edit Banner</h1>
        <p className="text-gray-600 mt-2">{banner.title}</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow">
        <BannerForm initialData={banner} />
      </div>
    </>
  );
}

export default function EditBannerPage({ params }: { params: { id: string } }) {
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
      <EditBannerFormContent bannerId={params.id} />
    </Suspense>
  );
}
