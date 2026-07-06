import Link from 'next/link';
import { Heart, Music, ShoppingBag, MessageCircle, Send } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Best Seller', href: '/#terlaris' },
  { label: 'Promo', href: '/promo' },
  { label: 'Contact', href: '/contact' },
];

const shopLinks = [
  { label: 'Shopee', href: 'https://shopee.co.id/' },
  { label: 'TikTok Shop', href: 'https://tiktok.com/@station.cosmetics' },
  { label: 'WhatsApp Order', href: 'https://wa.me/6281376147334' },
];

const socials = [
  { icon: Heart, label: 'Instagram', href: 'https://instagram.com/station.cosmetics' },
  { icon: Music, label: 'TikTok', href: 'https://tiktok.com/@station.cosmetics' },
  { icon: ShoppingBag, label: 'Shopee', href: 'https://shopee.co.id/' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/6281376147334' },
];

export function Footer() {
  return (
    <footer className="mt-12 bg-accent">
      <div className="max-w-5xl mx-auto px-5 py-11 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link href="/" className="no-underline block">
            <div className="font-heading font-bold text-xl tracking-widest text-foreground">STATION</div>
            <div className="text-xs font-bold tracking-widest text-primary mt-1">COSMETICS</div>
          </Link>
          <p className="text-sm text-gray-700 leading-relaxed max-w-xs mt-3 mb-4">
            Toko kosmetik & skincare terlengkap dan terpercaya di Medan.
          </p>
          <div className="flex gap-2">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white text-gray-700 hover:text-primary transition-colors"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Menu */}
        <div>
          <h3 className="font-bold text-sm text-foreground mb-3">Menu</h3>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-primary transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-bold text-sm text-foreground mb-3">Shop With Us</h3>
          <div className="flex flex-col gap-1">
            {shopLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-primary transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold text-sm text-foreground mb-3">Newsletter</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Info promo terbaru langsung ke email kamu.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email kamu"
              className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center w-11 px-2 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Send"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300">
        <div className="max-w-5xl mx-auto px-5 py-4 text-center text-xs text-gray-600">
          © 2026 Station Cosmetics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
