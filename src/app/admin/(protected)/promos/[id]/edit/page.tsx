import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PromoForm } from '@/components/admin/PromoForm';
import { ProductFormSkeleton } from '@/components/admin/ProductFormSkeleton';

async function EditPromoFormContent({ promoId }: { promoId: string }) {
  const supabase = await createClient();

  const { data: promo, error } = await supabase
    .from('promos')
    .select('*')
    .eq('id', promoId)
    .single();

  if (error || !promo) {
    notFound();
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Edit Promo</h1>
        <p className="text-gray-600 mt-2">{promo.title}</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow">
        <PromoForm initialData={promo} />
      </div>
    </>
  );
}

export default function EditPromoPage({ params }: { params: { id: string } }) {
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
      <EditPromoFormContent promoId={params.id} />
    </Suspense>
  );
}
