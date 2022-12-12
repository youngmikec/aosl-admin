import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GiftCard } from "../../models";
import { GiftcardState } from "../types";

const initialState: GiftcardState = {
    value: [],
}

export const giftcardSlice = createSlice({
    name: "giftcardsState",
    initialState,
    reducers: {
        INITIALIZE_GIFTCARDS: (state, action: PayloadAction<GiftCard[]>) => {
            state.value = action.payload;
        },
        ADD_TO_GIFTCARDS: (state, action: PayloadAction<GiftCard>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_GIFTCARD_STATE: (state, action: PayloadAction<GiftCard>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i].id === action.payload.id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_GIFTCARD: (state, action: PayloadAction<string>) => {
            const newState: GiftCard[] = state.value.filter((item: GiftCard) => item.id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_GIFTCARDS, ADD_TO_GIFTCARDS, UPDATE_GIFTCARD_STATE, REMOVE_GIFTCARD } = giftcardSlice.actions;

export default giftcardSlice.reducer;