const monthMillis = 1000 * 60 * 60 * 24 * 30

// Precache large files - 1 Month
const PRECACHE_VERSION = `precache-v${Math.floor(Date.now() / monthMillis)}`
const PRECACHE_URLS = [
  '/fluidsynth/fluidsynth.js',
  '/fluidsynth/synth.min.js',
  '/fluidsynth/synth.worklet.min.js',
  '/piano.sf3',
  '/.left.mp4',
  '/.right.mp4'
]
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting()),
  )
})

const staleWhileRevalidate = (event, CACHE_NAME) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }
      return caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          return cache.put(event.request, response.clone()).then(() => {
            return response
          })
        })
      })
    }),
  )
}

// Runtime cache common data - 1 month
const RUNCACHE_VERSION = `runcache-v${Math.floor(Date.now() / monthMillis)}`
self.addEventListener('fetch', async (event) => {
  if (event.request.method !== 'GET') return

  // State while revalidate common static assets.
  const assets = ['.mid', '.webp', '.avif', '.jpg', '.png']
  for (const asset of assets) {
    if (event.request.url.includes(asset)) {
      staleWhileRevalidate(event, RUNCACHE_VERSION)
      return
    }
  }

  // Attempt to use preload response
  const response = await event.preloadResponse
  if (response) return response

  return fetch(event.request)
})

// Navigation preloads for faster page load
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable()
      }
    })(),
  )
})

// Update and bust old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE_VERSION, RUNCACHE_VERSION]
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName))
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete)
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})
