import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private cookieValue: string;
  constructor(private cookieService: CookieService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Homepage");
    if(this.cookieService.get('user') != ""){
      let user = "Logado como " + this.cookieService.get('user');
      this.titleService.setTitle(user);
      console.log(this.cookieService.get('user'));
      let texto = "Bem vindo de volta " + this.cookieService.get('user');
      //alert(texto);
    }
  }

}
