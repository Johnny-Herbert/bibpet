import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  var bookDetails = JSON.parse('../../livros.json');

  var output = String[];

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    let thisBookName = this.cookieService.get('bookSelected');
    for(let f = 0; f < bookDetails.length; f++){
      var title = bookDetails[f].name;
      if(title == thisBookName){
        output = bookDetails[f];
      }
    }
  }

}
