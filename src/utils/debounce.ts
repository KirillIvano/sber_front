export const debounceFn = <TParams extends [],>(
    fn: (...params: TParams) => void,
    ms: number,
) => {
    let currentTimeout: number;

    return (...params: TParams) => {
        if (typeof currentTimeout === 'number') {
            clearTimeout(currentTimeout);
        }

        currentTimeout = setTimeout(fn, ms, ...params);
    };
};
