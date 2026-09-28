/*
 * Pengaturan layanan online Jalan. Edit file ini langsung di GitHub (ikon pensil), lalu Commit.
 * Kosongkan (null / '') untuk mematikan fiturnya; aplikasi tetap jalan tanpa keduanya.
 *
 * 1) firebase: untuk berbagi trip dan sinkron antar-HP.
 *    Salin objek firebaseConfig dari Firebase Console → Project settings → Your apps → Web app.
 *    Contoh bentuknya:
 *    firebase: {
 *      apiKey: "AIza...",
 *      authDomain: "nama-proyek.firebaseapp.com",
 *      projectId: "nama-proyek",
 *      storageBucket: "nama-proyek.appspot.com",
 *      messagingSenderId: "1234567890",
 *      appId: "1:1234567890:web:abcdef"
 *    },
 *
 * 2) googleMapsKey: untuk rating Google dan link Google Maps otomatis saat mencari tempat.
 *    API key dari Google Cloud Console, dibatasi ke situs ini (lihat README).
 */
window.JALAN_CONFIG = {
  firebase: null,
  googleMapsKey: '',
};
