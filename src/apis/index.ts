export const testApi1 = () => {
    return new Promise((rel) => {
        setTimeout(() => {
            rel(1);
        }, 1000);
    });
};
