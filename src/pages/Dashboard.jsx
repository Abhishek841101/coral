// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   selectUser,
// } from "../features/auth/authSlice";

// import {
//   getMyBookings,
//   selectBookings,
//   selectBookingsLoading,
//   selectBookingError,
// } from "../features/bookings/bookingSlice";

// export default function Dashboard() {
//   const dispatch = useDispatch();

//   const user = useSelector(selectUser);

//   const bookings = useSelector(
//     selectBookings
//   );

//   const bookingsLoading = useSelector(
//     selectBookingsLoading
//   );

//   const bookingError = useSelector(
//     selectBookingError
//   );

//   /* =====================================================
//      FETCH REAL BOOKINGS
//   ===================================================== */

//   useEffect(() => {
//     if (user) {
//       dispatch(getMyBookings());
//     }
//   }, [dispatch, user]);

//   /* =====================================================
//      NOT LOGGED IN
//   ===================================================== */

//   if (!user) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">

//         <div className="text-center">

//           <h1 className="text-2xl font-black text-[#073F32]">
//             Login required
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             Please login to access your dashboard.
//           </p>

//           <Link
//             to="/login"
//             className="mt-5 inline-block rounded-full bg-[#18C66A] px-6 py-3 text-sm font-black text-[#073F32]"
//           >
//             Login
//           </Link>

//         </div>

//       </main>
//     );
//   }

//   /* =====================================================
//      STATS
//   ===================================================== */

//   const totalBookings =
//     bookings.length;

//   const confirmedBookings =
//     bookings.filter(
//       (booking) =>
//         booking.status === "confirmed"
//     ).length;

//   const pendingBookings =
//     bookings.filter(
//       (booking) =>
//         booking.status === "pending"
//     ).length;

//   const cancelledBookings =
//     bookings.filter(
//       (booking) =>
//         booking.status === "cancelled"
//     ).length;

//   return (
//     <main className="min-h-screen bg-[#F8F9F7]">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <header className="border-b border-[#E5E7EB] bg-white">

//         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

//           <Link
//             to="/"
//             className="flex items-center gap-2.5"
//           >

//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
//               C
//             </div>

//             <span className="text-xl font-black text-[#073F32]">
//               Coral
//             </span>

//           </Link>

//           <Link
//             to="/profile"
//             className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32] transition hover:bg-[#18C66A]"
//           >
//             My Profile
//           </Link>

//         </div>

//       </header>

//       {/* =================================================
//           CONTENT
//       ================================================= */}

//       <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

//         {/* ================= WELCOME ================= */}

//         <div>

//           <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#18A85B]">
//             Dashboard
//           </p>

//           <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
//             Welcome,{" "}
//             {user.name?.split(" ")[0]}
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             Manage your Coral bookings and account
//             from one place.
//           </p>

//         </div>

//         {/* =================================================
//             REAL BOOKING STATS
//         ================================================= */}

//         <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

//           <DashboardCard
//             title="Total bookings"
//             value={
//               bookingsLoading
//                 ? "..."
//                 : totalBookings
//             }
//             description="All your bookings"
//           />

//           <DashboardCard
//             title="Confirmed"
//             value={
//               bookingsLoading
//                 ? "..."
//                 : confirmedBookings
//             }
//             description="Confirmed stays"
//           />

//           <DashboardCard
//             title="Pending"
//             value={
//               bookingsLoading
//                 ? "..."
//                 : pendingBookings
//             }
//             description="Awaiting confirmation"
//           />

//           <DashboardCard
//             title="Cancelled"
//             value={
//               bookingsLoading
//                 ? "..."
//                 : cancelledBookings
//             }
//             description="Cancelled bookings"
//           />

//         </div>

//         {/* =================================================
//             BOOKINGS
//         ================================================= */}

//         <div className="mt-8 rounded-[28px] bg-white p-6 shadow-sm sm:p-8">

//           <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

//             <div>

//               <h2 className="text-xl font-black text-[#073F32]">
//                 Your bookings
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 View and manage your property bookings.
//               </p>

//             </div>

//             <Link
//               to="/properties"
//               className="w-fit rounded-full bg-[#073F32] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
//             >
//               Explore properties
//             </Link>

//           </div>

//           {/* ================= ERROR ================= */}

//           {bookingError && (
//             <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">

//               <p className="text-sm font-semibold text-red-600">
//                 {bookingError}
//               </p>

//             </div>
//           )}

//           {/* ================= LOADING ================= */}

//           {bookingsLoading && (
//             <div className="mt-7 space-y-3">

//               <BookingSkeleton />
//               <BookingSkeleton />
//               <BookingSkeleton />

//             </div>
//           )}

//           {/* ================= EMPTY ================= */}

//           {!bookingsLoading &&
//             !bookingError &&
//             bookings.length === 0 && (
//               <div className="mt-7 rounded-2xl border border-dashed border-[#D8DED9] px-5 py-12 text-center">

//                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
//                   🏠
//                 </div>

//                 <h3 className="mt-4 text-base font-black text-[#073F32]">
//                   No bookings yet
//                 </h3>

//                 <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
//                   Once you book a property, your booking
//                   details and status will appear here.
//                 </p>

//                 <Link
//                   to="/properties"
//                   className="mt-5 inline-block rounded-full bg-[#18C66A] px-6 py-3 text-sm font-black text-[#073F32]"
//                 >
//                   Find a property
//                 </Link>

//               </div>
//             )}

//           {/* ================= BOOKINGS LIST ================= */}

//           {!bookingsLoading &&
//             bookings.length > 0 && (
//               <div className="mt-7 space-y-4">

//                 {bookings.map(
//                   (booking) => (
//                     <BookingItem
//                       key={booking._id}
//                       booking={booking}
//                     />
//                   )
//                 )}

//               </div>
//             )}

//         </div>

//       </section>

//     </main>
//   );
// }

// /* =====================================================
//    DASHBOARD CARD
// ===================================================== */

// function DashboardCard({
//   title,
//   value,
//   description,
// }) {
//   return (
//     <div className="rounded-[24px] bg-white p-6 shadow-sm">

//       <p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">
//         {title}
//       </p>

//       <p className="mt-3 text-3xl font-black text-[#073F32]">
//         {value}
//       </p>

//       <p className="mt-1 text-xs text-gray-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// /* =====================================================
//    BOOKING ITEM
// ===================================================== */

// function BookingItem({
//   booking,
// }) {
//   const property =
//     booking.property || {};

//   const propertyName =
//     property.name ||
//     booking.propertyName ||
//     "Property";

//   const location =
//     property.location ||
//     property.city ||
//     "Nagpur";

//   const status =
//     booking.status ||
//     "pending";

//   const bookingId =
//     booking._id;

//   return (
//     <div className="rounded-[22px] border border-[#E5E7EB] p-5">

//       <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

//         {/* PROPERTY */}

//         <div className="min-w-0">

//           <p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">
//             Booking
//           </p>

//           <h3 className="mt-1 truncate text-base font-black text-[#073F32]">
//             {propertyName}
//           </h3>

//           <p className="mt-1 text-sm text-gray-500">
//             {location}
//           </p>

//         </div>

//         {/* STATUS */}

//         <div className="flex items-center gap-3">

//           <span
//             className={`rounded-full px-4 py-2 text-xs font-extrabold capitalize ${
//               status === "confirmed"
//                 ? "bg-[#E9F8F0] text-[#168A4C]"
//                 : status === "cancelled"
//                 ? "bg-red-50 text-red-500"
//                 : "bg-amber-50 text-amber-600"
//             }`}
//           >
//             {status}
//           </span>

//           {bookingId && (
//             <Link
//               to={`/booking/${bookingId}`}
//               className="rounded-full border border-[#E5E7EB] px-4 py-2 text-xs font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
//             >
//               View
//             </Link>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// /* =====================================================
//    LOADING SKELETON
// ===================================================== */

// function BookingSkeleton() {
//   return (
//     <div className="animate-pulse rounded-[22px] border border-[#E5E7EB] p-5">

//       <div className="h-3 w-20 rounded bg-gray-200" />

//       <div className="mt-3 h-5 w-48 rounded bg-gray-200" />

//       <div className="mt-2 h-3 w-28 rounded bg-gray-200" />

//     </div>
//   );
// }




import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../features/auth/authSlice";

import {
  getMyBookings,
  selectBookings,
  selectBookingsLoading,
  selectBookingError,
} from "../features/bookings/bookingSlice";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const formatDate = (value) => {
  if (!value) return "—";

  let date;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusStyle = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-green-50 text-green-700 border-green-200";

    case "cancelled":
      return "bg-red-50 text-red-600 border-red-200";

    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";

    case "completed":
      return "bg-blue-50 text-blue-700 border-blue-200";

    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
};

const getProperty = (booking) =>
  booking?.property && typeof booking.property === "object"
    ? booking.property
    : null;

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const bookings = useSelector(selectBookings);
  const bookingsLoading = useSelector(selectBookingsLoading);
  const bookingError = useSelector(selectBookingError);

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  useEffect(() => {
    if (user) {
      dispatch(getMyBookings());
    }
  }, [dispatch, user?._id, user?.id]);

  const stats = useMemo(() => {
    const confirmed = safeBookings.filter(
      (booking) => booking.status === "confirmed"
    ).length;

    const pending = safeBookings.filter(
      (booking) => booking.status === "pending"
    ).length;

    const cancelled = safeBookings.filter(
      (booking) => booking.status === "cancelled"
    ).length;

    const completed = safeBookings.filter(
      (booking) => booking.status === "completed"
    ).length;

    const totalSpend = safeBookings.reduce((sum, booking) => {
      if (
        booking.status === "rejected" ||
        booking.status === "cancelled"
      ) {
        return sum;
      }

      return sum + Number(booking.totalAmount ?? booking.subtotal ?? 0);
    }, 0);

    return {
      total: safeBookings.length,
      confirmed,
      pending,
      cancelled,
      completed,
      totalSpend,
    };
  }, [safeBookings]);

  const recentBookings = useMemo(() => {
    return [...safeBookings]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.checkIn || 0).getTime();
        const dateB = new Date(b.createdAt || b.checkIn || 0).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [safeBookings]);

  const errorMessage =
    typeof bookingError === "string"
      ? bookingError
      : bookingError?.message ||
        bookingError?.error ||
        "Unable to load your bookings.";

  const handleViewBooking = (booking) => {
    navigate("/booking-confirmation", {
      state: {
        booking,
        bookingId: booking?._id || booking?.id,
        property: getProperty(booking),
      },
    });
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <h1 className="text-2xl font-black text-[#073F32]">
            Login required
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please login to access your dashboard and bookings.
          </p>

          <Link
            to="/login"
            state={{ from: "/dashboard" }}
            className="mt-5 inline-block rounded-full bg-[#18C66A] px-6 py-3 text-sm font-black text-[#073F32]"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  const firstName =
    user.name?.split(" ")[0] ||
    user.fullName?.split(" ")[0] ||
    "there";

  return (
    <main className="min-h-screen bg-[#F8F9F7]">
      {/* Header */}
      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
              C
            </div>

            <span className="text-xl font-black text-[#073F32]">
              Coral
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/my-bookings"
              className="hidden rounded-full border border-[#DDE5DF] px-4 py-2.5 text-sm font-bold text-[#073F32] hover:bg-[#E9F8F0] sm:inline-flex"
            >
              My Bookings
            </Link>

            <Link
              to="/profile"
              className="rounded-full bg-[#E9F8F0] px-4 py-2.5 text-sm font-bold text-[#073F32] transition hover:bg-[#18C66A]"
            >
              My Profile
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {/* Welcome */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#18A85B]">
              Customer Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
              Welcome, {firstName}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your Coral bookings and account from one place.
            </p>
          </div>

          <Link
            to="/properties"
            className="w-fit rounded-full bg-[#073F32] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
          >
            Explore Properties
          </Link>
        </div>

        {/* Booking error */}
        {bookingError && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() => dispatch(getMyBookings())}
              className="mt-3 text-sm font-bold text-red-700 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total bookings"
            value={bookingsLoading ? "..." : stats.total}
            description="All your booking requests"
          />

          <DashboardCard
            title="Confirmed"
            value={bookingsLoading ? "..." : stats.confirmed}
            description="Confirmed stays"
          />

          <DashboardCard
            title="Pending"
            value={bookingsLoading ? "..." : stats.pending}
            description="Awaiting confirmation"
          />

          <DashboardCard
            title="Cancelled"
            value={bookingsLoading ? "..." : stats.cancelled}
            description="Cancelled bookings"
          />
        </div>

        {/* Booking totals */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[24px] bg-[#073F32] p-6 text-white shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-wide text-green-100">
              Booking amount
            </p>

            <p className="mt-3 text-3xl font-black">
              {bookingsLoading ? "..." : formatCurrency(stats.totalSpend)}
            </p>

            <p className="mt-2 text-xs text-green-100">
              Excludes cancelled and rejected requests. This is not a payment
              ledger.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">
              Completed stays
            </p>

            <p className="mt-3 text-3xl font-black text-[#073F32]">
              {bookingsLoading ? "..." : stats.completed}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Bookings marked completed by the backend.
            </p>
          </div>
        </div>

        {/* My bookings */}
        <section className="mt-8 rounded-[28px] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black text-[#073F32]">
                My Bookings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest booking requests and their current status.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={bookingsLoading}
                onClick={() => dispatch(getMyBookings())}
                className="rounded-full border border-[#DDE5DF] px-5 py-3 text-sm font-bold text-[#073F32] hover:bg-[#E9F8F0] disabled:opacity-50"
              >
                {bookingsLoading ? "Refreshing..." : "Refresh"}
              </button>

              <Link
                to="/my-bookings"
                className="rounded-full bg-[#18C66A] px-5 py-3 text-sm font-extrabold text-[#073F32] transition hover:bg-green-400"
              >
                View All Bookings
              </Link>
            </div>
          </div>

          {bookingsLoading && safeBookings.length === 0 && (
            <div className="mt-7 space-y-4">
              {[1, 2, 3].map((item) => (
                <BookingSkeleton key={item} />
              ))}
            </div>
          )}

          {!bookingsLoading &&
            !bookingError &&
            safeBookings.length === 0 && (
              <div className="mt-7 rounded-2xl border border-dashed border-[#D8DED9] px-5 py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
                  🏠
                </div>

                <h3 className="mt-4 text-base font-black text-[#073F32]">
                  No bookings yet
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Once you book a property, your booking details and status
                  will appear here.
                </p>

                <Link
                  to="/properties"
                  className="mt-5 inline-block rounded-full bg-[#18C66A] px-6 py-3 text-sm font-black text-[#073F32]"
                >
                  Find a property
                </Link>
              </div>
            )}

          {!bookingsLoading && safeBookings.length > 0 && (
            <div className="mt-7 space-y-4">
              {recentBookings.map((booking, index) => (
                <BookingItem
                  key={booking._id || booking.id || index}
                  booking={booking}
                  onView={() => handleViewBooking(booking)}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function DashboardCard({ title, value, description }) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">
        {title}
      </p>

      <p className="mt-3 text-3xl font-black text-[#073F32]">{value}</p>

      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}

function BookingItem({ booking, onView }) {
  const property = getProperty(booking);

  const propertyName =
    property?.title ||
    booking.propertyName ||
    "Property Booking";

  const location = [
    property?.locality,
    property?.city,
  ]
    .filter(Boolean)
    .join(", ");

  const image = Array.isArray(property?.images)
    ? property.images[0]
    : property?.images || null;

  const status = booking.status || "pending";

  const totalAmount = Number(
    booking.totalAmount ??
      booking.subtotal ??
      booking.baseAmount ??
      0
  );

  return (
    <article className="rounded-[22px] border border-[#E5E7EB] p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="h-24 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-32">
          {image ? (
            <img
              src={image}
              alt={propertyName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <h3 className="truncate text-base font-black text-[#073F32]">
                {propertyName}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {location || "Property location"}
              </p>
            </div>

            <span
              className={`w-fit flex-shrink-0 rounded-full border px-3 py-1.5 text-xs font-extrabold capitalize ${getStatusStyle(
                status
              )}`}
            >
              {status}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-gray-400">Check-in</p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                {formatDate(booking.checkIn)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Check-out</p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                {formatDate(booking.checkOut)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Total amount</p>
              <p className="mt-1 text-sm font-bold text-[#073F32]">
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={onView}
              className="text-sm font-bold text-[#168A4C] hover:underline"
            >
              View Booking Details →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function BookingSkeleton() {
  return (
    <div className="animate-pulse rounded-[22px] border border-[#E5E7EB] p-5">
      <div className="h-3 w-20 rounded bg-gray-200" />
      <div className="mt-3 h-5 w-48 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-28 rounded bg-gray-200" />
    </div>
  );
}
