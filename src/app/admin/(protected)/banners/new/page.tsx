import { BannerForm } from '@/components/admin/BannerForm';

export default function NewBannerPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Tambah Banner Baru</h1>
        <p className="text-gray-600 mt-2">Buat banner dan gambar promosi baru</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow">
        <BannerForm />
      </div>
    </div>
  );
}
