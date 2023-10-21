import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import modalReducer from "./modal";
import logotModalReducer from "./modal/logout-modal";
import cryptoReducer from "./cryptos";
import newsletterReducer from "./newsletter";
import ordersReducer from "./orders";
import airtimeReducer from "./airtime";
import giftcardReducer from "./giftcard";
import profileReducer from './profile';

export const store = configureStore({
  reducer: {
    airtimeState: airtimeReducer,
    appModal: modalReducer,
    logoutModal: logotModalReducer,
    cryptosState: cryptoReducer,
    giftcardsState: giftcardReducer,
    newsletterState: newsletterReducer,
    ordersState: ordersReducer,
    usersState: usersReducer,
    profileState: profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
