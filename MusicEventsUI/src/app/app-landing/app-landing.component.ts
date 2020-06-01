import {Component, OnInit} from '@angular/core';
import {ITicket} from "../types/ITicket";
import {TicketsMock} from "../mocks/TicketsMock";
import {UserService} from "../services/user.service";
import {IUser} from "../types/IUser";

@Component({
  selector: 'app-app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.css']
})
export class AppLandingComponent implements OnInit {
  public firstName: string;
  // TODO: should be a ticket-event connection
  dataSource: ITicket[] = TicketsMock.slice(0, 5);

  // TODO: should include proper ticket-event fields
  displayedColumns = ['eventId', 'row', 'column'];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: IUser) => this.firstName = user.firstName)
  }

}
