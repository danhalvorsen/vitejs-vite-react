export type InjectManifestModel = {
    injectManifest: {
        injectionPoint: undefined | null;
    };
};

// Examples of usage:
const modelUndefined: InjectManifestModel = {
injectManifest:
    {
    injectionPoint: undefined,
    },
};

const modelNull: InjectManifestModel = {
injectManifest:
    {
    injectionPoint: null,
    },
};
