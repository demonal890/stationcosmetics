import { Suspense } from 'react';
import { Edit, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { DeletePromoButton } from '@/components/admin/DeletePromoButton';
import { ProductTableSkeleton } from '@/components/admin/ProductTableSkeleton';

async function PromosList() {
  const supabase = await createClient();

  let promos: any[] = [];
  let error: string | null = null;

  try {
    const { data, error: fetchError } = await supabase
      .from('promos')
      .select('id, title, discount_label, start_date, end_date, is_active')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;
    promos = data || [];
  } catch (err) {
    error = 'Gagal mengambil data promo';
    console.error(err);
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (promos.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600 mb-4">Belum ada promo.</p>
        <a
          href="/admin/promos/new"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Tambah Promo Pertama
        </a>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Judul</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Label Diskon</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Mulai</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Berakhir</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Status</th>
            <th className="px-6 py-3 text-right text-sm font-bold text-foreground">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {promos.map((promo) => (
            <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-foreground font-medium">{promo.title}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{promo.discount_label}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{formatDate(promo.start_date)}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{formatDate(promo.end_date)}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    promo.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {promo.is_active ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                  <a
                    href={`/admin/promos/${promo.id}/edit`}
                    className="inline-flex items-center gap-1 text-primary hover:opacity-70 transition-opacity"
                  >
                    <Edit size={18} />
                  </a>
                  <DeletePromoButton promoId={promo.id} promoName={promo.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PromosPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Kelola Promo</h1>
          <p className="text-gray-600 mt-2">Atur promo dan penawaran khusus</p>
        </div>
        <a
          href="/admin/promos/new"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Tambah Promo
        </a>
      </div>

      <Suspense fallback={<ProductTableSkeleton />}>
        <PromosList />
      </Suspense>
    </div>
  );
}
