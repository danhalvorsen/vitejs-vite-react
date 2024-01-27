/*Configuration of PWA feature*/
import readme from "../README.md"
 

import { precacheAndRoute } from 'workbox-precaching'
console.log(readme);

precacheAndRoute(self.__WB_MANIFEST)