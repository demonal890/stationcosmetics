import { CategoryForm } from '@/components/admin/CategoryForm';

export default function NewCategoryPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Tambah Kategori Baru</h1>
        <p className="text-gray-600 mt-2">Isi form di bawah untuk menambah kategori baru</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow">
        <CategoryForm />
      </div>
    </div>
  );
}
