# PRD — Website Nusa Wiraga (Kejuaraan Pencak Silat Nasional)

## Problem Statement (asli)
"saya ingin membuat website untuk pendaftaran lomba silat \"Nusa Wiraga\". dan bisa untuk company profile juga setelah kita melaksanakannya. karena event ini hanya 1x dalam setahun dan hanya 1 minggu"

## Keputusan Pengguna
1. Form pendaftaran online lengkap + dashboard admin + tombol WhatsApp panitia
2. Company profile lengkap: profil, galeri, berita, hasil pertandingan, sponsor
3. Tanpa login peserta; login khusus admin saja (ditambahkan untuk melindungi dashboard)
4. Warna: merah maroon & kuning (emas)
5. Notifikasi email otomatis setelah pendaftaran (Resend)

## Arsitektur
- Frontend: React (CRA/craco) + Tailwind + shadcn/ui + framer-motion + sonner
- Backend: FastAPI + Motor (MongoDB async), cookie JWT httpOnly (12 jam), bcrypt
- Database: MongoDB (koleksi: users, registrants, login_attempts)
- Email: Resend (asyncio.to_thread, fallback log bila key kosong)

## Persona
- Peserta/perguruan: mendaftar tanpa akun, dapat nomor registrasi NW26-XXXX
- Panitia/admin: mengelola & memverifikasi pendaftar di /admin
- Publik/sponsor: membaca profil event, berita, galeri, peluang sponsorship

## Yang Sudah Diimplementasikan (2026-09-01)
- Landing page lengkap: Hero (countdown ke 12 Okt 2026, statistik), Profil & Visi, Kategori & Biaya, Hasil Pertandingan (placeholder gelanggang A/B/C), Berita, Galeri bento, Sponsor 3 tier, Footer, widget WhatsApp melayang
- Halaman /daftar: form lengkap (nama, NIK/NISN, email, WA, perguruan, kategori, kelompok usia, kelas tanding kondisional, pelatih), validasi, modal sukses dengan nomor registrasi + tombol WA
- Backend: POST /api/register, auth admin (login/logout/me, proteksi brute-force 5x/15 mnt), admin stats, list (search+filter), PATCH status/pembayaran, DELETE, export CSV
- Admin dashboard /admin: kartu statistik, badge per kategori, tabel dengan filter/pencarian, ubah status & pembayaran, hapus, WA atlet, export CSV
- SEO: komponen Seo, canonical/og dinamis, JSON-LD SportsEvent, llms.txt
- Seed admin idempoten: admin@nusawiraga.id / NusaWiraga2026!

## Backlog Prioritas
### P0
- Isi RESEND_API_KEY agar email konfirmasi benar-benar terkirim (saat ini hanya log/mock)
- Ganti nomor WhatsApp panitia & data kontak (masih placeholder 6281234567890)

### P1
- CMS admin untuk kelola Berita & Hasil Pertandingan (input juara per kategori, bagan)
- Upload logo sponsor oleh admin
- Bukti pembayaran upload oleh peserta (object storage)

### P2
- Pembayaran online (payment gateway)
- Halaman arsip juara edisi sebelumnya
- Ekspor PDF kartu peserta/nomor undian

## Next Tasks
1. Minta Resend API key user / aktifkan managed Resend
2. Konfirmasi nomor WA panitia, alamat sekretariat, tanggal & venue final
3. CMS berita & hasil pertandingan
