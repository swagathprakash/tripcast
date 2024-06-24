import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authenticateUser = createAsyncThunk(
	"tripCast/login",
	async (
		loginDetails: { phone: string },
		{ rejectWithValue },
	) => {
		try {
			const { data } = await axios
				.post(`/login`, loginDetails,
				{ withCredentials: true },
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data);
		}
	},
);

type AuthSlice = {
    user?: {
        name: string,
        phone: string,
        location: string
    };
	loading: boolean;
	error?: object;
};

const initialState: AuthSlice = {
	user: undefined,
	loading: false,
	error: undefined,
};

const authSlice = createSlice({
	name: "loginData",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(authenticateUser.pending, (state: AuthSlice) => {
			state.loading = true;
		});
		builder.addCase(authenticateUser.fulfilled, (state, action) => {
			state.loading = false;
			state.error = undefined;
		});
		builder.addCase(authenticateUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload ?? "";
		});
	},
});

export const loginActions = authSlice.actions;
export default authSlice.reducer;
