import { precacheAndRoute } from 'workbox-precaching'
if (!self.define) { let e, s = {}; const i = (i, n) => (i = new URL(i + ".js", n).href, s[i] || new Promise((s => { if ("document" in self) { const e = document.createElement("script"); e.src = i, e.onload = s, document.head.appendChild(e) } else e = i, importScripts(i), s() })).then((() => { let e = s[i]; if (!e) throw new Error(`Module ${i} didn’t register its module`); return e }))); self.define = (n, r) => { const t = e || ("document" in self ? document.currentScript.src : "") || location.href; if (s[t]) return; let o = {}; const l = e => i(e, t), d = { module: { uri: t }, exports: o, require: l }; s[t] = Promise.all(n.map((e => d[e] || l(e)))).then((e => (r(...e), o))) } } define(["./workbox-7cfec069"], (function (e) { "use strict"; self.addEventListener("message", (e => { e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting() })), e.precacheAndRoute([{ url: "assets/index-1f4CyHxp.js", revision: null }, { url: "assets/index-4sK4E3Wk.css", revision: null }, { url: "index.html", revision: "25f6046c3517a8094debc403d2812b2c" }, { url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07" }, { url: "manifest.webmanifest", revision: "424a1aaa4b7d14db09f1c346087db3da" }], {}), e.cleanupOutdatedCaches(), e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))) }));


precacheAndRoute(self.__WB_MANIFEST)