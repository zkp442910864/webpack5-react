declare module 'qs';

interface IOBJ {
    [key: string]: any
}

declare namespace global {
    let store: any;
    let getRouter: any;
}
