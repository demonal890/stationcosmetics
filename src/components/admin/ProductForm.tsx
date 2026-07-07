'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/lib/actions/products';

interface ProductFormProps {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    brand: string;
    category_id: string;
    price: number;
    original_price?: number;
    discount?: number;
    description?: string;
    how_to_use?: string;
    rating: number;
    count: number;
    is_best_seller: boolean;
    is_active: boolean;
    image_url?: string;
    shopee_url?: string;
  };
  categories: Array<{ id: string; name: string }>;
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [form, setForm] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    brand: initialData?.brand || '',
    category_id: initialData?.category_id || '',
    price: initialData?.price || 0,
    original_price: initialData?.original_price || undefined,
    discount: initialData?.discount || 0,
    description: initialData?.description || '',
    how_to_use: initialData?.how_to_use || '',
    rating: initialData?.rating || 0,
    count: initialData?.count || 0,
    is_best_seller: initialData?.is_best_seller || false,
    is_active: initialData?.is_active !== false,
    image_url: initialData?.image_url || '',
    shopee_url: initialData?.shopee_url || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = initialData
        ? await updateProduct(initialData.id, form)
        : await createProduct(form);

      if (result.success) {
        router.push('/admin/products');
      } else {
        setError(result.error || 'Terjadi kesalahan');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Row 1: Name & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Nama Produk *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Nama produk"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="nama-produk"
          />
        </div>
      </div>

      {/* Row 2: Brand & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Brand *
          </label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Nama brand"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Kategori *
          </label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Pilih kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Price & Original Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Harga Jual (Rp) *
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Harga Normal (Rp)
          </label>
          <input
            type="number"
            name="original_price"
            value={form.original_price || ''}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="0 (jika ada diskon)"
          />
        </div>
      </div>

      {/* Row 4: Discount & Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Diskon (%)
          </label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Rating (0-5) *
          </label>
          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            required
            min="0"
            max="5"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="0"
          />
        </div>
      </div>

      {/* Row 5: Count */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Jumlah Ulasan *
        </label>
        <input
          type="number"
          name="count"
          value={form.count}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="0"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Deskripsi Produk
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Deskripsi produk..."
        />
      </div>

      {/* How to Use */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Cara Penggunaan
        </label>
        <textarea
          name="how_to_use"
          value={form.how_to_use}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Cara penggunaan produk..."
        />
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            URL Gambar
          </label>
          <input
            type="url"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            URL Shopee
          </label>
          <input
            type="url"
            name="shopee_url"
            value={form.shopee_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="https://shopee.co.id/..."
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="is_best_seller"
            checked={form.is_best_seller}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-foreground">Best Seller</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-foreground">Aktif</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : initialData ? 'Update Produk' : 'Tambah Produk'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-300 text-foreground font-bold py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
