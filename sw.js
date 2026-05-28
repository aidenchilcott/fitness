// Minimal service worker so the PWA installs cleanly.
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => self.clients.claim());
self.addEventListener("fetch", () => {});
