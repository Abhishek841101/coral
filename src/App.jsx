import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
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
import Properties from "./pages/Properties";
import PropertyEnquiry from "./pages/PropertyEnquiry";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Property Details */}
        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />

        {/* Booking */}
        <Route
          path="/booking"
          element={<Booking />}
        />

        {/* Booking Confirmation */}
        <Route
          path="/booking-confirmation"
          element={<BookingConfirmation />}
        />

        {/* Payment */}
        <Route
          path="/payment"
          element={<Payment />}
        />
        <Route
  path="/booking-success"
  element={<BookingSuccess />}
/>
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
<Route
  path="/properties"
  element={<Properties />}
/>
<Route
  path="/property-enquiry"
  element={<PropertyEnquiry />}
/>
      </Routes>
    </BrowserRouter>
  );
}