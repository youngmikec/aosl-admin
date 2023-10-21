import { createSlice } from "@reduxjs/toolkit";

type Modal = {
    displayModal: boolean;
}


const initialState: Modal = {
    displayModal: false
}

export const logoutModalSlice = createSlice({
    name:'logoutModal',
    initialState,
    reducers:{
        OpenLogoutModal:(state) => {
            state.displayModal = true;
        },
        CloseLogoutModal:(state) => {
            state.displayModal = false;
        },
    }
});

export const { OpenLogoutModal, CloseLogoutModal } = logoutModalSlice.actions;
export default logoutModalSlice.reducer;