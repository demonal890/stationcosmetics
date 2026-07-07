'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/products/SearchBar';
import { SidebarFilters } from '@/components/products/SidebarFilters';
import { ProductCard } from '@/components/products/ProductCard';
import { allProducts } from '@/data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('terbaru');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.includes(p.brand.toLowerCase().replace(/\s+/g, ''))
      );
    }

    // Price filter
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];
    filtered = filtered.filter((p) => {
      const price = parseInt(p.price.replace(/\D/g, ''));
      return price >= minPrice && price <= maxPrice;
    });

    // Sort
    if (sortBy === 'terlaris') {
      filtered.sort((a, b) => parseInt(b.count) - parseInt(a.count));
    } else if (sortBy === 'termurah') {
      filtered.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
    } else if (sortBy === 'termahal') {
      filtered.sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')));
    }
    // terbaru adalah default (no sort)

    return filtered;
  }, [searchQuery, sortBy, selectedCategories, selectedBrands, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset current page when filters change
  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('terbaru');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 500000]);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-accent/50 px-5 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-2">
            Semua Produk
          </h1>
          <p className="text-gray-600">
            Temukan ribuan produk kosmetik & skincare original pilihan untuk kulit sehat dan cantik
            setiap hari.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Search & Sort */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Filters & Products */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <SidebarFilters
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            onResetFilters={handleResetFilters}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {paginatedProducts.length > 0 ? (
              <>
                {/* Results Count */}
                <p className="text-sm text-gray-600 mb-4">
                  Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} dari{' '}
                  <strong>{filteredProducts.length}</strong> produk
                </p>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center justify-center w-10 h-10 border border-accent rounded-lg hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-sm transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'border border-accent hover:border-primary hover:text-primary'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center justify-center w-10 h-10 border border-accent rounded-lg hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600 mb-2">Produk tidak ditemukan</p>
                <p className="text-sm text-gray-500">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
