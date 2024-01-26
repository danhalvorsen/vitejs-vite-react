import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'


 
export default defineConfig({
    plugins: [
        VitePWA({
            /*If you need your custom service worker works with Auto Update behavior, you need to change 
            the plugin configuration options and add some custom code to your service worker code.*/
            registerType: 'autoUpdate',
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'teamview-sw.js'
        })
    ]
})