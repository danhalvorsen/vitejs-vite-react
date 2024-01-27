Advanced (injectManifest) [​](#advanced-injectmanifest)
=======================================================

With this service worker `strategy` you can build your own service worker.

The `vite-plugin-pwa` plugin will compile your custom service worker and inject its service worker's precache manifest.

By default, the plugin will assume the `service worker` source code is located at the `Vite's public` folder with the name `sw.js`, that's, it will search in the following file: `/public/sw.js`.

If you want to change the location and/or the service worker name, you will need to change the following plugin options:

*   `srcDir`: **must** be relative to the project root folder
*   `filename`: including the file extension and **must** be relative to the `srcDir` folder

For example, if your service worker is located at `/src/my-sw.js` you must configure it using:

ts
```
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'my-sw.js'
    })
  ]
})
```

Custom Service worker [​](#custom-service-worker)
-------------------------------------------------

We recommend you to use [Workbox](https://developers.google.com/web/tools/workbox) to build your service worker instead using `importScripts`, you will need to include `workbox-*` dependencies as `dev dependencies` to your project.

### Plugin Configuration [​](#plugin-configuration)

You **must** configure `strategies: 'injectManifest'` in `vite-plugin-pwa` plugin options in your `vite.config.ts` file:

ts
```
VitePWA({
  strategies: 'injectManifest',
})
```

### Development [​](#development)

If you would like the service worker to run in development, make sure to enable it in the [devOptions](/guide/development.html#plugin-configuration) and to set the type to [module](/guide/development.html#injectmanifest-strategy) if required.

### Service Worker Code [​](#service-worker-code)

Your custom service worker (`public/sw.js`) should have at least this code (you also need to install `workbox-precaching` as `dev dependency` to your project):

js
```
import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)
```

If you're not using `precaching` (`self.__WB_MANIFEST`), you need to disable `injection point` to avoid compilation errors (available only from version `^0.14.0`), add the following option to your pwa configuration:

ts
```
injectManifest: {
  injectionPoint: undefined
}
```

### Service worker errors on browser [​](#service-worker-errors-on-browser)

If your service worker code is being compiled with unexpected `exports` (for example: `export default require_sw();`), you can change the build output format to `iife`, add the following code to your pwa configuration:

ts
```
injectManifest: {
  rollupFormat: 'iife'
}
```

### Cleanup Outdated Caches [​](#cleanup-outdated-caches)

The service worker will store all your application assets in a browser cache (or set of caches). Every time you make changes to your application and rebuild it, the `service worker` will also be rebuilt, including in its precache manifest all new modified assets, which will have their revision changed (all assets that have been modified will have a new version). Assets that have not been modified will also be included in the service worker precache manifest, but their revision will not change from the previous one.

Precache Manifest Entry Revision

The precache manifest entry revision is just a `MD5` hash of the asset content, if an asset is not modified, the calculated hash will be always the same.

When the user installs the new version of the application, we will have on the service worker cache all new assets and also the old ones. To delete old assets (from previous versions that are no longer necessary), and since you are building your own service worker, you will need to add the following code to your custom service worker:

js
```
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)
```

We strongly recommend you to include previous code on your custom service worker.

### Generate SW Source Map [​](#generate-sw-source-map)

Since you are building your own service worker, this plugin will use Vite's `build.sourcemap` configuration option, which default value is `false`, to generate the source map.

If you want to generate the source map for your service worker, you will need to generate the source map for the entire application.

Auto Update Behavior [​](#auto-update-behavior)
-----------------------------------------------

If you need your custom service worker works with `Auto Update` behavior, you need to change the plugin configuration options and add some custom code to your service worker code.

### Plugin Configuration [​](#plugin-configuration-1)

You must configure `registerType: 'autoUpdate'` to `vite-plugin-pwa` plugin options in your `vite.config.ts` file:

ts
```
VitePWA({
  registerType: 'autoUpdate'
})
```

### Service Worker Code [​](#service-worker-code-1)

You **must** include in your service worker code at least this code (you also need to install `workbox-core` as `dev dependency` to your project):

js
```
import { clientsClaim } from 'workbox-core'

self.skipWaiting()
clientsClaim()
```

Prompt For Update Behavior [​](#prompt-for-update-behavior)
-----------------------------------------------------------

If you need your custom service worker works with `Prompt For Update` behavior, you need to change your service worker code.

### Service Worker Code [​](#service-worker-code-2)

You need to include on your service worker at least this code:

js
```
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING')
    self.skipWaiting()
})
```

TypeScript support [​](#typescript-support)
-------------------------------------------

You can use TypeScript to write your custom service worker. To resolve service worker types, just add `WebWorker` to `lib` entry on your `tsconfig.json` file:

json
```
{
  "compilerOptions": {
    "lib": ["ESNext", "DOM", "WebWorker"]
  }
}
```

### Plugin Configuration [​](#plugin-configuration-2)

We recommend you to put your custom service worker inside `src` directory.

You need to configure `srcDir: 'src'` and `filename: 'sw.ts'` plugin options in your `vite.config.ts` file, configure both options with the directory and the name of your custom service worker properly:

ts
```
VitePWA({
  srcDir: 'src',
  filename: 'sw.ts'
})
```

### Service Worker Code [​](#service-worker-code-3)

You need to define `self` scope with `ServiceWorkerGlobalScope`:

ts
```
import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)
```