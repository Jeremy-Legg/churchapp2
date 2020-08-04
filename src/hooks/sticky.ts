import {Dispatch, SetStateAction, useEffect, useState} from 'react';

// function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

function useStickyState<S>(key: string, defaultValue: S): [S, Dispatch<SetStateAction<S>>] {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export {
    useStickyState
}
