import { Component, OnInit } from '@angular/core';
import {ILogin} from "../../types/ILogin";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: ILogin = {email: '', password: ''};
  roles: string[] = [];
  private loginInfo: ILogin;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

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

        this.roles = this.tokenStorage.getAuthorities();

        this.router.navigateByUrl('/app').catch(e => console.error(e));
      }
    );
  }
}
