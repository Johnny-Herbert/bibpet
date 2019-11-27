import {CatalogedBook} from '../common/CatalogedBook';

export class CatalogedBooks{
    catalogedBookList: Array<CatalogedBook>;
    
    CatalogedBooks(){
        this.catalogedBookList = new Array<CatalogedBook>();
    }
    
    create(catalogedBook: CatalogedBook){};
    read(id:number){};
    update(catalogedBook: CatalogedBook){};
    delete(id:number){};
    search(name:string, author:String, type:string){};

}