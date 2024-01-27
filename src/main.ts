// src/main.js or src/main.ts
// can be any js/ts/jsx/tsx module or single file component


//This declaration tells TypeScript that any SVG file should be treated as a module with the default export being the content of the SVG file.
//After creating the type declaration file, TypeScript should be able to find the module and its corresponding type declarations.


import logo from './assets/react.svg';

const logoImg = document.getElementById('logo-img') as HTMLImageElement;
if (logoImg) {
    logoImg.src = logo;
}


type Model = { Foo: number };
type PwaConfigActions = [(model: Model) => void, (model: Model) => void];

export interface PwaConfigInterface {
    Foo: number, 
    Bla: number;

}

export function pwaConfigCollection():PwaConfigActions {
    const action1 = (model: Model): void => {
        console.log(model.Foo
        )
    };

    const action2 = (model: Model): void => {
        console.log(model.Foo
        )
    };

    return [action1, action2];
}


