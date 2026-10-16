
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getMyBookings,
  cancelBooking,
} from "../features/bookings/bookingSlice";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const formatDate = (value) => {
  if (!value) return "—";

  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);

  const date = dateOnly
    ? (() => {
        const [year, month, day] = value.split("-").map(Number);
        return new Date(year, month - 1, day);
      })()
    : new Date(value);

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

    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";

    case "cancelled":
      return "bg-gray-100 text-gray-700 border-gray-200";

    case "completed":
      return "bg-blue-50 text-blue-700 border-blue-200";

    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
};

const getPropertyDetails = (booking) => {
  if (booking?.property && typeof booking.property === "object") {
    return booking.property;
  }

  return null;
};

export default function MyBookings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookingState = useSelector(
    (state) => state.bookings || {}
  );

  const authState = useSelector(
    (state) => state.auth || {}
  );

  const bookings = useMemo(() => {
    const list =
      bookingState.bookings ??
      bookingState.myBookings ??
      bookingState.data?.bookings ??
      [];

    return Array.isArray(list) ? list : [];
  }, [bookingState.bookings, bookingState.myBookings, bookingState.data]);

  const loading = Boolean(
    bookingState.loading ||
    bookingState.bookingsLoading ||
    bookingState.myBookingsLoading
  );

  const error =
    bookingState.error ||
    bookingState.bookingsError ||
    bookingState.myBookingsError ||
    "";

  const [cancelingId, setCancelingId] = useState("");
  const [pageMessage, setPageMessage] = useState("");

  const isAuthenticated = Boolean(
    authState.isAuthenticated || authState.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMyBookings());
    }
  }, [dispatch, isAuthenticated]);

  const handleCancel = async (booking) => {
    const bookingId = booking?._id || booking?.id;

    if (!bookingId) {
      setPageMessage("Booking ID is missing. Unable to cancel.");
      return;
    }

    if (booking.status !== "pending" && booking.status !== "confirmed") {
      setPageMessage("This booking can no longer be cancelled here.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking request?"
    );

    if (!confirmed) return;

    setCancelingId(bookingId);
    setPageMessage("");

    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      await dispatch(getMyBookings()).unwrap();
      setPageMessage("Booking cancellation request completed.");
    } catch (err) {
      setPageMessage(
        typeof err === "string"
          ? err
          : err?.message ||
              err?.error ||
              "Unable to cancel this booking. Please try again."
      );
    } finally {
      setCancelingId("");
    }
  };

  const handleViewBooking = (booking) => {
    navigate("/booking-confirmation", {
      state: {
        booking,
        bookingId: booking?._id || booking?.id,
        property: getPropertyDetails(booking),
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Login Required
          </h1>

          <p className="mt-3 text-gray-600">
            Please login to view your booking history.
          </p>

          <Link
            to="/login"
            state={{ from: "/my-bookings" }}
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Bookings
            </h1>

            <p className="mt-2 text-gray-600">
              View and manage your property booking requests.
            </p>
          </div>

          <Link
            to="/properties"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Browse Properties
          </Link>
        </div>

        {pageMessage && (
          <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-800">
            {pageMessage}
          </div>
        )}

        {loading && bookings.length === 0 && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

            <p className="mt-4 text-gray-600">
              Loading your bookings...
            </p>
          </div>
        )}

        {!loading && error && bookings.length === 0 && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Unable to load bookings
            </h2>

            <p className="mt-3 text-sm text-red-600">
              {typeof error === "string"
                ? error
                : error?.message || "Something went wrong."}
            </p>

            <button
              type="button"
              onClick={() => dispatch(getMyBookings())}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-2xl">
              🏡
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No bookings yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
              Your property booking requests will appear here after you
              submit your first booking.
            </p>

            <Link
              to="/properties"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Explore Properties
            </Link>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {bookings.length} booking
                {bookings.length === 1 ? "" : "s"} found
              </p>

              <button
                type="button"
                disabled={loading}
                onClick={() => dispatch(getMyBookings())}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {bookings.map((booking) => {
              const bookingId = booking._id || booking.id;
              const property = getPropertyDetails(booking);

              const propertyTitle =
                property?.title || "Property Booking";

              const propertyImage = Array.isArray(property?.images)
                ? property.images[0]
                : property?.images || null;

              const status = booking.status || "pending";

              const totalAmount = Number(
                booking.totalAmount ??
                  booking.subtotal ??
                  booking.baseAmount ??
                  0
              );

              const canCancel =
                status === "pending" || status === "confirmed";

              return (
                <article
                  key={bookingId}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="h-48 w-full flex-shrink-0 bg-gray-100 sm:h-auto sm:w-56">
                      {propertyImage ? (
                        <img
                          src={propertyImage}
                          alt={propertyTitle}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full min-h-40 items-center justify-center text-sm text-gray-400">
                          No property image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 p-5 sm:p-6">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">
                            {propertyTitle}
                          </h2>

                          {(property?.locality || property?.city) && (
                            <p className="mt-1 text-sm text-gray-500">
                              {[property.locality, property.city]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          )}
                        </div>

                        <span
                          className={`inline-flex w-fit flex-shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-gray-500">Check-in</p>
                          <p className="mt-1 text-sm font-semibold text-gray-900">
                            {formatDate(booking.checkIn)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Check-out</p>
                          <p className="mt-1 text-sm font-semibold text-gray-900">
                            {formatDate(booking.checkOut)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Guests</p>
                          <p className="mt-1 text-sm font-semibold text-gray-900">
                            {booking.guests ?? "—"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center">
                        <div>
                          <p className="text-xs text-gray-500">
                            Booking total
                          </p>

                          <p className="mt-1 text-xl font-bold text-gray-900">
                            {formatCurrency(totalAmount)}
                          </p>

                          <p className="mt-1 break-all text-xs text-gray-400">
                            ID: {bookingId || "—"}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleViewBooking(booking)}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                          >
                            View Details
                          </button>

                          {canCancel && (
                            <button
                              type="button"
                              disabled={cancelingId === bookingId}
                              onClick={() => handleCancel(booking)}
                              className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {cancelingId === bookingId
                                ? "Cancelling..."
                                : "Cancel Booking"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
