import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Title } from "@angular/platform-browser";
import * as livrosS from './livros.json';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  drops: any;
  _drops = livrosS;
  logado: Object[];
  private cookieValue: string;

  onSelect(book){
    let details = book.name + ' ed: ' + book.edition; 
    //console.log("Cookie criado: ", details);
    this.cookieService.set('bookSelected', details);
  }

  sair(){
    this.cookieService.deleteAll('/', '');
    this.cookieService.deleteAll('/admin', '');
    this.cookieService.deleteAll('/login', '');
    window.open('http://localhost:4200', '_self');
  }

  constructor(private cookieService: CookieService, private titleService: Title) {
    this.cookieService.set('bookSelected', '');
    var bookData = this._drops.default;
    this.logado = [];
    this.logado.push(this.cookieService.get('user'));
    console.log(this.logado);
    this.drops = Object.keys(bookData).map(x => { return { name: bookData[x].name, edition: bookData[x].edition} });
  }
  
  ngOnInit() {
    this.titleService.setTitle("Books");
  }
}
