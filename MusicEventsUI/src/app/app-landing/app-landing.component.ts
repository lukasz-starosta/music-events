import {Component, OnInit} from '@angular/core';
import {ITicket} from "../types/ITicket";
import {UserService} from "../services/user.service";
import {IUser} from "../types/IUser";
import {TicketsService} from "../services/tickets.service";

@Component({
  selector: 'app-app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.css']
})
export class AppLandingComponent implements OnInit {
  public firstName: string;
  dataSource: ITicket[] = [];

  displayedColumns = ['event.name', 'event.date', 'row', 'col', 'price'];

  constructor(private userService: UserService, private ticketsService: TicketsService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: IUser) => {
      this.firstName = user.firstName;
      this.ticketsService.getTicketsForUser(user.id.toString()).subscribe(tickets => {
        this.dataSource = tickets || [];
      })
    })
  }

}
