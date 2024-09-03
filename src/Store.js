import { configureStore } from "@reduxjs/toolkit";
import UserDataSlice from "./Slices/UserDataSlice";

export const store = configureStore({
  reducer: {
    UserData: UserDataSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
