


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