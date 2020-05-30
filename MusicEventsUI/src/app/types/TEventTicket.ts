import {IEvent} from "./IEvent";
import {ITicket} from "./ITicket";

export type TEventTicket = ITicket | Pick<IEvent, 'title' | 'date' | 'city'>;
