
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const API_URL = import.meta.env.VITE_API_URL;

// /* =====================================================
//    CREATE BOOKING
// ===================================================== */

// export const createBooking = createAsyncThunk(
//   "bookings/createBooking",

//   async (bookingData, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/bookings`,
//         {
//           method: "POST",
//           credentials: "include",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify(bookingData),
//         }
//       );

//       let data = {};

//       try {
//         data = await response.json();
//       } catch {
//         data = {};
//       }

//       if (!response.ok) {
//         return rejectWithValue(
//           data?.message ||
//             "Unable to create booking."
//         );
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error?.message ||
//           "Unable to connect to server."
//       );
//     }
//   }
// );

// /* =====================================================
//    GET MY BOOKINGS
// ===================================================== */

// export const getMyBookings = createAsyncThunk(
//   "bookings/getMyBookings",

//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/bookings/my`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );

//       let data = {};

//       try {
//         data = await response.json();
//       } catch {
//         data = {};
//       }

//       if (!response.ok) {
//         return rejectWithValue(
//           data?.message ||
//             "Unable to fetch bookings."
//         );
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error?.message ||
//           "Unable to connect to server."
//       );
//     }
//   }
// );

// /* =====================================================
//    GET SINGLE BOOKING
// ===================================================== */

// export const getBookingById = createAsyncThunk(
//   "bookings/getBookingById",

//   async (id, { rejectWithValue }) => {
//     try {
//       if (!id) {
//         return rejectWithValue(
//           "Booking ID is required."
//         );
//       }

//       const response = await fetch(
//         `${API_URL}/bookings/${id}`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );

//       let data = {};

//       try {
//         data = await response.json();
//       } catch {
//         data = {};
//       }

//       if (!response.ok) {
//         return rejectWithValue(
//           data?.message ||
//             "Unable to fetch booking."
//         );
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error?.message ||
//           "Unable to connect to server."
//       );
//     }
//   }
// );

// /* =====================================================
//    CANCEL BOOKING
// ===================================================== */

// export const cancelBooking = createAsyncThunk(
//   "bookings/cancelBooking",

//   async (
//     { id, reason = "" },
//     { rejectWithValue }
//   ) => {
//     try {
//       if (!id) {
//         return rejectWithValue(
//           "Booking ID is required."
//         );
//       }

//       const response = await fetch(
//         `${API_URL}/bookings/${id}/cancel`,
//         {
//           method: "PATCH",
//           credentials: "include",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify({
//             reason,
//           }),
//         }
//       );

//       let data = {};

//       try {
//         data = await response.json();
//       } catch {
//         data = {};
//       }

//       if (!response.ok) {
//         return rejectWithValue(
//           data?.message ||
//             "Unable to cancel booking."
//         );
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error?.message ||
//           "Unable to connect to server."
//       );
//     }
//   }
// );

// /* =====================================================
//    INITIAL STATE
// ===================================================== */

// const initialState = {
//   bookings: [],
//   booking: null,

//   loading: false,
//   bookingLoading: false,
//   createLoading: false,
//   cancelLoading: false,

//   error: null,
//   bookingError: null,
//   createError: null,
//   cancelError: null,
// };

// /* =====================================================
//    SLICE
// ===================================================== */

// const bookingSlice = createSlice({
//   name: "bookings",

//   initialState,

//   reducers: {
//     clearBookingError: (state) => {
//       state.error = null;
//     },

//     clearBookingDetails: (state) => {
//       state.booking = null;
//       state.bookingError = null;
//     },

//     clearCreateBookingError: (state) => {
//       state.createError = null;
//     },

//     clearCancelBookingError: (state) => {
//       state.cancelError = null;
//     },

//     clearAllBookingErrors: (state) => {
//       state.error = null;
//       state.bookingError = null;
//       state.createError = null;
//       state.cancelError = null;
//     },
//   },

//   extraReducers: (builder) => {

//     /* =================================================
//        CREATE BOOKING
//     ================================================= */

//     builder

//       .addCase(
//         createBooking.pending,
//         (state) => {
//           state.createLoading = true;
//           state.createError = null;
//         }
//       )

//       .addCase(
//         createBooking.fulfilled,
//         (state, action) => {
//           state.createLoading = false;
//           state.createError = null;

//           const createdBooking =
//             action.payload?.booking;

//           state.booking =
//             createdBooking || null;

//           if (createdBooking) {
//             const existingIndex =
//               state.bookings.findIndex(
//                 (item) =>
//                   item?._id ===
//                   createdBooking?._id
//               );

//             if (existingIndex === -1) {
//               state.bookings.unshift(
//                 createdBooking
//               );
//             } else {
//               state.bookings[
//                 existingIndex
//               ] = createdBooking;
//             }
//           }
//         }
//       )

//       .addCase(
//         createBooking.rejected,
//         (state, action) => {
//           state.createLoading = false;

//           state.createError =
//             action.payload ||
//             "Unable to create booking.";
//         }
//       );

//     /* =================================================
//        GET MY BOOKINGS
//     ================================================= */

//     builder

//       .addCase(
//         getMyBookings.pending,
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )

//       .addCase(
//         getMyBookings.fulfilled,
//         (state, action) => {
//           state.loading = false;
//           state.error = null;

//           state.bookings =
//             Array.isArray(
//               action.payload?.bookings
//             )
//               ? action.payload.bookings
//               : [];
//         }
//       )

//       .addCase(
//         getMyBookings.rejected,
//         (state, action) => {
//           state.loading = false;

//           state.error =
//             action.payload ||
//             "Unable to fetch bookings.";
//         }
//       );

//     /* =================================================
//        GET SINGLE BOOKING
//     ================================================= */

//     builder

//       .addCase(
//         getBookingById.pending,
//         (state) => {
//           state.bookingLoading = true;
//           state.bookingError = null;
//         }
//       )

//       .addCase(
//         getBookingById.fulfilled,
//         (state, action) => {
//           state.bookingLoading = false;
//           state.bookingError = null;

//           state.booking =
//             action.payload?.booking ||
//             null;
//         }
//       )

//       .addCase(
//         getBookingById.rejected,
//         (state, action) => {
//           state.bookingLoading = false;

//           state.bookingError =
//             action.payload ||
//             "Unable to fetch booking.";
//         }
//       );

//     /* =================================================
//        CANCEL BOOKING
//     ================================================= */

//     builder

//       .addCase(
//         cancelBooking.pending,
//         (state) => {
//           state.cancelLoading = true;
//           state.cancelError = null;
//         }
//       )

//       .addCase(
//         cancelBooking.fulfilled,
//         (state, action) => {
//           state.cancelLoading = false;
//           state.cancelError = null;

//           const updatedBooking =
//             action.payload?.booking;

//           if (!updatedBooking) {
//             return;
//           }

//           state.booking =
//             updatedBooking;

//           const index =
//             state.bookings.findIndex(
//               (item) =>
//                 item?._id ===
//                 updatedBooking?._id
//             );

//           if (index !== -1) {
//             state.bookings[index] =
//               updatedBooking;
//           }
//         }
//       )

//       .addCase(
//         cancelBooking.rejected,
//         (state, action) => {
//           state.cancelLoading = false;

//           state.cancelError =
//             action.payload ||
//             "Unable to cancel booking.";
//         }
//       );
//   },
// });

// /* =====================================================
//    ACTIONS
// ===================================================== */

// export const {
//   clearBookingError,
//   clearBookingDetails,
//   clearCreateBookingError,
//   clearCancelBookingError,
//   clearAllBookingErrors,
// } = bookingSlice.actions;

// /* =====================================================
//    SELECTORS
// ===================================================== */

// export const selectBookings = (state) =>
//   state.bookings?.bookings || [];

// export const selectBooking = (state) =>
//   state.bookings?.booking || null;

// export const selectBookingsLoading = (state) =>
//   state.bookings?.loading || false;

// export const selectBookingLoading = (state) =>
//   state.bookings?.bookingLoading || false;

// export const selectCreateBookingLoading = (
//   state
// ) =>
//   state.bookings?.createLoading || false;

// export const selectCancelBookingLoading = (
//   state
// ) =>
//   state.bookings?.cancelLoading || false;

// export const selectBookingError = (state) =>
//   state.bookings?.error || null;

// export const selectBookingDetailsError = (
//   state
// ) =>
//   state.bookings?.bookingError || null;

// export const selectCreateBookingError = (
//   state
// ) =>
//   state.bookings?.createError || null;

// export const selectCancelBookingError = (
//   state
// ) =>
//   state.bookings?.cancelError || null;

// /* =====================================================
//    DEFAULT EXPORT
// ===================================================== */





import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

/* =====================================================
   API URL
===================================================== */

const API_URL =
  import.meta.env.VITE_API_URL;

/* =====================================================
   HELPER
===================================================== */

const getErrorMessage = async (response) => {
  try {
    const data =
      await response.json();

    return (
      data?.message ||
      "Something went wrong."
    );
  } catch {
    return "Something went wrong.";
  }
};

/* =====================================================
   CREATE BOOKING
   POST /api/bookings
===================================================== */

export const createBooking =
  createAsyncThunk(
    "booking/createBooking",
    async (
      bookingData,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await fetch(
            `${API_URL}/bookings`,
            {
              method: "POST",

              credentials:
                "include",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                bookingData
              ),
            }
          );

        if (!response.ok) {
          return rejectWithValue(
            await getErrorMessage(
              response
            )
          );
        }

        const data =
          await response.json();

        return data;
      } catch (error) {
        return rejectWithValue(
          error.message ||
            "Unable to create booking."
        );
      }
    }
  );

/* =====================================================
   GET MY BOOKINGS
   GET /api/bookings/my
===================================================== */

export const getMyBookings =
  createAsyncThunk(
    "booking/getMyBookings",
    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await fetch(
            `${API_URL}/bookings/my`,
            {
              method: "GET",

              credentials:
                "include",

              headers: {
                "Content-Type":
                  "application/json",
              },
            }
          );

        if (!response.ok) {
          return rejectWithValue(
            await getErrorMessage(
              response
            )
          );
        }

        const data =
          await response.json();

        return data;
      } catch (error) {
        return rejectWithValue(
          error.message ||
            "Unable to fetch bookings."
        );
      }
    }
  );

/* =====================================================
   GET BOOKING BY ID
   GET /api/bookings/:id
===================================================== */

export const getBookingById =
  createAsyncThunk(
    "booking/getBookingById",
    async (
      bookingId,
      { rejectWithValue }
    ) => {
      try {
        if (!bookingId) {
          return rejectWithValue(
            "Booking ID is required."
          );
        }

        const response =
          await fetch(
            `${API_URL}/bookings/${bookingId}`,
            {
              method: "GET",

              credentials:
                "include",

              headers: {
                "Content-Type":
                  "application/json",
              },
            }
          );

        if (!response.ok) {
          return rejectWithValue(
            await getErrorMessage(
              response
            )
          );
        }

        const data =
          await response.json();

        return data;
      } catch (error) {
        return rejectWithValue(
          error.message ||
            "Unable to fetch booking."
        );
      }
    }
  );

/* =====================================================
   CANCEL BOOKING
   PATCH /api/bookings/:id/cancel
===================================================== */

export const cancelBooking =
  createAsyncThunk(
    "booking/cancelBooking",
    async (
      payload,
      { rejectWithValue }
    ) => {
      try {
        const bookingId =
          typeof payload ===
          "string"
            ? payload
            : payload?.bookingId;

        const reason =
          typeof payload ===
          "object"
            ? payload?.reason
            : "";

        if (!bookingId) {
          return rejectWithValue(
            "Booking ID is required."
          );
        }

        const response =
          await fetch(
            `${API_URL}/bookings/${bookingId}/cancel`,
            {
              method: "PATCH",

              credentials:
                "include",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                reason:
                  reason || "",
              }),
            }
          );

        if (!response.ok) {
          return rejectWithValue(
            await getErrorMessage(
              response
            )
          );
        }

        const data =
          await response.json();

        return data;
      } catch (error) {
        return rejectWithValue(
          error.message ||
            "Unable to cancel booking."
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

const bookingSlice =
  createSlice({
    name: "booking",

    initialState,

    reducers: {
      /* -----------------------------------------------
         CLEAR ALL ERRORS
      ----------------------------------------------- */

      clearBookingErrors: (
        state
      ) => {
        state.error = null;
        state.bookingError = null;
        state.createError = null;
        state.cancelError = null;
      },

      /* -----------------------------------------------
         CLEAR CREATE ERROR
      ----------------------------------------------- */

      clearCreateBookingError: (
        state
      ) => {
        state.createError = null;
      },

      /* -----------------------------------------------
         CLEAR BOOKING ERROR
      ----------------------------------------------- */

      clearBookingError: (
        state
      ) => {
        state.bookingError = null;
      },

      /* -----------------------------------------------
         CLEAR CANCEL ERROR
      ----------------------------------------------- */

      clearCancelBookingError: (
        state
      ) => {
        state.cancelError = null;
      },

      /* -----------------------------------------------
         CLEAR CURRENT BOOKING
      ----------------------------------------------- */

      clearCurrentBooking: (
        state
      ) => {
        state.booking = null;
      },

      /* -----------------------------------------------
         RESET BOOKING STATE
      ----------------------------------------------- */

      resetBookingState: (
        state
      ) => {
        state.bookings = [];
        state.booking = null;

        state.loading = false;
        state.bookingLoading = false;
        state.createLoading = false;
        state.cancelLoading = false;

        state.error = null;
        state.bookingError = null;
        state.createError = null;
        state.cancelError = null;
      },
    },

    /* =================================================
       EXTRA REDUCERS
    ================================================= */

    extraReducers: (
      builder
    ) => {
      /* ===============================================
         CREATE BOOKING
      =============================================== */

      builder

        .addCase(
          createBooking.pending,
          (state) => {
            state.createLoading =
              true;

            state.createError =
              null;

            state.error = null;
          }
        )

        .addCase(
          createBooking.fulfilled,
          (
            state,
            action
          ) => {
            state.createLoading =
              false;

            state.createError =
              null;

            const createdBooking =
              action.payload
                ?.booking;

            if (
              createdBooking
            ) {
              state.booking =
                createdBooking;

              state.bookings.unshift(
                createdBooking
              );
            }
          }
        )

        .addCase(
          createBooking.rejected,
          (
            state,
            action
          ) => {
            state.createLoading =
              false;

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

        .addCase(
          getMyBookings.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          }
        )

        .addCase(
          getMyBookings.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error = null;

            state.bookings =
              action.payload
                ?.bookings || [];
          }
        )

        .addCase(
          getMyBookings.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              action.error?.message ||
              "Unable to fetch bookings.";
          }
        );

      /* ===============================================
         GET SINGLE BOOKING
      =============================================== */

      builder

        .addCase(
          getBookingById.pending,
          (state) => {
            state.bookingLoading =
              true;

            state.bookingError =
              null;
          }
        )

        .addCase(
          getBookingById.fulfilled,
          (
            state,
            action
          ) => {
            state.bookingLoading =
              false;

            state.bookingError =
              null;

            state.booking =
              action.payload
                ?.booking || null;
          }
        )

        .addCase(
          getBookingById.rejected,
          (
            state,
            action
          ) => {
            state.bookingLoading =
              false;

            state.bookingError =
              action.payload ||
              action.error?.message ||
              "Unable to fetch booking.";
          }
        );

      /* ===============================================
         CANCEL BOOKING
      =============================================== */

      builder

        .addCase(
          cancelBooking.pending,
          (state) => {
            state.cancelLoading =
              true;

            state.cancelError =
              null;
          }
        )

        .addCase(
          cancelBooking.fulfilled,
          (
            state,
            action
          ) => {
            state.cancelLoading =
              false;

            state.cancelError =
              null;

            const cancelledBooking =
              action.payload
                ?.booking;

            if (
              cancelledBooking
            ) {
              state.booking =
                cancelledBooking;

              const index =
                state.bookings.findIndex(
                  (item) =>
                    item._id ===
                    cancelledBooking._id
                );

              if (index !== -1) {
                state.bookings[
                  index
                ] =
                  cancelledBooking;
              }
            }
          }
        )

        .addCase(
          cancelBooking.rejected,
          (
            state,
            action
          ) => {
            state.cancelLoading =
              false;

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
  clearBookingError,
  clearCancelBookingError,
  clearCurrentBooking,
  resetBookingState,
} =
  bookingSlice.actions;

/* =====================================================
   SELECTORS
===================================================== */

export const selectBookings = (
  state
) =>
  state.booking?.bookings || [];

export const selectBooking = (
  state
) =>
  state.booking?.booking || null;

export const selectBookingLoading = (
  state
) =>
  state.booking?.bookingLoading ||
  false;

export const selectBookingsLoading = (
  state
) =>
  state.booking?.loading ||
  false;

export const selectCreateBookingLoading = (
  state
) =>
  state.booking?.createLoading ||
  false;

export const selectCancelBookingLoading = (
  state
) =>
  state.booking?.cancelLoading ||
  false;

export const selectBookingError = (
  state
) =>
  state.booking?.error || null;

export const selectSingleBookingError = (
  state
) =>
  state.booking?.bookingError ||
  null;

export const selectCreateBookingError = (
  state
) =>
  state.booking?.createError ||
  null;

export const selectCancelBookingError = (
  state
) =>
  state.booking?.cancelError ||
  null;

/* =====================================================
   EXPORT REDUCER
===================================================== */


export default bookingSlice.reducer;
