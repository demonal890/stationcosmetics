import { MessageCircle, Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  price: string;
  originalPrice?: string;
  rate: number;
  count: string;
  bestSeller?: boolean;
  discount?: number;
}

export function ProductCard({
  id,
  brand,
  name,
  price,
  originalPrice,
  rate,
  count,
  bestSeller,
  discount,
}: ProductCardProps) {
  const waLink = `https://wa.me/6281376147334?text=${encodeURIComponent(`Halo, saya mau tanya tentang ${name} 😊`)}`;

  return (
    <div className="border border-accent rounded-2xl overflow-hidden bg-white flex flex-col hover:shadow-lg transition-shadow h-full">
      {/* Image */}
      <div className="relative w-full h-40 md:h-44 bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center">
        {bestSeller && (
          <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            BEST SELLER
          </span>
        )}
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        <span className="text-xs text-gray-500">{brand}</span>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <span className="text-xs font-bold uppercase text-gray-400 tracking-wide mb-1">
          {brand}
        </span>
        <p className="text-sm md:text-base font-semibold text-foreground line-clamp-2 mb-2 min-h-10">
          {name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-700">{rate}</span>
          <span className="text-xs text-gray-500">({count})</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="font-heading font-bold text-lg text-foreground">Rp {price}</div>
          {originalPrice && (
            <div className="text-xs text-gray-500 line-through">Rp {originalPrice}</div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1 bg-primary text-white font-bold text-xs py-2 px-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={15} />
            <span className="hidden sm:inline">Order</span>
          </a>
        </div>
      </div>
    </div>
  );
}
