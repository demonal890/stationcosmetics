'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPromo, updatePromo } from '@/lib/actions/promos';

interface PromoFormProps {
  initialData?: {
    id: string;
    title: string;
    description?: string;
    discount_label: string;
    image_url?: string;
    cta_url?: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
  };
}

export function PromoForm({ initialData }: PromoFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    discount_label: initialData?.discount_label || '',
    image_url: initialData?.image_url || '',
    cta_url: initialData?.cta_url || '',
    start_date: initialData?.start_date || '',
    end_date: initialData?.end_date || '',
    is_active: initialData?.is_active !== false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = initialData
        ? await updatePromo(initialData.id, form)
        : await createPromo(form);

      if (result.success) {
        router.push('/admin/promos');
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

      {/* Title */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Judul Promo *
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Judul promo"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Deskripsi
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Detail promo..."
        />
      </div>

      {/* Discount Label */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Label Diskon *
        </label>
        <input
          type="text"
          name="discount_label"
          value={form.discount_label}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Contoh: Diskon 50%, Buy 1 Get 1"
        />
      </div>

      {/* Image URL */}
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

      {/* CTA URL */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          URL Tombol (CTA)
        </label>
        <input
          type="url"
          name="cta_url"
          value={form.cta_url}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="https://shopee.co.id/..."
        />
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Tanggal Mulai *
        </label>
        <input
          type="datetime-local"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Tanggal Berakhir *
        </label>
        <input
          type="datetime-local"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Active Checkbox */}
      <div>
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
          {loading ? 'Menyimpan...' : initialData ? 'Update Promo' : 'Tambah Promo'}
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
