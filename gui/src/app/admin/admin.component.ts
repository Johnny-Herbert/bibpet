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

  ngOnInit(): void {
    this.titleService.setTitle("System Management");
    if(! (this.cookieService.get('user') == 'admin') ){
      alert("Acesso não autorizado! Faça o login e tente novamente!");
      window.location.href = "http://localhost:4200"
    }
  }

}
