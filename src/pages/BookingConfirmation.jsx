import {
Link,
useLocation,
useNavigate,
} from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
useDispatch,
useSelector,
} from "react-redux";

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

/* =====================================================
REDUX
===================================================== */

const reduxBooking = useSelector(selectBooking);
const bookingLoading = useSelector(selectBookingLoading);
const bookingError = useSelector(selectSingleBookingError);

/* =====================================================
BOOKING FROM NAVIGATION
===================================================== */

const stateBooking = location.state?.booking || null;

const bookingId =
location.state?.bookingId ||
stateBooking?._id ||
stateBooking?.id ||
"";

/* =====================================================
BOOKING DATA


 If Redux already has booking, use it.
 Otherwise use booking passed through navigation.


===================================================== */

const booking = useMemo(() => {
if (reduxBooking) {
return reduxBooking;
}


if (stateBooking) {
  return stateBooking;
}

return null;


}, [reduxBooking, stateBooking]);

/* =====================================================
FETCH FRESH BOOKING
===================================================== */

useEffect(() => {
if (!bookingId) return;


dispatch(getBookingById(bookingId));


}, [dispatch, bookingId]);

/* =====================================================
NO BOOKING ID
===================================================== */

if (!bookingId) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5"> <div className="w-full max-w-md text-center">


      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-3xl">
        !
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
        No booking found
      </h1>

      <p className="mt-3 text-sm leading-6 text-[#667085]">
        We could not find your booking reference.
        Please start your booking again.
      </p>

      <Link
        to="/"
        className="mt-7 inline-flex rounded-full bg-[#073F32] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
      >
        Back to Coral
      </Link>

    </div>
  </main>
);


}

/* =====================================================
LOADING


 Only show full loader when no booking data exists.


===================================================== */

if (bookingLoading && !booking) {
return ( <main className="min-h-screen bg-[#F8F9F7]">


    <header className="border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

        <Link
          to="/"
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] font-extrabold text-[#073F32]">
            C
          </div>

          <span className="text-xl font-extrabold tracking-tight text-[#073F32]">
            Coral
          </span>
        </Link>

        <span className="text-sm font-bold text-[#667085]">
          Booking confirmation
        </span>

      </div>
    </header>

    <section className="flex min-h-[75vh] items-center justify-center px-5 py-12">

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-[#E9F8F0] text-3xl">
          🏨
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
          Loading your booking...
        </h1>

        <p className="mt-3 text-sm text-[#667085]">
          Please wait while we fetch your reservation details.
        </p>

      </div>

    </section>

  </main>
);


}

/* =====================================================
API ERROR

 If navigation already contains booking details,
 don't hide the page just because refresh API failed.

===================================================== */

if (bookingError && !booking) {
return ( <main className="min-h-screen bg-[#F8F9F7]">


    <header className="border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

        <Link
          to="/"
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] font-extrabold text-[#073F32]">
            C
          </div>

          <span className="text-xl font-extrabold tracking-tight text-[#073F32]">
            Coral
          </span>
        </Link>

        <span className="text-sm font-bold text-[#667085]">
          Booking confirmation
        </span>

      </div>
    </header>

    <section className="flex min-h-[75vh] items-center justify-center px-5 py-12">

      <div className="w-full max-w-lg text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-3xl font-extrabold text-red-500">
          !
        </div>

        <p className="mt-6 text-xs font-extrabold tracking-[0.18em] text-red-500">
          BOOKING ERROR
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-[#10254A] sm:text-4xl">
          Unable to load your booking
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#667085]">
          {bookingError}
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">

          <button
            type="button"
            onClick={() =>
              dispatch(getBookingById(bookingId))
            }
            disabled={bookingLoading}
            className="rounded-full bg-[#073F32] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {bookingLoading
              ? "Loading..."
              : "Try again"}
          </button>

          <Link
            to="/"
            className="rounded-full border border-[#073F32] px-7 py-3.5 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
          >
            Back to Coral
          </Link>

        </div>

        <div className="mt-7 rounded-2xl bg-white p-4">
          <p className="text-xs text-[#667085]">
            Booking reference
          </p>

          <p className="mt-1 break-all text-sm font-extrabold text-[#073F32]">
            {bookingId}
          </p>
        </div>

      </div>

    </section>

  </main>
);


}

/* =====================================================
SAFETY FALLBACK
===================================================== */

if (!booking) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5"> <div className="w-full max-w-md text-center">


      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F8F0] text-3xl">
        🏨
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
        Booking details unavailable
      </h1>

      <p className="mt-3 text-sm text-[#667085]">
        Your booking reference is:
      </p>

      <p className="mt-2 break-all text-sm font-extrabold text-[#073F32]">
        {bookingId}
      </p>

      <button
        type="button"
        onClick={() =>
          dispatch(getBookingById(bookingId))
        }
        disabled={bookingLoading}
        className="mt-6 rounded-full bg-[#073F32] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {bookingLoading
          ? "Loading..."
          : "Load booking"}
      </button>

    </div>
  </main>
);


}

/* =====================================================
PROPERTY
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

/* =====================================================
BASIC DATA
===================================================== */

const propertyName =
property.title ||
property.name ||
"Coral Property";

const propertyImage =
property.image ||
property.images?.[0] ||
"";

const propertyLocation = [
property.locality,
property.city,
property.state,
]
.filter(Boolean)
.join(", ");

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

/* =====================================================
DATES
===================================================== */

const formatDate = (value) => {
if (!value) return "—";


const date = new Date(value);

if (Number.isNaN(date.getTime())) {
  return "—";
}

return date.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});


};

const checkIn = formatDate(booking.checkIn);
const checkOut = formatDate(booking.checkOut);

/* =====================================================
COUNTS
===================================================== */

const guests =
Number(booking.guests) || 1;

const rooms =
Number(booking.rooms) || 1;

const nights =
Number(booking.nights) || 1;

/* =====================================================
PRICE
===================================================== */

const pricePerNight =
Number(booking.pricePerNight) || 0;

const subtotal =
Number(booking.subtotal) || 0;

const taxes =
Number(booking.taxes) || 0;

const totalAmount =
Number(booking.totalAmount) ||
subtotal + taxes;

/* =====================================================
STATUS
===================================================== */

const bookingStatus =
booking.status || "pending";

const paymentStatus =
booking.paymentStatus || "pending";

const isPaid =
paymentStatus === "paid";

/* =====================================================
ROOM TYPE
===================================================== */

const roomType =
property.propertyType ||
property.type ||
"Stay";

/* =====================================================
SPECIAL REQUEST
===================================================== */

const specialRequest =
booking.specialRequest || "";

/* =====================================================
BOOKING ID
===================================================== */

const displayBookingId =
booking._id ||
booking.id ||
bookingId;

/* =====================================================
PAYMENT
===================================================== */

const handlePayment = () => {
navigate("/payment", {
state: {
bookingId: displayBookingId,
booking,
},
});
};

/* =====================================================
MAIN UI
===================================================== */

return ( <main className="min-h-screen bg-[#F8F9F7]">


  {/* =================================================
      HEADER
  ================================================= */}

  <header className="border-b border-[#E5E7EB] bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

      <Link
        to="/"
        className="flex items-center gap-2.5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] font-extrabold text-[#073F32]">
          C
        </div>

        <span className="text-xl font-extrabold tracking-tight text-[#073F32]">
          Coral
        </span>
      </Link>

      <div className="flex items-center gap-2 text-sm font-bold text-[#667085]">
        <span className="hidden sm:inline">
          Booking confirmation
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9F8F0]">
          ✓
        </span>
      </div>

    </div>
  </header>

  {/* =================================================
      CONTENT
  ================================================= */}

  <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

    <div className="mx-auto max-w-6xl">

      {/* =================================================
          TOP SUCCESS
      ================================================= */}

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F8F0]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18C66A] text-2xl font-extrabold text-[#073F32]">
            ✓
          </div>
        </div>

        <p className="mt-6 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
          BOOKING CREATED
        </p>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
          Your booking is ready!
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#667085] sm:text-base">
          Your booking request has been successfully
          created. Review all your details below and
          continue to secure your reservation.
        </p>

      </div>

      {/* =================================================
          BOOKING CARD
      ================================================= */}

      <div className="mt-10 overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-xl">

        {/* =================================================
            BOOKING HEADER
        ================================================= */}

        <div className="bg-[#073F32] px-6 py-6 text-white sm:px-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-[#A7E9C5]">
                BOOKING REFERENCE
              </p>

              <p className="mt-2 break-all text-lg font-extrabold">
                {displayBookingId}
              </p>
            </div>

            <div className="w-fit rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold capitalize text-[#A7E9C5]">
              {bookingStatus}
            </div>

          </div>

        </div>

        {/* =================================================
            BODY
        ================================================= */}

        <div className="grid lg:grid-cols-[1fr_360px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="p-6 sm:p-8">

            {/* =================================================
                PROPERTY
            ================================================= */}

            <section>

              <p className="text-xs font-extrabold tracking-[0.16em] text-[#18C66A]">
                YOUR STAY
              </p>

              <div className="mt-4 flex flex-col gap-5 sm:flex-row">

                <div className="h-40 w-full overflow-hidden rounded-2xl bg-[#E9F8F0] sm:h-32 sm:w-48">

                  {propertyImage ? (
                    <img
                      src={propertyImage}
                      alt={propertyName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl">
                      🏨
                    </div>
                  )}

                </div>

                <div className="flex-1">

                  <h2 className="text-2xl font-extrabold text-[#10254A]">
                    {propertyName}
                  </h2>

                  {propertyLocation && (
                    <p className="mt-2 text-sm text-[#667085]">
                      📍 {propertyLocation}
                    </p>
                  )}

                  <div className="mt-4 inline-flex rounded-full bg-[#E9F8F0] px-3 py-1.5 text-xs font-extrabold text-[#073F32]">
                    🛏 {roomType}
                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                DATES
            ================================================= */}

            <section className="mt-8 border-t border-[#E5E7EB] pt-8">

              <h2 className="text-xl font-extrabold text-[#10254A]">
                Stay details
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#F8F9F7] p-5">
                  <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                    CHECK-IN
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-[#10254A]">
                    {checkIn}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8F9F7] p-5">
                  <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                    CHECK-OUT
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-[#10254A]">
                    {checkOut}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8F9F7] p-5">
                  <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                    GUESTS
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-[#10254A]">
                    {guests}{" "}
                    {guests === 1
                      ? "Guest"
                      : "Guests"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8F9F7] p-5">
                  <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                    ROOMS
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-[#10254A]">
                    {rooms}{" "}
                    {rooms === 1
                      ? "Room"
                      : "Rooms"}
                  </p>
                </div>

              </div>

              <div className="mt-4 rounded-2xl bg-[#E9F8F0] p-5">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold text-[#667085]">
                    Duration
                  </span>

                  <span className="text-sm font-extrabold text-[#073F32]">
                    {nights}{" "}
                    {nights === 1
                      ? "Night"
                      : "Nights"}
                  </span>

                </div>

              </div>

            </section>

            {/* =================================================
                GUEST DETAILS
            ================================================= */}

            <section className="mt-8 border-t border-[#E5E7EB] pt-8">

              <h2 className="text-xl font-extrabold text-[#10254A]">
                Guest details
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-[#E5E7EB] p-4">
                  <p className="text-xs font-bold text-[#667085]">
                    GUEST NAME
                  </p>

                  <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                    {guestName}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E5E7EB] p-4">
                  <p className="text-xs font-bold text-[#667085]">
                    PHONE
                  </p>

                  <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                    {guestPhone}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E5E7EB] p-4 sm:col-span-2">
                  <p className="text-xs font-bold text-[#667085]">
                    EMAIL
                  </p>

                  <p className="mt-1 break-all text-sm font-extrabold text-[#10254A]">
                    {guestEmail}
                  </p>
                </div>

              </div>

            </section>

            {/* =================================================
                SPECIAL REQUEST
            ================================================= */}

            {specialRequest && (
              <section className="mt-8 border-t border-[#E5E7EB] pt-8">

                <h2 className="text-xl font-extrabold text-[#10254A]">
                  Special request
                </h2>

                <div className="mt-4 rounded-2xl bg-[#F8F9F7] p-5">
                  <p className="text-sm leading-6 text-[#667085]">
                    {specialRequest}
                  </p>
                </div>

              </section>
            )}

          </div>

          {/* =================================================
              RIGHT PRICE SUMMARY
          ================================================= */}

          <aside className="border-t border-[#E5E7EB] bg-[#FAFAF9] p-6 sm:p-8 lg:border-l lg:border-t-0">

            <div className="lg:sticky lg:top-6">

              <p className="text-xs font-extrabold tracking-[0.16em] text-[#18C66A]">
                PAYMENT
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                Price summary
              </h2>

              <div className="mt-7 space-y-4">

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#667085]">
                    ₹{pricePerNight.toLocaleString("en-IN")} ×{" "}
                    {nights} nights ×{" "}
                    {rooms} {rooms === 1 ? "room" : "rooms"}
                  </span>

                  <span className="font-bold text-[#344054]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#667085]">
                    Taxes & fees
                  </span>

                  <span className="font-bold text-[#344054]">
                    ₹{taxes.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>

              <div className="mt-6 border-t border-[#E5E7EB] pt-6">

                <div className="flex items-center justify-between">

                  <span className="text-base font-extrabold text-[#10254A]">
                    Total
                  </span>

                  <span className="text-3xl font-extrabold text-[#073F32]">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

              {/* =================================================
                  PAYMENT STATUS
              ================================================= */}

              <div className="mt-6 rounded-2xl bg-[#FFF7E6] p-4">

                <div className="flex gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFE7B3]">
                    💳
                  </div>

                  <div>

                    <p className="text-sm font-extrabold text-[#8A5A00]">
                      Payment pending
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#9A6A13]">
                      Complete payment to confirm
                      your reservation.
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  PAYMENT BUTTON
              ================================================= */}

              {!isPaid && (
                <button
                  type="button"
                  onClick={handlePayment}
                  className="mt-7 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] shadow-sm transition hover:bg-[#073F32] hover:text-white"
                >
                  Proceed to payment →
                </button>
              )}

              {isPaid && (
                <div className="mt-7 rounded-full bg-[#E9F8F0] py-4 text-center text-sm font-extrabold text-[#073F32]">
                  Payment already completed ✓
                </div>
              )}

              <p className="mt-4 text-center text-xs leading-5 text-[#667085]">
                Secure checkout · Your booking details
                are protected
              </p>

            </div>

          </aside>

        </div>

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[24px] bg-white p-5 sm:flex-row">

        <div>
          <p className="text-sm font-extrabold text-[#073F32]">
            Almost there!
          </p>

          <p className="mt-1 text-xs text-[#667085]">
            Review your details before proceeding to payment.
          </p>
        </div>

        <Link
          to="/"
          className="rounded-full border border-[#073F32] px-5 py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
        >
          Back to Coral
        </Link>

      </div>

    </div>

  </section>

</main>


);
}
