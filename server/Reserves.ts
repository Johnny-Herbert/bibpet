import { Reserve } from "../common/Reserve";
import { Book } from "../common/Book";
import { User } from "../common/User";

export class Reserves {
    reserves: Array<Reserve>;

    constructor(){
        this.reserves = new Array<Reserve>();
    }
    create(reserve: Reserve): Reserve {
        this.reserves.push(reserve)
        return reserve
    }
    read(): Array<Reserve> {
        return this.reserves;
    }
    update(reserve: Reserve): Reserve {
        return new Reserve(new User("", "", ""), new Book(1,"","","","",""), new Date(), new Date(), false);
    }
    delete(id: number): Reserve {
        return new Reserve(new User("", "", ""), new Book(1,"","","","",""), new Date(), new Date(), false);
    }
    log(id: number,startDate: Date,endDate: Date): Array<Reserve> {
        return this.reserves.filter(reserve => (reserve.startDate.getTime() >= startDate.getTime() &&
        reserve.endDate.getTime() <= endDate.getTime()))
    }
    logByDate(startDate: Date,endDate: Date): Array<Reserve> {
        return this.reserves.filter( reserve => (reserve.startDate.getTime() >= startDate.getTime() &&
                    reserve.endDate.getTime() <= endDate.getTime()))
    }
    logByEmail(email: String): Array<Reserve> {
        return this.reserves.filter(reserve => reserve.user.email === email)
    }
    logByBook(id: number): Array<Reserve> {
        return this.reserves.filter(reserve => this.reserves.filter( reserve => reserve.book.id === id))
    }
    checkAvailability(id: number,startDate: Date,endDate: Date): Array<Reserve> {
        return new Array<Reserve>();
    }
}