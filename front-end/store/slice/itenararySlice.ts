import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/constants";
import { Itenary } from "@/components/itenary/ItenaryBody";

type TripDetails = {
  starting_location: string;
  destination: string;
  start_date: string;
  end_date: string;
  companions: string;
  purpose: string;
  duration: number;
  itinerary: Itenary[];
  forecast: {
    time: string;
    weather_code: number;
    weather: string;
  }[];
  packingRecommendations: string[];
  safetyTips: string[];
};
export type TripDetailsWithId = {
  trip_id: number;
  starting_location: string;
  destination: string;
  start_date: string;
  end_date: string;
  companions: string;
  purpose: string;
  duration: number;
  itinerary: Itenary[];
  forecast: {
    time: string;
    weather_code: number;
    weather: string;
  }[];
  packingRecommendations: string[];
  safetyTips: string[];
};

export const generateItinaray = createAsyncThunk(
  "tripCast/generateItinaray",
  async (
    itinaray: {
      latitude: number | undefined;
      longitude: number | undefined;
      companions: string;
      destination: string;
      start_date: string;
      end_date: string;
      purpose: string;
      starting_location: string;
      mode_of_transport: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${endpoints.BACKEND_URL}/ask-model`, {
        body: JSON.stringify(itinaray),
        method: "POST",
      });
      const result = await response.json();
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveItinaray = createAsyncThunk(
  "tripCast/saveItinaray",
  async (
    itinaray: {
      userId: number;
      tripDetails: TripDetails;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${endpoints.BACKEND_URL}/trip`,
        itinaray
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const fetchAllItinaray = createAsyncThunk(
  "tripCast/fetchAllItinaray",
  async (user_id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${endpoints.BACKEND_URL}/trip?user_id=${user_id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const fetchItinarayById = createAsyncThunk(
  "tripCast/fetchItinarayById",
  async (tripId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${endpoints.BACKEND_URL}/trip?trip_id=${tripId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

type ItinararySlice = {
  loading: boolean;
  error?: object;
  tripDetails?: TripDetails;
  saved: boolean;
  upcoming?: TripDetailsWithId[];
  finished?: TripDetailsWithId[];
  selectedTrip?: TripDetailsWithId;
};

const initialState: ItinararySlice = {
  loading: false,
  error: undefined,
  tripDetails: undefined,
  saved: false,
  upcoming: undefined,
  finished: undefined,
  selectedTrip: undefined,
};

const itinararySlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {
    clearTripDetails: (state, action) => {
      state.tripDetails = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(generateItinaray.pending, (state: ItinararySlice) => {
      state.loading = true;
    });
    builder.addCase(generateItinaray.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.tripDetails = action.payload.data;
    });
    builder.addCase(generateItinaray.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "";
    });
    builder.addCase(saveItinaray.pending, (state: ItinararySlice) => {
      state.loading = true;
    });
    builder.addCase(saveItinaray.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.saved = action.payload.data && true
    });
    builder.addCase(saveItinaray.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "";
    });
    builder.addCase(fetchAllItinaray.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllItinaray.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.upcoming = action.payload.data.upcoming;
      state.finished = action.payload.data.finished;
    });
    builder.addCase(fetchAllItinaray.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "";
    });
    builder.addCase(fetchItinarayById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchItinarayById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.selectedTrip = action.payload.data.trip_datails;
    });
    builder.addCase(fetchItinarayById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "";
    });
  },
});

export const { clearTripDetails } = itinararySlice.actions;
export default itinararySlice.reducer;
