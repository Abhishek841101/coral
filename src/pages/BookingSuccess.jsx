import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
getBookingById,
selectBooking,
selectBookingLoading,
selectSingleBookingError,
} from "../features/bookings/bookingSlice";

export default function BookingSuccess() {
const location = useLocation();
const dispatch = useDispatch();

const bookingId =
location.state?.bookingId ||
location.state?.booking?._id ||
location.state?.booking?.id;

const booking = useSelector(selectBooking);
const loading = useSelector(selectBookingLoading);
const error = useSelector(selectSingleBookingError);

useEffect(() => {
if (!bookingId) return;


dispatch(getBookingById(bookingId));

}, [dispatch, bookingId]);

/* =====================================================
NO BOOKING ID
===================================================== */

if (!bookingId) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5"> <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm"> <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50"> <span className="text-3xl">!</span> </div>


      <h1 className="text-2xl font-semibold text-gray-900">
        Booking Not Found
      </h1>

      <p className="mt-3 text-sm text-gray-500">
        We could not find the booking information.
      </p>

      <Link
        to="/"
        className="mt-7 inline-flex rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </div>
  </main>
);

}

/* =====================================================
LOADING
===================================================== */

if (loading && !booking) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5"> <div className="text-center"> <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />


      <p className="mt-4 text-sm text-gray-500">
        Loading booking details...
      </p>
    </div>
  </main>
);

}

/* =====================================================
ERROR
===================================================== */

if (error && !booking) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5"> <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm"> <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50"> <span className="text-3xl">!</span> </div>


      <h1 className="text-2xl font-semibold text-gray-900">
        Unable to Load Booking
      </h1>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {error}
      </p>

      <button
        type="button"
        onClick={() => dispatch(getBookingById(bookingId))}
        className="mt-7 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Try Again
      </button>
    </div>
  </main>
);


}

/* =====================================================
BOOKING NOT AVAILABLE
===================================================== */

if (!booking) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5"> <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm"> <h1 className="text-2xl font-semibold text-gray-900">
Booking Not Available </h1>


      <p className="mt-3 text-sm text-gray-500">
        The booking details could not be found.
      </p>

      <Link
        to="/"
        className="mt-7 inline-flex rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white"
      >
        Back to Home
      </Link>
    </div>
  </main>
);


}

/* =====================================================
DATA
===================================================== */

const property =
booking.property &&
typeof booking.property === "object"
? booking.property
: {};

const user =
booking.user &&
typeof booking.user === "object"
? booking.user
: {};

const propertyName =
property.title ||
property.name ||
"Coral Property";

const propertyImage =
property.image ||
property.images?.[0] ||
"";

const propertyLocation =
property.locality && property.city
? `${property.locality}, ${property.city}`
: property.city ||
property.locality ||
property.address ||
property.location ||
"Location unavailable";

const bookingNumber =
booking._id ||
booking.id ||
bookingId;

const formattedBookingId =
String(bookingNumber).length > 12
? `COR-${String(bookingNumber).slice(-8).toUpperCase()}`
: String(bookingNumber);

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

const formatCurrency = (amount) => {
const value = Number(amount || 0);


return `₹${value.toLocaleString("en-IN")}`;


};

const guestName =
booking.guestName ||
user.name ||
"Guest";

const guestEmail =
booking.guestEmail ||
user.email ||
"—";

const guestPhone =
booking.guestPhone ||
user.phone ||
"—";

const rooms = Number(booking.rooms || 1);
const guests = Number(booking.guests || 1);
const nights = Number(booking.nights || 1);

const subtotal = Number(
booking.subtotal ?? 0
);

const taxes = Number(
booking.taxes ?? 0
);

const totalAmount = Number(
booking.totalAmount ??
subtotal + taxes
);

const paymentMethod =
booking.paymentMethod === "online"
? "Online Payment"
: booking.paymentMethod === "cash"
? "Cash"
: "Not Selected";

const paymentStatus =
booking.paymentStatus || "pending";

const bookingStatus =
booking.status || "pending";

const isConfirmed =
bookingStatus === "confirmed" &&
paymentStatus === "paid";

/* =====================================================
PAGE
===================================================== */

return ( <main className="min-h-screen bg-[#F8F9F7] px-4 py-10 sm:px-6 lg:px-8"> <div className="mx-auto max-w-5xl">


    {/* =================================================
        SUCCESS HEADER
    ================================================= */}

    <div className="text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8 text-white"
          >
            <path
              d="M5 12.5L9.5 17L19 7.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
        {isConfirmed
          ? "Payment Successful"
          : "Booking Created"}
      </p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        {isConfirmed
          ? "Booking Confirmed"
          : "Booking Received"}
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
        {isConfirmed
          ? "Your payment has been received and your reservation is confirmed."
          : "Your booking has been created successfully. Payment is still pending."}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
        <span className="text-xs text-gray-400">
          Booking ID
        </span>

        <span className="text-sm font-semibold text-gray-900">
          {formattedBookingId}
        </span>
      </div>

    </div>

    {/* =================================================
        MAIN CARD
    ================================================= */}

    <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">

      {/* =================================================
          LEFT
      ================================================= */}

      <div className="space-y-6">

        {/* PROPERTY */}

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row">

            <div className="h-32 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-28 sm:w-40">
              {propertyImage ? (
                <img
                  src={propertyImage}
                  alt={propertyName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                  Coral
                </div>
              )}
            </div>

            <div className="flex-1">

              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Property
              </p>

              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                {propertyName}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {propertyLocation}
              </p>

              {property.propertyType && (
                <p className="mt-3 text-sm text-gray-600">
                  {property.propertyType}
                </p>
              )}

            </div>
          </div>
        </section>

        {/* STAY DETAILS */}

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">

          <h2 className="text-lg font-semibold text-gray-900">
            Stay Details
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Check-in
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                {formatDate(booking.checkIn)}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Check-out
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                {formatDate(booking.checkOut)}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Guests
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Rooms
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                {rooms} {rooms === 1 ? "Room" : "Rooms"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Duration
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                {nights} {nights === 1 ? "Night" : "Nights"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Booking Status
              </p>

              <p
                className={`mt-1 text-sm font-semibold capitalize ${
                  isConfirmed
                    ? "text-emerald-600"
                    : bookingStatus === "rejected"
                    ? "text-red-600"
                    : "text-amber-600"
                }`}
              >
                {bookingStatus}
              </p>
            </div>

          </div>
        </section>

        {/* GUEST DETAILS */}

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">

          <h2 className="text-lg font-semibold text-gray-900">
            Guest Details
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <span className="text-sm text-gray-500">
                Guest Name
              </span>

              <span className="text-right text-sm font-medium text-gray-900">
                {guestName}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <span className="text-sm text-gray-500">
                Email
              </span>

              <span className="break-all text-right text-sm font-medium text-gray-900">
                {guestEmail}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500">
                Phone
              </span>

              <span className="text-right text-sm font-medium text-gray-900">
                {guestPhone}
              </span>
            </div>

          </div>

          {booking.specialRequest && (
            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Special Request
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                {booking.specialRequest}
              </p>
            </div>
          )}

        </section>

      </div>

      {/* =================================================
          RIGHT - PAYMENT SUMMARY
      ================================================= */}

      <div>

        <section className="sticky top-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">

          <h2 className="text-lg font-semibold text-gray-900">
            Payment Summary
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">
                Price per night
              </span>

              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(booking.pricePerNight)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">
                {nights} nights × {rooms} room
                {rooms > 1 ? "s" : ""}
              </span>

              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">
                Taxes
              </span>

              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(taxes)}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between gap-4">

                <span className="text-base font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-xl font-semibold text-gray-900">
                  {formatCurrency(totalAmount)}
                </span>

              </div>
            </div>

          </div>

          {/* PAYMENT STATUS */}

          <div
            className={`mt-6 rounded-2xl p-4 ${
              paymentStatus === "paid"
                ? "bg-emerald-50"
                : "bg-amber-50"
            }`}
          >
            <div className="flex items-center gap-3">

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  paymentStatus === "paid"
                    ? "bg-emerald-100"
                    : "bg-amber-100"
                }`}
              >
                {paymentStatus === "paid" ? (
                  <span className="text-lg text-emerald-600">
                    ✓
                  </span>
                ) : (
                  <span className="text-lg text-amber-600">
                    !
                  </span>
                )}
              </div>

              <div>
                <p
                  className={`text-sm font-semibold ${
                    paymentStatus === "paid"
                      ? "text-emerald-800"
                      : "text-amber-800"
                  }`}
                >
                  {paymentStatus === "paid"
                    ? "Payment Successful"
                    : "Payment Pending"}
                </p>

                <p
                  className={`mt-0.5 text-xs ${
                    paymentStatus === "paid"
                      ? "text-emerald-700"
                      : "text-amber-700"
                  }`}
                >
                  {paymentStatus === "paid"
                    ? paymentMethod
                    : "Payment is not completed yet."}
                </p>
              </div>

            </div>
          </div>

          {/* PAYMENT ID */}

          {booking.paymentId && (
            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-start justify-between gap-4">

                <span className="text-xs text-gray-400">
                  Payment ID
                </span>

                <span className="break-all text-right text-xs font-medium text-gray-700">
                  {booking.paymentId}
                </span>

              </div>
            </div>
          )}

          {/* ACTIONS */}

          <div className="mt-7 space-y-3">

            <Link
              to="/my-bookings"
              className="flex w-full items-center justify-center rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              View My Bookings
            </Link>

            <Link
              to="/"
              className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to Home
            </Link>

          </div>

        </section>

      </div>

    </div>

    {/* =================================================
        FOOTER NOTE
    ================================================= */}

    <div className="mx-auto mt-8 max-w-2xl text-center">
      <p className="text-xs leading-5 text-gray-400">
        Please keep your booking ID{" "}
        <span className="font-medium text-gray-600">
          {formattedBookingId}
        </span>{" "}
        for future reference.
      </p>
    </div>

  </div>
</main>


);
}
