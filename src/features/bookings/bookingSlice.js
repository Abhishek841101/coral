

import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

/* =====================================================
   API CONFIGURATION
===================================================== */

// VITE_API_URL can be either:
// http://localhost:5000
// http://localhost:5000/api
// https://your-backend.onrender.com/api

const rawApiUrl = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");

const API_BASE_URL = rawApiUrl.endsWith("/api")
  ? rawApiUrl
  : `${rawApiUrl}/api`;

/* =====================================================
   API RESPONSE HELPER
===================================================== */

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}.`
    );
  }

  return data;
};

const getErrorMessage = (error, fallback) => {
  return (
    error?.message ||
    fallback ||
    "Something went wrong."
  );
};

/* =====================================================
   CREATE BOOKING

   POST /api/bookings

   Backend expects:
   propertyId
   checkIn
   checkOut
   guests
   guestName
   guestPhone
   guestEmail
   specialRequest
   sleepingArrangements[]
   pets[]

   Backend calculates the final price.
===================================================== */

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      if (!bookingData || typeof bookingData !== "object") {
        return rejectWithValue(
          "Booking details are required."
        );
      }

      if (!bookingData.propertyId) {
        return rejectWithValue(
          "Please select a property."
        );
      }

      if (
        !Array.isArray(
          bookingData.sleepingArrangements ?? []
        ) ||
        !Array.isArray(bookingData.pets ?? [])
      ) {
        return rejectWithValue(
          "Sleeping arrangements and pets must be arrays."
        );
      }

      const payload = {
        propertyId: bookingData.propertyId,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: Number(bookingData.guests),
        guestName: bookingData.guestName?.trim() || "",
        guestPhone: bookingData.guestPhone?.trim() || "",
        guestEmail: bookingData.guestEmail?.trim() || "",
        specialRequest:
          bookingData.specialRequest?.trim() || "",
        sleepingArrangements:
          bookingData.sleepingArrangements ?? [],
        pets: bookingData.pets ?? [],
      };

      const data = await apiRequest("/bookings", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!data?.booking) {
        return rejectWithValue(
          "Booking response is missing booking details."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to create booking."
        )
      );
    }
  }
);

/* =====================================================
   GET MY BOOKINGS

   GET /api/bookings/my
===================================================== */

export const getMyBookings = createAsyncThunk(
  "booking/getMyBookings",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiRequest("/bookings/my", {
        method: "GET",
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to fetch your bookings."
        )
      );
    }
  }
);

/* =====================================================
   GET SINGLE BOOKING

   GET /api/bookings/:id
===================================================== */

export const getBookingById = createAsyncThunk(
  "booking/getBookingById",
  async (bookingId, { rejectWithValue }) => {
    try {
      if (!bookingId) {
        return rejectWithValue(
          "Booking ID is required."
        );
      }

      const data = await apiRequest(
        `/bookings/${encodeURIComponent(bookingId)}`,
        {
          method: "GET",
        }
      );

      if (!data?.booking) {
        return rejectWithValue(
          "Booking details were not returned by the server."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to fetch booking details."
        )
      );
    }
  }
);

/* =====================================================
   CANCEL BOOKING

   PATCH /api/bookings/:id/cancel

   API action retained for compatibility.
   Only expose cancellation in the UI when your
   customer cancellation rules are finalized.
===================================================== */

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (payload, { rejectWithValue }) => {
    try {
      const bookingId =
        typeof payload === "string"
          ? payload
          : payload?.bookingId;

      const reason =
        typeof payload === "object" && payload !== null
          ? payload.reason || ""
          : "";

      if (!bookingId) {
        return rejectWithValue(
          "Booking ID is required."
        );
      }

      const data = await apiRequest(
        `/bookings/${encodeURIComponent(bookingId)}/cancel`,
        {
          method: "PATCH",
          body: JSON.stringify({
            reason,
          }),
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to cancel booking."
        )
      );
    }
  }
);

/* =====================================================
   INITIAL STATE
===================================================== */

const initialState = {
  // Booking collections
  bookings: [],
  booking: null,

  // Loading states
  loading: false,
  bookingLoading: false,
  createLoading: false,
  cancelLoading: false,

  // Error states
  error: null,
  bookingError: null,
  createError: null,
  cancelError: null,

  // Success messages
  createSuccess: null,
  cancelSuccess: null,
};

/* =====================================================
   BOOKING SLICE
===================================================== */

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    /* Clear all errors */

    clearBookingErrors: (state) => {
      state.error = null;
      state.bookingError = null;
      state.createError = null;
      state.cancelError = null;
    },

    /* Clear create booking error */

    clearCreateBookingError: (state) => {
      state.createError = null;
      state.createSuccess = null;
    },

    /* Clear list error */

    clearBookingsError: (state) => {
      state.error = null;
    },

    /* Clear single booking error */

    clearBookingError: (state) => {
      state.bookingError = null;
    },

    /* Clear cancellation error */

    clearCancelBookingError: (state) => {
      state.cancelError = null;
      state.cancelSuccess = null;
    },

    /* Clear current booking */

    clearCurrentBooking: (state) => {
      state.booking = null;
      state.bookingError = null;
    },

    /* Reset all booking state */

    resetBookingState: () => {
      return { ...initialState };
    },
  },

  /* ===================================================
     ASYNC REDUCERS
  =================================================== */

  extraReducers: (builder) => {
    /* ===============================================
       CREATE BOOKING
    =============================================== */

    builder
      .addCase(createBooking.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = null;
      })

      .addCase(
        createBooking.fulfilled,
        (state, action) => {
          state.createLoading = false;
          state.createError = null;

          state.createSuccess =
            action.payload?.message ||
            "Booking request submitted successfully.";

          const createdBooking =
            action.payload?.booking;

          if (!createdBooking) return;

          state.booking = createdBooking;

          // Prevent duplicate entries
          const exists = state.bookings.some(
            (item) =>
              item?._id === createdBooking?._id
          );

          if (!exists) {
            state.bookings.unshift(createdBooking);
          }
        }
      )

      .addCase(
        createBooking.rejected,
        (state, action) => {
          state.createLoading = false;

          state.createError =
            action.payload ||
            action.error?.message ||
            "Unable to create booking.";
        }
      );

    /* ===============================================
       GET MY BOOKINGS
    =============================================== */

    builder
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getMyBookings.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.bookings = Array.isArray(
            action.payload?.bookings
          )
            ? action.payload.bookings
            : [];
        }
      )

      .addCase(
        getMyBookings.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            action.error?.message ||
            "Unable to fetch your bookings.";
        }
      );

    /* ===============================================
       GET SINGLE BOOKING
    =============================================== */

    builder
      .addCase(getBookingById.pending, (state) => {
        state.bookingLoading = true;
        state.bookingError = null;
      })

      .addCase(
        getBookingById.fulfilled,
        (state, action) => {
          state.bookingLoading = false;
          state.bookingError = null;

          state.booking =
            action.payload?.booking || null;
        }
      )

      .addCase(
        getBookingById.rejected,
        (state, action) => {
          state.bookingLoading = false;

          state.bookingError =
            action.payload ||
            action.error?.message ||
            "Unable to fetch booking details.";
        }
      );

    /* ===============================================
       CANCEL BOOKING
    =============================================== */

    builder
      .addCase(cancelBooking.pending, (state) => {
        state.cancelLoading = true;
        state.cancelError = null;
        state.cancelSuccess = null;
      })

      .addCase(
        cancelBooking.fulfilled,
        (state, action) => {
          state.cancelLoading = false;
          state.cancelError = null;

          state.cancelSuccess =
            action.payload?.message ||
            "Booking cancellation request completed.";

          const cancelledBooking =
            action.payload?.booking;

          if (!cancelledBooking) return;

          state.booking = cancelledBooking;

          const index = state.bookings.findIndex(
            (item) =>
              item?._id === cancelledBooking?._id
          );

          if (index !== -1) {
            state.bookings[index] =
              cancelledBooking;
          }
        }
      )

      .addCase(
        cancelBooking.rejected,
        (state, action) => {
          state.cancelLoading = false;

          state.cancelError =
            action.payload ||
            action.error?.message ||
            "Unable to cancel booking.";
        }
      );
  },
});

/* =====================================================
   ACTIONS
===================================================== */

export const {
  clearBookingErrors,
  clearCreateBookingError,
  clearBookingsError,
  clearBookingError,
  clearCancelBookingError,
  clearCurrentBooking,
  resetBookingState,
} = bookingSlice.actions;

/* =====================================================
   SELECTORS
===================================================== */

export const selectBookings = (state) =>
  state.booking?.bookings || [];

export const selectBooking = (state) =>
  state.booking?.booking || null;

/* Loading selectors */

export const selectBookingsLoading = (state) =>
  state.booking?.loading || false;

export const selectBookingLoading = (state) =>
  state.booking?.bookingLoading || false;

export const selectCreateBookingLoading = (state) =>
  state.booking?.createLoading || false;

export const selectCancelBookingLoading = (state) =>
  state.booking?.cancelLoading || false;

/* Error selectors */

export const selectBookingError = (state) =>
  state.booking?.error || null;

export const selectSingleBookingError = (state) =>
  state.booking?.bookingError || null;

export const selectCreateBookingError = (state) =>
  state.booking?.createError || null;

export const selectCancelBookingError = (state) =>
  state.booking?.cancelError || null;

/* Success selectors */

export const selectCreateBookingSuccess = (state) =>
  state.booking?.createSuccess || null;

export const selectCancelBookingSuccess = (state) =>
  state.booking?.cancelSuccess || null;

/* =====================================================
   DEFAULT EXPORT
===================================================== */

export default bookingSlice.reducer;