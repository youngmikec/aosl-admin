import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models";
import { UsersState } from "../types";

const initialState: UsersState = {
    value: [],
}

export const usersSlice = createSlice({
    name: "usersState",
    initialState,
    reducers: {
        INITIALIZE_USERS: (state, action: PayloadAction<User[]>) => {
            state.value = action.payload;
        },
        ADD_TO_USERS: (state, action: PayloadAction<User>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_USER: (state, action: PayloadAction<User>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i].id === action.payload.id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_USER: (state, action: PayloadAction<string>) => {
            const newState: User[] = state.value.filter((item: User) => item.id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_USERS, ADD_TO_USERS, UPDATE_USER, REMOVE_USER } = usersSlice.actions;

export default usersSlice.reducer;