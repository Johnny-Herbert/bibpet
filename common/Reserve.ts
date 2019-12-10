import { Book } from "../common/Book";
import { User } from "../common/User";

export class Reserve {
    user: User;
    book: Book;
    startDate: String;
    endDate: String;
    active: Boolean;

    Reserve(user: User, book: Book, startDate: String, endDate: String, active: Boolean ){
        this.user = user;
        this.book = book;
        this.startDate = startDate;
        this.endDate = endDate;
        this.active = active;
    }
    extend_reserve(date: String){
        this.endDate = date;
    }
    disable_reserve(){
        this.active = false;
    };
}