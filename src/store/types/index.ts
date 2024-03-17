import {
  Airtime,
  CryptoCurrency,
  GiftCard,
  Newsletter,
  User,
  Application,
} from "../../models";
import { Order } from "../../models/order";

export type AirtimeState = {
  value: Airtime[];
};

export type ApplicationState = {
  value: Application[];
};

export type CryptosState = {
  value: CryptoCurrency[];
};

export type GiftcardState = {
  value: GiftCard[];
};

export type NewsletterState = {
  value: Newsletter[];
};

export type OrdersState = {
  value: Order[];
};
export type UsersState = {
  value: User[];
};
