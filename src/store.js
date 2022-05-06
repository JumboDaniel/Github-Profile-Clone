import { configureStore } from "@reduxjs/toolkit";
import  profileReducer  from "./slices/user";

export default configureStore({
  reducer: {
    profile: profileReducer,
  },
});