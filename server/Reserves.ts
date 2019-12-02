import { Reserve } from "../common/Reserve";
import { Book } from "../common/Book";
import { User } from "../common/User";

export class Reserves {
    reserves: Array<Reserve>;

    constructor(){
        this.reserves = new Array<Reserve>();
    }
    create(reserve: Reserve): Reserve {

        return new Reserve(new User("", "", ""), new Book(1,"","","","",""), new Date(), new Date(), false);
    }
    read(id: number): Array<Reserve> {
        return new Array<Reserve>();
    }
    update(reserve: Reserve): Reserve {
        return new Reserve(new User("", "", ""), new Book(1,"","","","",""), new Date(), new Date(), false);
    }
    delete(id: number): Reserve {
        return new Reserve(new User("", "", ""), new Book(1,"","","","",""), new Date(), new Date(), false);
    }
    log(): Array<Reserve> {
        return new Array<Reserve>();
    }
    logByDate(startDate: Date,endDate: Date): Array<Reserve> {
        return new Array<Reserve>();
    }
    logByEmail(email: String): Array<Reserve> {
        return new Array<Reserve>();
    }
    logByBook(id: number): Array<Reserve> {
        return new Array<Reserve>();
    }
    checkAvailability(id: number,startDate: Date,endDate: Date): Array<Reserve> {
        return new Array<Reserve>();
    }
}