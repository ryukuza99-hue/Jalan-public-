# Panduan pengaturan Jalan

Aplikasi: https://ryukuza99-hue.github.io/Jalan-public-/

Ada dua fitur online yang perlu disiapkan sekali oleh pemilik aplikasi. Semua langkah bisa dilakukan lewat browser.
Setelah `config.js` diisi, HP teman otomatis ikut memakai pengaturan yang sama. Teman tidak perlu mengatur apa pun.

---

## A. Berbagi trip dan sinkron antar-HP (Firebase, gratis)

1. Buka https://console.firebase.google.com, login dengan akun Google, lalu **Create a project**.
   Beri nama, misalnya `jalan-trip`. Google Analytics boleh dimatikan.
2. **Build → Authentication → Get started → Sign-in method → Anonymous → Enable → Save.**
3. Masih di Authentication, buka **Settings → Authorized domains → Add domain**, lalu isi `ryukuza99-hue.github.io`.
4. **Build → Firestore Database → Create database.** Pilih lokasi `asia-southeast2 (Jakarta)` atau `asia-southeast1 (Singapore)`, lalu mulai dengan **production mode**.
5. Di Firestore, buka tab **Rules**, ganti seluruh isinya dengan teks di bawah, lalu **Publish**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /trips/{tripId} {
         allow get, create, update: if request.auth != null && tripId.size() >= 16;
       }
     }
   }
   ```

   Artinya, hanya orang yang tahu kode trip yang bisa membuka dan mengubahnya, dan daftar semua trip tidak bisa dilihat siapa pun.
6. **Project settings** (ikon ⚙ di kiri atas) → **Your apps** → ikon **</>** (Web). Beri nama, lalu **Register app**.
   Salin bagian `firebaseConfig = { ... }`.
7. Di GitHub, buka file `config.js` → ikon ✏️ (Edit). Ganti `firebase: null,` dengan isi yang disalin, lalu **Commit changes**. Contoh:

   ```js
   firebase: {
     apiKey: "AIza...",
     authDomain: "jalan-trip.firebaseapp.com",
     projectId: "jalan-trip",
     storageBucket: "jalan-trip.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef"
   },
   ```

Konfigurasi Firebase untuk web memang dirancang untuk terlihat publik. Keamanannya dijaga oleh Rules di langkah 5.

**Cara pakai:** buka trip → tab **Lainnya** → **Bagikan trip ini** → kirim link ke teman.
Teman membuka link itu, atau memakai **Gabung trip teman** di halaman awal, lalu trip yang sama muncul di HP-nya.
Perubahan dari siapa pun langsung terlihat di semua HP. Perubahan saat offline dikirim otomatis begitu online.

---

## B. Rating Google dan link Google Maps otomatis (Google Maps Platform)

Google meminta akun billing (kartu kredit/debit), tapi pemakaian pribadi jauh di bawah batas gratis.
Pencarian dengan rating (Text Search Enterprise) gratis **1.000 kali per bulan**, lalu US$35 per 1.000 berikutnya.
Langkah 5 di bawah menjamin tagihan tidak bisa membengkak.

1. Buka https://console.cloud.google.com. Pakai proyek Firebase yang sama (pilih di bagian atas) atau buat proyek baru.
2. **Billing** → hubungkan akun billing.
3. **APIs & Services → Library**, lalu aktifkan dua API ini: **Maps JavaScript API** dan **Places API (New)**.
4. **APIs & Services → Credentials → Create credentials → API key.** Setelah key dibuat, klik key-nya lalu atur:
   - **Application restrictions:** *Websites*, lalu tambahkan `https://ryukuza99-hue.github.io/*`
   - **API restrictions:** *Restrict key*, lalu centang *Maps JavaScript API* dan *Places API (New)*
   - **Save**
5. **Batasi pemakaian harian:** buka **APIs & Services → Places API (New) → Quotas**, lalu turunkan batas *SearchText requests per day* menjadi misalnya `100`.
6. Di GitHub, edit `config.js` dan isi `googleMapsKey: 'AIza...key-kamu...',`, lalu **Commit changes**.

API key ini akan terlihat di file publik. Pembatasan di langkah 4 dan 5 membuatnya tidak bisa dipakai situs lain dan tidak bisa menghabiskan biaya.

**Cara pakai:** saat menambah aktivitas atau tempat, ketik nama tempat di kolom **Lokasi**, misalnya `Kiss Bridge`.
Pilihan dari Google muncul otomatis beserta ★ rating, jumlah ulasan, dan alamatnya. Pilih salah satu:
link Google Maps dan tombol **Navigasi** langsung mengarah ke tempat itu.
Di tab **Tempat**, daftar **Jelajahi** otomatis menampilkan rating Google, dan tombol
**Ambil rating Google** melengkapi rating aktivitas yang sudah ada.

**Harga:** untuk tempat makan, aplikasi ikut meminta kisaran harga (`priceRange`) dan tingkat harga ($–$$$$) dari Google.
Kedua data ini termasuk kategori pencarian yang lebih mahal (Enterprise + Atmosphere), jadi cek batas gratis dan harganya di
halaman harga Google Maps Platform sebelum memakai key sendiri. Untuk tiket wisata, Google hampir tidak punya datanya:
isi manual di kolom **Harga tiket / per orang** (tombol **Harga Klook** membuka pencarian di Klook).

Rating Klook, Tripadvisor, KKday, dan Traveloka tidak bisa diambil otomatis karena platform tersebut tidak menyediakan
data untuk aplikasi umum. Tombol **Review** membuka halaman tempat itu di masing-masing platform.

---

## C. Masuk dengan Google (trip tersimpan di akun)

Setelah langkah ini, tombol **Masuk dengan Google** di aplikasi bisa dipakai. Semua trip otomatis tersimpan online,
jadi tidak hilang saat data browser terhapus atau ganti HP.

1. Buka https://console.firebase.google.com → proyek **jalan-public**.
2. **Build → Authentication → Sign-in method → Add new provider → Google → Enable.**
   Pilih email dukungan (Gmail kamu), lalu **Save**.
3. Masih di Authentication: **Settings → Authorized domains.** Pastikan `ryukuza99-hue.github.io` ada di daftar.
   Jika belum, **Add domain** lalu isi `ryukuza99-hue.github.io`.
4. **Build → Firestore Database → Rules.** Ganti seluruh isinya dengan teks di bawah, lalu **Publish**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /trips/{tripId} {
         allow get, create, update: if request.auth != null && tripId.size() >= 16;
       }
       match /users/{uid} {
         allow get, create, update: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```

   Bagian `users` hanya bisa dibaca dan diubah oleh pemilik akun itu sendiri. Isinya daftar kode trip milik akun tersebut.

`config.js` tidak perlu diubah.

**Cara pakai:** di halaman awal atau tab **Lainnya**, tekan **Masuk dengan Google**.
Di HP baru, atau setelah data browser terhapus, buka aplikasi lalu masuk lagi dengan akun yang sama: semua trip dimuat kembali.

**File cadangan:** tab **Lainnya → Simpan cadangan semua trip ke HP (file)**. Di Android file masuk ke folder Download;
di iPhone pilih **Simpan ke File**. Untuk memulihkan: **Pulihkan dari cadangan / file**, lalu pilih file itu.

---

## Memperbarui aplikasi

Jika ada file baru dari Claude (misalnya `index.html`), unggah ulang ke repository lewat **Add file → Upload files**.
**Jangan menimpa `config.js`** setelah diisi, kecuali memang ingin mengganti pengaturannya.
HP akan memakai versi baru saat aplikasi dibuka dalam keadaan online.
