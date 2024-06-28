import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/constants";

type Weather = {
  latitude: number;
  longitude: number;
  current_weather: {
    time: string;
    temperature: number;
    windspeed: number;
    is_day: number;
    weathercode: number;
    weather_detail: string;
    apparent_temperature: number;
    relativehumidity: number;
    rain: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    apparent_temperature: number[];
    weathercode: number[];
    rain: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    uv_index_max: number[];
    weathercode: number[];
    rain_sum: number[];
  };
};
type CurrentWeather = {
  time: string;
  temperature: number;
  windspeed: number;
  is_day: number;
  weathercode: number;
  weather_detail: string;
  apparent_temperature: number;
  relativehumidity: number;
  rain: number;
};

export const getLocationWeather = createAsyncThunk(
  "tripCast/location",
  async (
    locationMetaData: {
      latitude: number;
      longitude: number;
      start_date: string;
      end_date: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${endpoints.BACKEND_URL}/get-weather`,
        locationMetaData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

type LocationSlice = {
  weather?: CurrentWeather;
  location?: string;
  category?: string;
  loading: boolean;
  error?: object;
  latitude?: number;
  longitude?: number;
};

const initialState: LocationSlice = {
  weather: undefined,
  location: undefined,
  category: undefined,
  loading: false,
  error: undefined,
  latitude: undefined,
  longitude: undefined,
};

const locationSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setCategory: (state, action) => {
      state.category = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getLocationWeather.pending, (state: LocationSlice) => {
      state.loading = true;
    });
    builder.addCase(getLocationWeather.fulfilled, (state, action) => {
      state.loading = false;
      state.weather = action.payload.data.current_weather;
      state.location = action.payload.data.city + ', ' + action.payload.data.state;
      state.category = "Cloudy";
      
      state.error = undefined;
    });
    builder.addCase(getLocationWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "";
    });
  },
});

export const { setLocation, setCategory } = locationSlice.actions;
export default locationSlice.reducer;
