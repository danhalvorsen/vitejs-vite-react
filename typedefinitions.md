Type declarations [?](#type-declarations)
-----------------------------------------


Plugin configuration
To enable the service worker on development, you only need to add the following options to the plugin configuration:

ts
```
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      /* other options */
      /* enable sw on development */
      devOptions: {
        enabled: true
        /* other options */
      }
    })
  ]
})
```

[link](https://vite-pwa-org.netlify.app/guide/development.html#plugin-configuration)

WARNING

Since version `0.12.4+`, the `webManifestUrl` has been deprecated, the plugin will use `navigateFallbackAllowlist` instead.

ts
```
/**
 * Development options.
 */
export interface DevOptions {
  /**
   * Should the service worker be available on development?.
   *
   * @default false
   */
  enabled?: boolean
  /**
   * The service worker type.
   *
   * @default 'classic'
   */
  type?: WorkerType
  /**
   * This option will enable you to not use the `runtimeConfig` configured on `workbox.runtimeConfig` plugin option.
   *
   * **WARNING**: this option will only be used when using `generateSW` strategy.
   *
   * @default false
   */
  disableRuntimeConfig?: boolean
  /**
   * This option will allow you to configure the `navigateFallback` when using `registerRoute` for `offline` support:
   * configure here the corresponding `url`, for example `navigateFallback: 'index.html'`.
   *
   * **WARNING**: this option will only be used when using `injectManifest` strategy.
   */
  navigateFallback?: string

  /**
   * This option will allow you to configure the `navigateFallbackAllowlist`: new option from version `v0.12.4`.
   *
   * Since we need at least the entry point in the service worker's precache manifest, we don't want the rest of the assets to be intercepted by the service worker.
   *
   * If you configure this option, the plugin will use it instead the default.
   *
   * **WARNING**: this option will only be used when using `generateSW` strategy.
   *
   * @default [/^\/$/]
   */
  navigateFallbackAllowlist?: RegExp[]

  /**
   * On dev mode the `manifest.webmanifest` file can be on other path.
   *
   * For example, **SvelteKit** will request `/_app/manifest.webmanifest`, when `webmanifest` added to the output bundle, **SvelteKit** will copy it to the `/_app/` folder.
   *
   * **WARNING**: this option will only be used when using `generateSW` strategy.
   *
   * @default `${vite.base}${pwaOptions.manifestFilename}`
   * @deprecated This option has been deprecated from version `v0.12.4`, the plugin will use navigateFallbackAllowlist instead.
   * @see navigateFallbackAllowlist
   */
  webManifestUrl?: string
}
```

manifest.webmanifest [?](#manifest-webmanifest)
-----------------------------------------------

Since version `0.12.1` the `manifest.webmanifest` is also served on development mode: you can now check it on `dev tools`.

generateSW strategy [?](#generatesw-strategy)
---------------------------------------------

When using this strategy, the `navigateFallback` on development options will be ignored. The PWA plugin will check if `workbox.navigateFallback` is configured and will only register it on `additionalManifestEntries`.

The PWA plugin will force `type: 'classic'` on service worker registration to avoid errors on client side (not yet supported):

shell
```
Uncaught (in promise) TypeError: Failed to execute 'importScripts' on 'WorkerGlobalScope': Module scripts don't support importScripts().
```

WARNING

If your pages/routes other than the entry point are being intercepted by the service worker, use `navigateFallbackAllowlist` to include only the entry point: by default, the plugin will use `[/^\/$/]`.

You **ONLY** need to add the `navigateFallbackAllowlist` option to the `devOptions` entry in `vite-plugin-pwa` configuration if your pages/routes are being intercepting by the service worker and preventing to work as expected:

ts
```
export default defineConfig({
  plugins: [
    VitePWA({
      /* other options */
      devOptions: {
        navigateFallbackAllowlist: [/^index.html$/]
        /* other options */
      }
    })
  ]
})
```

injectManifest strategy [?](#injectmanifest-strategy)
-----------------------------------------------------

You can use `type: 'module'` when registering the service worker (right now only supported on latest versions of `Chromium` based browsers: `Chromium/Chrome/Edge`):

ts
```
devOptions: {
  enabled: true,
  type: 'module',
  /* other options */  
}
```

WARNING

When building the application, the `vite-plugin-pwa` plugin will always register your service worker with `type: 'classic'` for compatibility with all browsers.

TIP

You should only intercept the entry point of your application, if you don't include the `allowlist` option in the `NavigationRoute`, all your pages/routes might not work as they are being intercepted by the service worker (which will return by default the content of the entry point by not including your pages/routes in its precache manifest):

ts
```
let allowlist: undefined | RegExp[]
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist }
))
```

When using this strategy, the `vite-plugin-pwa` plugin will delegate the service worker compilation to `Vite`, so if you're using `import` statements instead `importScripts` in your custom service worker, you **must** configure `type: 'module'` on development options.

If you are using `registerRoute` in your custom service worker you should add `navigateFallback` on development options, the `vite-plugin-pwa` plugin will include it in the injection point (`self.__WB_MANIFEST`).

You **must** not use `HMR (Hot Module Replacement)` in your custom service worker, since we cannot use yet dynamic imports in service workers: `import.meta.hot`.

If you register your custom service worker (not using `vite-plugin-pwa` virtual module and configuring `injectRegister: false` or `injectRegister: null`), use the following code (remember also to add `scope` option if necessary):

js
```
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw'
  )
}
```

If you are also using `import` statements instead `importScripts`, use the following code (remember also to add the `scope` option if necessary):

ts
```
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw',
    { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
  )
}
```

When you change your service worker source code, `Vite` will force a full reload, since we're using `workbox-window` to register it (by default, you can register it manually) you may have some problems with the service worker events.

WARNING

**This only applies when importing any of the virtual modules or using `workbox-window` module**.

Since `workbox-window` uses a time-based `heuristic` algorithm to handle service worker updates, if you build your service worker and register it again, if the time between last registration and the new one is less than 1 minute, then, `workbox-window` will handle the `service worker update found` event as an external event, and so the behavior could be strange (for example, if using `prompt`, instead showing the dialog for new content available, the ready to work offline dialog will be shown; if using `autoUpdate`, the ready to work offline dialog will be shown and shouldn't be shown).

Example [?](#example)
---------------------

You can find an example here: [vue-router](https://github.com/antfu/vite-plugin-pwa/tree/main/examples/vue-router).

To run the example, you must build the PWA plugin (`pnpm run build` from root folder), change to `vue-router` directory (`cd examples/vue-router`) and run it:

*   `generateSW` strategy: `pnpm run dev`
*   `injectManifest` strategy: `pnpm run dev-claims`

Since version `0.12.1`, you also have the development scripts for all other frameworks as well.

The instructions for running the `dev` or `dev-claims` scripts are the same as for `vue-router` but running them in the corresponding framework directory.