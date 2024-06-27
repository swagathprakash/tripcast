import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import locationSlice from "./slice/locationSlice";
import placesSlice from "./slice/placesSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    location: locationSlice,
    places: placesSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
