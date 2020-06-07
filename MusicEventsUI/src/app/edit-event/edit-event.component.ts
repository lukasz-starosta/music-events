import {Component, Inject, OnInit} from '@angular/core';
import {IEvent} from "../types/IEvent";
import {apiUrl} from "../constants";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventsService} from "../services/events.service";
import today from "../utils/today";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  form: IEvent = {
    id: 0,
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

  constructor(private http: HttpClient, private eventService: EventsService, private snackBar: MatSnackBar, private router: Router, public dialogRef: MatDialogRef<EditEventComponent>, @Inject(MAT_DIALOG_DATA) public data: { eventId: string, callback: () => void }) {
  }

  ngOnInit(): void {
    this.eventService.getEvent(this.data.eventId).subscribe(event => this.form = event);
  }

  onSubmit(): void {
    this.http.patch<IEvent>(`${apiUrl}/events`, this.form).subscribe((event: IEvent) => {
      this.snackBar.open(`Edited an event! 🎶`, null, {
        horizontalPosition: 'right',
        duration: 3000
      });
      this.data.callback();
    });
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
