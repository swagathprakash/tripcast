import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/constants";

export const authenticateUser: any = createAsyncThunk(
  "tripCast/login",
  async (loginDetails: { phone: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${endpoints.BACKEND_URL}/users?phone=${loginDetails.phone}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

type AuthSlice = {
  user?: {
    user_id: number;
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
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
  reducers: {
    clearUser: (state, action) => initialState,
  },
  extraReducers(builder) {
    builder.addCase(authenticateUser.pending, (state: AuthSlice) => {
      state.loading = true;
    });
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      let result: any = {};
      result.firstName = action.payload?.data?.first_name;
      result.lastName = action.payload?.data?.last_name;
      result.phone = action.payload?.data?.phone;
      result.user_id = action.payload?.data?.user_id
      state.user = result;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "";
    });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
