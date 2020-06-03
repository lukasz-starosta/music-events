import {Component, OnInit} from '@angular/core';
import {ISignUp} from "../types/ISignUp";
import {UserService} from "../services/user.service";
import {IUser} from "../types/IUser";
import {IPatchUser} from "../types/IPatchUser";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: IPatchUser = {email: '', password: '', firstName: '', lastName: ''};

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.saveUserData(user))
  }

  onSubmit() {
    this.userService.patchUser(this.form).subscribe(user => {
        this.saveUserData(user)
        this.snackBar.open("Saved user data 🤸‍♂️", null, {horizontalPosition: 'right'})
      }
    );
  }

  saveUserData(user
                 :
                 IUser
  ) {
    this.form.email = user.email;
    this.form.firstName = user.firstName;
    this.form.lastName = user.lastName;
  }
}
