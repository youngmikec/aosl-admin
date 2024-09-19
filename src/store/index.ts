import { configureStore } from "@reduxjs/toolkit";

import applicationReducer from './application';
import chatReducer from './Chat';
import jobReducer from './jobs-training';
import usersReducer from "./users";
import modalReducer from "./modal";
import logotModalReducer from "./modal/logout-modal";
import newsletterReducer from "./newsletter";
import ordersReducer from "./orders";
import profileReducer from './profile';
import invoiceReducer from './invoice';
import blogReducer from './blog';

export const store = configureStore({
  reducer: {
    blogState: blogReducer,
    applicationState: applicationReducer,
    chatState: chatReducer,
    jobState: jobReducer,
    appModal: modalReducer,
    invoiceState: invoiceReducer,
    logoutModal: logotModalReducer,
    newsletterState: newsletterReducer,
    ordersState: ordersReducer,
    usersState: usersReducer,
    profileState: profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
