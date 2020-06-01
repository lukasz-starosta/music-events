import {Component, OnInit} from '@angular/core';
import {ISignUp} from "../types/ISignUp";
import {UserService} from "../services/user.service";
import {IUser} from "../types/IUser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: ISignUp = {email: '', password: '', firstName: '', lastName: ''};
  signupInfo: ISignUp;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.form.email = user.email;
      this.form.firstName = user.firstName;
      this.form.lastName = user.lastName;
    })
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
