import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../models";
import { OrdersState } from "../types";

const initialState: OrdersState = {
    value: [],
}

export const ordersSlice = createSlice({
    name: "ordersState",
    initialState,
    reducers: {
        INITIALIZE_ORDERS: (state, action: PayloadAction<Order[]>) => {
            state.value = action.payload;
        },
        ADD_TO_ORDERS: (state, action: PayloadAction<Order>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_ORDER_STATE: (state, action: PayloadAction<Order>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i].id === action.payload.id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_ORDER: (state, action: PayloadAction<string>) => {
            const newState: Order[] = state.value.filter((item: Order) => item.id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_ORDERS, ADD_TO_ORDERS, UPDATE_ORDER_STATE, REMOVE_ORDER } = ordersSlice.actions;

export default ordersSlice.reducer;