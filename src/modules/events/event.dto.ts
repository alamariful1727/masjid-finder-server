import { IEvent } from './event.model';

export interface ICreateEventRequest {
  name: IEvent['name'];
  contactNo: IEvent['contactNo'];
  location: IEvent['location'];
}
