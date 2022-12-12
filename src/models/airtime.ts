import { User } from "./user";
import { ORDER_PAYMENT_METHOD, ORDER_STATUS } from "./enums";

export  type Airtime = {
    id: string;
    _id: string;
    code: string;
    name: string;
    shortName: string;
    rate: number;
    networkImage: string;
    status: string;
    paymentSteps: any[];
    txnNetwork: string;
    txnNetworkNumber: string;
    createdAt: Date;
    createdBy: User;
    updatedAt: Date;
    updatedBy: User;
}

export type AirtimeOrder = {
    id: string;
    sendersPhone: string;
    status: ORDER_STATUS,
    paymentMethod: ORDER_PAYMENT_METHOD,
    deleted: boolean,
    orderType: "AIRTIME",
    amount: number,
    amountReceivable: number,
    bankName: string,
    accountName: string,
    accountNumber: string,
    airtime: Airtime,
    proofImage: string,
    createdBy: User,
    user: User,
    createdAt: Date,
    updatedAt: Date,
}