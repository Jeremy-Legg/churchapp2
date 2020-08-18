import {v4 as uuidv4} from 'uuid';

export interface IPerson {
    name: string;
    id: string;
    regular: boolean;

    firstLetter(): string;

    toggleRegular() : void;
}

export class Person implements IPerson {
    id: string;
    name: string;
    regular: boolean = false;

    constructor(their_name: string) {
        this.id = uuidv4();
        this.name = their_name;
    }

    public firstLetter(): string {
        if(this.name && this.name.length > 0) {
            let names = this.name.split(" ");
            if(names.length > 1) {
                return names.reduce((prev, current) => {
                    return prev + current[0]
                }, "").toUpperCase()
            }
            return this.name[0].toUpperCase();
        }
        return "";
    }

    public toggleRegular() {
        this.regular = !this.regular;
    }

}
