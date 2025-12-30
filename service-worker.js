const CACHE_NAME = "obsidian-map-v5.4"; // 배포할 때마다 v3, v4...로 올리세요.

const ASSETS = [
  "/ObsidianMapSimulator/",
  "/ObsidianMapSimulator/index.html",
  "/ObsidianMapSimulator/manifest.json",
  "/ObsidianMapSimulator/icon-192.png",
  "/ObsidianMapSimulator/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});

























