import { Book } from "../common/Book";
import { User } from "../common/User";

export class Reserve {
    user: User;
    book: Book;
    startDate: Date;
    endDate: Date;
    active: Boolean;

    Reserve(user: User, book: Book, startDate: Date, endDate: Date, active: Boolean ){
        this.user = user;
        this.book = book;
        this.startDate = startDate;
        this.endDate = endDate;
        this.active = active;
    }
    extend_reserve(date: Date){
        this.endDate = date;
    }
    disable_reserve(){
        this.active = false;
    };
    equals(reserve: Reserve): boolean{
        if(this.book.id === reserve.book.id && this.startDate === reserve.startDate &&
            this.endDate === reserve.endDate && this.user.email === this.user.email){
            return true;
        }else{
            return false;
        }
    }
}