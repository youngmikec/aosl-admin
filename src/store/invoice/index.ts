import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice } from "../../models";
import { InvoiceState } from "../types";

const initialState: InvoiceState = {
    value: [],
}

export const ordersSlice = createSlice({
    name: "invoiceState",
    initialState,
    reducers: {
        INITIALIZE_INVOICES: (state, action: PayloadAction<Invoice[]>) => {
            state.value = action.payload;
        },
        ADD_TO_INVOICES: (state, action: PayloadAction<Invoice>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_INVOICE_STATE: (state, action: PayloadAction<Invoice>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i].id === action.payload.id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_INVOICE: (state, action: PayloadAction<string>) => {
            const newState: Invoice[] = state.value.filter((item: Invoice) => item.id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_INVOICES, ADD_TO_INVOICES, UPDATE_INVOICE_STATE, REMOVE_INVOICE } = ordersSlice.actions;

export default ordersSlice.reducer;