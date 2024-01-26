// worker.ts
export const add = (a: number, b: number) => a + b

// main.ts

// Create Worker
const instance = new ComlinkWorker<typeof import('./worker')>(new URL('./worker', import.meta.url), {/* normal Worker options*/ })
const result = await instance.add(2, 3)

result === 5


// Create SharedWorker
const instance = new ComlinkSharedWorker<typeof import('./worker')>(new URL('./worker', import.meta.url), {/* normal Worker options*/ })
const result = await instance.add(2, 3)

result === 5/// <reference types="vite-plugin-comlink/client" />