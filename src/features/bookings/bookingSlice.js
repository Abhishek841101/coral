


// import {
//   createAsyncThunk,
//   createSlice,
// } from "@reduxjs/toolkit";

// /* =====================================================
//    API URL
// ===================================================== */

// const API_URL =
//   import.meta.env.VITE_API_URL;

// /* =====================================================
//    HELPER
// ===================================================== */

// const getErrorMessage = async (response) => {
//   try {
//     const data = await response.json();

//     return (
//       data?.message ||
//       "Something went wrong."
//     );
//   } catch {
//     return "Something went wrong.";
//   }
// };

// /* =====================================================
//    CREATE BOOKING
//    POST /api/bookings

//    New booking is created as PENDING.
//    No online payment.
// ===================================================== */

// export const createBooking =
//   createAsyncThunk(
//     "booking/createBooking",

//     async (
//       bookingData,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response =
//           await fetch(
//             `${API_URL}/bookings`,
//             {
//               method: "POST",

//               credentials: "include",

//               headers: {
//                 "Content-Type":
//                   "application/json",
//               },

//               body: JSON.stringify(
//                 bookingData
//               ),
//             }
//           );

//         if (!response.ok) {
//           return rejectWithValue(
//             await getErrorMessage(
//               response
//             )
//           );
//         }

//         const data =
//           await response.json();

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error?.message ||
//             "Unable to create booking."
//         );
//       }
//     }
//   );

// /* =====================================================
//    GET MY BOOKINGS
//    GET /api/bookings/my
// ===================================================== */

// export const getMyBookings =
//   createAsyncThunk(
//     "booking/getMyBookings",

//     async (
//       _,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response =
//           await fetch(
//             `${API_URL}/bookings/my`,
//             {
//               method: "GET",

//               credentials: "include",

//               headers: {
//                 "Content-Type":
//                   "application/json",
//               },
//             }
//           );

//         if (!response.ok) {
//           return rejectWithValue(
//             await getErrorMessage(
//               response
//             )
//           );
//         }

//         const data =
//           await response.json();

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error?.message ||
//             "Unable to fetch bookings."
//         );
//       }
//     }
//   );

// /* =====================================================
//    GET BOOKING BY ID
//    GET /api/bookings/:id
// ===================================================== */

// export const getBookingById =
//   createAsyncThunk(
//     "booking/getBookingById",

//     async (
//       bookingId,
//       { rejectWithValue }
//     ) => {
//       try {
//         if (!bookingId) {
//           return rejectWithValue(
//             "Booking ID is required."
//           );
//         }

//         const response =
//           await fetch(
//             `${API_URL}/bookings/${bookingId}`,
//             {
//               method: "GET",

//               credentials: "include",

//               headers: {
//                 "Content-Type":
//                   "application/json",
//               },
//             }
//           );

//         if (!response.ok) {
//           return rejectWithValue(
//             await getErrorMessage(
//               response
//             )
//           );
//         }

//         const data =
//           await response.json();

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error?.message ||
//             "Unable to fetch booking."
//         );
//       }
//     }
//   );

// /* =====================================================
//    CANCEL BOOKING
//    PATCH /api/bookings/:id/cancel
// ===================================================== */

// export const cancelBooking =
//   createAsyncThunk(
//     "booking/cancelBooking",

//     async (
//       payload,
//       { rejectWithValue }
//     ) => {
//       try {
//         const bookingId =
//           typeof payload === "string"
//             ? payload
//             : payload?.bookingId;

//         const reason =
//           typeof payload === "object"
//             ? payload?.reason
//             : "";

//         if (!bookingId) {
//           return rejectWithValue(
//             "Booking ID is required."
//           );
//         }

//         const response =
//           await fetch(
//             `${API_URL}/bookings/${bookingId}/cancel`,
//             {
//               method: "PATCH",

//               credentials: "include",

//               headers: {
//                 "Content-Type":
//                   "application/json",
//               },

//               body: JSON.stringify({
//                 reason:
//                   reason || "",
//               }),
//             }
//           );

//         if (!response.ok) {
//           return rejectWithValue(
//             await getErrorMessage(
//               response
//             )
//           );
//         }

//         const data =
//           await response.json();

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error?.message ||
//             "Unable to cancel booking."
//         );
//       }
//     }
//   );

// /* =====================================================
//    ADMIN APPROVE BOOKING

//    PATCH /api/bookings/:id/approve

//    Admin uses this after:
//    - Reviewing booking
//    - Contacting customer
//    - Handling payment separately

//    Result:
//    status = confirmed
// ===================================================== */

// export const approveBooking =
//   createAsyncThunk(
//     "booking/approveBooking",

//     async (
//       payload,
//       { rejectWithValue }
//     ) => {
//       try {
//         const bookingId =
//           typeof payload === "string"
//             ? payload
//             : payload?.bookingId;

//         if (!bookingId) {
//           return rejectWithValue(
//             "Booking ID is required."
//           );
//         }

//         const response =
//           await fetch(
//             `${API_URL}/bookings/${bookingId}/approve`,
//             {
//               method: "PATCH",

//               credentials: "include",

//               headers: {
//                 "Content-Type":
//                   "application/json",
//               },
//             }
//           );

//         if (!response.ok) {
//           return rejectWithValue(
//             await getErrorMessage(
//               response
//             )
//           );
//         }

//         const data =
//           await response.json();

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error?.message ||
//             "Unable to approve booking."
//         );
//       }
//     }
//   );

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

//   approveLoading: false,

//   error: null,

//   bookingError: null,

//   createError: null,

//   cancelError: null,

//   approveError: null,
// };

// /* =====================================================
//    SLICE
// ===================================================== */

// const bookingSlice =
//   createSlice({
//     name: "booking",

//     initialState,

//     reducers: {
//       /* -----------------------------------------------
//          CLEAR ALL ERRORS
//       ----------------------------------------------- */

//       clearBookingErrors: (
//         state
//       ) => {
//         state.error = null;
//         state.bookingError = null;
//         state.createError = null;
//         state.cancelError = null;
//         state.approveError = null;
//       },

//       /* -----------------------------------------------
//          CLEAR CREATE ERROR
//       ----------------------------------------------- */

//       clearCreateBookingError: (
//         state
//       ) => {
//         state.createError = null;
//       },

//       /* -----------------------------------------------
//          CLEAR BOOKING ERROR
//       ----------------------------------------------- */

//       clearBookingError: (
//         state
//       ) => {
//         state.bookingError = null;
//       },

//       /* -----------------------------------------------
//          CLEAR CANCEL ERROR
//       ----------------------------------------------- */

//       clearCancelBookingError: (
//         state
//       ) => {
//         state.cancelError = null;
//       },

//       /* -----------------------------------------------
//          CLEAR APPROVE ERROR
//       ----------------------------------------------- */

//       clearApproveBookingError: (
//         state
//       ) => {
//         state.approveError = null;
//       },

//       /* -----------------------------------------------
//          CLEAR CURRENT BOOKING
//       ----------------------------------------------- */

//       clearCurrentBooking: (
//         state
//       ) => {
//         state.booking = null;
//       },

//       /* -----------------------------------------------
//          RESET BOOKING STATE
//       ----------------------------------------------- */

//       resetBookingState: (
//         state
//       ) => {
//         state.bookings = [];
//         state.booking = null;

//         state.loading = false;
//         state.bookingLoading = false;
//         state.createLoading = false;
//         state.cancelLoading = false;
//         state.approveLoading = false;

//         state.error = null;
//         state.bookingError = null;
//         state.createError = null;
//         state.cancelError = null;
//         state.approveError = null;
//       },
//     },

//     /* =================================================
//        EXTRA REDUCERS
//     ================================================= */

//     extraReducers: (
//       builder
//     ) => {

//       /* ===============================================
//          CREATE BOOKING
//       =============================================== */

//       builder

//         .addCase(
//           createBooking.pending,
//           (state) => {
//             state.createLoading = true;
//             state.createError = null;
//             state.error = null;
//           }
//         )

//         .addCase(
//           createBooking.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.createLoading = false;
//             state.createError = null;

//             const createdBooking =
//               action.payload
//                 ?.booking;

//             if (
//               createdBooking
//             ) {
//               state.booking =
//                 createdBooking;

//               state.bookings.unshift(
//                 createdBooking
//               );
//             }
//           }
//         )

//         .addCase(
//           createBooking.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.createLoading = false;

//             state.createError =
//               action.payload ||
//               action.error?.message ||
//               "Unable to create booking.";
//           }
//         );

//       /* ===============================================
//          GET MY BOOKINGS
//       =============================================== */

//       builder

//         .addCase(
//           getMyBookings.pending,
//           (state) => {
//             state.loading = true;
//             state.error = null;
//           }
//         )

//         .addCase(
//           getMyBookings.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;
//             state.error = null;

//             state.bookings =
//               Array.isArray(
//                 action.payload
//                   ?.bookings
//               )
//                 ? action.payload.bookings
//                 : [];
//           }
//         )

//         .addCase(
//           getMyBookings.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;

//             state.error =
//               action.payload ||
//               action.error?.message ||
//               "Unable to fetch bookings.";
//           }
//         );

//       /* ===============================================
//          GET SINGLE BOOKING
//       =============================================== */

//       builder

//         .addCase(
//           getBookingById.pending,
//           (state) => {
//             state.bookingLoading = true;
//             state.bookingError = null;
//           }
//         )

//         .addCase(
//           getBookingById.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.bookingLoading = false;
//             state.bookingError = null;

//             state.booking =
//               action.payload
//                 ?.booking || null;
//           }
//         )

//         .addCase(
//           getBookingById.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.bookingLoading = false;

//             state.bookingError =
//               action.payload ||
//               action.error?.message ||
//               "Unable to fetch booking.";
//           }
//         );

//       /* ===============================================
//          CANCEL BOOKING
//       =============================================== */

//       builder

//         .addCase(
//           cancelBooking.pending,
//           (state) => {
//             state.cancelLoading = true;
//             state.cancelError = null;
//           }
//         )

//         .addCase(
//           cancelBooking.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.cancelLoading = false;
//             state.cancelError = null;

//             const cancelledBooking =
//               action.payload
//                 ?.booking;

//             if (
//               cancelledBooking
//             ) {
//               state.booking =
//                 cancelledBooking;

//               const index =
//                 state.bookings.findIndex(
//                   (item) =>
//                     item?._id ===
//                     cancelledBooking?._id
//                 );

//               if (index !== -1) {
//                 state.bookings[index] =
//                   cancelledBooking;
//               }
//             }
//           }
//         )

//         .addCase(
//           cancelBooking.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.cancelLoading = false;

//             state.cancelError =
//               action.payload ||
//               action.error?.message ||
//               "Unable to cancel booking.";
//           }
//         );

//       /* ===============================================
//          APPROVE BOOKING
//       =============================================== */

//       builder

//         .addCase(
//           approveBooking.pending,
//           (state) => {
//             state.approveLoading = true;
//             state.approveError = null;
//           }
//         )

//         .addCase(
//           approveBooking.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.approveLoading = false;
//             state.approveError = null;

//             const approvedBooking =
//               action.payload
//                 ?.booking;

//             if (
//               approvedBooking
//             ) {
//               state.booking =
//                 approvedBooking;

//               const index =
//                 state.bookings.findIndex(
//                   (item) =>
//                     item?._id ===
//                     approvedBooking?._id
//                 );

//               if (index !== -1) {
//                 state.bookings[index] =
//                   approvedBooking;
//               } else {
//                 state.bookings.unshift(
//                   approvedBooking
//                 );
//               }
//             }
//           }
//         )

//         .addCase(
//           approveBooking.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.approveLoading = false;

//             state.approveError =
//               action.payload ||
//               action.error?.message ||
//               "Unable to approve booking.";
//           }
//         );
//     },
//   });

// /* =====================================================
//    ACTIONS
// ===================================================== */

// export const {
//   clearBookingErrors,
//   clearCreateBookingError,
//   clearBookingError,
//   clearCancelBookingError,
//   clearApproveBookingError,
//   clearCurrentBooking,
//   resetBookingState,
// } =
//   bookingSlice.actions;

// /* =====================================================
//    SELECTORS
// ===================================================== */

// export const selectBookings = (
//   state
// ) =>
//   state.booking?.bookings || [];

// export const selectBooking = (
//   state
// ) =>
//   state.booking?.booking || null;

// export const selectBookingLoading = (
//   state
// ) =>
//   state.booking?.bookingLoading ||
//   false;

// export const selectBookingsLoading = (
//   state
// ) =>
//   state.booking?.loading ||
//   false;

// export const selectCreateBookingLoading = (
//   state
// ) =>
//   state.booking?.createLoading ||
//   false;

// export const selectCancelBookingLoading = (
//   state
// ) =>
//   state.booking?.cancelLoading ||
//   false;

// export const selectApproveBookingLoading = (
//   state
// ) =>
//   state.booking?.approveLoading ||
//   false;

// export const selectBookingError = (
//   state
// ) =>
//   state.booking?.error ||
//   null;

// export const selectSingleBookingError = (
//   state
// ) =>
//   state.booking?.bookingError ||
//   null;

// export const selectCreateBookingError = (
//   state
// ) =>
//   state.booking?.createError ||
//   null;

// export const selectCancelBookingError = (
//   state
// ) =>
//   state.booking?.cancelError ||
//   null;

// export const selectApproveBookingError = (
//   state
// ) =>
//   state.booking?.approveError ||
//   null;

// /* =====================================================
//    DEFAULT EXPORT
// ===================================================== */

// export default bookingSlice.reducer;













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
const data = await response.json();

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

Customer creates a booking request.

Backend result:
status = pending

No online payment.
No automatic tax.
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

          credentials: "include",

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
      error?.message ||
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

          credentials: "include",

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
      error?.message ||
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

          credentials: "include",

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
      error?.message ||
        "Unable to fetch booking."
    );
  }
}

);

/* =====================================================
CANCEL BOOKING
PATCH /api/bookings/:id/cancel

Compatibility action.

Stage 1:
Customer cancellation UI should not
be exposed yet.

Backend route is retained for compatibility.
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
      typeof payload === "string"
        ? payload
        : payload?.bookingId;

    const reason =
      typeof payload === "object"
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

          credentials: "include",

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
      error?.message ||
        "Unable to cancel booking."
    );
  }
}

);

/* =====================================================
INITIAL STATE
===================================================== */

const initialState = {
/* ================= BOOKINGS ================= */

bookings: [],

booking: null,

/* ================= LOADING ================= */

loading: false,

bookingLoading: false,

createLoading: false,

cancelLoading: false,

/* ================= ERRORS ================= */

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
  /* ===============================================
     CLEAR ALL BOOKING ERRORS
  =============================================== */

  clearBookingErrors: (
    state
  ) => {
    state.error = null;

    state.bookingError = null;

    state.createError = null;

    state.cancelError = null;
  },

  /* ===============================================
     CLEAR CREATE BOOKING ERROR
  =============================================== */

  clearCreateBookingError: (
    state
  ) => {
    state.createError = null;
  },

  /* ===============================================
     CLEAR SINGLE BOOKING ERROR
  =============================================== */

  clearBookingError: (
    state
  ) => {
    state.bookingError = null;
  },

  /* ===============================================
     CLEAR CANCEL BOOKING ERROR
  =============================================== */

  clearCancelBookingError: (
    state
  ) => {
    state.cancelError = null;
  },

  /* ===============================================
     CLEAR CURRENT BOOKING
  =============================================== */

  clearCurrentBooking: (
    state
  ) => {
    state.booking = null;
  },

  /* ===============================================
     RESET BOOKING STATE
  =============================================== */

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
        state.createLoading = true;

        state.createError = null;

        state.error = null;
      }
    )

    .addCase(
      createBooking.fulfilled,
      (
        state,
        action
      ) => {
        state.createLoading = false;

        state.createError = null;

        const createdBooking =
          action.payload
            ?.booking;

        if (
          createdBooking
        ) {
          state.booking =
            createdBooking;

          /*
            Prevent accidental duplicate
            entry if backend/client somehow
            returns the same booking.
          */

          const exists =
            state.bookings.some(
              (item) =>
                item?._id ===
                createdBooking?._id
            );

          if (!exists) {
            state.bookings.unshift(
              createdBooking
            );
          }
        }
      }
    )

    .addCase(
      createBooking.rejected,
      (
        state,
        action
      ) => {
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
          Array.isArray(
            action.payload
              ?.bookings
          )
            ? action.payload.bookings
            : [];
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
        state.bookingLoading = true;

        state.bookingError = null;
      }
    )

    .addCase(
      getBookingById.fulfilled,
      (
        state,
        action
      ) => {
        state.bookingLoading = false;

        state.bookingError = null;

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
        state.bookingLoading = false;

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
        state.cancelLoading = true;

        state.cancelError = null;
      }
    )

    .addCase(
      cancelBooking.fulfilled,
      (
        state,
        action
      ) => {
        state.cancelLoading = false;

        state.cancelError = null;

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
                item?._id ===
                cancelledBooking?._id
            );

          if (index !== -1) {
            state.bookings[index] =
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

/* =====================================================
CURRENT BOOKING
===================================================== */

export const selectBooking = (
state
) =>
state.booking?.booking || null;

/* =====================================================
LOADING
===================================================== */

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

/* =====================================================
ERRORS
===================================================== */

export const selectBookingError = (
state
) =>
state.booking?.error ||
null;

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
DEFAULT EXPORT
===================================================== */

export default bookingSlice.reducer;