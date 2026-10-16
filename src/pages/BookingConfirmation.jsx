// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
// getBookingById,
// selectBooking,
// selectBookingLoading,
// selectSingleBookingError,
// } from "../features/bookings/bookingSlice";

// export default function BookingConfirmation() {
// const location = useLocation();
// const navigate = useNavigate();
// const dispatch = useDispatch();

// const stateBooking = location.state?.booking || null;
// const stateBookingId =
// location.state?.bookingId ||
// stateBooking?._id ||
// stateBooking?.id ||
// "";

// const reduxBooking = useSelector(selectBooking);
// const bookingLoading = useSelector(selectBookingLoading);
// const bookingError = useSelector(selectSingleBookingError);

// const booking = stateBooking || reduxBooking;

// useEffect(() => {
// if (!stateBooking && stateBookingId) {
// dispatch(getBookingById(stateBookingId));
// }
// }, [dispatch, stateBooking, stateBookingId]);

// const property = useMemo(() => {
// if (!booking?.property) return null;

// if (typeof booking.property === "object") {
//   return booking.property;
// }

// return null;

// }, [booking]);

// const formatDate = (date) => {
// if (!date) return "—";

// const parsedDate = new Date(date);

// if (Number.isNaN(parsedDate.getTime())) {
//   return "—";
// }

// return parsedDate.toLocaleDateString("en-IN", {
//   day: "2-digit",
//   month: "short",
//   year: "numeric",
// });

// };

// const getPropertyImage = () => {
// if (!property?.images) return null;

// if (Array.isArray(property.images)) {
//   return property.images[0] || null;
// }

// return property.images;

// };

// const getStatusDetails = () => {
// switch (booking?.status) {
// case "confirmed":
// return {
// label: "Booking Confirmed",
// title: "Your booking is confirmed",
// description:
// "Your booking has been confirmed by our team. Please keep your booking details available for reference.",
// className:
// "bg-green-50 border-green-200 text-green-700",
// };

//   case "rejected":
//     return {
//       label: "Request Rejected",
//       title: "Booking request was rejected",
//       description:
//         booking?.rejectionReason ||
//         "Unfortunately, this booking request could not be confirmed.",
//       className:
//         "bg-red-50 border-red-200 text-red-700",
//     };

//   case "cancelled":
//     return {
//       label: "Booking Cancelled",
//       title: "Booking has been cancelled",
//       description:
//         booking?.cancellationReason ||
//         "This booking is no longer active.",
//       className:
//         "bg-gray-100 border-gray-200 text-gray-700",
//     };

//   case "completed":
//     return {
//       label: "Booking Completed",
//       title: "Booking completed",
//       description:
//         "This booking has been marked as completed.",
//       className:
//         "bg-blue-50 border-blue-200 text-blue-700",
//     };

//   default:
//     return {
//       label: "Request Submitted",
//       title: "Booking request submitted",
//       description:
//         "Your booking request has been received. Our team will review it and contact you for confirmation.",
//       className:
//         "bg-amber-50 border-amber-200 text-amber-700",
//     };
// }

// };

// const statusDetails = getStatusDetails();

// const pricePerNight = Number(booking?.pricePerNight) || 0;
// const nights = Number(booking?.nights) || 0;

// const calculatedTotal = pricePerNight * nights;

// const totalAmount =
// Number(booking?.totalAmount) ||
// Number(booking?.subtotal) ||
// calculatedTotal;

// if (bookingLoading && !booking) {
// return (
// <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
// <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
// <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-5" />

//       <h2 className="text-lg font-semibold text-gray-900">
//         Loading booking details
//       </h2>

//       <p className="text-sm text-gray-500 mt-2">
//         Please wait while we load your booking request.
//       </p>
//     </div>
//   </div>
// );

// }

// if (bookingError && !booking) {
// return (
// <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
// <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
// <h2 className="text-xl font-semibold text-gray-900">
// Unable to load booking
// </h2>

//       <p className="text-sm text-red-600 mt-3">
//         {bookingError}
//       </p>

//       <button
//         type="button"
//         onClick={() => navigate("/")}
//         className="mt-6 px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
//       >
//         Back to Home
//       </button>
//     </div>
//   </div>
// );

// }

// if (!booking) {
// return (
// <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
// <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
// <h2 className="text-xl font-semibold text-gray-900">
// Booking not found
// </h2>

//       <p className="text-sm text-gray-500 mt-3">
//         We could not find the booking request you are looking for.
//       </p>

//       <Link
//         to="/"
//         className="inline-flex mt-6 px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
//       >
//         Back to Home
//       </Link>
//     </div>
//   </div>
// );

// }

// const propertyImage = getPropertyImage();

// return (
// <div className="min-h-screen bg-gray-50">
// <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
// <div className="mb-8">
// <button
// type="button"
// onClick={() => navigate(-1)}
// className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
// >
// ← Back
// </button>
// </div>

//     <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
//       <div className="px-5 sm:px-8 py-8 border-b border-gray-200">
//         <div
//           className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-semibold ${statusDetails.className}`}
//         >
//           {statusDetails.label}
//         </div>

//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">
//           {statusDetails.title}
//         </h1>

//         <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl leading-6">
//           {statusDetails.description}
//         </p>

//         {booking._id && (
//           <div className="mt-5">
//             <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
//               Booking Request ID
//             </p>

//             <p className="text-sm font-mono text-gray-700 mt-1 break-all">
//               {booking._id}
//             </p>
//           </div>
//         )}
//       </div>

//       <div className="p-5 sm:p-8">
//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <section>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Property Details
//                 </h2>

//                 {property?.propertyType && (
//                   <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 capitalize">
//                     {property.propertyType}
//                   </span>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-2xl overflow-hidden">
//                 <div className="flex flex-col sm:flex-row">
//                   {propertyImage ? (
//                     <img
//                       src={propertyImage}
//                       alt={property?.title || "Property"}
//                       className="w-full sm:w-48 h-48 sm:h-auto object-cover"
//                     />
//                   ) : (
//                     <div className="w-full sm:w-48 h-48 sm:h-auto bg-gray-100 flex items-center justify-center">
//                       <span className="text-sm text-gray-400">
//                         No image
//                       </span>
//                     </div>
//                   )}

//                   <div className="p-5 flex-1">
//                     <h3 className="text-lg font-bold text-gray-900">
//                       {property?.title || "Property"}
//                     </h3>

//                     {(property?.locality || property?.city) && (
//                       <p className="text-sm text-gray-500 mt-2">
//                         {[property.locality, property.city]
//                           .filter(Boolean)
//                           .join(", ")}
//                       </p>
//                     )}

//                     {property?.rent !== undefined &&
//                       property?.rent !== null && (
//                         <div className="mt-4">
//                           <span className="text-xl font-bold text-gray-900">
//                             ₹{Number(property.rent).toLocaleString("en-IN")}
//                           </span>

//                           <span className="text-sm text-gray-500 ml-1">
//                             / {property.rentPeriod || "night"}
//                           </span>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <h2 className="text-lg font-bold text-gray-900 mb-4">
//                 Stay Details
//               </h2>

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div className="border border-gray-200 rounded-2xl p-5">
//                   <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
//                     Check-in
//                   </p>

//                   <p className="text-base font-semibold text-gray-900 mt-2">
//                     {formatDate(booking.checkIn)}
//                   </p>
//                 </div>

//                 <div className="border border-gray-200 rounded-2xl p-5">
//                   <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
//                     Check-out
//                   </p>

//                   <p className="text-base font-semibold text-gray-900 mt-2">
//                     {formatDate(booking.checkOut)}
//                   </p>
//                 </div>

//                 <div className="border border-gray-200 rounded-2xl p-5">
//                   <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
//                     Guests
//                   </p>

//                   <p className="text-base font-semibold text-gray-900 mt-2">
//                     {booking.guests || 1}
//                   </p>
//                 </div>

//                 <div className="border border-gray-200 rounded-2xl p-5">
//                   <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
//                     Duration
//                   </p>

//                   <p className="text-base font-semibold text-gray-900 mt-2">
//                     {nights} {nights === 1 ? "night" : "nights"}
//                   </p>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <h2 className="text-lg font-bold text-gray-900 mb-4">
//                 Guest Details
//               </h2>

//               <div className="border border-gray-200 rounded-2xl divide-y divide-gray-200">
//                 <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                   <span className="text-sm text-gray-500">
//                     Name
//                   </span>

//                   <span className="text-sm font-semibold text-gray-900">
//                     {booking.guestName || "—"}
//                   </span>
//                 </div>

//                 <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                   <span className="text-sm text-gray-500">
//                     Phone
//                   </span>

//                   <span className="text-sm font-semibold text-gray-900">
//                     {booking.guestPhone || "—"}
//                   </span>
//                 </div>

//                 <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                   <span className="text-sm text-gray-500">
//                     Email
//                   </span>

//                   <span className="text-sm font-semibold text-gray-900 break-all sm:text-right">
//                     {booking.guestEmail || "—"}
//                   </span>
//                 </div>
//               </div>
//             </section>

//             {booking.specialRequest && (
//               <section>
//                 <h2 className="text-lg font-bold text-gray-900 mb-4">
//                   Special Request
//                 </h2>

//                 <div className="border border-gray-200 rounded-2xl p-5">
//                   <p className="text-sm text-gray-600 leading-6">
//                     {booking.specialRequest}
//                   </p>
//                 </div>
//               </section>
//             )}
//           </div>

//           <div>
//             <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 lg:sticky lg:top-6">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Booking Summary
//               </h2>

//               <div className="mt-6 space-y-4">
//                 <div className="flex items-center justify-between gap-4">
//                   <span className="text-sm text-gray-500">
//                     Rent per night
//                   </span>

//                   <span className="text-sm font-semibold text-gray-900">
//                     ₹{pricePerNight.toLocaleString("en-IN")}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between gap-4">
//                   <span className="text-sm text-gray-500">
//                     Nights
//                   </span>

//                   <span className="text-sm font-semibold text-gray-900">
//                     {nights}
//                   </span>
//                 </div>

//                 <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
//                   <span className="text-base font-bold text-gray-900">
//                     Total
//                   </span>

//                   <span className="text-xl font-bold text-gray-900">
//                     ₹{totalAmount.toLocaleString("en-IN")}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-4">
//                 <p className="text-sm font-semibold text-gray-900">
//                   No online payment required
//                 </p>

//                 <p className="text-xs text-gray-500 mt-1 leading-5">
//                   Payment and final confirmation will be handled
//                   manually by our team.
//                 </p>
//               </div>

//               <Link
//                 to="/my-bookings"
//                 className="mt-6 w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
//               >
//                 View My Bookings
//               </Link>

//               <Link
//                 to="/"
//                 className="mt-3 w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
//               >
//                 Back to Home
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {booking.status === "pending" && (
//       <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
//         <h3 className="font-semibold text-gray-900">
//           What happens next?
//         </h3>

//         <div className="mt-4 grid sm:grid-cols-3 gap-4">
//           <div>
//             <p className="text-sm font-semibold text-gray-900">
//               1. Request received
//             </p>

//             <p className="text-xs text-gray-500 mt-1 leading-5">
//               Your booking request has been submitted successfully.
//             </p>
//           </div>

//           <div>
//             <p className="text-sm font-semibold text-gray-900">
//               2. Admin review
//             </p>

//             <p className="text-xs text-gray-500 mt-1 leading-5">
//               Our team will check the property availability.
//             </p>
//           </div>

//           <div>
//             <p className="text-sm font-semibold text-gray-900">
//               3. Confirmation
//             </p>

//             <p className="text-xs text-gray-500 mt-1 leading-5">
//               You will be contacted for payment and final confirmation.
//             </p>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// </div>

// );
// }











import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getBookingById,
  selectBooking,
  selectBookingLoading,
  selectSingleBookingError,
} from "../features/bookings/bookingSlice";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const getDateValue = (value) => {
  if (!value) return null;

  // Parse date-only values as local dates to avoid timezone shifts.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value) => {
  const date = getDateValue(value);

  if (!date) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const calculateNights = (checkIn, checkOut) => {
  const start = getDateValue(checkIn);
  const end = getDateValue(checkOut);

  if (!start || !end || end <= start) return 0;

  const startDay = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const endDay = Date.UTC(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  return Math.round((endDay - startDay) / 86400000);
};

const getPeriodLabel = (period) => {
  const value = String(period || "perNight")
    .replace(/[-_\s]/g, "")
    .toLowerCase();

  if (value === "perstay" || value === "stay") return "per stay";
  if (value === "permonth" || value === "month") return "per month";

  return "per night";
};

const getSleepingLabel = (item) => {
  if (item?.label) return item.label;

  const labels = {
    "extra-bed": "Extra Bed",
    mattress: "Mattress",
    "folding-bed": "Folding Bed",
    "floor-bedding": "Floor Bedding",
    "sofa-bed": "Sofa Bed",
    other: "Other",
  };

  return labels[item?.type] || item?.type || "Sleeping Arrangement";
};

const getPetLabel = (type) => {
  const labels = {
    dog: "Dog",
    cat: "Cat",
    bird: "Bird",
    rabbit: "Rabbit",
    other: "Other",
  };

  return labels[type] || type || "Pet";
};

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-900 text-right break-words">
        {value ?? "—"}
      </span>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="mb-4 text-lg font-bold text-gray-900">{children}</h2>
  );
}

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

  const stateProperty = location.state?.property || null;

  const reduxBooking = useSelector(selectBooking);
  const bookingLoading = useSelector(selectBookingLoading);
  const bookingError = useSelector(selectSingleBookingError);

  const booking = stateBooking || reduxBooking;

  const property = useMemo(() => {
    if (booking?.property && typeof booking.property === "object") {
      return booking.property;
    }

    return stateProperty;
  }, [booking, stateProperty]);

  useEffect(() => {
    if (!stateBooking && stateBookingId) {
      dispatch(getBookingById(stateBookingId));
    }
  }, [dispatch, stateBooking, stateBookingId]);

  const nights = useMemo(
    () => calculateNights(booking?.checkIn, booking?.checkOut),
    [booking?.checkIn, booking?.checkOut]
  );

  const statusDetails = useMemo(() => {
    switch (booking?.status) {
      case "confirmed":
        return {
          label: "Booking Confirmed",
          title: "Your booking is confirmed",
          description:
            "Your booking has been confirmed by our team. Keep these details for reference.",
          className: "bg-green-50 border-green-200 text-green-700",
        };

      case "rejected":
        return {
          label: "Request Rejected",
          title: "Booking request was rejected",
          description:
            booking?.rejectionReason ||
            "Unfortunately, this booking request could not be confirmed.",
          className: "bg-red-50 border-red-200 text-red-700",
        };

      case "cancelled":
        return {
          label: "Booking Cancelled",
          title: "Booking has been cancelled",
          description:
            booking?.cancellationReason ||
            "This booking is no longer active.",
          className: "bg-gray-100 border-gray-200 text-gray-700",
        };

      case "completed":
        return {
          label: "Booking Completed",
          title: "Booking completed",
          description: "This booking has been marked as completed.",
          className: "bg-blue-50 border-blue-200 text-blue-700",
        };

      default:
        return {
          label: "Request Submitted",
          title: "Booking request submitted",
          description:
            "Your booking request has been received. Our team will review it and contact you regarding confirmation.",
          className: "bg-amber-50 border-amber-200 text-amber-700",
        };
    }
  }, [booking]);

  // Prefer amounts saved by the backend.
  const baseAmount = Number(
    booking?.baseAmount ??
      booking?.subtotal ??
      0
  );

  const extraGuestCharges = booking?.extraGuestCharges || {};

  const extraGuestAmount = Number(
    extraGuestCharges?.amount ?? 0
  );

  const sleepingArrangements = Array.isArray(
    booking?.sleepingArrangements
  )
    ? booking.sleepingArrangements
    : [];

  const pets = Array.isArray(booking?.pets) ? booking.pets : [];

  const sleepingTotal = sleepingArrangements.reduce(
    (total, item) => total + Number(item?.amount || 0),
    0
  );

  const petTotal = pets.reduce(
    (total, item) => total + Number(item?.amount || 0),
    0
  );

  const taxes = Number(booking?.taxes || 0);

  const calculatedSubtotal =
    baseAmount + extraGuestAmount + sleepingTotal + petTotal;

  const subtotal = Number(
    booking?.subtotal ?? calculatedSubtotal
  );

  const totalAmount = Number(
    booking?.totalAmount ?? subtotal + taxes
  );

  const pricePerNight = Number(
    booking?.pricePerNight ??
      property?.rent ??
      0
  );

  const propertyImage = Array.isArray(property?.images)
    ? property.images[0]
    : property?.images || null;

  if (bookingLoading && !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
          <h2 className="text-lg font-semibold text-gray-900">
            Loading booking details
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please wait while we load your booking request.
          </p>
        </div>
      </div>
    );
  }

  if (bookingError && !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Unable to load booking
          </h2>
          <p className="mt-3 text-sm text-red-600">
            {typeof bookingError === "string"
              ? bookingError
              : bookingError?.message || "Unable to load booking details."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Booking not found
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            We could not find this booking request. Open it from My Bookings
            to view its details.
          </p>
          <Link
            to="/my-bookings"
            className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            ← Back
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {/* Booking status */}
          <header className="border-b border-gray-200 px-5 py-8 sm:px-8">
            <span
              className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${statusDetails.className}`}
            >
              {statusDetails.label}
            </span>

            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {statusDetails.title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              {statusDetails.description}
            </p>

            {(booking._id || booking.id) && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Booking Request ID
                </p>
                <p className="mt-1 break-all font-mono text-sm text-gray-700">
                  {booking._id || booking.id}
                </p>
              </div>
            )}
          </header>

          <div className="p-5 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-8 lg:col-span-2">
                {/* Property */}
                <section>
                  <SectionTitle>Property Details</SectionTitle>

                  <div className="overflow-hidden rounded-2xl border border-gray-200">
                    <div className="flex flex-col sm:flex-row">
                      {propertyImage ? (
                        <img
                          src={propertyImage}
                          alt={property?.title || "Property"}
                          className="h-48 w-full object-cover sm:h-auto sm:w-48"
                        />
                      ) : (
                        <div className="flex h-48 w-full items-center justify-center bg-gray-100 text-sm text-gray-400 sm:w-48">
                          No image
                        </div>
                      )}

                      <div className="flex-1 p-5">
                        <h3 className="text-lg font-bold text-gray-900">
                          {property?.title || "Property"}
                        </h3>

                        {(property?.locality || property?.city) && (
                          <p className="mt-2 text-sm text-gray-500">
                            {[property.locality, property.city]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        )}

                        {property?.propertyType && (
                          <span className="mt-3 inline-flex rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium capitalize text-gray-600">
                            {property.propertyType}
                          </span>
                        )}

                        <div className="mt-4">
                          <span className="text-xl font-bold text-gray-900">
                            {formatCurrency(pricePerNight)}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">
                            / {property?.rentPeriod || "night"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Stay details */}
                <section>
                  <SectionTitle>Stay Details</SectionTitle>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <DetailCard
                      label="Check-in"
                      value={formatDate(booking.checkIn)}
                    />
                    <DetailCard
                      label="Check-out"
                      value={formatDate(booking.checkOut)}
                    />
                    <DetailCard
                      label="Total Guests"
                      value={booking.guests ?? "—"}
                    />
                    <DetailCard
                      label="Duration"
                      value={`${nights} ${nights === 1 ? "night" : "nights"}`}
                    />
                  </div>
                </section>

                {/* Extra guest details */}
                {extraGuestCharges.count > 0 && (
                  <section>
                    <SectionTitle>Extra Guest Details</SectionTitle>
                    <div className="rounded-2xl border border-gray-200 p-5">
                      <div className="space-y-3">
                        <SummaryRow
                          label="Extra guests"
                          value={extraGuestCharges.count}
                        />
                        <SummaryRow
                          label="Price per person"
                          value={formatCurrency(
                            extraGuestCharges.pricePerPerson
                          )}
                        />
                        <SummaryRow
                          label="Charge period"
                          value={getPeriodLabel(
                            extraGuestCharges.chargePeriod
                          )}
                        />
                        <div className="border-t border-gray-200 pt-3">
                          <SummaryRow
                            label="Extra guest total"
                            value={formatCurrency(extraGuestAmount)}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Sleeping arrangements */}
                {sleepingArrangements.length > 0 && (
                  <section>
                    <SectionTitle>Sleeping Arrangements</SectionTitle>
                    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200">
                      {sleepingArrangements.map((item, index) => (
                        <div
                          key={`${item.type || "arrangement"}-${index}`}
                          className="p-5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {getSleepingLabel(item)}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Quantity: {item.quantity ?? 1}
                              </p>
                              {item.pricePerUnit != null && (
                                <p className="mt-1 text-xs text-gray-500">
                                  {formatCurrency(item.pricePerUnit)}{" "}
                                  {getPeriodLabel(item.chargePeriod)}
                                </p>
                              )}
                            </div>

                            <span className="text-right text-sm font-semibold text-gray-900">
                              {formatCurrency(item.amount)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Pets */}
                {pets.length > 0 && (
                  <section>
                    <SectionTitle>Pet Details</SectionTitle>
                    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200">
                      {pets.map((pet, index) => (
                        <div
                          key={`${pet.type || "pet"}-${index}`}
                          className="p-5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {getPetLabel(pet.type)}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Count: {pet.count ?? 1}
                              </p>
                              {pet.pricePerPet != null && (
                                <p className="mt-1 text-xs text-gray-500">
                                  {formatCurrency(pet.pricePerPet)}{" "}
                                  {getPeriodLabel(pet.chargePeriod)}
                                </p>
                              )}
                            </div>

                            <span className="text-right text-sm font-semibold text-gray-900">
                              {formatCurrency(pet.amount)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Guest details */}
                <section>
                  <SectionTitle>Guest Details</SectionTitle>

                  <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200">
                    <div className="flex flex-col justify-between gap-2 p-5 sm:flex-row sm:items-center">
                      <span className="text-sm text-gray-500">Name</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {booking.guestName || "—"}
                      </span>
                    </div>

                    <div className="flex flex-col justify-between gap-2 p-5 sm:flex-row sm:items-center">
                      <span className="text-sm text-gray-500">Phone</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {booking.guestPhone || "—"}
                      </span>
                    </div>

                    <div className="flex flex-col justify-between gap-2 p-5 sm:flex-row sm:items-center">
                      <span className="text-sm text-gray-500">Email</span>
                      <span className="break-all text-sm font-semibold text-gray-900 sm:text-right">
                        {booking.guestEmail || "—"}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Special request */}
                {booking.specialRequest && (
                  <section>
                    <SectionTitle>Special Request</SectionTitle>
                    <div className="rounded-2xl border border-gray-200 p-5">
                      <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                        {booking.specialRequest}
                      </p>
                    </div>
                  </section>
                )}
              </div>

              {/* Price summary */}
              <aside>
                <div className="rounded-2xl border border-gray-200 p-5 sm:p-6 lg:sticky lg:top-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Booking Summary
                  </h2>

                  <div className="mt-6 space-y-4">
                    <SummaryRow
                      label="Rent per night"
                      value={formatCurrency(pricePerNight)}
                    />

                    <SummaryRow label="Nights" value={nights} />

                    <div className="border-t border-gray-200 pt-4">
                      <SummaryRow
                        label="Base rent"
                        value={formatCurrency(baseAmount)}
                      />
                    </div>

                    {extraGuestAmount > 0 && (
                      <SummaryRow
                        label="Extra guest charges"
                        value={formatCurrency(extraGuestAmount)}
                      />
                    )}

                    {sleepingTotal > 0 && (
                      <SummaryRow
                        label="Sleeping arrangements"
                        value={formatCurrency(sleepingTotal)}
                      />
                    )}

                    {petTotal > 0 && (
                      <SummaryRow
                        label="Pet charges"
                        value={formatCurrency(petTotal)}
                      />
                    )}

                    {taxes > 0 && (
                      <SummaryRow
                        label="Taxes & fees"
                        value={formatCurrency(taxes)}
                      />
                    )}

                    <div className="border-t border-gray-200 pt-4">
                      <SummaryRow
                        label="Subtotal"
                        value={formatCurrency(subtotal)}
                      />

                      <div className="mt-4 flex items-start justify-between gap-4">
                        <span className="font-bold text-gray-900">
                          Total Amount
                        </span>
                        <span className="text-xl font-bold text-indigo-600">
                          {formatCurrency(totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-gray-900">
                      No online payment required
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Payment and final confirmation will be handled by our
                      team.
                    </p>
                  </div>

                  <Link
                    to="/my-bookings"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    View My Bookings
                  </Link>

                  <Link
                    to="/"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-gray-300 px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Back to Home
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {booking.status === "pending" && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-gray-900">What happens next?</h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  1. Request received
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Your booking request has been submitted successfully.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  2. Admin review
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Our team will check your request and property availability.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  3. Confirmation
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  You will be contacted regarding final confirmation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
