import { Book } from "./Book";
import { User } from "../common/User";

export class CatalogedBook {
    user: User;
    book: Book;

    constructor(user: User,book: Book) {
        this.user = user;
        this.book = book;
    }
}