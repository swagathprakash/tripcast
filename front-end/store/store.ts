import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import locationSlice from "./slice/locationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    location: locationSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
