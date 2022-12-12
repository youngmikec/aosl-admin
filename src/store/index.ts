import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './users';
import modalReducer from './modal';
import cryptoReducer from './cryptos';
import ordersReducer from './orders';
import airtimeReducer from './airtime';
import giftcardReducer from './giftcard';


export const store = configureStore({
    reducer: {
        airtimeState: airtimeReducer,
        appModal: modalReducer,
        cryptosState: cryptoReducer,
        giftcardsState: giftcardReducer,
        ordersState: ordersReducer,
        usersState: usersReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;