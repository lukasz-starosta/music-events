import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {apiUrl} from "../constants";
import {ITicket} from "../types/ITicket";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  constructor(private http: HttpClient) { }

  getTicketsForEvent(eventId: string): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(`${apiUrl}/tickets?eventId=${eventId}`);
  }

  getTicketsForUser(userId: string): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(`${apiUrl}/tickets?userId=${userId}`);
  }

  getUpcomingTicketsForUser(userId: string): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(`${apiUrl}/tickets/upcoming?userId=${userId}`);
  }
}
