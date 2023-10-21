import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models";

type ProfileState = {
    value: User | null;
}

const initialState: ProfileState = {
    value: null
}

export const profileSlice = createSlice({
    name: 'profileState',
    initialState, 
    reducers: {
        SET_PROFILE_DATA: (state, action: PayloadAction<User | null>) => {
            state.value = action.payload
        },
    }
})

export const { SET_PROFILE_DATA } = profileSlice.actions;
export default profileSlice.reducer;