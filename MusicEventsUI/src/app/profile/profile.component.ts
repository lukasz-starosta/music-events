import {Component, OnInit} from '@angular/core';
import {ISignUp} from "../types/ISignUp";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: ISignUp = {email: '', password: '', firstName: '', lastName: ''};
  signupInfo: ISignUp;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signupInfo = {
      email: this.form.email,
      password: this.form.password,
      firstName: this.form.firstName,
      lastName: this.form.lastName
    }

    console.log(this.signupInfo);
  }
}
