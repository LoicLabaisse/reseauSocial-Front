import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const AllUsersSlice = createSlice({
    name: "allUsers",
    initialState: [],
    reducers: {
        getAllUsers: (state, action) => {
            return {...state,...action.payload}
        },
    }
})
export const {getAllUsers} = AllUsersSlice.actions;