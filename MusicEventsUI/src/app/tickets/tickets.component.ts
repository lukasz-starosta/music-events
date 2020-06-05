import { Component, OnInit } from '@angular/core';
import {ITicket} from "../types/ITicket";
import {UserService} from "../services/user.service";
import {TicketsService} from "../services/tickets.service";
import {IUser} from "../types/IUser";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  dataSource: ITicket[] = [];

  displayedColumns = ['event.name', 'event.date', 'row', 'col', 'price'];

  constructor(private userService: UserService, private ticketsService: TicketsService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: IUser) => {
      this.ticketsService.getTicketsForUser(user.id.toString()).subscribe(tickets => {
        this.dataSource = tickets || [];
      })
    })
  }

}
