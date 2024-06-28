import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/constants";
// import { Itenary } from "@/components/itenary/ItenaryBody";
type Activity = {
    time: string;
    location: string;
    description: string;
    weatherCondition: string;
    // weather_code: number;
};
type Itenary = {
    day: number;
    activities: Activity[];
};
type TripDetails = {
    starting_location: string,
    destination: string,
    start_date: string,
    end_date: string,
    companions: string,
    purpose: string,
    duration: number,
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
        itinaray: {
            latitude: number | undefined,
            longitude: number | undefined,
            companions: string,
            destination: string,
            start_date: string,
            end_date: string,
            purpose: string,
            starting_location: string,
            mode_of_transport: string,
        },
        { rejectWithValue }
    ) => {        
        try {
            const response = await axios.post(
                `${endpoints.BACKEND_URL}/ask-model`,
                itinaray
            );
            console.log("respo type", typeof response.data.itinerary);
            console.log("respo data", response.data.itinerary);

            
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const saveItinaray = createAsyncThunk(
    "tripCast/saveItinaray",
    async (
        itinaray: {
            userId: number,
            tripDetails: TripDetails
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
            // console.log("generate Itinaray", state.tripDetails);

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
        });
        builder.addCase(saveItinaray.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "";
        });
    },
});

export const itinararyActions = itinararySlice.actions;
export default itinararySlice.reducer;
