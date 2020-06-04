import {IEvent} from "./IEvent";
import {IUser} from "./IUser";

export interface ITicket {
  event: IEvent;
  row: number;
  col: number;
  user?: IUser;
}
