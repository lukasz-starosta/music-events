import {Component, OnInit} from '@angular/core';
import {Authority} from "../types/Authority";
import {AuthService} from "../services/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {IEvent} from "../types/IEvent";

const ELEMENT_DATA: IEvent[] = [
  {
    title: 'Rock event',
    city: 'Lodz',
    date: '21.06.2020',
    description: `Rock with us`
  }, {
    title: 'Music today',
    city: 'Lodz',
    date: '21.06.2020',
    description: `Best music with the local radio`
  }, {
    title: 'Musical',
    city: 'Lodz',
    date: '21.06.2020',
    description: `All kinds of music`
  }, {
    title: 'Classical',
    city: 'Lodz',
    date: '21.06.2020',
    description: `Classical music in the local theatre`
  }, {
    title: 'EDM',
    city: 'Lodz',
    date: '21.06.2020',
    description: `Dance to EDM`
  }, {
    title: 'Jazz',
    city: 'Lodz',
    date: '21.06.2020',
    description: `Jazz in the best pub`
  }, {
    title: 'Jam session',
    city: 'Lodz',
    date: '21.06.2020',
    description: `Jam session in biblioteka`
  }, {
    title: 'Blues',
    city: 'Lodz',
    date: '21.06.2020',
    description: `Listen to blues today`
  },
];

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
  dataSource = ELEMENT_DATA;
  authority: Authority;
  expandedElement: IEvent | null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authority = this.authService.getAuthority();
  }

}
