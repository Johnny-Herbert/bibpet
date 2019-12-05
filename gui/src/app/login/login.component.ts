import { Component, OnInit, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private cookieValue: string;
  constructor(private element: ElementRef, private cookieService: CookieService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Login BibPET");
  }

  loginUsuario(username: string, password: string){

    var petianos = ["accs2", "jgnvs", "som3", "jhmn", "vss2"];

    if (username == "admin" && password == "admin"){
      this.cookieService.set('user', 'admin');
      alert ("Logado como administrador");
      window.open('http://localhost:4200/admin/', '_self');
    } else if (petianos.includes(username)){
      this.cookieService.set('user', username);
      let texto = "Logado como usuário: " + username;
      alert(texto);
      window.open('http://localhost:4200/books/', '_self');
    } else {
      alert("Login incorreto");
    }
  }

}
