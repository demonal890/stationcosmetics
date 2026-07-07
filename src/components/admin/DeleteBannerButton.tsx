'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteBanner } from '@/lib/actions/banners';

interface DeleteBannerButtonProps {
  bannerId: string;
  bannerTitle: string;
}

export function DeleteBannerButton({ bannerId, bannerTitle }: DeleteBannerButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteBanner(bannerId);
      if (result.success) {
        setShowConfirm(false);
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center gap-1 text-red-600 hover:opacity-70 transition-opacity"
      >
        <Trash2 size={18} />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Hapus Banner?
            </h3>
            <p className="text-gray-600 mb-6">
              Yakin ingin menghapus "<strong>{bannerTitle}</strong>"? Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-300 text-foreground font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
