import VitePWA from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

interface DevOptions {
  enabled?: boolean;
  type?: 'module';
  disableRuntimeConfig?: boolean;
  navigateFallback?: string;
  navigateFallbackAllowlist?: RegExp[];
  webManifestUrl?: string;
}

// Define the InjectManifestModel interface
interface InjectManifestModel {
  injectManifest: {
    injectionPoint: undefined | 'defined';
  };
}

// Update the Vite configuration
export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'manual', // Change injectRegister to 'manual'
      devOptions: {
        enabled: true,
        // Other devOptions properties can be modified as needed
      } as DevOptions, // Use the DevOptions type
    } as InjectManifestModel), // Use the InjectManifestModel type
  ],
});