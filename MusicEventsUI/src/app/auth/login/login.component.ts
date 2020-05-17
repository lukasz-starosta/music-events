import { Component, OnInit } from '@angular/core';
import {ILogin} from "../../services/ILogin";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: ILogin = {email: '', password: ''};
  private loginInfo: ILogin;

  constructor(private  authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = {
      email: this.form.email,
      password: this.form.password
    }

    this.authService.login(this.loginInfo).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }
}
