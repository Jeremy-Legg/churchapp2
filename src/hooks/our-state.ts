import {IPerson, Person} from "../model/IPerson";
import {useStickyState} from "./sticky";
import {Dispatch, SetStateAction} from "react";

const generator = (allOfThem: any[]) => {
    let allPeople = Array.from(allOfThem);
    // console.log(`All people to be generated: ${JSON.stringify(allPeople)}`);
    return allPeople.map(t => Object.assign(new Person(""), t));
};

export function usePeopleState(): [IPerson[], Dispatch<SetStateAction<IPerson[]>>] {
    const [people, setPeople] = useStickyState<IPerson[]>("People", [], generator);
    return [people, setPeople]
}

export function useTags(): [string[], Dispatch<SetStateAction<string[]>>] {
    const [tags, setTags] = useStickyState<string[]>("NightTags", []);
    return [tags, setTags]
}
