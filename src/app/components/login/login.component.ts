import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: Observable<firebase.User>;
  constructor(public authService: LoginService) { }

  ngOnInit() {
  }

  autenticar(): void {
    this.authService.signInWithGoogle();
    console.log('Autenticado: ' + this.authService.isLoggedIn());
  }
  logout(): void {
    this.authService.logOut();
  }
}
