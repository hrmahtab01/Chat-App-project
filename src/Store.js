import { configureStore } from "@reduxjs/toolkit";
import UserDataSlice from "./Slices/UserDataSlice";
import  UserprofileSlice  from "./Slices/UserProfile";


export const store = configureStore({
  reducer: {
    UserData: UserDataSlice,
   ProfiledData:UserprofileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
