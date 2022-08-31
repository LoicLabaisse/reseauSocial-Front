import {createSlice} from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        getUser: (state, action) => {
            return {...state, ...action.payload};
        },
    }
})
export const {getUser} = userSlice.actions;