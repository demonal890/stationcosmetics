import { MapPin, Clock, Navigation, MessageCircle } from 'lucide-react';

export function StoreLocation() {
  return (
    <section id="toko" className="max-w-5xl mx-auto px-5 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Map Image */}
        <div className="rounded-2xl overflow-hidden min-h-72 bg-gradient-to-br from-accent to-accent/30 flex items-center justify-center border border-accent">
          <div className="text-gray-400 text-center">
            <MapPin size={40} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Map placeholder</p>
          </div>
        </div>

        {/* Store Info */}
        <div className="border border-accent rounded-2xl p-6 md:p-8 bg-white flex flex-col">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-5">
            Station Cosmetics Store
          </h2>

          {/* Location */}
          <div className="flex gap-3 mb-4 pb-4 border-b border-accent">
            <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                Jl. Kelambir 5 No.21 CD, Cinta Damai, Kec. Medan Helvetia, Kota Medan, Sumatera Utara 20126
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex gap-3 mb-6 pb-4 border-b border-accent">
            <Clock size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm md:text-base text-foreground leading-relaxed">
              <div>
                <strong>Senin – Sabtu</strong> · 09.00 – 21.00 WIB
              </div>
              <div>
                <strong>Minggu & Libur</strong> · 10.00 – 20.00 WIB
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-auto flex flex-col sm:flex-row gap-3">
            <a
              href="https://maps.app.goo.gl/mcPcQtVK5fywxdiU7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-2.5 px-4 rounded-full hover:opacity-90 transition-opacity"
            >
              <Navigation size={17} />
              <span>Dapatkan Arah</span>
            </a>
            <a
              href="https://wa.me/6281376147334"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white border border-accent text-foreground font-bold py-2.5 px-4 rounded-full hover:border-primary transition-colors"
            >
              <MessageCircle size={17} className="text-green-600" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
