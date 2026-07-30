const CACHE="starlight-rescue-v4";
const CORE=["/","/rescue-center.png","/characters/commander.webp","/characters/dali.webp","/characters/wawa.webp","/characters/gaogao.webp","/characters/xiaoyan.webp","/characters/xuanfeng.webp","/manifest.webmanifest"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.mode==="navigate"){
    e.respondWith(fetch(e.request).then(x=>{const y=x.clone();caches.open(CACHE).then(c=>c.put("/",y));return x}).catch(()=>caches.match("/")));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const y=x.clone();caches.open(CACHE).then(c=>c.put(e.request,y));return x})));
});
