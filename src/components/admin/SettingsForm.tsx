'use client';

import { useState } from 'react';
import { updateSiteSettings } from '@/lib/actions/settings';

interface SettingsFormProps {
  initialData: {
    store_name?: string;
    store_address?: string;
    store_hours?: string;
    whatsapp_number?: string;
    shopee_url?: string;
    instagram_url?: string;
    tiktok_url?: string;
    google_maps_url?: string;
    promo_bar_text?: string;
    hero_title?: string;
    hero_subtitle?: string;
    meta_title?: string;
    meta_description?: string;
  };
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await updateSiteSettings(form);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
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
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          ✓ Pengaturan berhasil disimpan
        </div>
      )}

      {/* Store Info */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-bold text-foreground mb-4">Informasi Toko</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Nama Toko</label>
            <input
              type="text"
              name="store_name"
              value={form.store_name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Alamat</label>
            <textarea
              name="store_address"
              value={form.store_address || ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Jam Operasional</label>
            <textarea
              name="store_hours"
              value={form.store_hours || ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Senin-Jumat: 09:00-18:00&#10;Sabtu: 09:00-17:00&#10;Minggu: Libur"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Nomor WhatsApp</label>
            <input
              type="text"
              name="whatsapp_number"
              value={form.whatsapp_number || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="62812345678"
            />
          </div>
        </div>
      </div>

      {/* Social Media & Links */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-bold text-foreground mb-4">Media Sosial & Link</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">URL Shopee</label>
            <input
              type="url"
              name="shopee_url"
              value={form.shopee_url || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">URL Instagram</label>
            <input
              type="url"
              name="instagram_url"
              value={form.instagram_url || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">URL TikTok</label>
            <input
              type="url"
              name="tiktok_url"
              value={form.tiktok_url || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">URL Google Maps</label>
            <input
              type="url"
              name="google_maps_url"
              value={form.google_maps_url || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-bold text-foreground mb-4">Hero Section</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Judul Hero</label>
            <input
              type="text"
              name="hero_title"
              value={form.hero_title || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Subtitle Hero</label>
            <textarea
              name="hero_subtitle"
              value={form.hero_subtitle || ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Teks Promo Bar</label>
            <input
              type="text"
              name="promo_bar_text"
              value={form.promo_bar_text || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Contoh: Gratis Ongkir untuk pembelian > Rp500rb"
            />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-bold text-foreground mb-4">SEO</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Meta Title</label>
            <input
              type="text"
              name="meta_title"
              value={form.meta_title || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Digunakan di tab browser dan search result"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Meta Description</label>
            <textarea
              name="meta_description"
              value={form.meta_description || ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Deskripsi singkat untuk search result (max 160 karakter)"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}
        </button>
      </div>
    </form>
  );
}
