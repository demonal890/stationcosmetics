export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Dashboard</h1>
        <p className="text-gray-600 mt-2">Kelola toko Station Cosmetics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Produk', value: '—', icon: '📦' },
          { label: 'Kategori', value: '—', icon: '📋' },
          { label: 'Promo Aktif', value: '—', icon: '🎉' },
          { label: 'Rating Rata-rata', value: '—', icon: '⭐' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="font-bold text-foreground mb-3">Mulai Kelola Toko</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Klik <strong>Produk</strong> untuk menambah atau edit produk</li>
          <li>✓ Klik <strong>Kategori</strong> untuk mengatur kategori produk</li>
          <li>✓ Klik <strong>Promo</strong> untuk membuat penawaran khusus</li>
          <li>✓ Klik <strong>Banner</strong> untuk mengatur banner promosi</li>
          <li>✓ Klik <strong>Pengaturan</strong> untuk update info toko (WhatsApp, Shopee, dll)</li>
        </ul>
      </div>
    </div>
  );
}
