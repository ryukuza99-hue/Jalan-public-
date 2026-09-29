/*
 * Pengaturan layanan online Jalan. Edit file ini langsung di GitHub (ikon pensil), lalu Commit.
 * Kosongkan (null / '') untuk mematikan fiturnya; aplikasi tetap jalan tanpa keduanya.
 *
 * 1) firebase: untuk berbagi trip dan sinkron antar-HP.
 *    Salin objek firebaseConfig dari Firebase Console → Project settings → Your apps → Web app.
 *    Contoh bentuknya:
 *    firebase: {
 *      apiKey: "AIzaSyDmVHFaPe3oAUMWkaFksuoBcKVw-KR3MBw",
 *      authDomain: "jalan-public.firebaseapp.com",
 *      projectId: "jalan-public",
 *      storageBucket: "jalan-public.firebasestorage.app",
 *      messagingSenderId: "940767777025",
 *      appId: "1:940767777025:web:93740829d230f64393cb00"
 *      measurementId: "G-1TVFWW4F3M"
 *    },
 *
 * 2) googleMapsKey: untuk rating Google dan link Google Maps otomatis saat mencari tempat.
 *    API key dari Google Cloud Console, dibatasi ke situs ini (lihat README).
 */
window.JALAN_CONFIG = {
  firebase: null,
  googleMapsKey: '',
};
