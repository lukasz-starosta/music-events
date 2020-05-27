import { Component, OnInit } from '@angular/core';
import {TicketsMock} from "../mocks/TicketsMock";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  tickets = TicketsMock;
  eventId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => this.eventId = params.id );
  }

  seats() {
    /**
     * display the seats by ticket's row and column
     */
  }
}
