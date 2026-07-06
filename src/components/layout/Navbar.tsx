'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Best Seller', href: '/#terlaris' },
  { label: 'Promo', href: '/promo' },
  { label: 'Contact', href: '/contact' },
];

const whatsappNumber = '6281376147334';
const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Station Cosmetics, saya mau tanya produk 😊')}`;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-accent">
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="no-underline">
          <div className="font-heading font-bold text-xl tracking-widest text-foreground">
            STATION
          </div>
          <div className="text-xs font-bold tracking-widest text-primary">COSMETICS</div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-white text-sm font-bold py-2 px-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={16} />
            <span>Chat</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-accent bg-white rounded-lg hover:bg-accent hover:bg-opacity-5 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-accent bg-white">
          <div className="max-w-5xl mx-auto px-5 py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold text-foreground hover:text-primary px-3 py-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold py-2 px-3 rounded-full hover:opacity-90 transition-opacity mt-2"
            >
              <MessageCircle size={16} />
              <span>Chat via WhatsApp</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
