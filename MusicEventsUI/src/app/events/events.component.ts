import {Component, OnInit, ViewChild} from '@angular/core';
import {Authority} from "../types/Authority";
import {AuthService} from "../services/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {IEvent} from "../types/IEvent";
import {EventsService} from "../services/events.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEventComponent} from "../add-event/add-event.component";
import {MatTable} from "@angular/material/table";
import {EditEventComponent} from "../edit-event/edit-event.component";
import {MatSort} from "@angular/material/sort";

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
  displayedColumns: string[] = ['name', 'city', 'address', 'date', 'musicType', 'ticketPrice', 'actions'];
  dataSource: IEvent[] = [];
  events: IEvent[] = [];
  authority: Authority;
  expandedElement: IEvent | null;
  loading = true;
  @ViewChild(MatTable) table: MatTable<IEvent>;
  sortByDateDesc: boolean = false;
  sortByPriceDesc: boolean = false;

  constructor(private authService: AuthService, private eventsService: EventsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.authority = this.authService.getAuthority();
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.loading = true;
    this.eventsService.getEvents().subscribe(events => {
      this.dataSource = events || [];
      this.events = events || [];
      this.loading = false;
    });
  }

  sortByDate(): void {
    this.dataSource = this.events.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (this.sortByDateDesc) {
        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
      }
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    });
    this.table.renderRows();

    this.sortByDateDesc = !this.sortByDateDesc;
  }

  sortByPrice(): void {
    this.dataSource = this.events.sort((a, b) => {
      if (this.sortByPriceDesc) {
        return a.ticketPrice > b.ticketPrice ? -1 : a.ticketPrice < b.ticketPrice ? 1 : 0;
      }
      return a.ticketPrice > b.ticketPrice ? 1 : a.ticketPrice < b.ticketPrice ? -1 : 0;
    });
    this.table.renderRows();

    this.sortByPriceDesc = !this.sortByPriceDesc;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === '') return;

    this.dataSource = this.events.filter(event => {
      const searchString = event.name + ' ' + event.city + ' ' + event.musicType + ' ' + event.address
        + ' ' + event.description;
      return searchString.toLowerCase().includes(filterValue.trim().toLowerCase());
    });
    this.table.renderRows();
  }

  pushEvent(event: IEvent): void {
    this.dataSource.unshift(event);
    this.table.renderRows();
  }

  public isEventUpcoming(event: IEvent): boolean {
    return new Date(event.date) >= new Date();
  }

  handleAddEvent() {
    this.dialog.open(AddEventComponent, {data: {callback: this.pushEvent.bind(this)}});
  }

  handleEditEvent(event: IEvent) {
    this.dialog.open(EditEventComponent, {
      data: {
        eventId: event.id, callback: () => {
          this.fetchEvents();
          this.table.renderRows();
        }
      }
    })
  }
}
