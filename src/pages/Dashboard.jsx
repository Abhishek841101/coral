import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectUser,
} from "../features/auth/authSlice";

import {
  getMyBookings,
  selectBookings,
  selectBookingsLoading,
  selectBookingError,
} from "../features/bookings/bookingSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const bookings = useSelector(
    selectBookings
  );

  const bookingsLoading = useSelector(
    selectBookingsLoading
  );

  const bookingError = useSelector(
    selectBookingError
  );

  /* =====================================================
     FETCH REAL BOOKINGS
  ===================================================== */

  useEffect(() => {
    if (user) {
      dispatch(getMyBookings());
    }
  }, [dispatch, user]);

  /* =====================================================
     NOT LOGGED IN
  ===================================================== */

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">

        <div className="text-center">

          <h1 className="text-2xl font-black text-[#073F32]">
            Login required
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please login to access your dashboard.
          </p>

          <Link
            to="/login"
            className="mt-5 inline-block rounded-full bg-[#18C66A] px-6 py-3 text-sm font-black text-[#073F32]"
          >
            Login
          </Link>

        </div>

      </main>
    );
  }

  /* =====================================================
     STATS
  ===================================================== */

  const totalBookings =
    bookings.length;

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "confirmed"
    ).length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status === "pending"
    ).length;

  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status === "cancelled"
    ).length;

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-[#E5E7EB] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link
            to="/"
            className="flex items-center gap-2.5"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
              C
            </div>

            <span className="text-xl font-black text-[#073F32]">
              Coral
            </span>

          </Link>

          <Link
            to="/profile"
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32] transition hover:bg-[#18C66A]"
          >
            My Profile
          </Link>

        </div>

      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* ================= WELCOME ================= */}

        <div>

          <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#18A85B]">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
            Welcome,{" "}
            {user.name?.split(" ")[0]}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your Coral bookings and account
            from one place.
          </p>

        </div>

        {/* =================================================
            REAL BOOKING STATS
        ================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <DashboardCard
            title="Total bookings"
            value={
              bookingsLoading
                ? "..."
                : totalBookings
            }
            description="All your bookings"
          />

          <DashboardCard
            title="Confirmed"
            value={
              bookingsLoading
                ? "..."
                : confirmedBookings
            }
            description="Confirmed stays"
          />

          <DashboardCard
            title="Pending"
            value={
              bookingsLoading
                ? "..."
                : pendingBookings
            }
            description="Awaiting confirmation"
          />

          <DashboardCard
            title="Cancelled"
            value={
              bookingsLoading
                ? "..."
                : cancelledBookings
            }
            description="Cancelled bookings"
          />

        </div>

        {/* =================================================
            BOOKINGS
        ================================================= */}

        <div className="mt-8 rounded-[28px] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>

              <h2 className="text-xl font-black text-[#073F32]">
                Your bookings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View and manage your property bookings.
              </p>

            </div>

            <Link
              to="/properties"
              className="w-fit rounded-full bg-[#073F32] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
            >
              Explore properties
            </Link>

          </div>

          {/* ================= ERROR ================= */}

          {bookingError && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">

              <p className="text-sm font-semibold text-red-600">
                {bookingError}
              </p>

            </div>
          )}

          {/* ================= LOADING ================= */}

          {bookingsLoading && (
            <div className="mt-7 space-y-3">

              <BookingSkeleton />
              <BookingSkeleton />
              <BookingSkeleton />

            </div>
          )}

          {/* ================= EMPTY ================= */}

          {!bookingsLoading &&
            !bookingError &&
            bookings.length === 0 && (
              <div className="mt-7 rounded-2xl border border-dashed border-[#D8DED9] px-5 py-12 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
                  🏠
                </div>

                <h3 className="mt-4 text-base font-black text-[#073F32]">
                  No bookings yet
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Once you book a property, your booking
                  details and status will appear here.
                </p>

                <Link
                  to="/properties"
                  className="mt-5 inline-block rounded-full bg-[#18C66A] px-6 py-3 text-sm font-black text-[#073F32]"
                >
                  Find a property
                </Link>

              </div>
            )}

          {/* ================= BOOKINGS LIST ================= */}

          {!bookingsLoading &&
            bookings.length > 0 && (
              <div className="mt-7 space-y-4">

                {bookings.map(
                  (booking) => (
                    <BookingItem
                      key={booking._id}
                      booking={booking}
                    />
                  )
                )}

              </div>
            )}

        </div>

      </section>

    </main>
  );
}

/* =====================================================
   DASHBOARD CARD
===================================================== */

function DashboardCard({
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-sm">

      <p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">
        {title}
      </p>

      <p className="mt-3 text-3xl font-black text-[#073F32]">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>

    </div>
  );
}

/* =====================================================
   BOOKING ITEM
===================================================== */

function BookingItem({
  booking,
}) {
  const property =
    booking.property || {};

  const propertyName =
    property.name ||
    booking.propertyName ||
    "Property";

  const location =
    property.location ||
    property.city ||
    "Nagpur";

  const status =
    booking.status ||
    "pending";

  const bookingId =
    booking._id;

  return (
    <div className="rounded-[22px] border border-[#E5E7EB] p-5">

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        {/* PROPERTY */}

        <div className="min-w-0">

          <p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">
            Booking
          </p>

          <h3 className="mt-1 truncate text-base font-black text-[#073F32]">
            {propertyName}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {location}
          </p>

        </div>

        {/* STATUS */}

        <div className="flex items-center gap-3">

          <span
            className={`rounded-full px-4 py-2 text-xs font-extrabold capitalize ${
              status === "confirmed"
                ? "bg-[#E9F8F0] text-[#168A4C]"
                : status === "cancelled"
                ? "bg-red-50 text-red-500"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            {status}
          </span>

          {bookingId && (
            <Link
              to={`/booking/${bookingId}`}
              className="rounded-full border border-[#E5E7EB] px-4 py-2 text-xs font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
            >
              View
            </Link>
          )}

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   LOADING SKELETON
===================================================== */

function BookingSkeleton() {
  return (
    <div className="animate-pulse rounded-[22px] border border-[#E5E7EB] p-5">

      <div className="h-3 w-20 rounded bg-gray-200" />

      <div className="mt-3 h-5 w-48 rounded bg-gray-200" />

      <div className="mt-2 h-3 w-28 rounded bg-gray-200" />

    </div>
  );
}