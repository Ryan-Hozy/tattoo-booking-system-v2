import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api-render-io.onrender.com";

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/booking`, bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const fetchBookings = createAsyncThunk(
//   "booking/fetchBookings",
//   async (_, { getState, rejectWithValue }) => {
//     const state = getState();
//     const userId = state.auth.user?.uid;
//     console.log("User ID:", userId);

//     if (!userId) {
//       return rejectWithValue("User ID is missing");
//     }

//     try {
//       const response = await axios.get(`${BASE_URL}/booking/:user_id`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updateBooking = createAsyncThunk(
//   "booking/updateBooking",
//   async (bookingData, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${BASE_URL}/booking/${bookingData.id}`, bookingData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/booking/${bookingId}`);
      return { id: bookingId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: { bookings: [], loading: false, error: null },
  reducers: {
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings = [action.payload, ...state.bookings];
        state.loading = false;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(booking => booking.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { updateBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
