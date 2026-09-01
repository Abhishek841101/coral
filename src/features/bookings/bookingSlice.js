import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api";

/* =====================================================
   CREATE BOOKING
===================================================== */

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/bookings`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Unable to create booking."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to connect to server."
      );
    }
  }
);

/* =====================================================
   GET MY BOOKINGS
===================================================== */

export const getMyBookings = createAsyncThunk(
  "bookings/getMyBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/bookings/my`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Unable to fetch bookings."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to connect to server."
      );
    }
  }
);

/* =====================================================
   GET SINGLE BOOKING
===================================================== */

export const getBookingById = createAsyncThunk(
  "bookings/getBookingById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/bookings/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Unable to fetch booking."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to connect to server."
      );
    }
  }
);

/* =====================================================
   CANCEL BOOKING
===================================================== */

export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (
    { id, reason = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/bookings/${id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Unable to cancel booking."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to connect to server."
      );
    }
  }
);

/* =====================================================
   INITIAL STATE
===================================================== */

const initialState = {
  bookings: [],
  booking: null,

  loading: false,
  bookingLoading: false,
  createLoading: false,
  cancelLoading: false,

  error: null,
  bookingError: null,
  createError: null,
  cancelError: null,
};

/* =====================================================
   SLICE
===================================================== */

const bookingSlice = createSlice({
  name: "bookings",

  initialState,

  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },

    clearBookingDetails: (state) => {
      state.booking = null;
      state.bookingError = null;
    },

    clearCreateBookingError: (state) => {
      state.createError = null;
    },

    clearCancelBookingError: (state) => {
      state.cancelError = null;
    },
  },

  extraReducers: (builder) => {
    /* =================================================
       CREATE
    ================================================= */

    builder
      .addCase(createBooking.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })

      .addCase(createBooking.fulfilled, (state, action) => {
        state.createLoading = false;

        state.booking =
          action.payload.booking || null;

        if (action.payload.booking) {
          state.bookings.unshift(
            action.payload.booking
          );
        }
      })

      .addCase(createBooking.rejected, (state, action) => {
        state.createLoading = false;

        state.createError =
          action.payload ||
          "Unable to create booking.";
      });

    /* =================================================
       MY BOOKINGS
    ================================================= */

    builder
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;

        state.bookings =
          action.payload.bookings || [];
      })

      .addCase(getMyBookings.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Unable to fetch bookings.";
      });

    /* =================================================
       SINGLE BOOKING
    ================================================= */

    builder
      .addCase(getBookingById.pending, (state) => {
        state.bookingLoading = true;
        state.bookingError = null;
      })

      .addCase(getBookingById.fulfilled, (state, action) => {
        state.bookingLoading = false;

        state.booking =
          action.payload.booking || null;
      })

      .addCase(getBookingById.rejected, (state, action) => {
        state.bookingLoading = false;

        state.bookingError =
          action.payload ||
          "Unable to fetch booking.";
      });

    /* =================================================
       CANCEL
    ================================================= */

    builder
      .addCase(cancelBooking.pending, (state) => {
        state.cancelLoading = true;
        state.cancelError = null;
      })

      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.cancelLoading = false;

        const updatedBooking =
          action.payload.booking;

        if (!updatedBooking) return;

        state.booking = updatedBooking;

        const index =
          state.bookings.findIndex(
            (item) =>
              item._id === updatedBooking._id
          );

        if (index !== -1) {
          state.bookings[index] =
            updatedBooking;
        }
      })

      .addCase(cancelBooking.rejected, (state, action) => {
        state.cancelLoading = false;

        state.cancelError =
          action.payload ||
          "Unable to cancel booking.";
      });
  },
});

/* =====================================================
   ACTIONS
===================================================== */

export const {
  clearBookingError,
  clearBookingDetails,
  clearCreateBookingError,
  clearCancelBookingError,
} = bookingSlice.actions;

/* =====================================================
   SELECTORS
===================================================== */

export const selectBookings = (state) =>
  state.bookings.bookings;

export const selectBooking = (state) =>
  state.bookings.booking;

export const selectBookingsLoading = (state) =>
  state.bookings.loading;

export const selectBookingLoading = (state) =>
  state.bookings.bookingLoading;

export const selectCreateBookingLoading = (state) =>
  state.bookings.createLoading;

export const selectCancelBookingLoading = (state) =>
  state.bookings.cancelLoading;

export const selectBookingError = (state) =>
  state.bookings.error;

export const selectBookingDetailsError = (state) =>
  state.bookings.bookingError;

export const selectCreateBookingError = (state) =>
  state.bookings.createError;

export const selectCancelBookingError = (state) =>
  state.bookings.cancelError;

export default bookingSlice.reducer;