
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useEffect } from "react";

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

  const booking = useSelector(
    selectBooking
  );

  const bookingLoading = useSelector(
    selectBookingLoading
  );

  const bookingError = useSelector(
    selectSingleBookingError
  );

  /* =====================================================
     BOOKING ID
  ===================================================== */

  const bookingId =
    location.state?.bookingId ||
    location.state?.booking?._id ||
    location.state?.booking?.id ||
    "";

  /* =====================================================
     FETCH BOOKING
  ===================================================== */

  useEffect(() => {
    if (!bookingId) return;

    dispatch(
      getBookingById(bookingId)
    );
  }, [
    dispatch,
    bookingId,
  ]);

  /* =====================================================
     NO BOOKING ID
  ===================================================== */

  if (!bookingId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">

        <div className="w-full max-w-md text-center">

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
  ===================================================== */

  if (
    bookingLoading &&
    !booking
  ) {
    return (
      <main className="min-h-screen bg-[#F8F9F7]">

        {/* HEADER */}

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

        {/* LOADING */}

        <section className="px-5 py-16 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-4xl">

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

            <div className="mt-10 overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white p-8 shadow-sm">

              <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />

              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />

                <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />

                <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />

                <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />

              </div>

              <div className="mt-8 h-14 animate-pulse rounded-2xl bg-gray-100" />

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (
    bookingError &&
    !booking
  ) {
    return (
      <main className="min-h-screen bg-[#F8F9F7]">

        {/* HEADER */}

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

        {/* ERROR */}

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
              {bookingError ||
                "Something went wrong while loading your booking details."}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">

              <button
                type="button"
                onClick={() =>
                  dispatch(
                    getBookingById(
                      bookingId
                    )
                  )
                }
                className="rounded-full bg-[#073F32] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
              >
                Try again
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

     IMPORTANT:
     Never return blank screen.
  ===================================================== */

  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">

        <div className="text-center">

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
              dispatch(
                getBookingById(
                  bookingId
                )
              )
            }
            className="mt-6 rounded-full bg-[#073F32] px-7 py-3.5 text-sm font-extrabold text-white"
          >
            Load booking
          </button>

        </div>

      </main>
    );
  }

  /* =====================================================
     BOOKING DATA
  ===================================================== */

  const property =
    booking.property &&
    typeof booking.property === "object"
      ? booking.property
      : null;

  const user =
    booking.user &&
    typeof booking.user === "object"
      ? booking.user
      : null;

  const displayBookingId =
    booking._id ||
    booking.id ||
    bookingId;

  /* =====================================================
     BASIC DETAILS
  ===================================================== */

  const propertyName =
    property?.title ||
    property?.name ||
    "Coral Property";

  const propertyLocation = [
    property?.locality,
    property?.city,
    property?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const guestName =
    booking.guestName ||
    user?.name ||
    "Guest";

  const guestEmail =
    booking.guestEmail ||
    user?.email ||
    "";

  const guestPhone =
    booking.guestPhone ||
    user?.phone ||
    "";

  /* =====================================================
     DATES
  ===================================================== */

  const formatDate = (
    value
  ) => {
    if (!value) return "-";

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "-";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const checkIn =
    formatDate(
      booking.checkIn
    );

  const checkOut =
    formatDate(
      booking.checkOut
    );

  /* =====================================================
     COUNTS
  ===================================================== */

  const guests =
    Number(
      booking.guests
    ) || 1;

  const rooms =
    Number(
      booking.rooms
    ) || 1;

  const nights =
    Number(
      booking.nights
    ) || 1;

  /* =====================================================
     ROOM
  ===================================================== */

  const roomName =
    property?.propertyType ||
    "Stay";

  /* =====================================================
     SPECIAL REQUEST
  ===================================================== */

  const specialRequest =
    booking.specialRequest ||
    "";

  /* =====================================================
     PRICE

     IMPORTANT:
     Always use backend values.
  ===================================================== */

  const stayTotal =
    Number(
      booking.subtotal
    ) || 0;

  const taxes =
    Number(
      booking.taxes
    ) || 0;

  const totalAmount =
    Number(
      booking.totalAmount
    ) || 0;

  const pricePerNight =
    Number(
      booking.pricePerNight
    ) || 0;

  /* =====================================================
     STATUS
  ===================================================== */

  const paymentStatus =
    booking.paymentStatus ||
    "pending";

  const bookingStatus =
    booking.status ||
    "pending";

  const isPaid =
    paymentStatus === "paid";

  /* =====================================================
     PAYMENT
  ===================================================== */

  const handlePayment = () => {
    navigate(
      "/payment",
      {
        state: {
          bookingId:
            displayBookingId,
        },
      }
    );
  };

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

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

          <span className="text-sm font-bold text-[#667085]">
            Booking confirmation
          </span>

        </div>

      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-16">

        <div className="mx-auto max-w-5xl">

          {/* =================================================
              SUCCESS HEADER
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

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#667085]">
              Your booking request has been successfully created.
              Review the details below and continue to payment.
            </p>

          </div>

          {/* =================================================
              BOOKING CARD
          ================================================= */}

          <div className="mt-10 overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white shadow-xl">

            {/* =================================================
                BOOKING ID
            ================================================= */}

            <div className="border-b border-[#E5E7EB] bg-[#E9F8F0] px-6 py-5 sm:px-8">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                  <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                    BOOKING ID
                  </p>

                  <p className="mt-1 break-all text-lg font-extrabold text-[#073F32]">
                    {displayBookingId}
                  </p>

                </div>

                <span
                  className={`w-fit rounded-full bg-white px-4 py-2 text-xs font-extrabold ${
                    isPaid
                      ? "text-[#18A85B]"
                      : "text-[#B7791F]"
                  }`}
                >
                  {isPaid
                    ? "Paid"
                    : "Payment pending"}
                </span>

              </div>

            </div>

            {/* =================================================
                BODY
            ================================================= */}

            <div className="grid lg:grid-cols-[1fr_340px]">

              {/* =================================================
                  LEFT
              ================================================= */}

              <div className="p-6 sm:p-8">

                {/* =================================================
                    GUEST
                ================================================= */}

                <div>

                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    GUEST
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                    {guestName}
                  </h2>

                  {guestEmail && (
                    <p className="mt-1 text-sm text-[#667085]">
                      {guestEmail}
                    </p>
                  )}

                  {guestPhone && (
                    <p className="mt-1 text-sm text-[#667085]">
                      {guestPhone}
                    </p>
                  )}

                </div>

                {/* =================================================
                    STAY
                ================================================= */}

                <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    YOUR STAY
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                    {propertyName}
                  </h2>

                  {propertyLocation && (
                    <p className="mt-1 text-sm text-[#667085]">
                      📍 {propertyLocation}
                    </p>
                  )}

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    {/* CHECK IN */}

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">

                      <p className="text-xs font-bold text-[#667085]">
                        CHECK-IN
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                        {checkIn}
                      </p>

                    </div>

                    {/* CHECK OUT */}

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">

                      <p className="text-xs font-bold text-[#667085]">
                        CHECK-OUT
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                        {checkOut}
                      </p>

                    </div>

                    {/* GUESTS */}

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">

                      <p className="text-xs font-bold text-[#667085]">
                        GUESTS
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                        {guests}
                      </p>

                    </div>

                    {/* ROOMS */}

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">

                      <p className="text-xs font-bold text-[#667085]">
                        ROOMS
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                        {rooms}
                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    ROOM TYPE
                ================================================= */}

                <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    ROOM TYPE
                  </p>

                  <div className="mt-3 flex items-center gap-4 rounded-2xl bg-[#F8F9F7] p-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F0] text-xl">
                      🛏
                    </div>

                    <div>

                      <p className="text-sm font-extrabold text-[#10254A]">
                        {roomName}
                      </p>

                      <p className="mt-1 text-xs text-[#667085]">
                        {nights}{" "}
                        {nights === 1
                          ? "night"
                          : "nights"}{" "}
                        ·{" "}
                        {rooms}{" "}
                        {rooms === 1
                          ? "room"
                          : "rooms"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    SPECIAL REQUEST
                ================================================= */}

                {specialRequest && (
                  <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                    <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                      SPECIAL REQUEST
                    </p>

                    <p className="mt-3 rounded-2xl bg-[#F8F9F7] p-4 text-sm leading-6 text-[#667085]">
                      {specialRequest}
                    </p>

                  </div>
                )}

                {/* =================================================
                    BOOKING STATUS
                ================================================= */}

                <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    BOOKING STATUS
                  </p>

                  <div className="mt-3 rounded-2xl bg-[#F8F9F7] p-4">

                    <p className="text-sm font-extrabold capitalize text-[#10254A]">
                      {bookingStatus}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#667085]">
                      {isPaid
                        ? "Your payment has been received and your booking is confirmed."
                        : "Your booking has been created. Complete payment to confirm your reservation."}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  RIGHT PRICE
              ================================================= */}

              <aside className="border-t border-[#E5E7EB] bg-[#FAFAF9] p-6 sm:p-8 lg:border-l lg:border-t-0">

                <h3 className="text-xl font-extrabold text-[#10254A]">
                  Price summary
                </h3>

                <div className="mt-6 space-y-4">

                  {/* PRICE PER NIGHT */}

                  <div className="flex justify-between gap-4 text-sm text-[#667085]">

                    <span>
                      ₹
                      {pricePerNight.toLocaleString(
                        "en-IN"
                      )}{" "}
                      × {nights}{" "}
                      {nights === 1
                        ? "night"
                        : "nights"}{" "}
                      × {rooms}{" "}
                      {rooms === 1
                        ? "room"
                        : "rooms"}
                    </span>

                    <span className="font-semibold text-[#344054]">
                      ₹
                      {stayTotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  {/* TAX */}

                  <div className="flex justify-between gap-4 text-sm text-[#667085]">

                    <span>
                      Taxes & fees
                    </span>

                    <span className="font-semibold text-[#344054]">
                      ₹
                      {taxes.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </div>

                {/* TOTAL */}

                <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                  <div className="flex items-end justify-between gap-4">

                    <span className="font-extrabold text-[#10254A]">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      ₹
                      {totalAmount.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </div>

                {/* PAYMENT */}

                {!isPaid && (
                  <button
                    type="button"
                    onClick={
                      handlePayment
                    }
                    className="mt-7 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                  >
                    Proceed to payment →
                  </button>
                )}

                {/* ALREADY PAID */}

                {isPaid && (
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/booking-success",
                        {
                          state: {
                            bookingId:
                              displayBookingId,
                          },
                        }
                      )
                    }
                    className="mt-7 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                  >
                    View booking confirmation →
                  </button>
                )}

                <p className="mt-4 text-center text-xs leading-5 text-[#667085]">
                  Secure payment · No hidden charges
                </p>

              </aside>

            </div>

          </div>

          {/* =================================================
              HELP
          ================================================= */}

          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[24px] bg-white p-5 sm:flex-row">

            <div>

              <p className="text-sm font-extrabold text-[#073F32]">
                Need help?
              </p>

              <p className="mt-1 text-xs text-[#667085]">
                Coral support is available 24/7 for your journey.
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

