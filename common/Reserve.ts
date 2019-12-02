import { Book } from "../common/Book";
import { User } from "../common/User";

export class Reserve {
    user: User;
    book: Book;
    startDate: Date;
    endDate: Date;
    active: boolean;

    constructor(user: User, book: Book, startDate: Date, endDate: Date, active: boolean ){
        this.user = user;
        this.book = book;
        this.startDate = startDate;
        this.endDate = endDate;
        this.active = active;
    }
    extend_reserve(date: Date){}
    disable_reserve(){};
}