import { Heart, Music, ShoppingBag, MapPin } from 'lucide-react';

const channels = [
  {
    icon: Heart,
    title: 'Instagram',
    subtitle: '@station.cosmetics',
    color: '#C2408E',
    href: 'https://instagram.com/station.cosmetics',
  },
  {
    icon: Music,
    title: 'TikTok',
    subtitle: '@station.cosmetics',
    color: '#111111',
    href: 'https://tiktok.com/@station.cosmetics',
  },
  {
    icon: ShoppingBag,
    title: 'Shopee',
    subtitle: 'Station Cosmetics',
    color: '#EE4D2D',
    href: 'https://shopee.co.id/',
  },
  {
    icon: MapPin,
    title: 'Toko Offline',
    subtitle: 'Medan Selayang',
    color: '#C89F9C',
    href: 'https://maps.google.com/?q=Medan+Selayang',
  },
];

export function QuickLinks() {
  return (
    <section className="max-w-5xl mx-auto px-5 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {channels.map(({ icon: Icon, title, subtitle, color, href }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-accent rounded-2xl px-4 py-3 bg-white hover:border-primary hover:shadow-md transition-all"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-accent">
              <Icon size={20} style={{ color }} />
            </span>
            <span className="flex-1 min-w-0">
              <div className="block font-bold text-sm text-foreground">{title}</div>
              <div className="block text-xs text-gray-600">{subtitle}</div>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
