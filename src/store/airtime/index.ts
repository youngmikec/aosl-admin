import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Airtime } from "../../models";
import { AirtimeState } from "../types";

const initialState: AirtimeState = {
    value: [],
}

export const cryptosSlice = createSlice({
    name: "airtimeState",
    initialState,
    reducers: {
        INITIALIZE_AIRTIMES: (state, action: PayloadAction<Airtime[]>) => {
            state.value = action.payload;
        },
        ADD_TO_AIRTIMES: (state, action: PayloadAction<Airtime>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_AIRTIME_STATE: (state, action: PayloadAction<Airtime>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i].id === action.payload.id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_AIRTIME: (state, action: PayloadAction<string>) => {
            const newState: Airtime[] = state.value.filter((item: Airtime) => item.id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_AIRTIMES, ADD_TO_AIRTIMES, UPDATE_AIRTIME_STATE, REMOVE_AIRTIME } = cryptosSlice.actions;

export default cryptosSlice.reducer;