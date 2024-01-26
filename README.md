# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



#Install log 
vite-plugin-comlink
===================

> This plugins requires vite >=2.8 for WebWorkers and vite >= 2.9.6 for shared worker to work properly.

Use WebWorkers with comlink.

This plugin removes the need to call `expose`, `wrap` from comlink and also you don't need to create the worker on your own.

[](#install)Install
-------------------

npm i --save-dev vite-plugin-comlink # yarn add -D vite-plugin-comlink
npm i --save comlink # yarn add comlink

### [](#comlink-install)Comlink install

As you don't want to wait for a new release for this plugin when a new version of comlink is released, this plugin has comlink as a peer dependency so you can install the version of comlink that you need.

### [](#add-it-to-viteconfigjs)Add it to vite.config.js

// vite.config.js
import { comlink } from 'vite-plugin-comlink'

export default {
  plugins: \[
    comlink()
  \],
  worker: {
    plugins: \[
      comlink()
    \]
  }
}

### [](#plugin-order)Plugin order

Put this plugin as one of the first plugins. Only other plugins that create `ComlinkWorker` or `ComlinkSharedWorker` or transform files based on the existence of `ComlinkWorker` or `ComlinkSharedWorker` should come before this plugin!

[](#usage)Usage
---------------

// worker.js
export const add = (a: number, b: number) => a + b

// main.ts

// Create Worker
const instance = new ComlinkWorker(new URL('./worker.js', import.meta.url), {/\* normal Worker options\*/})
const result = await instance.add(2, 3)

result === 5


// Create SharedWorker
const instance = new ComlinkSharedWorker(new URL('./worker.js', import.meta.url), {/\* normal Worker options\*/})
const result = await instance.add(2, 3)

result === 5

### [](#with-typescript)With TypeScript

Add

/// <reference types="vite-plugin-comlink/client" />

to your vite-env.d.ts file to make sure typescript will use `vite-plugin-comlink/client`.

// worker.ts
export const add = (a: number, b: number) => a + b

// main.ts

// Create Worker
const instance = new ComlinkWorker<typeof import('./worker')>(new URL('./worker', import.meta.url), {/\* normal Worker options\*/})
const result = await instance.add(2, 3)

result === 5


// Create SharedWorker
const instance = new ComlinkSharedWorker<typeof import('./worker')>(new URL('./worker', import.meta.url), {/\* normal Worker options\*/})
const result = await instance.add(2, 3)

result === 5