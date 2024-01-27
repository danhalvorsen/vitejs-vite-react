import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VitePWA({
            //registerType: 'autoUpdate',
            //The injectRegister plugin configuration option,
            //will control how to register the service worker in your application:
            //You can find more information about the virtual modules exposed by the plug-in in the Frameworks section.
            //injectRegister: 'auto',
            //devOptions: {
            //    enabled: true
            //},
            //strategies: 'injectManifest',
            //srcDir: 'src',
            //filename: 'injectManifest/sw.ts',

            /*
            When you configure strategies: 'generateSW' option (the default value) in your vite.config.* file, 
            the plug-in invokes work-box' generateSW method. The options passed to the workbox-build method will 
            be those provided via the workbox option of the plugin configuration.
            */

            strategies: 'injectManifest ',
            srcDir: 'src',
            filename: 'sw.ts',


            //ToDo: Step 1 - Advanced SW
            devOptions: {
                enabled: true
                /* other options */
            }
        }),
        /*
        //ToDo: Make this thing optional
        If you want to check it in Dev, add the devOptions option to the plug-in configuration
        (you will have the Web App Manifest and the generated service worker)
        */
        
        react(),
        {
            name: "markdown-loader",
            transform(code, id) {
                if (id.slice(-3) === ".md") {
                    // For .md files, get the raw content
                    return `export default ${JSON.stringify(code)};`;
                }
            }

        },
        
        //https://vite-pwa-org.netlify.app/frameworks/#type-declarations
    ]
})
