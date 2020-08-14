import {Dispatch, SetStateAction, useState} from "react";

/*
Same as useState, but forces an update when setter is called.
To get around issue where react by default doesn't trigger a re-render
if the object reference is the same (which is true if using an object instance as state)
 */
export function useInstanceState<S>(initialState: S): [S, Dispatch<SetStateAction<S>>] {
    let [obj, setObj] = useState(initialState);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let [ignored, setCounter] = useState(0);

    function setObjectState(s: SetStateAction<S>): void {
        setObj(s);
        setCounter(c => c + 1);
    }

    return [obj, setObjectState]
}

