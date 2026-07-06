-- Station Cosmetics — initial schema
-- Postgres / Supabase. Aman dijalankan sekali (pakai IF NOT EXISTS / ON CONFLICT).
-- RLS: publik boleh baca baris aktif; hanya user login (owner) yang boleh tulis.

-- ============================================================
-- Helper: trigger updated_at
-- ============================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ============================================================
-- categories
-- ============================================================
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  icon        text,                       -- nama icon lucide / emoji
  sort_order  int  not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- products
-- ============================================================
create table if not exists products (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  slug           text not null unique,
  category_id    uuid references categories(id) on delete set null,
  description    text,
  how_to_use     text,                    -- cara pakai
  price          numeric(12,2),           -- opsional (boleh null)
  image_url      text,
  shopee_url     text,
  is_best_seller boolean not null default false,
  is_active      boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists idx_products_category   on products(category_id);
create index if not exists idx_products_bestseller  on products(is_best_seller) where is_best_seller;
create trigger trg_products_updated before update on products
  for each row execute function set_updated_at();

-- ============================================================
-- promos  (halaman/section promo)
-- ============================================================
create table if not exists promos (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  description    text,
  discount_label text,                    -- mis. "up to 45%"
  image_url      text,
  cta_url        text,                    -- Shopee / WhatsApp
  start_date     date,
  end_date       date,
  is_active      boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- banners  (promo bar / hero / promo section) — dikelola owner
-- ============================================================
create table if not exists banners (
  id          uuid primary key default gen_random_uuid(),
  title       text,
  subtitle    text,
  image_url   text,
  link_url    text,
  placement   text not null default 'promo_bar'
              check (placement in ('promo_bar','hero','promo_section')),
  start_date  date,
  end_date    date,
  is_active   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists idx_banners_placement on banners(placement);

-- ============================================================
-- faqs
-- ============================================================
create table if not exists faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- site_settings  (satu baris — info toko & link global)
-- ============================================================
create table if not exists site_settings (
  id                int primary key default 1 check (id = 1),  -- singleton
  store_name        text default 'Station Cosmetics',
  store_address     text,
  store_hours       text,
  whatsapp_number   text,     -- format internasional, mis. 628xxxx
  shopee_url        text,
  instagram_url     text,
  tiktok_url        text,
  google_maps_url   text,
  google_maps_embed text,     -- iframe src
  promo_bar_text    text,
  hero_title        text,
  hero_subtitle     text,
  meta_title        text,
  meta_description  text,
  updated_at        timestamptz not null default now()
);
create trigger trg_settings_updated before update on site_settings
  for each row execute function set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table categories    enable row level security;
alter table products      enable row level security;
alter table promos        enable row level security;
alter table banners       enable row level security;
alter table faqs          enable row level security;
alter table site_settings enable row level security;

-- Publik (anon + authenticated) hanya baca baris aktif
create policy "public read active categories" on categories
  for select to anon, authenticated using (is_active);
create policy "public read active products" on products
  for select to anon, authenticated using (is_active);
create policy "public read active promos" on promos
  for select to anon, authenticated using (is_active);
create policy "public read active banners" on banners
  for select to anon, authenticated using (is_active);
create policy "public read active faqs" on faqs
  for select to anon, authenticated using (is_active);
create policy "public read settings" on site_settings
  for select to anon, authenticated using (true);

-- Owner (siapa pun yang login) full akses.
-- CATATAN: fase demo hanya ada 1 akun owner, jadi cukup cek "authenticated".
-- Kalau nanti multi-user, tambahkan tabel admins + cek keanggotaan di sini.
create policy "admin all categories" on categories
  for all to authenticated using (true) with check (true);
create policy "admin all products" on products
  for all to authenticated using (true) with check (true);
create policy "admin all promos" on promos
  for all to authenticated using (true) with check (true);
create policy "admin all banners" on banners
  for all to authenticated using (true) with check (true);
create policy "admin all faqs" on faqs
  for all to authenticated using (true) with check (true);
create policy "admin write settings" on site_settings
  for all to authenticated using (true) with check (true);

-- ============================================================
-- Seed minimal (aman diulang)
-- ============================================================
insert into site_settings (id) values (1) on conflict (id) do nothing;

insert into categories (name, slug, sort_order) values
  ('Skincare','skincare',1),
  ('Makeup','makeup',2),
  ('Bodycare','bodycare',3),
  ('Haircare','haircare',4),
  ('Parfum','parfum',5),
  ('Beauty Tools','beauty-tools',6)
on conflict (slug) do nothing;

insert into faqs (question, answer, sort_order) values
  ('Apakah bisa beli online?','Bisa, melalui Shopee atau WhatsApp.',1),
  ('Apakah bisa datang langsung ke toko?','Bisa, lokasi toko tersedia di Google Maps.',2),
  ('Apakah produk original?','Ya, Station Cosmetics menyediakan produk kosmetik dan skincare original.',3),
  ('Apakah bisa tanya stok dulu?','Bisa, customer dapat menghubungi WhatsApp sebelum membeli.',4)
on conflict do nothing;
