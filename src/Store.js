import { configureStore } from "@reduxjs/toolkit";
import UserDataSlice from "./Slices/UserDataSlice";
import UserprofileSlice from "./Slices/UserProfile";
import ChatlistSlice from "./Slices/ChatSlice";

export const store = configureStore({
  reducer: {
    UserData: UserDataSlice,
    ProfiledData: UserprofileSlice,
    chatuserdata: ChatlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
