import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* =====================================================
   USER PAGES
===================================================== */

import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Properties from "./pages/Properties";
import PropertyEnquiry from "./pages/PropertyEnquiry";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";

import TourDetails from "./pages/TourDetails";
import TourBooking from "./pages/TourBooking";
import TourConfirmation from "./pages/TourConfirmation";
import TourPayment from "./pages/TourPayment";
import TourSuccess from "./pages/TourSuccess";

import VisaDetails from "./pages/VisaDetails";
import VisaApplication from "./pages/VisaApplication";
import VisaConfirmation from "./pages/VisaConfirmation";
import VisaPayment from "./pages/VisaPayment";
import VisaSuccess from "./pages/VisaSuccess";
import AdminProperties from "./pages/AdminProperties";
/* =====================================================
   ADMIN PAGES
===================================================== */

import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProperty from "./pages/AdminAddProperty";


export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            USER AUTH
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================================
            USER PROFILE / DASHBOARD
        ================================================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================================
            PUBLIC PROPERTIES
        ================================================= */}

        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />

        <Route
          path="/property-enquiry"
          element={<PropertyEnquiry />}
        />


        {/* =================================================
            BOOKING
        ================================================= */}

        <Route
          path="/booking"
          element={<Booking />}
        />

        <Route
          path="/booking/:id"
          element={<Booking />}
        />

        <Route
          path="/booking-confirmation"
          element={<BookingConfirmation />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/booking-success"
          element={<BookingSuccess />}
        />


        {/* =================================================
            TOURS
        ================================================= */}

        <Route
          path="/tour/:id"
          element={<TourDetails />}
        />

        <Route
          path="/tour-booking"
          element={<TourBooking />}
        />

        <Route
          path="/tour-confirmation"
          element={<TourConfirmation />}
        />

        <Route
          path="/tour-payment"
          element={<TourPayment />}
        />

        <Route
          path="/tour-success"
          element={<TourSuccess />}
        />

{/* ADMIN */}

<Route
  path="/admin"
  element={<AdminDashboard />}
/>

<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>

<Route
  path="/admin/properties"
  element={<AdminProperties />}
/>

<Route
  path="/admin/properties/add"
  element={<AdminAddProperty />}
/>
        {/* =================================================
            VISA
        ================================================= */}

        <Route
          path="/visa/:id"
          element={<VisaDetails />}
        />

        <Route
          path="/visa-application"
          element={<VisaApplication />}
        />

        <Route
          path="/visa-confirmation"
          element={<VisaConfirmation />}
        />

        <Route
          path="/visa-payment"
          element={<VisaPayment />}
        />

        <Route
          path="/visa-success"
          element={<VisaSuccess />}
        />


        {/* =================================================
            ADMIN
        ================================================= */}

        {/* Main Admin Dashboard */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* Backward-compatible dashboard URL */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* Admin Add Property */}

        <Route
          path="/admin/properties/add"
          element={<AdminAddProperty />}
        />

        {/* Admin Properties
            Temporary: public Properties page
            until dedicated AdminProperties page is created.
        */}

        <Route
          path="/admin/properties"
          element={<Properties />}
        />

      </Routes>

    </BrowserRouter>
  );
}