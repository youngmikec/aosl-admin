import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost } from "../../models";
import { BlogState } from "../types";

const initialState: BlogState = {
    value: [],
}

export const blogSlice = createSlice({
    name: "blogState",
    initialState,
    reducers: {
        INITIALIZE_BLOGS: (state, action: PayloadAction<BlogPost[]>) => {
            state.value = action.payload;
        },
        ADD_TO_BLOGS: (state, action: PayloadAction<any>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_BLOG_STATE: (state, action: PayloadAction<BlogPost>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i].id === action.payload.id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_BLOG: (state, action: PayloadAction<string>) => {
            const newState: BlogPost[] = state.value.filter((item: BlogPost) => item.id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_BLOGS, ADD_TO_BLOGS, UPDATE_BLOG_STATE, REMOVE_BLOG } = blogSlice.actions;

export default blogSlice.reducer;