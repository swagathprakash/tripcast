import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/constants";

type PlaceDetails =
  | {
      name: string;
      city: string;
      logitude: number;
      latitude: number;
      address: string;
      categories: string[];
    }
  | undefined;

type Places = {
  location: {
    attractions: PlaceDetails[];
    sights: PlaceDetails[];
    shopping: PlaceDetails[];
    beach: PlaceDetails[];
    heritage: PlaceDetails[];
    leisure: PlaceDetails[];
    entertainment: PlaceDetails[];
  };
  hotels: PlaceDetails[];
  food: PlaceDetails[];
  tradition: PlaceDetails[];
};

export const fetchPlaces = createAsyncThunk(
  "tripCast/places",
  async (
    locationMetaData: {
      latitude: number;
      longitude: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${endpoints.BACKEND_URL}/places`,
        locationMetaData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

type PlacesSlice = {
  places: Places;
  loading: boolean;
  error?: object;
};

const initialState: PlacesSlice = {
  places: {
    food: [],
    hotels: [],
    tradition: [],
    location: {
      attractions: [],
      beach: [],
      entertainment: [],
      heritage: [],
      leisure: [],
      shopping: [],
      sights: [],
    },
  },
  loading: false,
  error: undefined,
};

const placesSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPlaces.pending, (state: PlacesSlice) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.loading = false;
      state.places = action.payload.data;
      state.error = undefined;
    });
    builder.addCase(fetchPlaces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "";
    });
  },
});

export const loginActions = placesSlice.actions;
export default placesSlice.reducer;
