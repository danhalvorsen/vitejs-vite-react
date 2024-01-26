import { precacheAndRoute } from 'workbox-precaching'

/**
 * 
 * Service Worker Code
 * Your custom service worker(public / sw.js) should have at least this code(you also need to install 
 * workbox - precaching as dev dependency to your project):
 */


precacheAndRoute(self.__WB_MANIFEST)


if (!self.define) { let e, s = {}; const i = (i, n) => (i = new URL(i + ".js", n).href, s[i] || new Promise((s => { if ("document" in self) { const e = document.createElement("script"); e.src = i, e.onload = s, document.head.appendChild(e) } else e = i, importScripts(i), s() })).then((() => { let e = s[i]; if (!e) throw new Error(`Module ${i} didn’t register its module`); return e }))); self.define = (n, r) => { const t = e || ("document" in self ? document.currentScript.src : "") || location.href; if (s[t]) return; let o = {}; const d = e => i(e, t), l = { module: { uri: t }, exports: o, require: d }; s[t] = Promise.all(n.map((e => l[e] || d(e)))).then((e => (r(...e), o))) } } define(["./workbox-3e911b1d"], (function (e) { "use strict"; self.skipWaiting(), e.clientsClaim(), e.precacheAndRoute([{ url: "assets/index-4sK4E3Wk.css", revision: null }, { url: "assets/index-QudzN1u_.js", revision: null }, { url: "index.html", revision: "effb48f6c052a1ed477298bbd8690a4b" }, { url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07" }, { url: "manifest.webmanifest", revision: "424a1aaa4b7d14db09f1c346087db3da" }], {}), e.cleanupOutdatedCaches(), e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))) }));
