import { Airtime, CryptoCurrency, GiftCard, User } from "../../models"
import { Order } from "../../models/order"

export type AirtimeState = {
    value: Airtime[]
}

export type CryptosState = {
    value: CryptoCurrency[]
}

export type GiftcardState = {
    value: GiftCard[]
}

export type OrdersState = {
    value: Order[]
}
export type UsersState = {
    value: User[]
}