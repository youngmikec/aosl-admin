import { GIFTCARD_STATUS, GIFTCARD_TYPE } from "./enums";
import { User } from "./user";

export type Currency = {
    rate: number;
    name: string;
}

export type GiftCard = {
    id: string;
    name: string;
    shortName: string;
    code: string;
    rate: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    exchangePlatform: string;
    walletAddress: string;
    barcode: string;
    giftcardImage: string;
    type: GIFTCARD_TYPE;
    currencies: Currency[];
    status: GIFTCARD_STATUS;
    paymentDescription: string;
    paymentSteps: any[];
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    updatedAt: Date;
    deleted: boolean;
    deletedAt: Date;
    deletedBy: User;
}