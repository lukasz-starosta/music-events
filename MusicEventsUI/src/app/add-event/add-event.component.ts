import {Component, Inject, OnInit} from '@angular/core';
import {ITicket} from "../types/ITicket";
import {apiUrl} from "../constants";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IEvent} from "../types/IEvent";
import today from "../utils/today";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  form: Omit<IEvent, 'id'> = {
    name: '',
    city: '',
    address: '',
    musicType: '',
    date: '',
    ticketPrice: 0,

    rows: 0,
    columns: 0,

    description: '',
  };

  public today = today();

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router, public dialogRef: MatDialogRef<AddEventComponent>, @Inject(MAT_DIALOG_DATA) public data: { callback: (event: IEvent) => void }) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.http.post<IEvent>(`${apiUrl}/events`, this.form).subscribe((event: IEvent) => {
      this.snackBar.open(`Created a new event! 🎶`, null, {
        horizontalPosition: 'right',
        duration: 3000
      });
      this.data.callback(event);
    });
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
