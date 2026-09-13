import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminConfirmedBooking() {
const navigate = useNavigate();

const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const getToken = () => {
return localStorage.getItem("coral_admin_token");
};

const fetchConfirmedBookings = async () => {
try {
setLoading(true);
setError("");

  const token = getToken();

  if (!token) {
    navigate("/admin/login");
    return;
  }

  const response = await fetch(
    `${API_URL}/admin/bookings`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to fetch bookings"
    );
  }

  const allBookings = Array.isArray(data)
    ? data
    : data?.bookings || data?.data || [];

  const confirmedBookings = allBookings.filter(
    (booking) => booking.status === "confirmed"
  );

  setBookings(confirmedBookings);
} catch (error) {
  console.error("Confirmed bookings error:", error);

  setError(
    error?.message ||
      "Something went wrong while loading confirmed bookings."
  );
} finally {
  setLoading(false);
}

};

useEffect(() => {
fetchConfirmedBookings();
}, []);

const formatDate = (date) => {
if (!date) return "-";

const parsedDate = new Date(date);

if (Number.isNaN(parsedDate.getTime())) {
  return "-";
}

return parsedDate.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

};

const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
};

const getPropertyName = (booking) => {
return (
booking?.property?.title ||
booking?.property?.propertyName ||
"Property"
);
};

const getPropertyLocation = (booking) => {
const property = booking?.property;

if (!property) {
  return "Location not available";
}

return (
  [
    property.locality,
    property.city,
    property.state,
  ]
    .filter(Boolean)
    .join(", ") || "Location not available"
);

};

const getCustomerName = (booking) => {
return (
booking?.guestName ||
booking?.user?.name ||
booking?.user?.fullName ||
"Guest"
);
};

const getCustomerPhone = (booking) => {
return (
booking?.guestPhone ||
booking?.user?.phone ||
booking?.user?.mobile ||
"-"
);
};

const getCustomerEmail = (booking) => {
return (
booking?.guestEmail ||
booking?.user?.email ||
"-"
);
};

return (
<div className="min-h-screen bg-gray-50 p-4 md:p-6">
<div className="mx-auto max-w-7xl">

    {/* HEADER */}
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div>
        <button
          onClick={() => navigate("/admin")}
          className="mb-3 text-sm font-medium text-gray-500 transition hover:text-blue-600"
        >
          ← Back to Dashboard
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <span className="text-xl">✓</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Confirmed Bookings
            </h1>

            <p className="text-sm text-gray-500">
              All confirmed property booking requests
            </p>
          </div>

        </div>
      </div>

      <button
        onClick={fetchConfirmedBookings}
        disabled={loading}
        className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Refreshing..." : "Refresh"}
      </button>

    </div>

    {/* ERROR */}
    {error && (
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-medium text-red-700">
          {error}
        </p>
      </div>
    )}

    {/* SUMMARY */}
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Confirmed Bookings
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600">
          {bookings.length}
        </h2>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Total Booking Value
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          {formatCurrency(
            bookings.reduce(
              (total, booking) =>
                total +
                Number(booking?.totalAmount || 0),
              0
            )
          )}
        </h2>
      </div>

    </div>

    {/* LOADING */}
    {loading ? (
      <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">

        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

        <p className="text-gray-600">
          Loading confirmed bookings...
        </p>

      </div>
    ) : bookings.length === 0 ? (

      /* EMPTY */
      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <span className="text-2xl">📋</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          No Confirmed Bookings
        </h2>

        <p className="mt-2 text-gray-500">
          Confirmed bookings will appear here after admin approval.
        </p>

      </div>

    ) : (

      /* BOOKING LIST */
      <div className="space-y-5">

        {bookings.map((booking) => {

          const property = booking?.property;

          return (
            <div
              key={booking._id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >

              <div className="p-5 md:p-6">

                {/* TOP SECTION */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                  {/* PROPERTY */}
                  <div className="flex min-w-0 gap-4">

                    <div className="h-24 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">

                      {property?.images?.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={getPropertyName(booking)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}

                    </div>

                    <div className="min-w-0">

                      <div className="mb-1 flex flex-wrap items-center gap-2">

                        <h2 className="truncate text-lg font-bold text-gray-900">
                          {getPropertyName(booking)}
                        </h2>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          CONFIRMED
                        </span>

                      </div>

                      <p className="text-sm text-gray-500">
                        {getPropertyLocation(booking)}
                      </p>

                      <p className="mt-2 break-all text-xs text-gray-400">
                        Booking ID: {booking._id}
                      </p>

                    </div>

                  </div>

                  {/* AMOUNT */}
                  <div className="lg:text-right">

                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Total Amount
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      {formatCurrency(
                        booking.totalAmount
                      )}
                    </p>

                    <p className="text-xs text-gray-500">
                      {booking.nights || 0} night
                      {Number(booking.nights) === 1
                        ? ""
                        : "s"}
                    </p>

                  </div>

                </div>

                {/* BOOKING DETAILS */}
                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Customer
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {getCustomerName(booking)}
                    </p>

                    <p className="text-sm text-gray-500">
                      {getCustomerPhone(booking)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-gray-700">
                      {getCustomerEmail(booking)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Check-in
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {formatDate(booking.checkIn)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Check-out
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {formatDate(booking.checkOut)}
                    </p>
                  </div>

                </div>

                {/* EXTRA INFORMATION */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      Guests
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      {booking.guests || 0}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      Rent / Night
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      {formatCurrency(
                        booking.pricePerNight
                      )}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      Confirmed On
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      {formatDate(
                        booking.confirmedAt ||
                          booking.updatedAt
                      )}
                    </p>
                  </div>

                </div>

                {/* SPECIAL REQUEST */}
                {booking.specialRequest && (
                  <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">

                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      Special Request
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {booking.specialRequest}
                    </p>

                  </div>
                )}

                {/* ACTION */}
                <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">

                  <button
                    onClick={() =>
                      navigate(
                        `/admin/bookings/${booking._id}`
                      )
                    }
                    className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    View Booking Details
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </div>
    )}

  </div>
</div>

);
}