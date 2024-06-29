import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/constants";

export const fetchNotification: any = createAsyncThunk(
  "tripCast/notifications",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${endpoints.BACKEND_URL}/notifications?user_id=${userId}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

type Notification = {
  notification_id: number;
  uder_id: number;
  is_read: boolean;
  created_at: string;
  content: string;
};

type NotificationSlice = {
  notifications?: Notification[];
  loading: boolean;
  error?: object;
};

const initialState: NotificationSlice = {
  notifications: undefined,
  loading: false,
  error: undefined,
};

const NotificationSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotification.pending, (state: NotificationSlice) => {
      state.loading = true;
    });
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload.data;
      state.error = undefined;
    });
    builder.addCase(fetchNotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "";
    });
  },
});

export const NotificationActions = NotificationSlice.actions;
export default NotificationSlice.reducer;
