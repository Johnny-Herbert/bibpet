import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgElement, WithProperties } from '@angular/elements'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private cookieValue: string;
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    if(this.cookieService.get('user') != null){
      console.log(this.cookieService.get('user'));
      let texto = "Bem vindo de volta " + this.cookieService.get('user');
      alert(texto);
      this.titleHome = texto;
    }
  }

  isLogged(){
  }

}
