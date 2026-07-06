# Station Cosmetics Web

Landing page + admin panel untuk toko skincare & kosmetik Station Cosmetics (Medan).
Stack: Next.js (App Router) + Tailwind + Supabase, deploy Vercel. Semua free tier.

Dokumen: `CLAUDE.md` (context & aturan), `ROADMAP.md` (fase), `PROMPTS.md`
(prompt Claude Code per fase), `PRD.md` (spesifikasi), `supabase/migrations/`.

## Setup

```bash
# 1. Scaffold Next.js (kalau folder masih kosong)
npx create-next-app@latest .        # App Router: Yes, Tailwind: Yes, src dir: opsional
npm install @supabase/supabase-js @supabase/ssr

# 2. Env
cp .env.example .env.local          # isi NEXT_PUBLIC_SUPABASE_URL & _ANON_KEY

# 3. Database
#    Supabase > SQL Editor > tempel supabase/migrations/0001_init.sql > Run

# 4. Jalankan
npm run dev
```

## Buat akun owner (admin)
Supabase Dashboard > Authentication > Users > Add user (email + password).
Login lewat `/admin/login`.

## Deploy ke Vercel
1. Push repo ke GitHub (manual — Claude Code tidak menjalankan git).
2. Vercel > New Project > import repo. Framework preset: **Next.js**.
3. Set env `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Deploy → URL `*.vercel.app` untuk demo owner.
