import {Component, OnInit} from '@angular/core';
import {Authority} from "../types/Authority";
import {AuthService} from "../services/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {IEvent} from "../types/IEvent";
import {EventsMock} from "../mocks/EventsMock";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'city', 'date', 'actions'];
  dataSource = EventsMock;
  authority: Authority;
  expandedElement: IEvent | null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authority = this.authService.getAuthority();
  }

}
