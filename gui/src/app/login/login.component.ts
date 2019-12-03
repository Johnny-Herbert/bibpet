import { Component, OnInit, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  private cookieValue: string;
  constructor(private element: ElementRef, private cookieService: CookieService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Login BibPET");
  }

  loginUsuario(username: string, password: string){
    console.log(username, password);

    var petianos = ["accs2", "jgnvs", "som3", "jhmn", "vss2"];

    if (username == "admin" && password == "admin"){
      this.cookieService.set('user', 'admin');
      alert ("Logado como administrador");
      window.location = 'http://localhost:4200/admin';
    } else if (petianos.includes(username)){
      this.cookieService.set('user', username);
      let texto = "Logado como usuário: " + username;
      alert(texto);
      window.location = 'http://localhost:4200/';
    } else {
      alert("Login incorreto");
    }
  }

}
