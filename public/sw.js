if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/92J1jP0Heu1UhZGLgc7Fa/_buildManifest.js",revision:"a0ae24e7f29dd3809ab75b5dd91a79dc"},{url:"/_next/static/92J1jP0Heu1UhZGLgc7Fa/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/124-9fb88a3ba062ae59.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/190-206a76fc75a4b2a6.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/57-8267f9c9a39af90c.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/600-717d38a5b385c652.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/671-7f42070459d529c2.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/app/_not-found/page-403d894b0d537d7f.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/app/layout-613de9f7f183e7ba.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/app/loading-8e5b765a5bf45189.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/app/manage-categories/page-d9767f4f47feb67a.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/app/page-c3c69be6aa19ab3f.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/app/signin/page-c2ec94615db48de2.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/app/signup/page-3335674e45640344.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/fd9d1056-308368b1d05d70bc.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/main-app-abbf5b7c7c9ee03f.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/main-c199847135d744e8.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/pages/_app-037b5d058bd9a820.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/pages/_error-6ae619510b1539d6.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-c6c092c665b0a7d9.js",revision:"92J1jP0Heu1UhZGLgc7Fa"},{url:"/_next/static/css/05b225c6679dddcb.css",revision:"05b225c6679dddcb"},{url:"/_next/static/css/7174b48210402ee8.css",revision:"7174b48210402ee8"},{url:"/_next/static/css/ff521ea4e7267934.css",revision:"ff521ea4e7267934"},{url:"/_next/static/media/048b37b1cf041314-s.p.woff2",revision:"b6dad719420fe0bd86df52a48a0dfd37"},{url:"/_next/static/media/5da129ff141ed32c-s.p.woff2",revision:"b7cfa9e3b7f1dd68d5a2339d00f2bf8b"},{url:"/_next/static/media/cbef0cb3c3af823f-s.p.woff2",revision:"4b10039bd27156b232e0360651fa37e0"},{url:"/_next/static/media/e0ad2ceaf794b823-s.p.woff2",revision:"87fbe9f1a42094a2fcf6bf284bcbbdc7"},{url:"/_next/static/media/fe465dc4c64aad70-s.p.woff2",revision:"83f254bcc6a5c79c6730f4ffd99248ee"},{url:"/favicon.svg",revision:"e638c2e7fee572797dd2f920ddfc6e0b"},{url:"/icons/android-chrome-192x192.png",revision:"fdb7c3ece1dc5767861c66a33053abc7"},{url:"/icons/android-chrome-384x384.png",revision:"faf153c5c3dc59db891466791dc8344b"},{url:"/icons/icon-512x512.png",revision:"2d24cab7625a15f95e3fa72d2a1df5cc"},{url:"/manifest.json",revision:"7783909f86b8a8266e2b55a0eb212b97"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
