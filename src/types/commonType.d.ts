declare module 'qs';

interface IOBJ {
    [key: string]: any
}

declare namespace global {
    const store: any;
    const getRouter: any;
}
