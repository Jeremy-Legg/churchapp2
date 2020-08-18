import {Dispatch, SetStateAction, useEffect, useState} from 'react';

function useStickyState<S>(key: string, defaultValue: S, generator?: (state: any) => S): [S, Dispatch<SetStateAction<S>>] {
    let [counter, setCounter] = useState(0);
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);

        if (stickyValue === null) return defaultValue;

        let stateAsDict = JSON.parse(stickyValue);
        if (generator !== undefined) {
            return generator(stateAsDict);
        }
        return stateAsDict;
    });

    useEffect(() => {
        // console.log(`${key} modified. Saving: ${JSON.stringify(value)}`);
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value, counter]);

    function kickSave(newValue: any) {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
        setCounter(c => c + 1);
    }

    return [value, kickSave];
}

export {
    useStickyState
}
