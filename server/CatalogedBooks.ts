import {CatalogedBook} from '../common/CatalogedBook';

export class CatalogedBooks{
    CatalogedBookList: Array<CatalogedBook>;
    create(catalogedBook: CatalogedBook){};
    read(id:number){};
    update(catalogedBook: CatalogedBook){};
    delete(id:number){};
}