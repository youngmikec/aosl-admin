import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Newsletter } from "../../models";
import { NewsletterState } from "../types";

const initialState: NewsletterState = {
  value: [],
};

export const newslettersSlice = createSlice({
  name: "newsletterState",
  initialState,
  reducers: {
    INITIALIZE_NEWSLETTERS: (state, action: PayloadAction<Newsletter[]>) => {
      state.value = action.payload;
    },
    ADD_TO_NEWSLETTERS: (state, action: PayloadAction<Newsletter>) => {
      const { value } = state;
      state.value = [action.payload, ...value];
    },
    UPDATE_NEWSLETTER_STATE: (state, action: PayloadAction<Newsletter>) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].id === action.payload.id) {
          state.value[i] = action.payload;
          break;
        }
      }
    },
    REMOVE_NEWSLETTER: (state, action: PayloadAction<string>) => {
      const newState: Newsletter[] = state.value.filter(
        (item: Newsletter) => item.id !== action.payload
      );
      state.value = [...newState];
    },
  },
});

export const {
  INITIALIZE_NEWSLETTERS,
  ADD_TO_NEWSLETTERS,
  UPDATE_NEWSLETTER_STATE,
  REMOVE_NEWSLETTER,
} = newslettersSlice.actions;

export default newslettersSlice.reducer;
