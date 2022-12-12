import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptoCurrency } from "../../models";
import { CryptosState } from "../types";

const initialState: CryptosState = {
    value: [],
}

export const cryptosSlice = createSlice({
    name: "cryptosState",
    initialState,
    reducers: {
        INITIALIZE_CRYPTOS: (state, action: PayloadAction<CryptoCurrency[]>) => {
            state.value = action.payload;
        },
        ADD_TO_CRYPTOS: (state, action: PayloadAction<CryptoCurrency>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_CRYPTO_STATE: (state, action: PayloadAction<CryptoCurrency>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i].id === action.payload.id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_CRYPTO: (state, action: PayloadAction<string>) => {
            const newState: CryptoCurrency[] = state.value.filter((item: CryptoCurrency) => item.id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_CRYPTOS, ADD_TO_CRYPTOS, UPDATE_CRYPTO_STATE, REMOVE_CRYPTO } = cryptosSlice.actions;

export default cryptosSlice.reducer;