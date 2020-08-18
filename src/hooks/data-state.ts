import {IPerson, Person} from "../model/IPerson";
import {useStickyState} from "./sticky";
import {Dispatch, SetStateAction} from "react";
import {ChurchEvent, IChurchEvent} from "../model/IChurchEvent";

const peopleObjectFactory = (allOfThem: any[]) => {
    let allPeople = Array.from(allOfThem);
    console.log(`All people to be generated: ${JSON.stringify(allPeople)}`);
    return allPeople.map(t => Object.assign(new Person(""), t));
};

const eventObjectFactory = (allOfThem: any[]) => {
    let allEvents = Array.from(allOfThem);
    return allEvents.map(t => Object.assign(new ChurchEvent(), t));
};

export function usePeopleState(): [IPerson[], Dispatch<SetStateAction<IPerson[]>>] {
    const [people, setPeople] = useStickyState<IPerson[]>("People", [], peopleObjectFactory);
    return [people, setPeople];
}

export function useTags(): [string[], Dispatch<SetStateAction<string[]>>] {
    const [tags, setTags] = useStickyState<string[]>("EventTags", []);
    return [tags, setTags];
}

export function useEventsState(): [IChurchEvent[], Dispatch<SetStateAction<IChurchEvent[]>>]{
    const [events, setEvents] = useStickyState<IChurchEvent[]>("Events", [], eventObjectFactory)
    return [events, setEvents];
}

export function useIncompleteEventState(): [ChurchEvent, Dispatch<SetStateAction<ChurchEvent>>]{
    const [incompleteEvent, setIncompleteEvent] = useStickyState<ChurchEvent>("IncompleteEvent", new ChurchEvent())
    return [incompleteEvent, setIncompleteEvent];
}

export const findFirstIncompleteEvent = (events:IChurchEvent[]) : IChurchEvent | null => {
    let incompleteEvents = events.filter(e => !e.complete);
    if (incompleteEvents.length === 0) {
        return null;
    }
    return incompleteEvents[0]
};
