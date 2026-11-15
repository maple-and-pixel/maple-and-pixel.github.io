// Keeps every form and cell image the page has fetched, so a sign opened once opens at once (and offline) after.
// File names carry a content hash (?abcd1234), so a changed image is a new address and is fetched again.
const CACHE = "hw-img-1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || !/\/[fc]\/[^/]+\.webp$/.test(u.pathname)) return;
  e.respondWith(caches.open(CACHE).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok) c.put(e.request, r.clone());
    return r;
  }))));
});
