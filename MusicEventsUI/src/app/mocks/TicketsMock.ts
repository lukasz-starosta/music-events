import {ITicket} from "../types/ITicket";

export const TicketsMock: ITicket[] = [
  {eventId: 1, column: 1, row: 1, isTaken: false},
  {eventId: 1, column: 2, row: 1, isTaken: true, takenBy: 1},
  {eventId: 1, column: 3, row: 1, isTaken: true, takenBy: 2},
  {eventId: 1, column: 4, row: 1, isTaken: false},
  {eventId: 1, column: 5, row: 1, isTaken: false},
  {eventId: 1, column: 1, row: 2, isTaken: false},
  {eventId: 1, column: 2, row: 2, isTaken: false},
  {eventId: 1, column: 3, row: 2, isTaken: false},
  {eventId: 1, column: 4, row: 2, isTaken: false},
  {eventId: 1, column: 5, row: 2, isTaken: false}
]
