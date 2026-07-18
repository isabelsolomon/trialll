const CACHE_NAME="my-pwa-v1";
const urlsToCache=[
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "./manifest.json"
];
self.addEventListener("install",event=>{
    console.log("sw installing....");
    event.waituntil(caches.open(CACHE_NAME).then(
        (cache)=>{
            return cache.addAll(urlsToCache);
        }
    ));
    self.skipWaiting();
});
self.addEventListener("activate",(event) =>{
    console.log("sw activated");
    event.waituntil(
        caches.keys().then((keys) =>{
            return Promise.all(
                keys.map((key)=>{
                    if(key!== CACHE_NAME){
                        return caches.delete(key);
                    }
                })
            )
        })
    )
})
self.addEventListener("fetch",event=> {
    event.respondwith(
        caches.match(event.request).then(response=>{
            return response || fetch(event.request);
        })
    );
});