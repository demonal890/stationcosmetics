'use client';

import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface SidebarFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onResetFilters: () => void;
}

const categories = [
  { id: 'skincare', label: 'Skincare', count: 256 },
  { id: 'makeup', label: 'Makeup', count: 198 },
  { id: 'bodycare', label: 'Bodycare', count: 132 },
  { id: 'haircare', label: 'Haircare', count: 89 },
  { id: 'parfum', label: 'Parfum', count: 64 },
  { id: 'tools', label: 'Tools', count: 47 },
];

const brands = [
  { id: 'wardah', label: 'Wardah' },
  { id: 'emina', label: 'Emina' },
  { id: 'somethinc', label: 'Somethinc' },
  { id: 'skintific', label: 'Skintific' },
  { id: 'azarine', label: 'Azarine' },
  { id: 'ltpro', label: 'LT Pro' },
];

export function SidebarFilters({
  selectedCategories,
  onCategoryChange,
  selectedBrands,
  onBrandChange,
  priceRange,
  onPriceChange,
  onResetFilters,
}: SidebarFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className="w-full md:w-56 flex-shrink-0">
      {/* Reset Button */}
      <button
        onClick={onResetFilters}
        className="w-full mb-4 inline-flex items-center justify-center gap-2 border border-primary text-primary font-bold text-sm py-2 px-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
      >
        <RotateCcw size={16} />
        <span>Reset Filter</span>
      </button>

      {/* Category Filter */}
      <div className="border border-accent rounded-lg p-4 mb-3">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between text-foreground font-bold text-sm mb-3"
        >
          Kategori
          {expandedSections.category ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => onCategoryChange(cat.id)}
                  className="w-4 h-4 rounded border-accent cursor-pointer"
                />
                <span className="text-sm text-gray-700 flex-1">{cat.label}</span>
                <span className="text-xs text-gray-500">({cat.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="border border-accent rounded-lg p-4 mb-3">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between text-foreground font-bold text-sm mb-3"
        >
          Brand
          {expandedSections.brand ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {expandedSections.brand && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.id)}
                  onChange={() => onBrandChange(brand.id)}
                  className="w-4 h-4 rounded border-accent cursor-pointer"
                />
                <span className="text-sm text-gray-700">{brand.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border border-accent rounded-lg p-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-foreground font-bold text-sm mb-3"
        >
          Harga
          {expandedSections.price ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-2">
                Min: Rp {priceRange[0].toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={priceRange[0]}
                onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
                className="w-full cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-2">
                Max: Rp {priceRange[1].toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                className="w-full cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
