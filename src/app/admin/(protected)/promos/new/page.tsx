import { PromoForm } from '@/components/admin/PromoForm';

export default function NewPromoPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Tambah Promo Baru</h1>
        <p className="text-gray-600 mt-2">Buat promo dan penawaran terbaru</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow">
        <PromoForm />
      </div>
    </div>
  );
}
