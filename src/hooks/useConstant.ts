import {useRef, DependencyList} from 'react';

const areDepsEqual = (prevDeps: DependencyList, deps: DependencyList) =>
    prevDeps.length === deps.length &&
    !prevDeps.some((d, i) => deps[i] !== d);

export const useConstant = <T,>(getter: () => T, deps?: DependencyList) => {
    const ref = useRef<T>();
    const depsRef = useRef(deps);

    if (!ref.current || !(depsRef.current && deps) || !areDepsEqual(depsRef.current, deps)) {
        ref.current = getter();
    }

    return ref.current;
};
