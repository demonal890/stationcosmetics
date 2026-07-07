export function ProductFormSkeleton() {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Row 1: Name & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
      </div>

      {/* Row 2: Brand & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
      </div>

      {/* Row 3: Price & Original Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-40 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
      </div>

      {/* Row 4: Discount & Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-28 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
      </div>

      {/* Row 5: Count */}
      <div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
      </div>

      {/* Description */}
      <div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
        <div className="h-24 bg-gray-200 rounded animate-pulse w-full"></div>
      </div>

      {/* How to Use */}
      <div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-28 mb-2"></div>
        <div className="h-24 bg-gray-200 rounded animate-pulse w-full"></div>
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-28 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-40"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
      </div>
    </div>
  );
}
