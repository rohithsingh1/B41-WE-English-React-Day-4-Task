import {configureStore} from "@reduxjs/toolkit";

import UsersSlice from "./UsersSlice";
import sidebarSlice from "./DrawerSlice"


const store=configureStore({
  reducer: {
    users: UsersSlice,
    sidebarToggler:sidebarSlice
  }
})

export default store;