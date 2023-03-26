import {createSlice} from "@reduxjs/toolkit";


const usersSlice=createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    editUser: null,
    profile:null,
    editProfile:null,
  },
  reducers: {
    SetAllUsers: (state, action) => {
      state.allUsers=action.payload;
    },
    SetEditUser: (state, action) => {
      state.editUser=action.payload;
    },
    SetProfile: (state, action) => {
      state.profile = action.payload
    },
    SetEditProfile: (state, action) => {
      state.editProfile=action.payload
    }
  }
})

export default usersSlice.reducer;

export const {SetAllUsers,SetEditUser,SetEditProfile,SetProfile }=usersSlice.actions; 