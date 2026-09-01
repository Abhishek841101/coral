import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import propertyReducer from "../features/properties/propertySlice";
import bookingReducer from "../features/bookings/bookingSlice";
import adminReducer from "../features/admin/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    bookings: bookingReducer,
    admin: adminReducer,
  },
});

export default store;