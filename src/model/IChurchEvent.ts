import {IPerson} from "./IPerson";
import {v4 as uuidv4} from 'uuid';
import moment from "moment";

export interface IChurchEvents {
    events: IChurchEvent[]
}

export interface IChurchEvent {
    type: string;
    name: string;
    id: string;
    date: Date;
    complete: boolean;
    people: IPerson[];

    togglePersonInEvent: (person: IPerson) => void;
    isPersonInEvent: (person: IPerson) => boolean;
}

export class ChurchEvents implements IChurchEvents {
    events: IChurchEvent[] = [];
}

export class ChurchEvent implements IChurchEvent {
    name: string;
    type: string;
    id: string;
    people: IPerson[] = [];
    complete: boolean = false;
    date: Date = new Date();

    constructor(name: string = "", type: string = "") {
        this.id = uuidv4();
        this.name = name;
        this.type = type;
    }

    public isPersonInEvent(person: IPerson): boolean {
        return this.indexOfPerson(person) !== -1;
    }

    private indexOfPerson(person: IPerson) {
        let findIndex = this.people.findIndex(p => p.id === person.id);
        return findIndex;
    }

    public togglePersonInEvent(person: IPerson): void {
        if (this.isPersonInEvent(person)) {
            let index = this.indexOfPerson(person);
            if (index !== -1) {
                // console.log(`remove ${person.name} to event`);
                this.people.splice(index, 1)
            }
        } else {
            // console.log(`add ${person.name} to event`);
            this.people.push(person)

        }
    }

    static fromJSON(jsonDict: any) {
        let event = Object.assign(new ChurchEvent(), jsonDict);
        let datePart = jsonDict['date'];
        event.date = moment(datePart).toDate();
        // // console.log(`Have: ${datePart.constructor.name}`)
        // if (typeof datePart === "number") {
        //     try {
        //         event.date = new Date(datePart)
        //     } catch (e) {
        //         console.log(`YOU SUCK BADLY: ${e}`)
        //     }
        // } else  if (typeof datePart === "string") {
        //     try {
        //         let stupid = Date.parse(datePart);
        //         event.date = new Date(stupid)
        //     } catch (e) {
        //         console.log(`YOU SUCK: ${e}`)
        //     }
        // } else if(datePart instanceof Date) {
        //     // leave alone
        // } else {
        //     throw new Error("Unexpected data in event.date while reconstructing from store")
        // }
        return event
    }
}
