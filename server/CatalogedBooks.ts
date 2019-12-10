import {CatalogedBook} from '../common/CatalogedBook';
import { User } from '../common/User';
import { Book } from '../common/Book';

export class CatalogedBooks{
    catalogedBookList: Array<CatalogedBook>;
    
    constructor(){
        this.catalogedBookList = new Array<CatalogedBook>();
    }
    
    create(catalogedBook: CatalogedBook): CatalogedBook {
        var result = null;
        if(catalogedBook.book.name !== "" && catalogedBook.book.isbn !== "") {
            var id : number;
            if(this.catalogedBookList.length === 0) {
                id = 0;
            }
            else {
                id = this.catalogedBookList[this.catalogedBookList.length-1].book.id;
            }
            catalogedBook.book.id = id;
            result = catalogedBook;
            this.catalogedBookList.push(catalogedBook);
        }
        return result;
    };

    readOnly(id:number): CatalogedBook {
        var result = null;
        for(var i = 0; i < this.catalogedBookList.length; i++) {
            if(this.catalogedBookList[i].book.id === id) {
                result = this.catalogedBookList[i];
                break;
            }
        }
        return result;
    }

    read(): Array<CatalogedBook> {
        return this.catalogedBookList;
    };
    update(catalogedBook: CatalogedBook): CatalogedBook {
        return new CatalogedBook(new User("", "", ""), new Book(1,"","","","",""));
    };
    delete(id:number): CatalogedBook {
        return new CatalogedBook(new User("", "", ""), new Book(1,"","","","",""));
    };
    search(name:string, author:string, type:string): Array<CatalogedBook> {
        return new Array<CatalogedBook>();
    };

}