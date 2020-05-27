export interface ITicket {
  eventId: number;
  row: number;
  column: number;
  isTaken: boolean;
  takenBy?: number;
}
