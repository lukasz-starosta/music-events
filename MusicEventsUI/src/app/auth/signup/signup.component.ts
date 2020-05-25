import { Component, OnInit } from '@angular/core';
import {ISignUp} from "../../types/ISignUp";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  form: ISignUp = {email: '', password: '', firstName: '', lastName: ''};
  signupInfo: ISignUp;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signupInfo = {
      email: this.form.email,
      password: this.form.password,
      firstName: this.form.firstName,
      lastName: this.form.lastName
    }

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
