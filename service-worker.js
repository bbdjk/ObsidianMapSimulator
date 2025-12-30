const CACHE_NAME = "obsidian-map-v2"; // 배포할 때마다 v3, v4...로 올리세요.

const ASSETS = [
  "/ObsidianMapSimulator/",
  "/ObsidianMapSimulator/index.html",
  "/ObsidianMapSimulator/manifest.json",
  "/ObsidianMapSimulator/icon-192.png",
  "/ObsidianMapSimulator/icon-512.png",
];

// install: 캐시 채우고 즉시 대기상태 스킵
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// activate: 이전 캐시 정리 + 즉시 컨트롤
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

// fetch: 캐시 우선, 없으면 네트워크
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // GET만 캐시 처리(안전)
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))

    if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/ObsidianMapSimulator/service-worker.js");

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}

  );
});

