import {CatalogedBook} from '../common/CatalogedBook';
import { User } from '../common/User';
import { Book } from '../common/Book';

export class CatalogedBooks{
    catalogedBookList: Array<CatalogedBook>;
    
    constructor(){
        this.catalogedBookList = new Array<CatalogedBook>();
    }
    
    create(catalogedBook: CatalogedBook): CatalogedBook {
        return new CatalogedBook(new User("", "", ""), new Book(1,"","","","",""));
    };
    read(id:number): Array<CatalogedBook> {
        return new Array<CatalogedBook>();
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