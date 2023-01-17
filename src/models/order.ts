import { User } from "./user";
import { Airtime } from "./airtime";
import { GiftCard } from "./giftcard";
import { CryptoCurrency } from "./cryptocurrency";
import { ORDER_PAYMENT_METHOD, ORDER_STATUS, ORDER_TYPE } from "./enums";

export type Order = {
    id: string;
    code: string;
    orderCode: string;
    sendersPhone: string;
    amount: number;
    amountReceivable: number;
    user: User;
    orderType: ORDER_TYPE;
    status: ORDER_STATUS
    proofImage: string;
    paymentMethod: ORDER_PAYMENT_METHOD,
    network: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    walletAddress: string;
    platform: string;
    airtime: Airtime;
    cryptocurrency: CryptoCurrency;
    giftcard: GiftCard;
    createdBy: User;
    createdAt: Date;
    approvedBy: User;
    updatedBy: User;
    updatedAt: Date;
    deleted: boolean;
    deletedAt: Date;
    deletedBy: User;
}