import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/constants";
import { Itenary } from "@/components/itenary/ItenaryBody";

type TripDetails = {
    starting_location: string,
    destination: string,
    start_date: string,
    end_date: string,
    companions: string,
    purpose: string,
    itinerary: Itenary[],
    forecast: {
        time: string;
        weather_code: number;
        weather: string;
    }[],
    packingRecommendations: string[],
    safetyTips: string[]
}
export const generateItinaray = createAsyncThunk(
    "tripCast/generateItinaray",
    async (
        itinaray,
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(
                `${endpoints.BACKEND_URL}/ask-model
        `,
                itinaray
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
};

const initialState: ItinararySlice = {
    loading: false,
    error: undefined,
    tripDetails: undefined
};

const itinararySlice = createSlice({
    name: "loginData",
    initialState,
    reducers: {},
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
    },
});

export const itinararyActions = itinararySlice.actions;
export default itinararySlice.reducer;
