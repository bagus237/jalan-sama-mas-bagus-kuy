# Jalan Kuy 🐱🧡

Web undangan kecil: Yes -> pilih tanggal (disimpan ke Google Sheets), No -> kucing oren sedih.

## 1. Atur nama

Nama diambil dari link, tanpa perlu deploy ulang:

```
https://domain-kamu.vercel.app/?nama=Siti
```

Kalau `?nama=` tidak diisi, halaman menyapa "kamu". Nama yang ada spasi tetap aman, misal `?nama=Siti%20Nur` (kebanyakan aplikasi chat otomatis mengubah spasi jadi `%20`).

## 2. Setup Google Sheets (gratis)

1. Buka [sheets.new](https://sheets.new), kasih nama misal "Jalan Kuy".
2. Menu **Extensions > Apps Script**.
3. Hapus isi default, paste isi `apps-script.gs`, klik Save.
4. Klik **Deploy > New deployment**, pilih type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Klik Deploy, izinkan akses (Advanced > Go to project kalau muncul peringatan).
6. Copy **Web app URL** (berakhiran `/exec`), paste ke `SHEET_URL` di `config.js`.

Kalau nanti kode Apps Script diubah, deploy ulang lewat **Deploy > Manage deployments > Edit > New version** supaya URL tetap sama.

## 3. Coba lokal

```bash
npx serve .
```

Buka URL yang muncul, coba pilih tanggal, cek baris baru di Sheet.

## 4. Deploy ke Vercel

Opsi A, lewat CLI dari folder ini:

```bash
npx vercel        # preview
npx vercel --prod # production
```

Opsi B, push ke GitHub lalu import di [vercel.com/new](https://vercel.com/new). Framework preset: **Other**, root directory: folder `jalankuy`, tanpa build command.
