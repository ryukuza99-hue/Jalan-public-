/*
 * Pengaturan layanan online Jalan. Edit file ini langsung di GitHub (ikon pensil), lalu Commit.
 * Panduan lengkap: PANDUAN.md
 *
 * firebase      : berbagi trip dan sinkron antar-HP. Nilai ini memang aman terlihat publik;
 *                 data dijaga oleh Rules di Firestore.
 * googleMapsKey : rating Google dan link Google Maps otomatis. Isi di antara tanda kutip.
 */
window.JALAN_CONFIG = {
  firebase: {
    apiKey: "AIzaSyDmVHFaPe3oAUMWkaFksuoBcKVw-KR3MBw",
    authDomain: "jalan-public.firebaseapp.com",
    projectId: "jalan-public",
    storageBucket: "jalan-public.firebasestorage.app",
    messagingSenderId: "940767777025",
    appId: "1:940767777025:web:93740829d230f64393cb00",
    measurementId: "G-1TVFWW4F3M",
  },
  googleMapsKey: '',
};
