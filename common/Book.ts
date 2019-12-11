import { Comments } from "../server/Comments";

export class Book {
    id: number;
    name: string;
    isbn: string;
    author: string;
    edition: string;
    type: string;
    commentsLists: Comments;

    constructor(id: number, name: string, isbn: string,author: string, edition: string, type: string ) {
        this.id  = id;
        this.name = name;
        this.isbn = isbn;
        this.author = author;
        this.edition = edition;
        this.type = type;
        this.commentsLists = new Comments();
    }
}