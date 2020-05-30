import {Component, OnInit} from '@angular/core';
import {TicketsMock} from "../mocks/TicketsMock";
import {ActivatedRoute, Router} from "@angular/router";
import {ITicket} from "../types/ITicket";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  tickets: ITicket[] = TicketsMock;
  selectedTickets: ITicket[] = [];
  colsCount: number;
  eventId: string;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {
    this.colsCount = Math.max(...this.tickets.map(t => t.column));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.eventId = params.id);
  }

  handleTicketClick(ticket: ITicket): void {
    if (ticket.isTaken) return;
    if (!this.isTicketSelected(ticket)) this.selectTicket(ticket);
    else this.unselectTicket(ticket);
  }

  isTicketSelected(ticket: ITicket): boolean {
    return this.selectedTickets.includes(ticket);
  }

  selectTicket(ticket: ITicket): void {
    this.selectedTickets.push(ticket);
  }

  unselectTicket(ticket: ITicket): void {
    this.selectedTickets.splice(this.selectedTickets.indexOf(ticket), 1);
  }

  book(): void {
    // TODO: send a book request here, show notification if failed / success
    this.snackBar.open(`You booked ${this.selectedTickets.length} tickets! 🎫`, null, {horizontalPosition: 'right', duration: 3000});
    this.router.navigateByUrl('/app').catch(console.error)
  }
}
