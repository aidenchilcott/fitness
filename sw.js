// Self-destructing service worker. The old SW was caching the HTML and
// preventing fresh deploys from showing up on iOS PWAs. This version
// unregisters itself on activate so the next page load goes straight to
// the network.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Clear every cache the old worker may have created
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    // Unregister this worker
    await self.registration.unregister();
    // Force every open client to reload from network
    const clients = await self.clients.matchAll();
    clients.forEach(c => c.navigate(c.url));
  })());
});
