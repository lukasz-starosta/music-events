import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ITicket} from "../types/ITicket";
import {MatDialog} from "@angular/material/dialog";
import {PaymentDialogComponent} from "../payment-dialog/payment-dialog.component";
import {IEvent} from "../types/IEvent";
import {EventsService} from "../services/events.service";
import {TicketsService} from "../services/tickets.service";

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  tickets: ITicket[] = [];
  takenTickets: ITicket[] = [];
  selectedTickets: ITicket[] = [];
  event: IEvent;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private eventsService: EventsService, private ticketsService: TicketsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventsService.getEvent(params.id).subscribe(event => {
        this.event = event;
        for (let row = 0; row < this.event.rows; row++) {
          for (let col = 0; col < this.event.columns; col++) {
            this.tickets.push({row, col, event: this.event})
          }
        }
      });

      this.ticketsService.getTicketsForEvent(params.id).subscribe(tickets => this.takenTickets = tickets || [])
    });
  }

  handleTicketClick(ticket: ITicket): void {
    if (this.isTicketTaken(ticket)) return;
    if (!this.isTicketSelected(ticket)) this.selectTicket(ticket);
    else this.unselectTicket(ticket);
  }

  isTicketTaken(ticket: ITicket): boolean {
    return !!this.takenTickets.find(takenTicket => {
      return takenTicket.row === ticket.row && takenTicket.col === ticket.col;
    });
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
