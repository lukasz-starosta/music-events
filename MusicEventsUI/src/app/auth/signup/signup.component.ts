import {Component, OnInit} from '@angular/core';
import {ISignUp} from "../../types/ISignUp";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  form: ISignUp = {email: '', password: '', firstName: '', lastName: ''};
  signupInfo: ISignUp;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
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

    this.authService.signUp(this.signupInfo).subscribe(
      (data: any) => {
        this.openSnackBar(data.message)
      }
    );
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, null, {horizontalPosition: 'end', duration: 5000})
  }
}
