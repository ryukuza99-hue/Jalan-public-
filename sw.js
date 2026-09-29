// Menyimpan aplikasi di HP supaya tetap bisa dibuka tanpa sinyal.
const CACHE = 'jalan-v13';
const CORE = ['./', './index.html', './config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
// Selalu coba versi terbaru dulu untuk file yang sering diubah.
const FRESH = ['/index.html', '/config.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const networkFirst = (req, key) =>
  fetch(req)
    .then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(key || req, copy)); } return res; })
    .catch(() => caches.match(key || req));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isStatic = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com' || url.pathname.startsWith('/firebasejs/');
  if (!sameOrigin && !isStatic) return; // kurs, Google Maps, Firestore: langsung ke internet

  if (req.mode === 'navigate') { e.respondWith(networkFirst(req, './index.html')); return; }
  if (sameOrigin && FRESH.some((p) => url.pathname.endsWith(p))) { e.respondWith(networkFirst(req)); return; }

  // Ikon, font, dan pustaka Firebase: pakai cache dulu.
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
