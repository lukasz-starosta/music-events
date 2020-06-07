import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ErrorSnackbarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public showErrorSnackbar(message: string) {
    this.snackBar.open(message, null, {horizontalPosition: 'end', duration: 3000});
  }
}
