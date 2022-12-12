import { createSlice } from "@reduxjs/toolkit";

type Modal = {
    displayModal: boolean;
}


const initialState: Modal = {
    displayModal: false
}

export const modalSlice = createSlice({
    name:'appModal',
    initialState,
    reducers:{
        OpenAppModal:(state) => {
            state.displayModal = true;
        },
        CloseAppModal:(state) => {
            state.displayModal = false;
        },
    }
});

export const { OpenAppModal, CloseAppModal } = modalSlice.actions;
export default modalSlice.reducer;