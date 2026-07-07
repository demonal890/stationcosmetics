import { RequireAuth } from '@/components/auth/RequireAuth';
import { LogoutButton } from '@/components/auth/LogoutButton';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-foreground text-white p-6 overflow-y-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold font-heading">Station Admin</h1>
              <p className="text-xs text-gray-400 mt-1">Dashboard</p>
            </div>

            <nav className="space-y-2">
              {[
                { href: '/admin', label: 'Dashboard' },
                { href: '/admin/products', label: 'Produk' },
                { href: '/admin/categories', label: 'Kategori' },
                { href: '/admin/promos', label: 'Promo' },
                { href: '/admin/banners', label: 'Banner' },
                { href: '/admin/settings', label: 'Pengaturan' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/20">
              <LogoutButton />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
