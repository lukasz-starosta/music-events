import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private router: Router, public dialogRef: MatDialogRef<PaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm(): void {
    // TODO: send a book request here, show notification if failed / success
    this.snackBar.open(`You booked ${this.data.selectedTickets.length} tickets! 🎫`, null, {horizontalPosition: 'right', duration: 3000});
    this.dialogRef.close();
    this.router.navigateByUrl('/app').catch(console.error)
  }
}
