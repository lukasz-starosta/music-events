import {Component, OnInit} from '@angular/core';
import {TicketsMock} from "../mocks/TicketsMock";
import {ActivatedRoute} from "@angular/router";
import {ITicket} from "../types/ITicket";
import {MatDialog} from "@angular/material/dialog";
import {PaymentDialogComponent} from "../payment-dialog/payment-dialog.component";

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

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
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
    this.dialog.open(PaymentDialogComponent, {data: {selectedTickets: this.selectedTickets}});
  }
}
