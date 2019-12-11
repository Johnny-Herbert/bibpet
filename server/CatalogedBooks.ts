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
                id = this.catalogedBookList[this.catalogedBookList.length-1].book.id + 1;
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
        var result = null;
        for(var i = 0; i < this.catalogedBookList.length; i++) {
            if(this.catalogedBookList[i].book.id === catalogedBook.book.id) {
                this.catalogedBookList[i] = catalogedBook;
                result = catalogedBook;
                break;
            }
        }

        return result;
    };
    delete(id:number): CatalogedBook {
        var result = null;
        for(var i = 0; i < this.catalogedBookList.length; i++) {
            if(this.catalogedBookList[i].book.id === id) {
                result = this.catalogedBookList[i];
                this.catalogedBookList.splice(i, 1);
            }
        }
        return result;
    };
    search(name:string, author:string, type:string): Array<CatalogedBook> {
        var list: Array<CatalogedBook> = new Array<CatalogedBook>();
        if(name === "" && author === "" && type === "") {
            list = this.catalogedBookList;
        }
        else {
            for(var i = 0; i < this.catalogedBookList.length; i++) {
                if(this.fieldsValidate(this.catalogedBookList[i], name, author, type)) {
                    list.push(this.catalogedBookList[i]);
                }
                else if(this.fieldsValidate(this.catalogedBookList[i], name, author, "")) {
                    list.push(this.catalogedBookList[i]);
                }
                else if(this.fieldsValidate(this.catalogedBookList[i], name, "", type)) {
                    list.push(this.catalogedBookList[i]);
                }
                else if(this.fieldsValidate(this.catalogedBookList[i], "", author, type)) {
                    list.push(this.catalogedBookList[i]);
                }
                else if(this.fieldsValidate(this.catalogedBookList[i], name, "", "")) {
                    list.push(this.catalogedBookList[i]);
                }
                else if(this.fieldsValidate(this.catalogedBookList[i], "", author, "")) {
                    list.push(this.catalogedBookList[i]);
                }
                else if(this.fieldsValidate(this.catalogedBookList[i], "", "", type)) {
                    list.push(this.catalogedBookList[i]);
                }
            }
        }
        return list;
    };
    fieldsValidate(catalogedBook: CatalogedBook, name: string, author: string, type: string): boolean {
        if(catalogedBook.book.name === name && catalogedBook.book.author === author && catalogedBook.book.type === type) {
            return true;
        }
        else {
            return false;
        }
    }
}