import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private cookieValue: string;
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    if(! (this.cookieService.get('user') == 'admin') ){
      alert("Acesso não autorizado! Faça o login e tente novamente!");
      window.location.href = "http://localhost:4200"
    }
  }

}
