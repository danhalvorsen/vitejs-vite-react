injectManifest strategy
You can use type: 'module' when registering the service worker (right now only supported on latest versions of Chromium based browsers: Chromium/Chrome/Edge):


``` ts
devOptions: {
  enabled: true,
  type: 'module',
  /* other options */  
}
```
WARNING

When building the application, the vite-plugin-pwa plugin will always register your service worker with type: 'classic' for compatibility with all browsers.

TIP