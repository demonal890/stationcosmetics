'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBanner, updateBanner } from '@/lib/actions/banners';

interface BannerFormProps {
  initialData?: {
    id: string;
    title: string;
    subtitle?: string;
    placement: string;
    image_url?: string;
    link_url?: string;
    start_date?: string;
    end_date?: string;
    sort_order?: number;
    is_active: boolean;
  };
}

export function BannerForm({ initialData }: BannerFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [form, setForm] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    placement: initialData?.placement || 'hero',
    image_url: initialData?.image_url || '',
    link_url: initialData?.link_url || '',
    start_date: initialData?.start_date || '',
    end_date: initialData?.end_date || '',
    sort_order: initialData?.sort_order || 0,
    is_active: initialData?.is_active !== false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
              type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = initialData
        ? await updateBanner(initialData.id, form)
        : await createBanner(form);

      if (result.success) {
        router.push('/admin/banners');
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
          Judul Banner *
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Judul banner"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Subtitle
        </label>
        <input
          type="text"
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Subtitle banner"
        />
      </div>

      {/* Placement */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Penempatan *
        </label>
        <select
          name="placement"
          value={form.placement}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Pilih penempatan</option>
          <option value="promo_bar">Promo Bar (Header)</option>
          <option value="hero">Hero Section</option>
          <option value="promo_section">Promo Section</option>
        </select>
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

      {/* Link URL */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          URL Link
        </label>
        <input
          type="url"
          name="link_url"
          value={form.link_url}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="https://..."
        />
      </div>

      {/* Sort Order */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Urutan
        </label>
        <input
          type="number"
          name="sort_order"
          value={form.sort_order}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="0"
        />
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Tanggal Mulai
        </label>
        <input
          type="datetime-local"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Tanggal Berakhir
        </label>
        <input
          type="datetime-local"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
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
          {loading ? 'Menyimpan...' : initialData ? 'Update Banner' : 'Tambah Banner'}
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
