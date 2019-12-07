import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private cookieValue: string;
  constructor(private cookieService: CookieService, private titleService: Title) { }

  sair(){
    this.cookieService.deleteAll('/', '');
    this.cookieService.deleteAll('/admin', '');
    this.cookieService.deleteAll('/login', '');
    window.open('http://localhost:4200', '_self');
    console.log('Saindo!');
  }

  ngOnInit(): void {
    this.titleService.setTitle("System Management");
    if(! (this.cookieService.get('user') == 'admin') ){
      console.log("Acesso não autorizado! Faça o login e tente novamente!");
      window.location.href = "http://localhost:4200"
    }
  }

}
