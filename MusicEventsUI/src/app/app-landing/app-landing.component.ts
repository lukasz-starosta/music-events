import {Component, OnInit} from '@angular/core';
import {ITicket} from "../types/ITicket";
import {TicketsMock} from "../mocks/TicketsMock";

@Component({
  selector: 'app-app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.css']
})
export class AppLandingComponent implements OnInit {

  // TODO: should be a ticket-event connection
  dataSource: ITicket[] = TicketsMock.slice(0, 5);

  // TODO: should include proper ticket-event fields
  displayedColumns = ['eventId', 'row', 'column'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
