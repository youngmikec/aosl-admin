import {
  Newsletter,
  User,
  Application,
  Job,
  Invoice,
} from "../../models";
import { Order } from "../../models/order";

export type ApplicationState = {
  value: Application[];
};
export type JobState = {
  value: Job[];
};

export type NewsletterState = {
  value: Newsletter[];
};

export type OrdersState = {
  value: Order[];
};

export type InvoiceState = {
  value: Invoice[];
};

export type UsersState = {
  value: User[];
};
