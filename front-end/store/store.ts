import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import locationSlice from "./slice/locationSlice";
import placesSlice from "./slice/placesSlice";
import itenararySlice from "./slice/itenararySlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    location: locationSlice,
    places: placesSlice,
    itenrary: itenararySlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
