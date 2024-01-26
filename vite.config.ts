import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'


 
export default defineConfig({
    plugins: [
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'teamview-sw.js'
        })
    ]
})