import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../constants";
import {Observable} from "rxjs";
import {IEvent} from "../types/IEvent";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  events: IEvent[];

  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<IEvent[]> {
    return new Observable<IEvent[]>(observer => {
      if (!this.events) {
        return this.http.get<IEvent[]>(`${apiUrl}/events`).subscribe(events => {
          this.events = events;
          observer.next(this.events);
          observer.complete();
        })
      }
      observer.next(this.events);
      observer.complete();
    })
  }

  getEvent(id: string): Observable<IEvent> {
    return new Observable<IEvent>(observer => {
      this.getEvents().subscribe(events => {
        observer.next(events.find(event => event.id === parseInt(id)))
        observer.complete();
      })
    })
  }
}
