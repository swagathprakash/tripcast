import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/constants";

type Weather =   {
    latitude: number,
    longitude: number,
    current_weather: {
        time: string,
        temperature: number,
        windspeed: number,
        is_day: number,
        weathercode: number
    },
    hourly: {
        time: string[],
        temperature_2m: number[],
        relativehumidity_2m: number[],
        apparent_temperature: number[],
        weathercode: number[],
        rain: number[]
    },
    daily: {
        time: string[],
        temperature_2m_max: number[],
        temperature_2m_min: number[],
        apparent_temperature_max: number[],
        apparent_temperature_min:number[],
        uv_index_max:number[],
        weathercode: number[],
        rain_sum: number[]
    }
};
type CurrentWeather = {
	time: string,
	temperature: number,
	windspeed: number,
	is_day: number,
	weathercode: number
};

export const getLocationWeather = createAsyncThunk(
	"tripCast/location",
	async (
		locationMetaData: {
            latitude: number,
            longitude: number,
            start_date: string,
            end_date: string,
          },
		{ rejectWithValue },
	) => {
		try {
			const { data } = await axios
				.post(`${endpoints.BACKEND_URL}/get-weather`, locationMetaData,
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data);
		}
	},
);

type LocationSlice = {
    weather?: CurrentWeather;
	loading: boolean;
	error?: object;
};

const initialState: LocationSlice = {
	weather: undefined,
	loading: false,
	error: undefined,
};

const locationSlice = createSlice({
	name: "loginData",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getLocationWeather.pending, (state: LocationSlice) => {
			state.loading = true;
		});
		builder.addCase(getLocationWeather.fulfilled, (state, action) => {
			state.loading = false;
            state.weather = action.payload.data.current_weather;
			state.error = undefined;
		});
		builder.addCase(getLocationWeather.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload ?? "";
		});
	},
});

export const loginActions = locationSlice.actions;
export default locationSlice.reducer;
