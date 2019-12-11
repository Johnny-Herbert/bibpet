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

  search(book: CatalogedBook) {
    this.catalogedBookServer.search(book.book.name, book.book.author, book.book.type)
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
