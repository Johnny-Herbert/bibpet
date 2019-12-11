import { Component, OnInit } from '@angular/core';
import { CatalogedBook } from '../../../../common/CatalogedBook';
import { Book } from '../../../../common/Book';
import { User } from '../../../../common/User';
import { CatalogedBookService } from './book-search.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  catalogedBooks: Array<CatalogedBook> = new Array<CatalogedBook>();
  catalogedBook: CatalogedBook = new CatalogedBook(new User("", "", ""), new Book(1,"","","","",""));
  constructor(private catalogedBookServer: CatalogedBookService) { }

  search(name: string, author: string, type: string) {
    this.catalogedBookServer.search(name, author, type)
      .subscribe(
        bo => {
          if (bo) {
            this.catalogedBooks = bo;
            this.catalogedBook = new CatalogedBook(new User("", "", ""), new Book(1,"","","","",""));
          }
        },
        msg => { alert(msg.message); }
      );
  }

  ngOnInit() {
    this.catalogedBookServer.read()
             .subscribe(
               as => { this.catalogedBooks = as; },
               msg => { alert(msg.message); }
              );
  }

}
