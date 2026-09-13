import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
getBookingById,
selectBooking,
selectBookingLoading,
selectSingleBookingError,
} from "../features/bookings/bookingSlice";

export default function BookingConfirmation() {
const location = useLocation();
const navigate = useNavigate();
const dispatch = useDispatch();

const stateBooking = location.state?.booking || null;
const stateBookingId =
location.state?.bookingId ||
stateBooking?._id ||
stateBooking?.id ||
"";

const reduxBooking = useSelector(selectBooking);
const bookingLoading = useSelector(selectBookingLoading);
const bookingError = useSelector(selectSingleBookingError);

const booking = stateBooking || reduxBooking;

useEffect(() => {
if (!stateBooking && stateBookingId) {
dispatch(getBookingById(stateBookingId));
}
}, [dispatch, stateBooking, stateBookingId]);

const property = useMemo(() => {
if (!booking?.property) return null;

if (typeof booking.property === "object") {
  return booking.property;
}

return null;

}, [booking]);

const formatDate = (date) => {
if (!date) return "—";

const parsedDate = new Date(date);

if (Number.isNaN(parsedDate.getTime())) {
  return "—";
}

return parsedDate.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

};

const getPropertyImage = () => {
if (!property?.images) return null;

if (Array.isArray(property.images)) {
  return property.images[0] || null;
}

return property.images;

};

const getStatusDetails = () => {
switch (booking?.status) {
case "confirmed":
return {
label: "Booking Confirmed",
title: "Your booking is confirmed",
description:
"Your booking has been confirmed by our team. Please keep your booking details available for reference.",
className:
"bg-green-50 border-green-200 text-green-700",
};

  case "rejected":
    return {
      label: "Request Rejected",
      title: "Booking request was rejected",
      description:
        booking?.rejectionReason ||
        "Unfortunately, this booking request could not be confirmed.",
      className:
        "bg-red-50 border-red-200 text-red-700",
    };

  case "cancelled":
    return {
      label: "Booking Cancelled",
      title: "Booking has been cancelled",
      description:
        booking?.cancellationReason ||
        "This booking is no longer active.",
      className:
        "bg-gray-100 border-gray-200 text-gray-700",
    };

  case "completed":
    return {
      label: "Booking Completed",
      title: "Booking completed",
      description:
        "This booking has been marked as completed.",
      className:
        "bg-blue-50 border-blue-200 text-blue-700",
    };

  default:
    return {
      label: "Request Submitted",
      title: "Booking request submitted",
      description:
        "Your booking request has been received. Our team will review it and contact you for confirmation.",
      className:
        "bg-amber-50 border-amber-200 text-amber-700",
    };
}

};

const statusDetails = getStatusDetails();

const pricePerNight = Number(booking?.pricePerNight) || 0;
const nights = Number(booking?.nights) || 0;

const calculatedTotal = pricePerNight * nights;

const totalAmount =
Number(booking?.totalAmount) ||
Number(booking?.subtotal) ||
calculatedTotal;

if (bookingLoading && !booking) {
return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
<div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-5" />

      <h2 className="text-lg font-semibold text-gray-900">
        Loading booking details
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Please wait while we load your booking request.
      </p>
    </div>
  </div>
);

}

if (bookingError && !booking) {
return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
<h2 className="text-xl font-semibold text-gray-900">
Unable to load booking
</h2>

      <p className="text-sm text-red-600 mt-3">
        {bookingError}
      </p>

      <button
        type="button"
        onClick={() => navigate("/")}
        className="mt-6 px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
      >
        Back to Home
      </button>
    </div>
  </div>
);

}

if (!booking) {
return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
<h2 className="text-xl font-semibold text-gray-900">
Booking not found
</h2>

      <p className="text-sm text-gray-500 mt-3">
        We could not find the booking request you are looking for.
      </p>

      <Link
        to="/"
        className="inline-flex mt-6 px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

}

const propertyImage = getPropertyImage();

return (
<div className="min-h-screen bg-gray-50">
<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
<div className="mb-8">
<button
type="button"
onClick={() => navigate(-1)}
className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
>
← Back
</button>
</div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-8 py-8 border-b border-gray-200">
        <div
          className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-semibold ${statusDetails.className}`}
        >
          {statusDetails.label}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">
          {statusDetails.title}
        </h1>

        <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl leading-6">
          {statusDetails.description}
        </p>

        {booking._id && (
          <div className="mt-5">
            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
              Booking Request ID
            </p>

            <p className="text-sm font-mono text-gray-700 mt-1 break-all">
              {booking._id}
            </p>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Property Details
                </h2>

                {property?.propertyType && (
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                    {property.propertyType}
                  </span>
                )}
              </div>

              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {propertyImage ? (
                    <img
                      src={propertyImage}
                      alt={property?.title || "Property"}
                      className="w-full sm:w-48 h-48 sm:h-auto object-cover"
                    />
                  ) : (
                    <div className="w-full sm:w-48 h-48 sm:h-auto bg-gray-100 flex items-center justify-center">
                      <span className="text-sm text-gray-400">
                        No image
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {property?.title || "Property"}
                    </h3>

                    {(property?.locality || property?.city) && (
                      <p className="text-sm text-gray-500 mt-2">
                        {[property.locality, property.city]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}

                    {property?.rent !== undefined &&
                      property?.rent !== null && (
                        <div className="mt-4">
                          <span className="text-xl font-bold text-gray-900">
                            ₹{Number(property.rent).toLocaleString("en-IN")}
                          </span>

                          <span className="text-sm text-gray-500 ml-1">
                            / {property.rentPeriod || "night"}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Stay Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    Check-in
                  </p>

                  <p className="text-base font-semibold text-gray-900 mt-2">
                    {formatDate(booking.checkIn)}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    Check-out
                  </p>

                  <p className="text-base font-semibold text-gray-900 mt-2">
                    {formatDate(booking.checkOut)}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    Guests
                  </p>

                  <p className="text-base font-semibold text-gray-900 mt-2">
                    {booking.guests || 1}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    Duration
                  </p>

                  <p className="text-base font-semibold text-gray-900 mt-2">
                    {nights} {nights === 1 ? "night" : "nights"}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Guest Details
              </h2>

              <div className="border border-gray-200 rounded-2xl divide-y divide-gray-200">
                <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-500">
                    Name
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {booking.guestName || "—"}
                  </span>
                </div>

                <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-500">
                    Phone
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {booking.guestPhone || "—"}
                  </span>
                </div>

                <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-500">
                    Email
                  </span>

                  <span className="text-sm font-semibold text-gray-900 break-all sm:text-right">
                    {booking.guestEmail || "—"}
                  </span>
                </div>
              </div>
            </section>

            {booking.specialRequest && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Special Request
                </h2>

                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="text-sm text-gray-600 leading-6">
                    {booking.specialRequest}
                  </p>
                </div>
              </section>
            )}
          </div>

          <div>
            <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-bold text-gray-900">
                Booking Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">
                    Rent per night
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    ₹{pricePerNight.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">
                    Nights
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {nights}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  No online payment required
                </p>

                <p className="text-xs text-gray-500 mt-1 leading-5">
                  Payment and final confirmation will be handled
                  manually by our team.
                </p>
              </div>

              <Link
                to="/my-bookings"
                className="mt-6 w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
              >
                View My Bookings
              </Link>

              <Link
                to="/"
                className="mt-3 w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    {booking.status === "pending" && (
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
        <h3 className="font-semibold text-gray-900">
          What happens next?
        </h3>

        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              1. Request received
            </p>

            <p className="text-xs text-gray-500 mt-1 leading-5">
              Your booking request has been submitted successfully.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              2. Admin review
            </p>

            <p className="text-xs text-gray-500 mt-1 leading-5">
              Our team will check the property availability.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              3. Confirmation
            </p>

            <p className="text-xs text-gray-500 mt-1 leading-5">
              You will be contacted for payment and final confirmation.
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

);
}