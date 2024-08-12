const staticCashName = 'static-site-V1'
const dinamicCashName = 'dinamic-site-V2'

const ASSETS = [
    '/',
    '/assets/1-DZeV6C6N.jpg',
    '/assets/2-DMpVqOwo.jpg',
    '/assets/3-DE2rdLqN.jpg',
    '/assets/index-B9KOE3DF.js',
    '/assets/index-bhdclJ00.css',
]

self.addEventListener('install', async () => {
    const cashe = await caches.open(staticCashName)
    await cashe.addAll(ASSETS)
})

self.addEventListener('activate', async () => {
    const cacheKey = await caches.keys()
    await Promise.all(
        cacheKey
            .filter((item) => item !== staticCashName && item !== dinamicCashName)
            .map((c) => caches.delete(c)),
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
    const cache = await caches.match(request)
    try {
        networkFirst(request)
        return cache ?? (await fetch(request))
    } catch (e) {
        return networkFirst(request)
    }
}

async function networkFirst(request) {
    const cache = await caches.open(dinamicCashName)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cache = await caches.match(request)
        return cache
    }
}
