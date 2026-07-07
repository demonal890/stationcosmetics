'use client';

import { Search, ArrowUpDown } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: 'terbaru', label: 'Terbaru' },
  { value: 'terlaris', label: 'Terlaris' },
  { value: 'termurah', label: 'Termurah' },
  { value: 'termahal', label: 'Termahal' },
];

export function SearchBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
      {/* Search Input */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Cari produk, brand, atau kategori..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2.5 pl-10 border border-accent rounded-lg bg-white text-foreground placeholder-gray-500 focus:outline-none focus:border-primary"
        />
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <ArrowUpDown size={18} className="text-gray-600" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 border border-accent rounded-lg bg-white text-foreground text-sm font-medium cursor-pointer focus:outline-none focus:border-primary"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
