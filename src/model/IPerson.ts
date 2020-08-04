import {v4 as uuidv4} from 'uuid';

export interface IPerson {
    name: string;
    id: string;

    firstLetter(): string;
}

export class Person implements IPerson {
    id: string;
    name: string;

    constructor(their_name: string) {
        this.id = uuidv4();
        this.name = their_name;
    }

    public firstLetter(): string {
        if(this.name && this.name.length > 0) {
            return this.name[0].toUpperCase();
        }
        return "";
    }

}
