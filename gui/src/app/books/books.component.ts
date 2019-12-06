import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as livrosS from '../../livros.json'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  drops: any;
  _drops = livrosS;
  private cookieValue: string;

  onSelect(book){
    //console.log(book);
    let details = book.name + ' ed: ' + book.edition; 
    console.log("Cookie criado: ", details);
    this.cookieService.set('bookSelected', details);
  }

  sair(){
    this.cookieService.deleteAll('/', '');
    this.cookieService.deleteAll('/admin', '');
    this.cookieService.deleteAll('/login', '');
    window.open('http://localhost:4200', '_self');
    //console.log('Saindo!');
  }

  constructor(private cookieService: CookieService) {
    //console.log(this._drops.default[0].edition);
    var bookData = this._drops.default;
    this.drops = Object.keys(bookData).map(x => { return { name: bookData[x].name, edition: bookData[x].edition} });
  }
  
  ngOnInit() { 
  }
}
