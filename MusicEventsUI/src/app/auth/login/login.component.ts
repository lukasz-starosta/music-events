import { Component, OnInit } from '@angular/core';
import {ILogin} from "../../services/ILogin";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: ILogin = {email: '', password: ''};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: ILogin;

  constructor(private  authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginInfo = {
      email: this.form.email,
      password: this.form.password
    }

    this.authService.login(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
