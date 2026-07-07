export function ProductTableSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Nama</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Brand</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Harga</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Diskon</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Status</th>
            <th className="px-6 py-3 text-right text-sm font-bold text-foreground">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-5"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-5"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
