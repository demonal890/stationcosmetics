import {
  MessageCircle,
  Heart,
  Music,
  ShoppingBag,
  Headphones,
  MapPin,
  Clock,
  Check,
} from 'lucide-react';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    subtitle: 'Chat kami di WhatsApp untuk respon cepat',
    contact: '0821-1234-5678',
    href: 'https://wa.me/6281376147334',
  },
  {
    icon: Heart,
    title: 'Instagram',
    subtitle: 'Follow & lihat update produk di Instagram',
    contact: '@station.cosmetics',
    href: 'https://instagram.com/station.cosmetics',
  },
  {
    icon: Music,
    title: 'TikTok',
    subtitle: 'Lihat tutorial & tips di TikTok kami',
    contact: '@station.cosmetics',
    href: 'https://tiktok.com/@station.cosmetics',
  },
  {
    icon: ShoppingBag,
    title: 'Shopee',
    subtitle: 'Belanja praktis & aman di Shopee',
    contact: 'Station Cosmetics',
    href: 'https://shopee.co.id/',
  },
  {
    icon: Headphones,
    title: 'Customer Service',
    subtitle: 'Hubungi tim CS kami untuk bantuan',
    contact: 'Senin - Jumat 09:00 - 18:00 WIB',
    href: 'mailto:cs@stationcosmetics.co.id',
  },
];

const buyingSteps = [
  {
    number: '1',
    title: 'Pilih Produk',
    description: 'Jelajahi katalog dan pilih produk favorit mu.',
  },
  {
    number: '2',
    title: 'Hubungi Kami',
    description: 'Chat kami via WhatsApp atau DM untuk konfirmasi stok.',
  },
  {
    number: '3',
    title: 'Konfirmasi Pesanan',
    description: 'Kami konfirmasi pesanan dan detail pembayaran.',
  },
  {
    number: '4',
    title: 'Pengiriman',
    description: 'Pesanan dikirim cepat & aman ke alamat kamu.',
  },
  {
    number: '5',
    title: 'Diterima & Puas',
    description: 'Produk sampai dalam kondisi sempurna, dijamin!',
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-accent to-accent/50 px-5 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-3">
            Hubungi & Kunjungi Kami
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Kami siap membantu Anda! Hubungi kami melalui berbagai channel atau kunjungi toko kami
            langsung di Medan.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-5xl mx-auto px-5 py-12">
        <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
          Hubungi Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {contactMethods.map(({ icon: Icon, title, subtitle, contact, href }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary transition-all bg-white"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent mb-4">
                <Icon size={24} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{title}</h3>
              <p className="text-xs text-gray-600 mb-3">{subtitle}</p>
              <p className="text-sm font-semibold text-primary">{contact}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Store Location */}
      <section className="bg-accent py-12">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-8">Lokasi Toko Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden min-h-72 bg-gradient-to-br from-gray-300 to-gray-200 flex items-center justify-center border border-gray-400">
              <div className="text-center">
                <MapPin size={40} className="mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-gray-600">Map akan ditampilkan di sini</p>
              </div>
            </div>

            {/* Store Info */}
            <div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                Station Cosmetics Store
              </h3>

              <div className="mb-6">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  Alamat
                </h4>
                <p className="text-gray-700">
                  Jl. Kelambir 5 No.21 CD, Cinta Damai, Kec. Medan Helvetia, Kota Medan, Sumatera
                  Utara 20126
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  Jam Operasional
                </h4>
                <div className="text-gray-700">
                  <p>
                    <strong>Senin – Sabtu:</strong> 09.00 – 21.00 WIB
                  </p>
                  <p>
                    <strong>Minggu & Hari Libur:</strong> 10.00 – 20.00 WIB
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.app.goo.gl/mcPcQtVK5fywxdiU7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-full hover:opacity-90 transition-opacity"
                >
                  <MapPin size={18} />
                  Dapatkan Arah
                </a>
                <a
                  href="https://wa.me/6281376147334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-foreground border-2 border-primary font-bold py-3 px-4 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <MessageCircle size={18} className="text-green-600" />
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section className="max-w-5xl mx-auto px-5 py-12">
        <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
          Cara Belanja di Station Cosmetics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {buyingSteps.map(({ number, title, description }) => (
            <div key={number} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-4">
                {number}
              </div>
              <h3 className="font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
              {number !== '5' && (
                <div className="hidden md:block text-2xl text-gray-300 mt-4">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-t border-accent">
        <div className="max-w-5xl mx-auto px-5 py-12">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
            Keuntungan Belanja di Station Cosmetics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                icon: '✓',
                title: 'Produk 100% Original',
                description: 'Semua produk original & bergaransi resmi dari brand',
              },
              {
                icon: '✓',
                title: 'Konsultasi Gratis',
                description: 'Tim kami siap membantu rekomendasi produk terbaik',
              },
              {
                icon: '✓',
                title: 'Pengiriman Cepat',
                description: 'Diproses cepat & dikirim ke seluruh Indonesia',
              },
              {
                icon: '✓',
                title: 'Garansi Kepuasan',
                description: 'Tidak puas? Kami siap membantu penyelesaian',
              },
            ].map(({ icon, title, description }) => (
              <div key={title} className="border border-accent rounded-2xl p-6">
                <div className="text-3xl text-primary mb-3">{icon}</div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-primary to-primary/80 px-5 py-12">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="font-heading font-bold text-3xl mb-3">Siap Belanja Produk Terbaik?</h2>
          <p className="text-lg mb-6 opacity-90">
            Hubungi kami sekarang dan dapatkan konsultasi gratis dari tim expert kami!
          </p>
          <a
            href="https://wa.me/6281376147334"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={20} />
            <span>Chat WhatsApp Sekarang</span>
          </a>
        </div>
      </section>
    </div>
  );
}
