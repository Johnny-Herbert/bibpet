import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie-service';
import * as livrosS from './livros.json';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
  drops: any;
  _drops = livrosS;
  private cookieValue: string;

  constructor(private cookieService: CookieService, private titleService: Title) {

  }

  sair(){
    this.cookieService.deleteAll('/', '');
    this.cookieService.deleteAll('/admin', '');
    this.cookieService.deleteAll('/login', '');
    window.open('http://localhost:4200', '_self');
  }
  
  replaceChars(cookieBook){
    let name_ed = cookieBook.split(' ed: ')
    return name_ed;
  }

  ngOnInit() { 
    var bookPage = this.cookieService.get('bookSelected');
    bookPage = this.replaceChars(bookPage);

    this.titleService.setTitle(bookPage[0]);

    var bookData = this._drops.default;

    for(let f = 0; f < Object.keys(bookData).length; f++){
      if(bookData[f].name == bookPage[0] && bookData[f].edition == bookPage[1]){
        this.drops = Object.keys(bookData).map(
          x => { 
            return { 
              name: bookData[f].name, 
              edition: bookData[f].edition,
              isbn: bookData[f].isbn,
              author: bookData[f].author,
              type: bookData[f].type,
              commentsLists: bookData[f].commentsLists
            } 
          });
        while(this.drops.length > 1){
          this.drops.pop();
        }
      }
    }
  }

}
