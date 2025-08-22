# 🏥 Healthshop Web App

## Fitur Utama

✅ **Autentikasi Pengguna** – Sistem login & logout yang aman menggunakan Next-Auth  
✅ **Manajemen Produk (CRUD)** – Tambah, lihat, edit, hapus produk  
✅ **Upload Gambar** – Simpan gambar produk ke Cloud Storage  
✅ **Infinite Scroll** – Produk otomatis dimuat saat scroll  
✅ **Rute Terproteksi** – Halaman manajemen hanya bisa diakses setelah login

---

## Tech Stack

| Kategori                   | Teknologi                                                                       |
| -------------------------- | ------------------------------------------------------------------------------- |
| **Framework**              | [Next.js](https://nextjs.org/) (App Router)                                     |
| **Styling**                | [Tailwind CSS](https://tailwindcss.com/)                                        |
| **Komponen UI**            | [Ant Design (AntD)](https://ant.design/)                                        |
| **Database**               | [Prisma] [PostgreSQL] via [Supabase](https://supabase.com/)                     |
| **Manajemen State Server** | [TanStack Query](https://tanstack.com/query/latest)                             |
| **Penyimpanan File**       | [Supabase Storage](https://supabase.com/storage)                                |

---

## Setup & Instalasi (Satu Bagan)

Jalankan langkah berikut di terminal:

```bash
# Clone repository
git clone <repo-url>
cd healthapp

# Install dependencies
npm install
# atau
yarn install

# Tambahkan file .env di root project dengan isi berikut:
DATABASE_URL="postgresql://postgres:%40Binatang1234@db.xijgtrgncigduqiqqeoc.supabase.co:5432/postgres?pgbouncer=true"
NEXTAUTH_SECRET="TUsf9nHLC5nrpYx7S/4i+KBMARP9UvLiLktUpfAlrG4="
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://xijgtrgncigduqiqqeoc.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6..."

# Jalankan aplikasi secara lokal
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev

# Buka di browser
# http://localhost:3000
```

---

## 🔎 Credential, 📚 Learn More, & ☁️ Deploy (Satu Bagan)

```md
🔑 Credential Login

- Email: admin@gmail.com
- Password: admin

📚 Learn More

- Next.js Docs: https://nextjs.org/docs
- Learn Next.js: https://nextjs.org/learn
- Next.js GitHub: https://github.com/vercel/next.js

☁️ Deploy to Vercel

1. Buat akun & project di Vercel
2. Hubungkan repo Git (GitHub/GitLab/Bitbucket)
3. Deploy dengan default config Next.js
4. Set environment variable (.env) pada Project Settings → Environment Variables
5. Redeploy

🔗 Quick Link Deploy: https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme
```
