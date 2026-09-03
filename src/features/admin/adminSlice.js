// import {
//   createAsyncThunk,
//   createSlice,
// } from "@reduxjs/toolkit";

// const API_URL = import.meta.env.VITE_API_URL;

// /* =====================================================
//    HELPER
// ===================================================== */

// const getErrorMessage = async (response, fallback) => {
//   try {
//     const data = await response.json();

//     return (
//       data?.message ||
//       fallback
//     );
//   } catch {
//     return fallback;
//   }
// };

// /* =====================================================
//    ADMIN LOGIN
//    POST /api/admin/login
// ===================================================== */

// export const adminLogin = createAsyncThunk(
//   "admin/adminLogin",
//   async (
//     { email, password },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/admin/login`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: email.trim().toLowerCase(),
//             password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(
//           data.message ||
//             "Admin login failed."
//         );
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.message ||
//           "Unable to connect to server."
//       );
//     }
//   }
// );

// /* =====================================================
//    GET ADMIN ME
//    GET /api/admin/me
// ===================================================== */

// export const getAdminMe = createAsyncThunk(
//   "admin/getAdminMe",
//   async (
//     _,
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/admin/me`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(
//           data.message ||
//             "Unable to fetch admin."
//         );
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.message ||
//           "Unable to connect to server."
//       );
//     }
//   }
// );

// /* =====================================================
//    ADMIN LOGOUT
//    POST /api/admin/logout
// ===================================================== */

// export const adminLogout = createAsyncThunk(
//   "admin/adminLogout",
//   async (
//     _,
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/admin/logout`,
//         {
//           method: "POST",
//           credentials: "include",
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(
//           data.message ||
//             "Unable to logout admin."
//         );
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.message ||
//           "Unable to connect to server."
//       );
//     }
//   }
// );

// /* =====================================================
//    GET ADMIN PROPERTIES
//    GET /api/admin/properties
// ===================================================== */

// export const getAdminProperties =
//   createAsyncThunk(
//     "admin/getAdminProperties",
//     async (
//       params = {},
//       { rejectWithValue }
//     ) => {
//       try {
//         const query =
//           new URLSearchParams();

//         Object.entries(params).forEach(
//           ([key, value]) => {
//             if (
//               value !== undefined &&
//               value !== null &&
//               value !== ""
//             ) {
//               query.append(
//                 key,
//                 value
//               );
//             }
//           }
//         );

//         const queryString =
//           query.toString();

//         const response = await fetch(
//           `${API_URL}/admin/properties${
//             queryString
//               ? `?${queryString}`
//               : ""
//           }`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch properties."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    GET PENDING PROPERTIES
//    GET /api/admin/properties/pending
// ===================================================== */

// export const getPendingProperties =
//   createAsyncThunk(
//     "admin/getPendingProperties",
//     async (
//       _,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/properties/pending`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch pending properties."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    PROPERTY STATS
//    GET /api/admin/properties/stats
// ===================================================== */

// export const getPropertyStats =
//   createAsyncThunk(
//     "admin/getPropertyStats",
//     async (
//       _,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/properties/stats`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch property stats."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    APPROVE PROPERTY
// ===================================================== */

// export const approveProperty =
//   createAsyncThunk(
//     "admin/approveProperty",
//     async (
//       id,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/properties/${id}/approve`,
//           {
//             method: "PATCH",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to approve property."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    REJECT PROPERTY
// ===================================================== */

// export const rejectProperty =
//   createAsyncThunk(
//     "admin/rejectProperty",
//     async (
//       {
//         id,
//         reason = "",
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/properties/${id}/reject`,
//           {
//             method: "PATCH",
//             credentials: "include",
//             headers: {
//               "Content-Type":
//                 "application/json",
//             },
//             body: JSON.stringify({
//               reason,
//             }),
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to reject property."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    ACTIVATE PROPERTY
// ===================================================== */

// export const activateProperty =
//   createAsyncThunk(
//     "admin/activateProperty",
//     async (
//       id,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/properties/${id}/activate`,
//           {
//             method: "PATCH",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to activate property."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    DEACTIVATE PROPERTY
// ===================================================== */

// export const deactivateProperty =
//   createAsyncThunk(
//     "admin/deactivateProperty",
//     async (
//       id,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/properties/${id}/deactivate`,
//           {
//             method: "PATCH",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to deactivate property."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    DELETE PROPERTY
// ===================================================== */

// export const deleteAdminProperty =
//   createAsyncThunk(
//     "admin/deleteAdminProperty",
//     async (
//       id,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/properties/${id}`,
//           {
//             method: "DELETE",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to delete property."
//           );
//         }

//         return {
//           ...data,
//           id,
//         };
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    GET ADMIN BOOKINGS
// ===================================================== */

// export const getAdminBookings =
//   createAsyncThunk(
//     "admin/getAdminBookings",
//     async (
//       params = {},
//       { rejectWithValue }
//     ) => {
//       try {
//         const query =
//           new URLSearchParams();

//         Object.entries(params).forEach(
//           ([key, value]) => {
//             if (
//               value !== undefined &&
//               value !== null &&
//               value !== ""
//             ) {
//               query.append(
//                 key,
//                 value
//               );
//             }
//           }
//         );

//         const queryString =
//           query.toString();

//         const response = await fetch(
//           `${API_URL}/admin/bookings${
//             queryString
//               ? `?${queryString}`
//               : ""
//           }`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch bookings."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    PENDING BOOKINGS
// ===================================================== */

// export const getPendingBookings =
//   createAsyncThunk(
//     "admin/getPendingBookings",
//     async (
//       _,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/bookings/pending`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch pending bookings."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    BOOKING STATS
// ===================================================== */

// export const getBookingStats =
//   createAsyncThunk(
//     "admin/getBookingStats",
//     async (
//       _,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/bookings/stats`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch booking stats."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    CONFIRM BOOKING
// ===================================================== */

// export const confirmBooking =
//   createAsyncThunk(
//     "admin/confirmBooking",
//     async (
//       id,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/bookings/${id}/confirm`,
//           {
//             method: "PATCH",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to confirm booking."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    REJECT BOOKING
// ===================================================== */

// export const rejectBooking =
//   createAsyncThunk(
//     "admin/rejectBooking",
//     async (
//       {
//         id,
//         reason = "",
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/bookings/${id}/reject`,
//           {
//             method: "PATCH",
//             credentials: "include",
//             headers: {
//               "Content-Type":
//                 "application/json",
//             },
//             body: JSON.stringify({
//               reason,
//             }),
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to reject booking."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    CANCEL BOOKING
// ===================================================== */

// export const cancelBooking =
//   createAsyncThunk(
//     "admin/cancelBooking",
//     async (
//       {
//         id,
//         reason = "",
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/bookings/${id}/cancel`,
//           {
//             method: "PATCH",
//             credentials: "include",
//             headers: {
//               "Content-Type":
//                 "application/json",
//             },
//             body: JSON.stringify({
//               reason,
//             }),
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to cancel booking."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    COMPLETE BOOKING
// ===================================================== */

// export const completeBooking =
//   createAsyncThunk(
//     "admin/completeBooking",
//     async (
//       id,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/bookings/${id}/complete`,
//           {
//             method: "PATCH",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to complete booking."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    GET ADMIN ENQUIRIES
// ===================================================== */

// export const getAdminEnquiries =
//   createAsyncThunk(
//     "admin/getAdminEnquiries",
//     async (
//       params = {},
//       { rejectWithValue }
//     ) => {
//       try {
//         const query =
//           new URLSearchParams();

//         Object.entries(params).forEach(
//           ([key, value]) => {
//             if (
//               value !== undefined &&
//               value !== null &&
//               value !== ""
//             ) {
//               query.append(
//                 key,
//                 value
//               );
//             }
//           }
//         );

//         const queryString =
//           query.toString();

//         const response = await fetch(
//           `${API_URL}/admin/enquiries${
//             queryString
//               ? `?${queryString}`
//               : ""
//           }`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch enquiries."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    ENQUIRY STATS
// ===================================================== */

// export const getEnquiryStats =
//   createAsyncThunk(
//     "admin/getEnquiryStats",
//     async (
//       _,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/enquiries/stats`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch enquiry stats."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    UPDATE ENQUIRY STATUS
// ===================================================== */

// export const updateEnquiryStatus =
//   createAsyncThunk(
//     "admin/updateEnquiryStatus",
//     async (
//       {
//         id,
//         status,
//         adminNote = "",
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/admin/enquiries/${id}/status`,
//           {
//             method: "PATCH",
//             credentials: "include",
//             headers: {
//               "Content-Type":
//                 "application/json",
//             },
//             body: JSON.stringify({
//               status,
//               adminNote,
//             }),
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to update enquiry."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    INITIAL STATE
// ===================================================== */

// const initialState = {
//   /* ================= ADMIN ================= */

//   admin: null,

//   isAuthenticated: false,

//   loginLoading: false,

//   meLoading: false,

//   logoutLoading: false,

//   loginError: null,

//   error: null,

//   /* ================= PROPERTIES ================= */

//   properties: [],

//   pendingProperties: [],

//   propertyStats: null,

//   propertyTotal: 0,

//   propertyPage: 1,

//   propertyPages: 0,

//   propertiesLoading: false,

//   pendingPropertiesLoading: false,

//   propertyStatsLoading: false,

//   /* ================= BOOKINGS ================= */

//   bookings: [],

//   pendingBookings: [],

//   bookingStats: null,

//   bookingTotal: 0,

//   bookingPage: 1,

//   bookingPages: 0,

//   bookingLoading: false,

//   pendingBookingsLoading: false,

//   bookingStatsLoading: false,

//   /* ================= ENQUIRIES ================= */

//   enquiries: [],

//   enquiryStats: null,

//   enquiryTotal: 0,

//   enquiryPage: 1,

//   enquiryPages: 0,

//   enquiryLoading: false,

//   enquiryStatsLoading: false,

//   /* ================= ACTION ================= */

//   actionLoading: false,
// };

// /* =====================================================
//    SLICE
// ===================================================== */

// const adminSlice = createSlice({
//   name: "admin",

//   initialState,

//   reducers: {
//     clearAdminError: (state) => {
//       state.error = null;
//     },

//     clearAdminLoginError: (state) => {
//       state.loginError = null;
//     },

//     clearAdmin: (state) => {
//       state.admin = null;
//       state.isAuthenticated = false;
//     },
//   },

//   extraReducers: (builder) => {

//     /* =================================================
//        ADMIN LOGIN
//     ================================================= */

//     builder
//       .addCase(
//         adminLogin.pending,
//         (state) => {
//           state.loginLoading = true;
//           state.loginError = null;
//         }
//       )

//       .addCase(
//         adminLogin.fulfilled,
//         (state, action) => {
//           state.loginLoading = false;

//           state.admin =
//             action.payload?.admin ||
//             null;

//           state.isAuthenticated =
//             Boolean(
//               action.payload?.admin
//             );
//         }
//       )

//       .addCase(
//         adminLogin.rejected,
//         (state, action) => {
//           state.loginLoading = false;

//           state.isAuthenticated =
//             false;

//           state.loginError =
//             action.payload ||
//             "Admin login failed.";
//         }
//       );

//     /* =================================================
//        ADMIN ME
//     ================================================= */

//     builder
//       .addCase(
//         getAdminMe.pending,
//         (state) => {
//           state.meLoading = true;
//         }
//       )

//       .addCase(
//         getAdminMe.fulfilled,
//         (state, action) => {
//           state.meLoading = false;

//           state.admin =
//             action.payload?.admin ||
//             null;

//           state.isAuthenticated =
//             Boolean(
//               action.payload?.admin
//             );
//         }
//       )

//       .addCase(
//         getAdminMe.rejected,
//         (state) => {
//           state.meLoading = false;

//           state.admin = null;

//           state.isAuthenticated =
//             false;
//         }
//       );

//     /* =================================================
//        ADMIN LOGOUT
//     ================================================= */

//     builder
//       .addCase(
//         adminLogout.pending,
//         (state) => {
//           state.logoutLoading = true;
//         }
//       )

//       .addCase(
//         adminLogout.fulfilled,
//         (state) => {
//           state.logoutLoading = false;

//           state.admin = null;

//           state.isAuthenticated =
//             false;
//         }
//       )

//       .addCase(
//         adminLogout.rejected,
//         (state) => {
//           state.logoutLoading = false;

//           state.admin = null;

//           state.isAuthenticated =
//             false;
//         }
//       );

//     /* =================================================
//        ADMIN PROPERTIES
//     ================================================= */

//     builder
//       .addCase(
//         getAdminProperties.pending,
//         (state) => {
//           state.propertiesLoading =
//             true;

//           state.error = null;
//         }
//       )

//       .addCase(
//         getAdminProperties.fulfilled,
//         (state, action) => {
//           state.propertiesLoading =
//             false;

//           state.properties =
//             action.payload?.properties ||
//             [];

//           state.propertyTotal =
//             action.payload?.total ||
//             0;

//           state.propertyPage =
//             action.payload?.page ||
//             1;

//           state.propertyPages =
//             action.payload?.pages ||
//             0;
//         }
//       )

//       .addCase(
//         getAdminProperties.rejected,
//         (state, action) => {
//           state.propertiesLoading =
//             false;

//           state.error =
//             action.payload ||
//             "Unable to fetch properties.";
//         }
//       );

//     /* =================================================
//        PENDING PROPERTIES
//     ================================================= */

//     builder
//       .addCase(
//         getPendingProperties.pending,
//         (state) => {
//           state.pendingPropertiesLoading =
//             true;
//         }
//       )

//       .addCase(
//         getPendingProperties.fulfilled,
//         (state, action) => {
//           state.pendingPropertiesLoading =
//             false;

//           state.pendingProperties =
//             action.payload?.properties ||
//             [];
//         }
//       )

//       .addCase(
//         getPendingProperties.rejected,
//         (state, action) => {
//           state.pendingPropertiesLoading =
//             false;

//           state.error =
//             action.payload ||
//             "Unable to fetch pending properties.";
//         }
//       );

//     /* =================================================
//        PROPERTY STATS
//     ================================================= */

//     builder
//       .addCase(
//         getPropertyStats.pending,
//         (state) => {
//           state.propertyStatsLoading =
//             true;
//         }
//       )

//       .addCase(
//         getPropertyStats.fulfilled,
//         (state, action) => {
//           state.propertyStatsLoading =
//             false;

//           state.propertyStats =
//             action.payload?.stats ||
//             null;
//         }
//       )

//       .addCase(
//         getPropertyStats.rejected,
//         (state, action) => {
//           state.propertyStatsLoading =
//             false;

//           state.error =
//             action.payload ||
//             "Unable to fetch property stats.";
//         }
//       );

//     /* =================================================
//        PROPERTY ACTIONS
//     ================================================= */

//     builder
//       .addCase(
//         approveProperty.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         approveProperty.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const property =
//             action.payload?.property;

//           if (!property) return;

//           state.pendingProperties =
//             state.pendingProperties.filter(
//               (item) =>
//                 item._id !== property._id
//             );

//           const index =
//             state.properties.findIndex(
//               (item) =>
//                 item._id === property._id
//             );

//           if (index !== -1) {
//             state.properties[index] =
//               property;
//           } else {
//             state.properties.unshift(
//               property
//             );
//           }
//         }
//       )

//       .addCase(
//         approveProperty.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to approve property.";
//         }
//       )

//       .addCase(
//         rejectProperty.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         rejectProperty.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const property =
//             action.payload?.property;

//           if (!property) return;

//           state.pendingProperties =
//             state.pendingProperties.filter(
//               (item) =>
//                 item._id !== property._id
//             );

//           const index =
//             state.properties.findIndex(
//               (item) =>
//                 item._id === property._id
//             );

//           if (index !== -1) {
//             state.properties[index] =
//               property;
//           }
//         }
//       )

//       .addCase(
//         rejectProperty.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to reject property.";
//         }
//       )

//       .addCase(
//         activateProperty.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         activateProperty.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const property =
//             action.payload?.property;

//           if (!property) return;

//           const index =
//             state.properties.findIndex(
//               (item) =>
//                 item._id === property._id
//             );

//           if (index !== -1) {
//             state.properties[index] =
//               property;
//           }
//         }
//       )

//       .addCase(
//         activateProperty.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to activate property.";
//         }
//       )

//       .addCase(
//         deactivateProperty.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         deactivateProperty.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const property =
//             action.payload?.property;

//           if (!property) return;

//           const index =
//             state.properties.findIndex(
//               (item) =>
//                 item._id === property._id
//             );

//           if (index !== -1) {
//             state.properties[index] =
//               property;
//           }
//         }
//       )

//       .addCase(
//         deactivateProperty.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to deactivate property.";
//         }
//       )

//       .addCase(
//         deleteAdminProperty.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         deleteAdminProperty.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const id =
//             action.payload?.id;

//           state.properties =
//             state.properties.filter(
//               (item) =>
//                 item._id !== id
//             );

//           state.pendingProperties =
//             state.pendingProperties.filter(
//               (item) =>
//                 item._id !== id
//             );
//         }
//       )

//       .addCase(
//         deleteAdminProperty.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to delete property.";
//         }
//       );

//     /* =================================================
//        ADMIN BOOKINGS
//     ================================================= */

//     builder
//       .addCase(
//         getAdminBookings.pending,
//         (state) => {
//           state.bookingLoading = true;
//         }
//       )

//       .addCase(
//         getAdminBookings.fulfilled,
//         (state, action) => {
//           state.bookingLoading = false;

//           state.bookings =
//             action.payload?.bookings ||
//             [];

//           state.bookingTotal =
//             action.payload?.total ||
//             0;

//           state.bookingPage =
//             action.payload?.page ||
//             1;

//           state.bookingPages =
//             action.payload?.pages ||
//             0;
//         }
//       )

//       .addCase(
//         getAdminBookings.rejected,
//         (state, action) => {
//           state.bookingLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to fetch bookings.";
//         }
//       );

//     /* =================================================
//        PENDING BOOKINGS
//     ================================================= */

//     builder
//       .addCase(
//         getPendingBookings.pending,
//         (state) => {
//           state.pendingBookingsLoading =
//             true;
//         }
//       )

//       .addCase(
//         getPendingBookings.fulfilled,
//         (state, action) => {
//           state.pendingBookingsLoading =
//             false;

//           state.pendingBookings =
//             action.payload?.bookings ||
//             [];
//         }
//       )

//       .addCase(
//         getPendingBookings.rejected,
//         (state, action) => {
//           state.pendingBookingsLoading =
//             false;

//           state.error =
//             action.payload ||
//             "Unable to fetch pending bookings.";
//         }
//       );

//     /* =================================================
//        BOOKING STATS
//     ================================================= */

//     builder
//       .addCase(
//         getBookingStats.pending,
//         (state) => {
//           state.bookingStatsLoading =
//             true;
//         }
//       )

//       .addCase(
//         getBookingStats.fulfilled,
//         (state, action) => {
//           state.bookingStatsLoading =
//             false;

//           state.bookingStats =
//             action.payload?.stats ||
//             null;
//         }
//       )

//       .addCase(
//         getBookingStats.rejected,
//         (state, action) => {
//           state.bookingStatsLoading =
//             false;

//           state.error =
//             action.payload ||
//             "Unable to fetch booking stats.";
//         }
//       );

//     /* =================================================
//        BOOKING ACTIONS
//     ================================================= */

//     builder
//       .addCase(
//         confirmBooking.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         confirmBooking.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const booking =
//             action.payload?.booking;

//           if (!booking) return;

//           state.pendingBookings =
//             state.pendingBookings.filter(
//               (item) =>
//                 item._id !== booking._id
//             );

//           const index =
//             state.bookings.findIndex(
//               (item) =>
//                 item._id === booking._id
//             );

//           if (index !== -1) {
//             state.bookings[index] =
//               booking;
//           } else {
//             state.bookings.unshift(
//               booking
//             );
//           }
//         }
//       )

//       .addCase(
//         confirmBooking.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to confirm booking.";
//         }
//       )

//       .addCase(
//         rejectBooking.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         rejectBooking.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const booking =
//             action.payload?.booking;

//           if (!booking) return;

//           state.pendingBookings =
//             state.pendingBookings.filter(
//               (item) =>
//                 item._id !== booking._id
//             );

//           const index =
//             state.bookings.findIndex(
//               (item) =>
//                 item._id === booking._id
//             );

//           if (index !== -1) {
//             state.bookings[index] =
//               booking;
//           }
//         }
//       )

//       .addCase(
//         rejectBooking.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to reject booking.";
//         }
//       )

//       .addCase(
//         cancelBooking.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         cancelBooking.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const booking =
//             action.payload?.booking;

//           if (!booking) return;

//           const index =
//             state.bookings.findIndex(
//               (item) =>
//                 item._id === booking._id
//             );

//           if (index !== -1) {
//             state.bookings[index] =
//               booking;
//           }
//         }
//       )

//       .addCase(
//         cancelBooking.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to cancel booking.";
//         }
//       )

//       .addCase(
//         completeBooking.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         completeBooking.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const booking =
//             action.payload?.booking;

//           if (!booking) return;

//           const index =
//             state.bookings.findIndex(
//               (item) =>
//                 item._id === booking._id
//             );

//           if (index !== -1) {
//             state.bookings[index] =
//               booking;
//           }
//         }
//       )

//       .addCase(
//         completeBooking.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to complete booking.";
//         }
//       );

//     /* =================================================
//        ADMIN ENQUIRIES
//     ================================================= */

//     builder
//       .addCase(
//         getAdminEnquiries.pending,
//         (state) => {
//           state.enquiryLoading = true;
//         }
//       )

//       .addCase(
//         getAdminEnquiries.fulfilled,
//         (state, action) => {
//           state.enquiryLoading = false;

//           state.enquiries =
//             action.payload?.enquiries ||
//             [];

//           state.enquiryTotal =
//             action.payload?.total ||
//             0;

//           state.enquiryPage =
//             action.payload?.page ||
//             1;

//           state.enquiryPages =
//             action.payload?.pages ||
//             0;
//         }
//       )

//       .addCase(
//         getAdminEnquiries.rejected,
//         (state, action) => {
//           state.enquiryLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to fetch enquiries.";
//         }
//       );

//     /* =================================================
//        ENQUIRY STATS
//     ================================================= */

//     builder
//       .addCase(
//         getEnquiryStats.pending,
//         (state) => {
//           state.enquiryStatsLoading =
//             true;
//         }
//       )

//       .addCase(
//         getEnquiryStats.fulfilled,
//         (state, action) => {
//           state.enquiryStatsLoading =
//             false;

//           state.enquiryStats =
//             action.payload?.stats ||
//             null;
//         }
//       )

//       .addCase(
//         getEnquiryStats.rejected,
//         (state, action) => {
//           state.enquiryStatsLoading =
//             false;

//           state.error =
//             action.payload ||
//             "Unable to fetch enquiry stats.";
//         }
//       );

//     /* =================================================
//        UPDATE ENQUIRY
//     ================================================= */

//     builder
//       .addCase(
//         updateEnquiryStatus.pending,
//         (state) => {
//           state.actionLoading = true;
//         }
//       )

//       .addCase(
//         updateEnquiryStatus.fulfilled,
//         (state, action) => {
//           state.actionLoading = false;

//           const enquiry =
//             action.payload?.enquiry;

//           if (!enquiry) return;

//           const index =
//             state.enquiries.findIndex(
//               (item) =>
//                 item._id === enquiry._id
//             );

//           if (index !== -1) {
//             state.enquiries[index] =
//               enquiry;
//           }
//         }
//       )

//       .addCase(
//         updateEnquiryStatus.rejected,
//         (state, action) => {
//           state.actionLoading = false;

//           state.error =
//             action.payload ||
//             "Unable to update enquiry.";
//         }
//       );
//   },
// });

// /* =====================================================
//    ACTIONS
// ===================================================== */

// export const {
//   clearAdminError,
//   clearAdminLoginError,
//   clearAdmin,
// } = adminSlice.actions;

// /* =====================================================
//    ADMIN SELECTORS
// ===================================================== */

// export const selectAdmin = (state) =>
//   state.admin.admin;

// /*
//   Primary selector.
//   AdminDashboard can use this.
// */
// export const selectAdminAuthenticated = (
//   state
// ) => state.admin.isAuthenticated;

// /*
//   Old selector kept for compatibility.
// */
// export const selectIsAdminAuthenticated = (
//   state
// ) => state.admin.isAuthenticated;

// export const selectAdminLoginLoading = (
//   state
// ) => state.admin.loginLoading;

// export const selectAdminMeLoading = (
//   state
// ) => state.admin.meLoading;

// export const selectAdminLogoutLoading = (
//   state
// ) => state.admin.logoutLoading;

// export const selectAdminLoginError = (
//   state
// ) => state.admin.loginError;

// export const selectAdminError = (
//   state
// ) => state.admin.error;

// /* =====================================================
//    PROPERTY SELECTORS
// ===================================================== */

// export const selectAdminProperties = (
//   state
// ) => state.admin.properties;

// export const selectPendingProperties = (
//   state
// ) => state.admin.pendingProperties;

// export const selectPropertyStats = (
//   state
// ) => state.admin.propertyStats;

// export const selectAdminPropertiesLoading = (
//   state
// ) => state.admin.propertiesLoading;

// export const selectPendingPropertiesLoading = (
//   state
// ) => state.admin.pendingPropertiesLoading;

// export const selectPropertyStatsLoading = (
//   state
// ) => state.admin.propertyStatsLoading;

// /* =====================================================
//    BOOKING SELECTORS
// ===================================================== */

// export const selectAdminBookings = (
//   state
// ) => state.admin.bookings;

// export const selectPendingBookings = (
//   state
// ) => state.admin.pendingBookings;

// export const selectBookingStats = (
//   state
// ) => state.admin.bookingStats;

// export const selectAdminBookingsLoading = (
//   state
// ) => state.admin.bookingLoading;

// export const selectPendingBookingsLoading = (
//   state
// ) => state.admin.pendingBookingsLoading;

// export const selectBookingStatsLoading = (
//   state
// ) => state.admin.bookingStatsLoading;

// /* =====================================================
//    ENQUIRY SELECTORS
// ===================================================== */

// export const selectAdminEnquiries = (
//   state
// ) => state.admin.enquiries;

// export const selectEnquiryStats = (
//   state
// ) => state.admin.enquiryStats;

// export const selectAdminEnquiriesLoading = (
//   state
// ) => state.admin.enquiryLoading;

// export const selectEnquiryStatsLoading = (
//   state
// ) => state.admin.enquiryStatsLoading;

// /* =====================================================
//    DEFAULT EXPORT
// ===================================================== */

// export default adminSlice.reducer;




import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

/* =====================================================
   API
===================================================== */

const API_URL = import.meta.env.VITE_API_URL;

const ADMIN_TOKEN_KEY = "coral_admin_token";

/* =====================================================
   TOKEN HELPERS
===================================================== */

const getAdminToken = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

const saveAdminToken = (token) => {
  if (token) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  }
};

const removeAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

/* =====================================================
   AUTH HEADERS
===================================================== */

const getAuthHeaders = (extraHeaders = {}) => {
  const token = getAdminToken();

  return {
    ...extraHeaders,
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
};

/* =====================================================
   RESPONSE HELPER
===================================================== */

const parseResponse = async (response, fallback) => {
  try {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || fallback);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(fallback);
  }
};

/* =====================================================
   ADMIN LOGIN
   POST /api/admin/login
===================================================== */

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (
    { email, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data?.message || "Admin login failed."
        );
      }

      /* Save Bearer token */

      if (data?.token) {
        saveAdminToken(data.token);
      } else {
        return rejectWithValue(
          "Admin token was not received from server."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.message ||
          "Unable to connect to server."
      );
    }
  }
);

/* =====================================================
   GET ADMIN ME
   GET /api/admin/me
===================================================== */

export const getAdminMe = createAsyncThunk(
  "admin/getAdminMe",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAdminToken();

      if (!token) {
        return rejectWithValue(
          "Admin authentication required."
        );
      }

      const response = await fetch(
        `${API_URL}/admin/me`,
        {
          method: "GET",

          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          removeAdminToken();
        }

        return rejectWithValue(
          data?.message ||
            "Unable to fetch admin."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.message ||
          "Unable to connect to server."
      );
    }
  }
);

/* =====================================================
   ADMIN LOGOUT
   POST /api/admin/logout
===================================================== */

export const adminLogout = createAsyncThunk(
  "admin/adminLogout",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAdminToken();

      /*
        Server logout request.
        Bearer token is sent if available.
      */

      const response = await fetch(
        `${API_URL}/admin/logout`,
        {
          method: "POST",

          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      /* Always remove local token */

      removeAdminToken();

      if (!response.ok) {
        return rejectWithValue(
          data?.message ||
            "Unable to logout admin."
        );
      }

      return data;
    } catch (error) {
      removeAdminToken();

      return rejectWithValue(
        error?.message ||
          "Unable to connect to server."
      );
    }
  }
);

/* =====================================================
   GET ADMIN PROPERTIES
   GET /api/admin/properties
===================================================== */

export const getAdminProperties =
  createAsyncThunk(
    "admin/getAdminProperties",
    async (
      params = {},
      { rejectWithValue }
    ) => {
      try {
        const query = new URLSearchParams();

        Object.entries(params).forEach(
          ([key, value]) => {
            if (
              value !== undefined &&
              value !== null &&
              value !== ""
            ) {
              query.append(key, value);
            }
          }
        );

        const queryString = query.toString();

        const response = await fetch(
          `${API_URL}/admin/properties${
            queryString
              ? `?${queryString}`
              : ""
          }`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch properties."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   GET PENDING PROPERTIES
   GET /api/admin/properties/pending
===================================================== */

export const getPendingProperties =
  createAsyncThunk(
    "admin/getPendingProperties",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/pending`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch pending properties."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   PROPERTY STATS
   GET /api/admin/properties/stats
===================================================== */

export const getPropertyStats =
  createAsyncThunk(
    "admin/getPropertyStats",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/stats`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch property stats."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   APPROVE PROPERTY
===================================================== */

export const approveProperty =
  createAsyncThunk(
    "admin/approveProperty",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/${id}/approve`,
          {
            method: "PATCH",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to approve property."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   REJECT PROPERTY
===================================================== */

export const rejectProperty =
  createAsyncThunk(
    "admin/rejectProperty",
    async (
      {
        id,
        reason = "",
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/${id}/reject`,
          {
            method: "PATCH",

            headers: getAuthHeaders({
              "Content-Type":
                "application/json",
            }),

            body: JSON.stringify({
              reason,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to reject property."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   ACTIVATE PROPERTY
===================================================== */

export const activateProperty =
  createAsyncThunk(
    "admin/activateProperty",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/${id}/activate`,
          {
            method: "PATCH",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to activate property."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   DEACTIVATE PROPERTY
===================================================== */

export const deactivateProperty =
  createAsyncThunk(
    "admin/deactivateProperty",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/${id}/deactivate`,
          {
            method: "PATCH",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to deactivate property."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   DELETE PROPERTY
===================================================== */

export const deleteAdminProperty =
  createAsyncThunk(
    "admin/deleteAdminProperty",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/${id}`,
          {
            method: "DELETE",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to delete property."
          );
        }

        return {
          ...data,
          id,
        };
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   GET ADMIN BOOKINGS
===================================================== */

export const getAdminBookings =
  createAsyncThunk(
    "admin/getAdminBookings",
    async (
      params = {},
      { rejectWithValue }
    ) => {
      try {
        const query = new URLSearchParams();

        Object.entries(params).forEach(
          ([key, value]) => {
            if (
              value !== undefined &&
              value !== null &&
              value !== ""
            ) {
              query.append(key, value);
            }
          }
        );

        const queryString = query.toString();

        const response = await fetch(
          `${API_URL}/admin/bookings${
            queryString
              ? `?${queryString}`
              : ""
          }`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch bookings."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   PENDING BOOKINGS
===================================================== */

export const getPendingBookings =
  createAsyncThunk(
    "admin/getPendingBookings",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/pending`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch pending bookings."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   BOOKING STATS
===================================================== */

export const getBookingStats =
  createAsyncThunk(
    "admin/getBookingStats",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/stats`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch booking stats."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   CONFIRM BOOKING
===================================================== */

export const confirmBooking =
  createAsyncThunk(
    "admin/confirmBooking",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/${id}/confirm`,
          {
            method: "PATCH",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to confirm booking."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   REJECT BOOKING
===================================================== */

export const rejectBooking =
  createAsyncThunk(
    "admin/rejectBooking",
    async (
      {
        id,
        reason = "",
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/${id}/reject`,
          {
            method: "PATCH",

            headers: getAuthHeaders({
              "Content-Type":
                "application/json",
            }),

            body: JSON.stringify({
              reason,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to reject booking."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   CANCEL BOOKING
===================================================== */

export const cancelBooking =
  createAsyncThunk(
    "admin/cancelBooking",
    async (
      {
        id,
        reason = "",
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/${id}/cancel`,
          {
            method: "PATCH",

            headers: getAuthHeaders({
              "Content-Type":
                "application/json",
            }),

            body: JSON.stringify({
              reason,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to cancel booking."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   COMPLETE BOOKING
===================================================== */

export const completeBooking =
  createAsyncThunk(
    "admin/completeBooking",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/${id}/complete`,
          {
            method: "PATCH",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to complete booking."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   GET ADMIN ENQUIRIES
===================================================== */

export const getAdminEnquiries =
  createAsyncThunk(
    "admin/getAdminEnquiries",
    async (
      params = {},
      { rejectWithValue }
    ) => {
      try {
        const query = new URLSearchParams();

        Object.entries(params).forEach(
          ([key, value]) => {
            if (
              value !== undefined &&
              value !== null &&
              value !== ""
            ) {
              query.append(key, value);
            }
          }
        );

        const queryString = query.toString();

        const response = await fetch(
          `${API_URL}/admin/enquiries${
            queryString
              ? `?${queryString}`
              : ""
          }`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch enquiries."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   ENQUIRY STATS
===================================================== */

export const getEnquiryStats =
  createAsyncThunk(
    "admin/getEnquiryStats",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/enquiries/stats`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch enquiry stats."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   UPDATE ENQUIRY STATUS
===================================================== */

export const updateEnquiryStatus =
  createAsyncThunk(
    "admin/updateEnquiryStatus",
    async (
      {
        id,
        status,
        adminNote = "",
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/enquiries/${id}/status`,
          {
            method: "PATCH",

            headers: getAuthHeaders({
              "Content-Type":
                "application/json",
            }),

            body: JSON.stringify({
              status,
              adminNote,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to update enquiry."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   INITIAL STATE
===================================================== */

const initialState = {
  /* ================= ADMIN ================= */

  admin: null,

  isAuthenticated: false,

  loginLoading: false,

  meLoading: false,

  logoutLoading: false,

  loginError: null,

  error: null,

  /* ================= PROPERTIES ================= */

  properties: [],

  pendingProperties: [],

  propertyStats: null,

  propertyTotal: 0,

  propertyPage: 1,

  propertyPages: 0,

  propertiesLoading: false,

  pendingPropertiesLoading: false,

  propertyStatsLoading: false,

  /* ================= BOOKINGS ================= */

  bookings: [],

  pendingBookings: [],

  bookingStats: null,

  bookingTotal: 0,

  bookingPage: 1,

  bookingPages: 0,

  bookingLoading: false,

  pendingBookingsLoading: false,

  bookingStatsLoading: false,

  /* ================= ENQUIRIES ================= */

  enquiries: [],

  enquiryStats: null,

  enquiryTotal: 0,

  enquiryPage: 1,

  enquiryPages: 0,

  enquiryLoading: false,

  enquiryStatsLoading: false,

  /* ================= ACTION ================= */

  actionLoading: false,
};

/* =====================================================
   SLICE
===================================================== */

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },

    clearAdminLoginError: (state) => {
      state.loginError = null;
    },

    clearAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;

      removeAdminToken();
    },
  },

  extraReducers: (builder) => {
    /* =================================================
       ADMIN LOGIN
    ================================================= */

    builder
      .addCase(
        adminLogin.pending,
        (state) => {
          state.loginLoading = true;
          state.loginError = null;
          state.error = null;
        }
      )

      .addCase(
        adminLogin.fulfilled,
        (state, action) => {
          state.loginLoading = false;

          state.admin =
            action.payload?.admin || null;

          state.isAuthenticated =
            Boolean(
              action.payload?.admin &&
                action.payload?.token
            );

          state.loginError = null;
        }
      )

      .addCase(
        adminLogin.rejected,
        (state, action) => {
          state.loginLoading = false;

          state.isAuthenticated = false;

          state.admin = null;

          state.loginError =
            action.payload ||
            "Admin login failed.";
        }
      );

    /* =================================================
       ADMIN ME
    ================================================= */

    builder
      .addCase(
        getAdminMe.pending,
        (state) => {
          state.meLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getAdminMe.fulfilled,
        (state, action) => {
          state.meLoading = false;

          state.admin =
            action.payload?.admin || null;

          state.isAuthenticated =
            Boolean(
              action.payload?.admin
            );
        }
      )

      .addCase(
        getAdminMe.rejected,
        (state) => {
          state.meLoading = false;

          state.admin = null;

          state.isAuthenticated = false;
        }
      );

    /* =================================================
       ADMIN LOGOUT
    ================================================= */

    builder
      .addCase(
        adminLogout.pending,
        (state) => {
          state.logoutLoading = true;
        }
      )

      .addCase(
        adminLogout.fulfilled,
        (state) => {
          state.logoutLoading = false;

          state.admin = null;

          state.isAuthenticated = false;

          state.loginError = null;

          state.error = null;
        }
      )

      .addCase(
        adminLogout.rejected,
        (state) => {
          state.logoutLoading = false;

          state.admin = null;

          state.isAuthenticated = false;

          state.loginError = null;
        }
      );

    /* =================================================
       ADMIN PROPERTIES
    ================================================= */

    builder
      .addCase(
        getAdminProperties.pending,
        (state) => {
          state.propertiesLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getAdminProperties.fulfilled,
        (state, action) => {
          state.propertiesLoading = false;

          state.properties =
            action.payload?.properties ||
            [];

          state.propertyTotal =
            action.payload?.total || 0;

          state.propertyPage =
            action.payload?.page || 1;

          state.propertyPages =
            action.payload?.pages || 0;
        }
      )

      .addCase(
        getAdminProperties.rejected,
        (state, action) => {
          state.propertiesLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch properties.";
        }
      );

    /* =================================================
       PENDING PROPERTIES
    ================================================= */

    builder
      .addCase(
        getPendingProperties.pending,
        (state) => {
          state.pendingPropertiesLoading = true;
        }
      )

      .addCase(
        getPendingProperties.fulfilled,
        (state, action) => {
          state.pendingPropertiesLoading = false;

          state.pendingProperties =
            action.payload?.properties ||
            [];
        }
      )

      .addCase(
        getPendingProperties.rejected,
        (state, action) => {
          state.pendingPropertiesLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch pending properties.";
        }
      );

    /* =================================================
       PROPERTY STATS
    ================================================= */

    builder
      .addCase(
        getPropertyStats.pending,
        (state) => {
          state.propertyStatsLoading = true;
        }
      )

      .addCase(
        getPropertyStats.fulfilled,
        (state, action) => {
          state.propertyStatsLoading = false;

          state.propertyStats =
            action.payload?.stats ||
            null;
        }
      )

      .addCase(
        getPropertyStats.rejected,
        (state, action) => {
          state.propertyStatsLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch property stats.";
        }
      );

    /* =================================================
       PROPERTY ACTIONS
    ================================================= */

    builder

      .addCase(
        approveProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        approveProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const property =
            action.payload?.property;

          if (!property) return;

          state.pendingProperties =
            state.pendingProperties.filter(
              (item) =>
                item._id !== property._id
            );

          const index =
            state.properties.findIndex(
              (item) =>
                item._id === property._id
            );

          if (index !== -1) {
            state.properties[index] =
              property;
          } else {
            state.properties.unshift(
              property
            );
          }
        }
      )

      .addCase(
        approveProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to approve property.";
        }
      )

      .addCase(
        rejectProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        rejectProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const property =
            action.payload?.property;

          if (!property) return;

          state.pendingProperties =
            state.pendingProperties.filter(
              (item) =>
                item._id !== property._id
            );

          const index =
            state.properties.findIndex(
              (item) =>
                item._id === property._id
            );

          if (index !== -1) {
            state.properties[index] =
              property;
          }
        }
      )

      .addCase(
        rejectProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to reject property.";
        }
      )

      .addCase(
        activateProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        activateProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const property =
            action.payload?.property;

          if (!property) return;

          const index =
            state.properties.findIndex(
              (item) =>
                item._id === property._id
            );

          if (index !== -1) {
            state.properties[index] =
              property;
          }
        }
      )

      .addCase(
        activateProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to activate property.";
        }
      )

      .addCase(
        deactivateProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        deactivateProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const property =
            action.payload?.property;

          if (!property) return;

          const index =
            state.properties.findIndex(
              (item) =>
                item._id === property._id
            );

          if (index !== -1) {
            state.properties[index] =
              property;
          }
        }
      )

      .addCase(
        deactivateProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to deactivate property.";
        }
      )

      .addCase(
        deleteAdminProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        deleteAdminProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const id =
            action.payload?.id;

          state.properties =
            state.properties.filter(
              (item) =>
                item._id !== id
            );

          state.pendingProperties =
            state.pendingProperties.filter(
              (item) =>
                item._id !== id
            );
        }
      )

      .addCase(
        deleteAdminProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to delete property.";
        }
      );

    /* =================================================
       ADMIN BOOKINGS
    ================================================= */

    builder
      .addCase(
        getAdminBookings.pending,
        (state) => {
          state.bookingLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getAdminBookings.fulfilled,
        (state, action) => {
          state.bookingLoading = false;

          state.bookings =
            action.payload?.bookings ||
            [];

          state.bookingTotal =
            action.payload?.total || 0;

          state.bookingPage =
            action.payload?.page || 1;

          state.bookingPages =
            action.payload?.pages || 0;
        }
      )

      .addCase(
        getAdminBookings.rejected,
        (state, action) => {
          state.bookingLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch bookings.";
        }
      );

    /* =================================================
       PENDING BOOKINGS
    ================================================= */

    builder
      .addCase(
        getPendingBookings.pending,
        (state) => {
          state.pendingBookingsLoading = true;
        }
      )

      .addCase(
        getPendingBookings.fulfilled,
        (state, action) => {
          state.pendingBookingsLoading = false;

          state.pendingBookings =
            action.payload?.bookings ||
            [];
        }
      )

      .addCase(
        getPendingBookings.rejected,
        (state, action) => {
          state.pendingBookingsLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch pending bookings.";
        }
      );

    /* =================================================
       BOOKING STATS
    ================================================= */

    builder
      .addCase(
        getBookingStats.pending,
        (state) => {
          state.bookingStatsLoading = true;
        }
      )

      .addCase(
        getBookingStats.fulfilled,
        (state, action) => {
          state.bookingStatsLoading = false;

          state.bookingStats =
            action.payload?.stats ||
            null;
        }
      )

      .addCase(
        getBookingStats.rejected,
        (state, action) => {
          state.bookingStatsLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch booking stats.";
        }
      );

    /* =================================================
       BOOKING ACTIONS
    ================================================= */

    builder

      .addCase(
        confirmBooking.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        confirmBooking.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const booking =
            action.payload?.booking;

          if (!booking) return;

          state.pendingBookings =
            state.pendingBookings.filter(
              (item) =>
                item._id !== booking._id
            );

          const index =
            state.bookings.findIndex(
              (item) =>
                item._id === booking._id
            );

          if (index !== -1) {
            state.bookings[index] =
              booking;
          } else {
            state.bookings.unshift(
              booking
            );
          }
        }
      )

      .addCase(
        confirmBooking.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to confirm booking.";
        }
      )

      .addCase(
        rejectBooking.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        rejectBooking.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const booking =
            action.payload?.booking;

          if (!booking) return;

          state.pendingBookings =
            state.pendingBookings.filter(
              (item) =>
                item._id !== booking._id
            );

          const index =
            state.bookings.findIndex(
              (item) =>
                item._id === booking._id
            );

          if (index !== -1) {
            state.bookings[index] =
              booking;
          }
        }
      )

      .addCase(
        rejectBooking.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to reject booking.";
        }
      )

      .addCase(
        cancelBooking.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        cancelBooking.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const booking =
            action.payload?.booking;

          if (!booking) return;

          const index =
            state.bookings.findIndex(
              (item) =>
                item._id === booking._id
            );

          if (index !== -1) {
            state.bookings[index] =
              booking;
          }
        }
      )

      .addCase(
        cancelBooking.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to cancel booking.";
        }
      )

      .addCase(
        completeBooking.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        completeBooking.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const booking =
            action.payload?.booking;

          if (!booking) return;

          const index =
            state.bookings.findIndex(
              (item) =>
                item._id === booking._id
            );

          if (index !== -1) {
            state.bookings[index] =
              booking;
          }
        }
      )

      .addCase(
        completeBooking.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to complete booking.";
        }
      );

    /* =================================================
       ADMIN ENQUIRIES
    ================================================= */

    builder
      .addCase(
        getAdminEnquiries.pending,
        (state) => {
          state.enquiryLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getAdminEnquiries.fulfilled,
        (state, action) => {
          state.enquiryLoading = false;

          state.enquiries =
            action.payload?.enquiries ||
            [];

          state.enquiryTotal =
            action.payload?.total || 0;

          state.enquiryPage =
            action.payload?.page || 1;

          state.enquiryPages =
            action.payload?.pages || 0;
        }
      )

      .addCase(
        getAdminEnquiries.rejected,
        (state, action) => {
          state.enquiryLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch enquiries.";
        }
      );

    /* =================================================
       ENQUIRY STATS
    ================================================= */

    builder
      .addCase(
        getEnquiryStats.pending,
        (state) => {
          state.enquiryStatsLoading = true;
        }
      )

      .addCase(
        getEnquiryStats.fulfilled,
        (state, action) => {
          state.enquiryStatsLoading = false;

          state.enquiryStats =
            action.payload?.stats ||
            null;
        }
      )

      .addCase(
        getEnquiryStats.rejected,
        (state, action) => {
          state.enquiryStatsLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch enquiry stats.";
        }
      );

    /* =================================================
       UPDATE ENQUIRY
    ================================================= */

    builder
      .addCase(
        updateEnquiryStatus.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        updateEnquiryStatus.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const enquiry =
            action.payload?.enquiry;

          if (!enquiry) return;

          const index =
            state.enquiries.findIndex(
              (item) =>
                item._id === enquiry._id
            );

          if (index !== -1) {
            state.enquiries[index] =
              enquiry;
          }
        }
      )

      .addCase(
        updateEnquiryStatus.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to update enquiry.";
        }
      );
  },
});

/* =====================================================
   ACTIONS
===================================================== */

export const {
  clearAdminError,
  clearAdminLoginError,
  clearAdmin,
} = adminSlice.actions;

/* =====================================================
   ADMIN SELECTORS
===================================================== */

export const selectAdmin = (state) =>
  state.admin.admin;

export const selectAdminAuthenticated = (
  state
) => state.admin.isAuthenticated;

export const selectIsAdminAuthenticated = (
  state
) => state.admin.isAuthenticated;

export const selectAdminLoginLoading = (
  state
) => state.admin.loginLoading;

export const selectAdminMeLoading = (
  state
) => state.admin.meLoading;

export const selectAdminLogoutLoading = (
  state
) => state.admin.logoutLoading;

export const selectAdminLoginError = (
  state
) => state.admin.loginError;

export const selectAdminError = (
  state
) => state.admin.error;

/* =====================================================
   PROPERTY SELECTORS
===================================================== */

export const selectAdminProperties = (
  state
) => state.admin.properties;

export const selectPendingProperties = (
  state
) => state.admin.pendingProperties;

export const selectPropertyStats = (
  state
) => state.admin.propertyStats;

export const selectAdminPropertiesLoading = (
  state
) => state.admin.propertiesLoading;

export const selectPendingPropertiesLoading = (
  state
) => state.admin.pendingPropertiesLoading;

export const selectPropertyStatsLoading = (
  state
) => state.admin.propertyStatsLoading;

/* =====================================================
   BOOKING SELECTORS
===================================================== */

export const selectAdminBookings = (
  state
) => state.admin.bookings;

export const selectPendingBookings = (
  state
) => state.admin.pendingBookings;

export const selectBookingStats = (
  state
) => state.admin.bookingStats;

export const selectAdminBookingsLoading = (
  state
) => state.admin.bookingLoading;

export const selectPendingBookingsLoading = (
  state
) => state.admin.pendingBookingsLoading;

export const selectBookingStatsLoading = (
  state
) => state.admin.bookingStatsLoading;

/* =====================================================
   ENQUIRY SELECTORS
===================================================== */

export const selectAdminEnquiries = (
  state
) => state.admin.enquiries;

export const selectEnquiryStats = (
  state
) => state.admin.enquiryStats;

export const selectAdminEnquiriesLoading = (
  state
) => state.admin.enquiryLoading;

export const selectEnquiryStatsLoading = (
  state
) => state.admin.enquiryStatsLoading;

/* =====================================================
   DEFAULT EXPORT
===================================================== */

export default adminSlice.reducer;