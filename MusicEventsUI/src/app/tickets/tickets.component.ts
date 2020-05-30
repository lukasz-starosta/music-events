import { Component, OnInit } from '@angular/core';
import {ITicket} from "../types/ITicket";
import {TicketsMock} from "../mocks/TicketsMock";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  // TODO: should be a ticket-event connection
  dataSource: ITicket[] = TicketsMock;

  // TODO: should include proper ticket-event fields
  displayedColumns = ['eventId', 'row', 'column'];

  constructor() { }

  ngOnInit(): void {
  }

}
