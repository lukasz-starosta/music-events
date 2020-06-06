import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../constants";
import {ITicket} from "../types/ITicket";

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {
  form = {
    cardNumber: '',
    expirationDate: '',
    CCV: ''
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router, public dialogRef: MatDialogRef<PaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.http.post<ITicket>(`${apiUrl}/tickets/book`, {
      cardNumber: this.form.cardNumber,
      tickets: this.data.selectedTickets
    }).subscribe()
    this.snackBar.open(`You booked ${this.data.selectedTickets.length} tickets! 🎫`, null, {
      horizontalPosition: 'right',
      duration: 3000
    });
    this.dialogRef.close();
    this.router.navigateByUrl('/app').catch(console.error)
  }
}
