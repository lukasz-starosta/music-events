import {Component, OnInit} from '@angular/core';
import {ITicket} from "../types/ITicket";
import {UserService} from "../services/user.service";
import {IUser} from "../types/IUser";
import {TicketsService} from "../services/tickets.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.css']
})
export class AppLandingComponent implements OnInit {
  public firstName: string;
  dataSource: ITicket[] = [];
  loading = true;
  authority: string;

  displayedColumns = ['event.name', 'event.date', 'row', 'col', 'price'];

  constructor(private userService: UserService, private ticketsService: TicketsService, private authService: AuthService) {
    this.authority = authService.getAuthority();
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: IUser) => {
      this.firstName = user.firstName;
      this.ticketsService.getUpcomingTicketsForUser(user.id.toString()).subscribe(tickets => {
        this.dataSource = tickets || [];
        this.loading = false;
      })
    })
  }

}
