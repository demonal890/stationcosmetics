# CLAUDE.md — Station Cosmetics Web

Anchor/context file untuk Claude Code. Baca di awal setiap sesi.
Fase saat ini: lihat `ROADMAP.md`. Prompt per fase: lihat `PROMPTS.md`.

---

## 1. Apa ini

Landing page + admin panel untuk **Station Cosmetics**, toko skincare & kosmetik
di Medan. Publik: arahkan pengunjung ke WhatsApp / Shopee / Instagram / TikTok /
Google Maps + tampilkan produk. Admin: owner kelola produk, kategori, banner promo,
dan info toko tanpa sentuh kode.

Fase awal: deploy gratis (Vercel + Supabase free) untuk demo ke owner sebelum
beli domain.

## 2. Stack

- **Framework:** Next.js (App Router)  ← SSR/SSG untuk SEO organik
- **Styling:** Tailwind CSS
- **Backend/DB:** Supabase (Postgres + Auth + Storage), via `@supabase/ssr`
- **Deploy:** Vercel (Next.js) + Supabase managed
- **Bahasa:** pilih JavaScript ATAU TypeScript di Phase 0, lalu konsisten
- **Cost:** Rp 0 sampai owner approve (semua free tier)

> Kenapa Next.js, bukan Vite: PRD menargetkan SEO organik ("toko kosmetik Medan").
> Google butuh HTML jadi saat crawl → butuh render di server. Vite SPA render di
> browser = konten tak terbaca crawler. Schema Supabase tetap sama.

## 3. Sumber desain

- Desain sudah diekspor dari **Claude Design** ke dalam workspace:
  `Station Cosmetics Landing.dc.html` + `Home.png / Product.png / Promo.png / Contact.png`.
- HTML export = **referensi visual/markup**, bukan untuk dijalankan langsung.
  Port per section jadi komponen React (lihat PROMPTS Phase 1).
- `img-1.jpg`, `img-2.jpg` = foto asli toko → Hero & Store Location.
  Jangan pakai foto AI sebagai representasi produk asli.

## 4. Struktur folder (target — App Router)

```
app/
  layout.(jsx|tsx)              # root layout, font, <html>
  (site)/                       # grup halaman publik (SSG + ISR)
    layout                      # PromoBar + Navbar + Footer
    page                        # Home
    products/page               # grid + filter
    products/[slug]/page        # detail produk (generateStaticParams + ISR)
    promo/page
    contact/page
  admin/                        # client + auth guard (bukan untuk SEO)
    layout                      # RequireAuth
    login/page
    page                        # dashboard
    products/page  banners/page  promos/page  categories/page  settings/page
components/
  layout/   sections/   ui/
lib/
  supabase/
    server.(js|ts)              # server client (@supabase/ssr, cookies)
    client.(js|ts)              # browser client
  queries.(js|ts)               # fungsi ambil data (produk, promo, dst)
supabase/
  migrations/                   # source of truth schema (0001_init.sql)
```

## 5. Aturan render (penting untuk SEO)

- **Halaman publik = Server Component**, fetch data langsung dari Supabase di server.
- Pakai **ISR**: `export const revalidate = 60` (detik) di halaman publik, supaya
  edit owner di admin muncul otomatis tanpa deploy ulang, tapi tetap statis-cepat.
- **Metadata SEO** pakai Next Metadata API: `export const metadata` untuk halaman
  statis, `generateMetadata()` untuk halaman dinamis (produk/promo).
- **Admin = Client Component** + Supabase Auth; tidak perlu SEO.

## 6. Konvensi

- Konten publik selalu dari Supabase — tidak hardcode (kecuali placeholder Phase 1).
- Warna & font ikut PRD §Design → definisikan sebagai token di `tailwind.config`.
- Tombol WhatsApp buka chat dengan template terisi nama produk.
- Env diakses lewat `process.env.NEXT_PUBLIC_*`.

## 7. Aturan WAJIB

- **JANGAN pernah jalankan perintah git otonom** (commit/push/pull/checkout/dll).
  Tulis kode saja; git dijalankan manual oleh Zar.
- Jangan commit `.env` — hanya `.env.example` yang masuk repo.
- Butuh kredensial Supabase? Minta, jangan mengarang.
- Ubah schema = buat migration baru di `supabase/migrations/`, jangan edit yang lama.
