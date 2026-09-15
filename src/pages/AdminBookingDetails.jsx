// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function AdminBookingDetails() {
// const { id } = useParams();
// const navigate = useNavigate();

// const [booking, setBooking] = useState(null);
// const [loading, setLoading] = useState(true);
// const [actionLoading, setActionLoading] = useState(false);
// const [error, setError] = useState("");

// const [rejectReason, setRejectReason] = useState("");
// const [showRejectBox, setShowRejectBox] = useState(false);
// const [paymentStatus, setPaymentStatus] = useState("pending");
// const [paymentMethod, setPaymentMethod] = useState("");
// const [paymentAmount, setPaymentAmount] = useState("");
// const [paymentReference, setPaymentReference] = useState("");
// const [paymentNote, setPaymentNote] = useState("");
// const [documents, setDocuments] = useState([]);
// const [documentLoading, setDocumentLoading] = useState(false);
// const [paymentLoading, setPaymentLoading] = useState(false);

// const getToken = () => {
// return localStorage.getItem("coral_admin_token");
// };

// const fetchBooking = async () => {
// try {
// setLoading(true);
// setError("");

//   const token = getToken();

//   if (!token) {
//     navigate("/admin/login");
//     return;
//   }

//   const response = await fetch(
//     `${API_URL}/admin/bookings/${id}`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(
//       data?.message || "Failed to fetch booking details"
//     );
//   }

//   setBooking(
//     data?.booking ||
//       data?.data ||
//       data
//   );
// } catch (error) {
//   console.error("Booking details error:", error);

//   setError(
//     error?.message ||
//       "Unable to load booking details."
//   );
// } finally {
//   setLoading(false);
// }

// };

// useEffect(() => {
// if (id) {
// fetchBooking();
// }
// }, [id]);

// const formatDate = (date) => {
// if (!date) return "-";

// const parsedDate = new Date(date);

// if (Number.isNaN(parsedDate.getTime())) {
//   return "-";
// }

// return parsedDate.toLocaleDateString("en-IN", {
//   day: "2-digit",
//   month: "short",
//   year: "numeric",
// });

// };

// const formatDateTime = (date) => {
// if (!date) return "-";

// const parsedDate = new Date(date);

// if (Number.isNaN(parsedDate.getTime())) {
//   return "-";
// }

// return parsedDate.toLocaleString("en-IN", {
//   day: "2-digit",
//   month: "short",
//   year: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
// });

// };

// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(amount || 0));
// };

// const getPropertyName = () => {
// return (
// booking?.property?.title ||
// booking?.property?.propertyName ||
// "Property"
// );
// };

// const getPropertyLocation = () => {
// const property = booking?.property;

// if (!property) {
//   return "Location not available";
// }

// return (
//   [
//     property.locality,
//     property.city,
//     property.state,
//   ]
//     .filter(Boolean)
//     .join(", ") || "Location not available"
// );

// };

// const getCustomerName = () => {
// return (
// booking?.guestName ||
// booking?.user?.name ||
// booking?.user?.fullName ||
// "Guest"
// );
// };

// const getCustomerPhone = () => {
// return (
// booking?.guestPhone ||
// booking?.user?.phone ||
// booking?.user?.mobile ||
// "-"
// );
// };

// const getCustomerEmail = () => {
// return (
// booking?.guestEmail ||
// booking?.user?.email ||
// "-"
// );
// };

// const getStatusClass = () => {
// switch (booking?.status) {
// case "confirmed":
// return "bg-green-100 text-green-700";

//   case "pending":
//     return "bg-yellow-100 text-yellow-700";

//   case "rejected":
//     return "bg-red-100 text-red-700";

//   case "cancelled":
//     return "bg-gray-100 text-gray-700";

//   case "completed":
//     return "bg-blue-100 text-blue-700";

//   default:
//     return "bg-gray-100 text-gray-700";
// }

// };

// const handleConfirm = async () => {
// const confirmed = window.confirm(
// "Are you sure you want to confirm this booking?"
// );

// if (!confirmed) return;

// try {
//   setActionLoading(true);
//   setError("");

//   const token = getToken();

//   const response = await fetch(
//     `${API_URL}/admin/bookings/${id}/confirm`,
//     {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(
//       data?.message ||
//         "Failed to confirm booking"
//     );
//   }

//   alert(
//     "Booking confirmed successfully."
//   );

//   await fetchBooking();
// } catch (error) {
//   console.error(
//     "Confirm booking error:",
//     error
//   );

//   setError(
//     error?.message ||
//       "Failed to confirm booking."
//   );
// } finally {
//   setActionLoading(false);
// }

// };

// const handleReject = async () => {
// const reason =
// rejectReason.trim() ||
// "Booking request rejected by admin.";

// const confirmed = window.confirm(
//   "Are you sure you want to reject this booking?"
// );

// if (!confirmed) return;

// try {
//   setActionLoading(true);
//   setError("");

//   const token = getToken();

//   const response = await fetch(
//     `${API_URL}/admin/bookings/${id}/reject`,
//     {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         reason,
//       }),
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(
//       data?.message ||
//         "Failed to reject booking"
//     );
//   }

//   alert(
//     "Booking rejected successfully."
//   );

//   setShowRejectBox(false);
//   setRejectReason("");

//   await fetchBooking();
// } catch (error) {
//   console.error(
//     "Reject booking error:",
//     error
//   );

//   setError(
//     error?.message ||
//       "Failed to reject booking."
//   );
// } finally {
//   setActionLoading(false);
// }

// };

// const handleDocumentChange = (event) => {
//   setDocuments(Array.from(event.target.files || []));
// };

// const handleUploadDocuments = async () => {
//   if (!documents.length) {
//     alert("Please select at least one document.");
//     return;
//   }

//   try {
//     setDocumentLoading(true);
//     setError("");

//     const formData = new FormData();
//     documents.forEach((file) => {
//       formData.append("documents", file);
//     });

//     const response = await fetch(
//       API_URL + "/admin/bookings/" + id + "/documents",
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: "Bearer " + getToken(),
//         },
//         body: formData,
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data?.message || "Failed to upload documents.");
//     }

//     alert("Documents uploaded successfully.");
//     setDocuments([]);
//     await fetchBooking();
//   } catch (error) {
//     console.error("Document upload error:", error);
//     setError(error?.message || "Failed to upload documents.");
//   } finally {
//     setDocumentLoading(false);
//   }
// };

// const handleSavePayment = async () => {
//   if (!paymentMethod) {
//     alert("Please select a payment method.");
//     return;
//   }

//   if (!paymentAmount || Number(paymentAmount) <= 0) {
//     alert("Please enter a valid payment amount.");
//     return;
//   }

//   try {
//     setPaymentLoading(true);
//     setError("");

//     const response = await fetch(
//       API_URL + "/admin/bookings/" + id + "/payment",
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: "Bearer " + getToken(),
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           paymentStatus,
//           paymentMethod,
//           paymentAmount: Number(paymentAmount),
//           paymentReference,
//           paymentNote,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data?.message || "Failed to save payment details.");
//     }

//     alert("Payment details saved successfully.");
//     await fetchBooking();
//   } catch (error) {
//     console.error("Payment save error:", error);
//     setError(error?.message || "Failed to save payment details.");
//   } finally {
//     setPaymentLoading(false);
//   }
// };

// if (loading) {
// return (
// <div className="min-h-screen bg-gray-50 p-6">
// <div className="mx-auto max-w-6xl">
// <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

//         <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

//         <p className="text-gray-600">
//           Loading booking details...
//         </p>

//       </div>
//     </div>
//   </div>
// );

// }

// if (!booking) {
// return (
// <div className="min-h-screen bg-gray-50 p-6">
// <div className="mx-auto max-w-6xl">

//       <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

//         <h2 className="text-xl font-bold text-gray-900">
//           Booking Not Found
//         </h2>

//         <p className="mt-2 text-gray-500">
//           This booking could not be found.
//         </p>

//         <button
//           onClick={() => navigate("/admin")}
//           className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
//         >
//           Back to Dashboard
//         </button>

//       </div>

//     </div>
//   </div>
// );

// }

// const isPending =
// booking.status === "pending";

// const isConfirmed =
// booking.status === "confirmed";

// return (
// <div className="min-h-screen bg-gray-50 p-4 md:p-6">
// <div className="mx-auto max-w-6xl">

//     {/* HEADER */}
//     <div className="mb-6">

//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-sm font-medium text-gray-500 transition hover:text-blue-600"
//       >
//         ← Back
//       </button>

//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
//             Booking Details
//           </h1>

//           <p className="mt-1 break-all text-sm text-gray-500">
//             Booking ID: {booking._id}
//           </p>
//         </div>

//         <span
//           className={`w-fit rounded-full px-4 py-2 text-sm font-bold uppercase ${getStatusClass()}`}
//         >
//           {booking.status}
//         </span>

//       </div>

//     </div>

//     {/* ERROR */}
//     {error && (
//       <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
//         <p className="text-sm font-medium text-red-700">
//           {error}
//         </p>
//       </div>
//     )}

//     {/* PROPERTY */}
//     <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

//       <div className="border-b border-gray-100 px-5 py-4 md:px-6">
//         <h2 className="text-lg font-bold text-gray-900">
//           Property Information
//         </h2>
//       </div>

//       <div className="p-5 md:p-6">

//         <div className="flex flex-col gap-5 md:flex-row">

//           <div className="h-48 w-full overflow-hidden rounded-xl bg-gray-100 md:h-36 md:w-52">

//             {booking.property?.images?.length > 0 ? (
//               <img
//                 src={booking.property.images[0]}
//                 alt={getPropertyName()}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <div className="flex h-full items-center justify-center text-sm text-gray-400">
//                 No Property Image
//               </div>
//             )}

//           </div>

//           <div className="flex-1">

//             <h3 className="text-xl font-bold text-gray-900">
//               {getPropertyName()}
//             </h3>

//             <p className="mt-2 text-sm text-gray-500">
//               {getPropertyLocation()}
//             </p>

//             {booking.property?.rent && (
//               <p className="mt-3 text-sm text-gray-700">
//                 Rent:{" "}
//                 <span className="font-bold">
//                   {formatCurrency(
//                     booking.property.rent
//                   )}
//                 </span>
//               </p>
//             )}

//           </div>

//         </div>

//       </div>

//     </div>

//     {/* CUSTOMER */}
//     <div className="mb-6 rounded-2xl border border-gray-100 bg-white shadow-sm">

//       <div className="border-b border-gray-100 px-5 py-4 md:px-6">
//         <h2 className="text-lg font-bold text-gray-900">
//           Customer Information
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 md:p-6">

//         <div>
//           <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
//             Customer Name
//           </p>

//           <p className="mt-1 text-base font-semibold text-gray-800">
//             {getCustomerName()}
//           </p>
//         </div>

//         <div>
//           <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
//             Phone Number
//           </p>

//           <p className="mt-1 text-base font-semibold text-gray-800">
//             {getCustomerPhone()}
//           </p>
//         </div>

//         <div>
//           <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
//             Email
//           </p>

//           <p className="mt-1 break-all text-base font-semibold text-gray-800">
//             {getCustomerEmail()}
//           </p>
//         </div>

//         <div>
//           <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
//             User ID
//           </p>

//           <p className="mt-1 break-all text-sm text-gray-600">
//             {booking.user?._id ||
//               booking.user ||
//               "-"}
//           </p>
//         </div>

//       </div>

//     </div>

//     {/* BOOKING INFORMATION */}
//     <div className="mb-6 rounded-2xl border border-gray-100 bg-white shadow-sm">

//       <div className="border-b border-gray-100 px-5 py-4 md:px-6">
//         <h2 className="text-lg font-bold text-gray-900">
//           Booking Information
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 md:p-6">

//         <div className="rounded-xl bg-gray-50 p-4">
//           <p className="text-xs text-gray-500">
//             Check-in
//           </p>

//           <p className="mt-1 font-bold text-gray-800">
//             {formatDate(booking.checkIn)}
//           </p>
//         </div>

//         <div className="rounded-xl bg-gray-50 p-4">
//           <p className="text-xs text-gray-500">
//             Check-out
//           </p>

//           <p className="mt-1 font-bold text-gray-800">
//             {formatDate(booking.checkOut)}
//           </p>
//         </div>

//         <div className="rounded-xl bg-gray-50 p-4">
//           <p className="text-xs text-gray-500">
//             Guests
//           </p>

//           <p className="mt-1 font-bold text-gray-800">
//             {booking.guests || 0}
//           </p>
//         </div>

//         <div className="rounded-xl bg-gray-50 p-4">
//           <p className="text-xs text-gray-500">
//             Nights
//           </p>

//           <p className="mt-1 font-bold text-gray-800">
//             {booking.nights || 0}
//           </p>
//         </div>

//         <div className="rounded-xl bg-gray-50 p-4">
//           <p className="text-xs text-gray-500">
//             Rent / Night
//           </p>

//           <p className="mt-1 font-bold text-gray-800">
//             {formatCurrency(
//               booking.pricePerNight
//             )}
//           </p>
//         </div>

//         <div className="rounded-xl bg-gray-50 p-4">
//           <p className="text-xs text-gray-500">
//             Total Amount
//           </p>

//           <p className="mt-1 text-xl font-bold text-gray-900">
//             {formatCurrency(
//               booking.totalAmount
//             )}
//           </p>
//         </div>

//       </div>

//     </div>

//     {/* SPECIAL REQUEST */}
//     {booking.specialRequest && (
//       <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 md:p-6">

//         <h2 className="text-base font-bold text-blue-800">
//           Special Request
//         </h2>

//         <p className="mt-2 text-sm leading-6 text-gray-700">
//           {booking.specialRequest}
//         </p>

//       </div>
//     )}

//     {/* PAYMENT & DOCUMENTS */}
//     <div className="mb-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
//       <div className="border-b border-gray-100 px-5 py-4 md:px-6">
//         <h2 className="text-lg font-bold text-gray-900">Payment & Documents</h2>
//         <p className="mt-1 text-sm text-gray-500">
//           Record offline payment and upload customer documents before final confirmation.
//         </p>
//       </div>

//       <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-2">

//         <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-bold text-gray-900">Manual Payment</p>
//               <p className="mt-1 text-xs text-gray-500">No online payment is required.</p>
//             </div>
//             <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
//               Offline
//             </span>
//           </div>

//           <div className="mt-5 grid gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-1 block text-xs font-bold text-gray-600">Payment Status</label>
//               <select
//                 value={paymentStatus}
//                 onChange={(e) => setPaymentStatus(e.target.value)}
//                 className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="partial">Partial</option>
//                 <option value="paid">Paid</option>
//               </select>
//             </div>

//             <div>
//               <label className="mb-1 block text-xs font-bold text-gray-600">Payment Method</label>
//               <select
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
//               >
//                 <option value="">Select method</option>
//                 <option value="cash">Cash</option>
//                 <option value="upi">UPI</option>
//                 <option value="bank_transfer">Bank Transfer</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label className="mb-1 block text-xs font-bold text-gray-600">Amount Received</label>
//               <input
//                 type="number"
//                 min="0"
//                 value={paymentAmount}
//                 onChange={(e) => setPaymentAmount(e.target.value)}
//                 placeholder="Enter amount"
//                 className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-xs font-bold text-gray-600">Reference / Transaction ID</label>
//               <input
//                 type="text"
//                 value={paymentReference}
//                 onChange={(e) => setPaymentReference(e.target.value)}
//                 placeholder="Optional"
//                 className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
//               />
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="mb-1 block text-xs font-bold text-gray-600">Payment Note</label>
//             <textarea
//               rows={3}
//               value={paymentNote}
//               onChange={(e) => setPaymentNote(e.target.value)}
//               placeholder="Example: Customer paid advance by UPI..."
//               className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleSavePayment}
//             disabled={paymentLoading || !isPending}
//             className="mt-4 rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {paymentLoading ? "Saving..." : "Save Payment"}
//           </button>
//         </div>

//         <div className="rounded-2xl border border-gray-200 bg-white p-5">
//           <p className="font-bold text-gray-900">Customer Documents</p>
//           <p className="mt-1 text-xs text-gray-500">
//             Upload ID proof, address proof, agreement or other required documents.
//           </p>

//           <div className="mt-5 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5">
//             <input
//               type="file"
//               multiple
//               accept=".pdf,.jpg,.jpeg,.png,.webp"
//               onChange={handleDocumentChange}
//               className="block w-full text-sm text-gray-600"
//             />
//             <p className="mt-2 text-xs text-gray-400">
//               PDF, JPG, JPEG, PNG or WEBP
//             </p>
//           </div>

//           {documents.length > 0 && (
//             <div className="mt-4 space-y-2">
//               {documents.map((file, index) => (
//                 <div
//                   key={file.name + "-" + index}
//                   className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
//                 >
//                   <span className="truncate text-sm font-semibold text-gray-700">
//                     {file.name}
//                   </span>
//                   <span className="ml-3 text-xs text-gray-400">
//                     {(file.size / 1024 / 1024).toFixed(2)} MB
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {Array.isArray(booking.documents) && booking.documents.length > 0 && (
//             <div className="mt-5">
//               <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
//                 Uploaded Documents
//               </p>

//               <div className="mt-3 space-y-2">
//                 {booking.documents.map((document, index) => (
//                   <a
//                     key={document?._id || document?.url || index}
//                     href={document?.url || document}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
//                   >
//                     <span className="truncate">
//                       {document?.name || "Document " + (index + 1)}
//                     </span>
//                     <span className="ml-3">View</span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={handleUploadDocuments}
//             disabled={documentLoading || !documents.length || !isPending}
//             className="mt-5 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {documentLoading ? "Uploading..." : "Upload Documents"}
//           </button>
//         </div>
//       </div>

//       <div className="border-t border-gray-100 bg-yellow-50 px-5 py-4 md:px-6">
//         <p className="text-sm font-semibold text-yellow-800">
//           Complete payment and document verification before confirming the booking.
//         </p>
//       </div>
//     </div>

//     {/* REJECTION REASON */}
//     {booking.rejectionReason && (
//       <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 md:p-6">

//         <h2 className="font-bold text-red-800">
//           Rejection Reason
//         </h2>

//         <p className="mt-2 text-sm text-red-700">
//           {booking.rejectionReason}
//         </p>

//       </div>
//     )}

//     {/* BOOKING TIMELINE */}
//     <div className="mb-6 rounded-2xl border border-gray-100 bg-white shadow-sm">

//       <div className="border-b border-gray-100 px-5 py-4 md:px-6">
//         <h2 className="text-lg font-bold text-gray-900">
//           Booking Timeline
//         </h2>
//       </div>

//       <div className="space-y-4 p-5 md:p-6">

//         <div className="flex gap-3">

//           <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-blue-500" />

//           <div>
//             <p className="font-semibold text-gray-800">
//               Booking Request Created
//             </p>

//             <p className="text-sm text-gray-500">
//               {formatDateTime(
//                 booking.createdAt
//               )}
//             </p>
//           </div>

//         </div>

//         {booking.confirmedAt && (
//           <div className="flex gap-3">

//             <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-green-500" />

//             <div>
//               <p className="font-semibold text-gray-800">
//                 Booking Confirmed
//               </p>

//               <p className="text-sm text-gray-500">
//                 {formatDateTime(
//                   booking.confirmedAt
//                 )}
//               </p>
//             </div>

//           </div>
//         )}

//         {booking.cancelledAt && (
//           <div className="flex gap-3">

//             <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-gray-500" />

//             <div>
//               <p className="font-semibold text-gray-800">
//                 Booking Cancelled
//               </p>

//               <p className="text-sm text-gray-500">
//                 {formatDateTime(
//                   booking.cancelledAt
//                 )}
//               </p>
//             </div>

//           </div>
//         )}

//       </div>

//     </div>

//     {/* ADMIN ACTIONS */}
//     {isPending && (
//       <div className="sticky bottom-0 z-20 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg md:p-5">

//         {showRejectBox && (
//           <div className="mb-4">

//             <label className="mb-2 block text-sm font-semibold text-gray-700">
//               Rejection Reason
//             </label>

//             <textarea
//               value={rejectReason}
//               onChange={(e) =>
//                 setRejectReason(
//                   e.target.value
//                 )
//               }
//               rows={3}
//               placeholder="Enter reason for rejecting this booking..."
//               className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
//             />

//           </div>
//         )}

//         <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

//           <button
//             onClick={() => {
//               if (showRejectBox) {
//                 handleReject();
//               } else {
//                 setShowRejectBox(true);
//               }
//             }}
//             disabled={actionLoading}
//             className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {actionLoading
//               ? "Processing..."
//               : showRejectBox
//               ? "Reject Booking"
//               : "Reject"}
//           </button>

//           {!showRejectBox && (
//             <button
//               onClick={handleConfirm}
//               disabled={actionLoading}
//               className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {actionLoading
//                 ? "Processing..."
//                 : "Confirm & Block Property"}
//             </button>
//           )}

//           {showRejectBox && (
//             <button
//               onClick={() => {
//                 setShowRejectBox(false);
//                 setRejectReason("");
//               }}
//               disabled={actionLoading}
//               className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//           )}

//         </div>

//       </div>
//     )}

//     {/* CONFIRMED MESSAGE */}
//     {isConfirmed && (
//       <div className="rounded-2xl border border-green-200 bg-green-50 p-5 md:p-6">

//         <div className="flex gap-3">

//           <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
//             <span className="font-bold text-green-600">
//               ✓
//             </span>
//           </div>

//           <div>
//             <h2 className="font-bold text-green-800">
//               Booking Confirmed
//             </h2>

//             <p className="mt-1 text-sm text-green-700">
//               This property is blocked for the selected booking dates.
//             </p>

//             {booking.confirmedAt && (
//               <p className="mt-2 text-xs text-green-600">
//                 Confirmed on{" "}
//                 {formatDateTime(
//                   booking.confirmedAt
//                 )}
//               </p>
//             )}
//           </div>

//         </div>

//       </div>
//     )}

//   </div>
// </div>

// );
// }







import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminBookingDetails() {
const { id } = useParams();
const navigate = useNavigate();

const [booking, setBooking] = useState(null);
const [loading, setLoading] = useState(true);
const [actionLoading, setActionLoading] = useState(false);
const [error, setError] = useState("");

const [rejectReason, setRejectReason] = useState("");
const [showRejectBox, setShowRejectBox] = useState(false);

const [paymentStatus, setPaymentStatus] = useState("pending");
const [paymentMethod, setPaymentMethod] = useState("");
const [paymentAmount, setPaymentAmount] = useState("");
const [paymentReference, setPaymentReference] = useState("");
const [paymentNote, setPaymentNote] = useState("");

const [documents, setDocuments] = useState([]);
const [documentLoading, setDocumentLoading] = useState(false);
const [paymentLoading, setPaymentLoading] = useState(false);

const getToken = () => {
return localStorage.getItem("coral_admin_token");
};

const fetchBooking = async () => {
try {
setLoading(true);
setError("");

  const token = getToken();

  if (!token) {
    navigate("/admin/login");
    return;
  }

  const response = await fetch(
    API_URL + "/admin/bookings/" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to fetch booking details"
    );
  }

  const bookingData =
    data?.booking ||
    data?.data ||
    data;

  setBooking(bookingData);

  setPaymentStatus(
    bookingData?.paymentStatus || "pending"
  );

  setPaymentMethod(
    bookingData?.paymentMethod || ""
  );

  setPaymentAmount(
    bookingData?.paymentAmount !== undefined &&
    bookingData?.paymentAmount !== null
      ? String(bookingData.paymentAmount)
      : ""
  );

  setPaymentReference(
    bookingData?.paymentReference || ""
  );

  setPaymentNote(
    bookingData?.paymentNote || ""
  );
} catch (error) {
  console.error(
    "Booking details error:",
    error
  );

  setError(
    error?.message ||
      "Unable to load booking details."
  );
} finally {
  setLoading(false);
}

};

useEffect(() => {
if (id) {
fetchBooking();
}
}, [id]);

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

const formatDateTime = (date) => {
if (!date) return "-";

const parsedDate = new Date(date);

if (Number.isNaN(parsedDate.getTime())) {
  return "-";
}

return parsedDate.toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

};

const formatCurrency = (amount) => {
return new Intl.NumberFormat("en-IN", {
style: "currency",
currency: "INR",
maximumFractionDigits: 0,
}).format(Number(amount || 0));
};

const getPropertyName = () => {
return (
booking?.property?.title ||
booking?.property?.propertyName ||
"Property"
);
};

const getPropertyLocation = () => {
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
    .join(", ") ||
  "Location not available"
);

};

const getCustomerName = () => {
return (
booking?.guestName ||
booking?.user?.name ||
booking?.user?.fullName ||
"Guest"
);
};

const getCustomerPhone = () => {
return (
booking?.guestPhone ||
booking?.user?.phone ||
booking?.user?.mobile ||
"-"
);
};

const getCustomerEmail = () => {
return (
booking?.guestEmail ||
booking?.user?.email ||
"-"
);
};

const getStatusClass = () => {
switch (booking?.status) {
case "confirmed":
return "bg-green-100 text-green-700";

  case "pending":
    return "bg-yellow-100 text-yellow-700";

  case "rejected":
    return "bg-red-100 text-red-700";

  case "cancelled":
    return "bg-gray-100 text-gray-700";

  case "completed":
    return "bg-blue-100 text-blue-700";

  default:
    return "bg-gray-100 text-gray-700";
}

};

const getPaymentStatusClass = () => {
switch (booking?.paymentStatus) {
case "paid":
return "bg-green-100 text-green-700";

  case "partial":
    return "bg-orange-100 text-orange-700";

  case "refunded":
    return "bg-purple-100 text-purple-700";

  default:
    return "bg-yellow-100 text-yellow-700";
}

};

const getPaymentMethodLabel = (method) => {
switch (method) {
case "cash":
return "Cash";

  case "upi":
    return "UPI";

  case "bank_transfer":
    return "Bank Transfer";

  case "other":
    return "Other";

  default:
    return method || "-";
}

};

const handleConfirm = async () => {
if (booking?.status !== "pending") {
return;
}

if (paymentStatus !== "paid") {
  alert(
    "Please complete the payment and mark payment status as Paid before confirming."
  );
  return;
}

if (
  !Array.isArray(booking?.documents) ||
  booking.documents.length === 0
) {
  alert(
    "Please upload at least one customer document before confirming."
  );
  return;
}

const confirmed = window.confirm(
  "Are you sure you want to confirm this booking?"
);

if (!confirmed) return;

try {
  setActionLoading(true);
  setError("");

  const token = getToken();

  const response = await fetch(
    API_URL + "/admin/bookings/" + id + "/confirm",
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Failed to confirm booking"
    );
  }

  alert(
    "Booking confirmed successfully."
  );

  await fetchBooking();
} catch (error) {
  console.error(
    "Confirm booking error:",
    error
  );

  setError(
    error?.message ||
      "Failed to confirm booking."
  );
} finally {
  setActionLoading(false);
}

};

const handleReject = async () => {
const reason =
rejectReason.trim() ||
"Booking request rejected by admin.";

const confirmed = window.confirm(
  "Are you sure you want to reject this booking?"
);

if (!confirmed) return;

try {
  setActionLoading(true);
  setError("");

  const token = getToken();

  const response = await fetch(
    API_URL + "/admin/bookings/" + id + "/reject",
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Failed to reject booking"
    );
  }

  alert(
    "Booking rejected successfully."
  );

  setShowRejectBox(false);
  setRejectReason("");

  await fetchBooking();
} catch (error) {
  console.error(
    "Reject booking error:",
    error
  );

  setError(
    error?.message ||
      "Failed to reject booking."
  );
} finally {
  setActionLoading(false);
}

};

const handleDocumentChange = (event) => {
setDocuments(
Array.from(event.target.files || [])
);
};

const handleUploadDocuments = async () => {
if (!documents.length) {
alert(
"Please select at least one document."
);
return;
}

if (booking?.status !== "pending") {
  return;
}

try {
  setDocumentLoading(true);
  setError("");

  const formData = new FormData();

  documents.forEach((file) => {
    formData.append("documents", file);
  });

  const response = await fetch(
    API_URL +
      "/admin/bookings/" +
      id +
      "/documents",
    {
      method: "PATCH",
      headers: {
        Authorization:
          "Bearer " + getToken(),
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Failed to upload documents."
    );
  }

  alert(
    "Documents uploaded successfully."
  );

  setDocuments([]);

  await fetchBooking();
} catch (error) {
  console.error(
    "Document upload error:",
    error
  );

  setError(
    error?.message ||
      "Failed to upload documents."
  );
} finally {
  setDocumentLoading(false);
}

};

const handleSavePayment = async () => {
if (booking?.status !== "pending") {
return;
}

if (!paymentMethod) {
  alert(
    "Please select a payment method."
  );
  return;
}

if (
  !paymentAmount ||
  Number(paymentAmount) <= 0
) {
  alert(
    "Please enter a valid payment amount."
  );
  return;
}

try {
  setPaymentLoading(true);
  setError("");

  const response = await fetch(
    API_URL +
      "/admin/bookings/" +
      id +
      "/payment",
    {
      method: "PATCH",
      headers: {
        Authorization:
          "Bearer " + getToken(),
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        paymentStatus,
        paymentMethod,
        paymentAmount:
          Number(paymentAmount),
        paymentReference,
        paymentNote,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Failed to save payment details."
    );
  }

  alert(
    "Payment details saved successfully."
  );

  await fetchBooking();
} catch (error) {
  console.error(
    "Payment save error:",
    error
  );

  setError(
    error?.message ||
      "Failed to save payment details."
  );
} finally {
  setPaymentLoading(false);
}

};

if (loading) {
return (
<div className="min-h-screen bg-gray-50 p-6">
<div className="mx-auto max-w-6xl">
<div className="rounded-2xl bg-white p-12 text-center shadow-sm">
<div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

        <p className="text-gray-600">
          Loading booking details...
        </p>
      </div>
    </div>
  </div>
);

}

if (!booking) {
return (
<div className="min-h-screen bg-gray-50 p-6">
<div className="mx-auto max-w-6xl">
<div className="rounded-2xl bg-white p-12 text-center shadow-sm">
<h2 className="text-xl font-bold text-gray-900">
Booking Not Found
</h2>

        <p className="mt-2 text-gray-500">
          This booking could not be found.
        </p>

        <button
          onClick={() => navigate("/admin")}
          className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
);

}

const isPending =
booking.status === "pending";

const isConfirmed =
booking.status === "confirmed";

const uploadedDocuments =
Array.isArray(booking.documents)
? booking.documents
: [];

return (
<div className="min-h-screen bg-gray-50 p-4 md:p-6">
<div className="mx-auto max-w-6xl">

    <div className="mb-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm font-medium text-gray-500 transition hover:text-blue-600"
      >
        ← Back
      </button>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Booking Details
          </h1>

          <p className="mt-1 break-all text-sm text-gray-500">
            Booking ID: {booking._id}
          </p>
        </div>

        <span
          className={
            "w-fit rounded-full px-4 py-2 text-sm font-bold uppercase " +
            getStatusClass()
          }
        >
          {booking.status}
        </span>
      </div>
    </div>

    {error && (
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-medium text-red-700">
          {error}
        </p>
      </div>
    )}

    {/* PROPERTY INFORMATION */}

    <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4 md:px-6">
        <h2 className="text-lg font-bold text-gray-900">
          Property Information
        </h2>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="h-48 w-full overflow-hidden rounded-xl bg-gray-100 md:h-36 md:w-52">
            {booking.property?.images?.length > 0 ? (
              <img
                src={booking.property.images[0]}
                alt={getPropertyName()}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No Property Image
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">
              {getPropertyName()}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {getPropertyLocation()}
            </p>

            {booking.property?.rent && (
              <p className="mt-3 text-sm text-gray-700">
                Rent:
                <span className="ml-2 font-bold">
                  {formatCurrency(
                    booking.property.rent
                  )}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* CUSTOMER INFORMATION */}

    <div className="mb-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4 md:px-6">
        <h2 className="text-lg font-bold text-gray-900">
          Guest Information
        </h2>

        {isConfirmed && (
          <p className="mt-1 text-sm text-green-600">
            Confirmed guest profile
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 md:p-6">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Guest Name
          </p>

          <p className="mt-2 text-lg font-bold text-gray-900">
            {getCustomerName()}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Phone Number
          </p>

          <p className="mt-2 text-lg font-bold text-gray-900">
            {getCustomerPhone()}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Email
          </p>

          <p className="mt-2 break-all text-base font-semibold text-gray-900">
            {getCustomerEmail()}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            User ID
          </p>

          <p className="mt-2 break-all text-sm font-medium text-gray-700">
            {booking.user?._id ||
              booking.user ||
              "-"}
          </p>
        </div>
      </div>
    </div>

    {/* BOOKING INFORMATION */}

    <div className="mb-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4 md:px-6">
        <h2 className="text-lg font-bold text-gray-900">
          Booking Information
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 md:p-6">

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-500">
            Check-in
          </p>

          <p className="mt-1 font-bold text-gray-800">
            {formatDate(
              booking.checkIn
            )}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-500">
            Check-out
          </p>

          <p className="mt-1 font-bold text-gray-800">
            {formatDate(
              booking.checkOut
            )}
          </p>
        </div>

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
            Nights
          </p>

          <p className="mt-1 font-bold text-gray-800">
            {booking.nights || 0}
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
            Total Amount
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {formatCurrency(
              booking.totalAmount
            )}
          </p>
        </div>

      </div>
    </div>

    {/* SPECIAL REQUEST */}

    {booking.specialRequest && (
      <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 md:p-6">
        <h2 className="text-base font-bold text-blue-800">
          Special Request
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-700">
          {booking.specialRequest}
        </p>
      </div>
    )}

    {/* PAYMENT + DOCUMENTS */}

    <div className="mb-6 rounded-2xl border border-gray-100 bg-white shadow-sm">

      <div className="border-b border-gray-100 px-5 py-4 md:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Payment & Documents
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {isPending
                ? "Complete payment and customer documents before confirmation."
                : "Confirmed booking payment and customer documents."}
            </p>
          </div>

          {isConfirmed && (
            <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              VERIFIED BOOKING
            </span>
          )}

        </div>
      </div>

      <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-2">

        {/* PAYMENT */}

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">
                Payment Details
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Offline payment record
              </p>
            </div>

            <span
              className={
                "rounded-full px-3 py-1 text-xs font-bold uppercase " +
                (isConfirmed
                  ? getPaymentStatusClass()
                  : "bg-yellow-100 text-yellow-700")
              }
            >
              {booking.paymentStatus ||
                paymentStatus ||
                "pending"}
            </span>
          </div>

          {isPending ? (
            <>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-600">
                    Payment Status
                  </label>

                  <select
                    value={paymentStatus}
                    onChange={(e) =>
                      setPaymentStatus(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="partial">
                      Partial
                    </option>

                    <option value="paid">
                      Paid
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-600">
                    Payment Method
                  </label>

                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
                  >
                    <option value="">
                      Select method
                    </option>

                    <option value="cash">
                      Cash
                    </option>

                    <option value="upi">
                      UPI
                    </option>

                    <option value="bank_transfer">
                      Bank Transfer
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-600">
                    Amount Received
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={paymentAmount}
                    onChange={(e) =>
                      setPaymentAmount(
                        e.target.value
                      )
                    }
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-600">
                    Reference / Transaction ID
                  </label>

                  <input
                    type="text"
                    value={paymentReference}
                    onChange={(e) =>
                      setPaymentReference(
                        e.target.value
                      )
                    }
                    placeholder="Optional"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

              </div>

              <div className="mt-4">
                <label className="mb-1 block text-xs font-bold text-gray-600">
                  Payment Note
                </label>

                <textarea
                  rows={3}
                  value={paymentNote}
                  onChange={(e) =>
                    setPaymentNote(
                      e.target.value
                    )
                  }
                  placeholder="Example: Customer paid advance by UPI..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
                />
              </div>

              <button
                type="button"
                onClick={handleSavePayment}
                disabled={paymentLoading}
                className="mt-4 rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {paymentLoading
                  ? "Saving..."
                  : "Save Payment"}
              </button>
            </>
          ) : (
            <div className="mt-5 space-y-4">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Payment Status
                  </p>

                  <p className="mt-2 font-bold uppercase text-gray-900">
                    {booking.paymentStatus ||
                      "Pending"}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Payment Method
                  </p>

                  <p className="mt-2 font-bold text-gray-900">
                    {getPaymentMethodLabel(
                      booking.paymentMethod
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Amount Received
                  </p>

                  <p className="mt-2 text-lg font-bold text-gray-900">
                    {formatCurrency(
                      booking.paymentAmount
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Reference / Transaction ID
                  </p>

                  <p className="mt-2 break-all font-semibold text-gray-800">
                    {booking.paymentReference ||
                      "-"}
                  </p>
                </div>

              </div>

              <div className="rounded-xl bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Payment Note
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {booking.paymentNote ||
                    "No payment note added."}
                </p>
              </div>

              {booking.paymentUpdatedAt && (
                <p className="text-xs text-gray-400">
                  Last updated:{" "}
                  {formatDateTime(
                    booking.paymentUpdatedAt
                  )}
                </p>
              )}

            </div>
          )}

        </div>

        {/* DOCUMENTS */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5">

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">
                Customer Documents
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {isPending
                  ? "Upload required customer documents."
                  : "Documents submitted for this confirmed booking."}
              </p>
            </div>

            {uploadedDocuments.length > 0 && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                {uploadedDocuments.length} FILE
                {uploadedDocuments.length > 1
                  ? "S"
                  : ""}
              </span>
            )}
          </div>

          {isPending && (
            <>
              <div className="mt-5 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  onChange={handleDocumentChange}
                  className="block w-full text-sm text-gray-600"
                />

                <p className="mt-2 text-xs text-gray-400">
                  PDF, JPG, JPEG, PNG or WEBP
                </p>
              </div>

              {documents.length > 0 && (
                <div className="mt-4 space-y-2">

                  {documents.map(
                    (file, index) => (
                      <div
                        key={
                          file.name +
                          "-" +
                          index
                        }
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                      >
                        <span className="truncate text-sm font-semibold text-gray-700">
                          {file.name}
                        </span>

                        <span className="ml-3 text-xs text-gray-400">
                          {(
                            file.size /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </span>
                      </div>
                    )
                  )}

                </div>
              )}

              <button
                type="button"
                onClick={
                  handleUploadDocuments
                }
                disabled={
                  documentLoading ||
                  !documents.length
                }
                className="mt-5 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {documentLoading
                  ? "Uploading..."
                  : "Upload Documents"}
              </button>
            </>
          )}

          {/* UPLOADED DOCUMENTS */}

          <div
            className={
              isPending
                ? "mt-6"
                : "mt-5"
            }
          >

            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
              Uploaded Documents
            </p>

            {uploadedDocuments.length > 0 ? (
              <div className="mt-3 space-y-3">

                {uploadedDocuments.map(
                  (document, index) => {
                    const documentUrl =
                      document?.url ||
                      document;

                    const documentName =
                      document?.name ||
                      "Document " +
                        (index + 1);

                    return (
                      <div
                        key={
                          document?._id ||
                          document?.url ||
                          index
                        }
                        className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3"
                      >

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                            <span className="text-sm font-bold text-blue-600">
                              DOC
                            </span>
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-gray-800">
                              {documentName}
                            </p>

                            {document?.uploadedAt && (
                              <p className="mt-1 text-xs text-gray-400">
                                Uploaded{" "}
                                {formatDateTime(
                                  document.uploadedAt
                                )}
                              </p>
                            )}
                          </div>

                        </div>

                        {documentUrl && (
                          <a
                            href={documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                          >
                            View
                          </a>
                        )}

                      </div>
                    );
                  }
                )}

              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
                <p className="text-sm font-semibold text-gray-500">
                  No documents uploaded yet.
                </p>

                {isPending && (
                  <p className="mt-1 text-xs text-gray-400">
                    Upload customer documents before confirmation.
                  </p>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {isPending && (
        <div className="border-t border-gray-100 bg-yellow-50 px-5 py-4 md:px-6">
          <p className="text-sm font-semibold text-yellow-800">
            Complete payment and document verification before confirming the booking.
          </p>
        </div>
      )}

    </div>

    {/* REJECTION REASON */}

    {booking.rejectionReason && (
      <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 md:p-6">
        <h2 className="font-bold text-red-800">
          Rejection Reason
        </h2>

        <p className="mt-2 text-sm text-red-700">
          {booking.rejectionReason}
        </p>
      </div>
    )}

    {/* TIMELINE */}

    <div className="mb-6 rounded-2xl border border-gray-100 bg-white shadow-sm">

      <div className="border-b border-gray-100 px-5 py-4 md:px-6">
        <h2 className="text-lg font-bold text-gray-900">
          Booking Timeline
        </h2>
      </div>

      <div className="space-y-4 p-5 md:p-6">

        <div className="flex gap-3">
          <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-blue-500" />

          <div>
            <p className="font-semibold text-gray-800">
              Booking Request Created
            </p>

            <p className="text-sm text-gray-500">
              {formatDateTime(
                booking.createdAt
              )}
            </p>
          </div>
        </div>

        {booking.confirmedAt && (
          <div className="flex gap-3">
            <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-green-500" />

            <div>
              <p className="font-semibold text-gray-800">
                Booking Confirmed
              </p>

              <p className="text-sm text-gray-500">
                {formatDateTime(
                  booking.confirmedAt
                )}
              </p>
            </div>
          </div>
        )}

        {booking.cancelledAt && (
          <div className="flex gap-3">
            <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-gray-500" />

            <div>
              <p className="font-semibold text-gray-800">
                Booking Cancelled
              </p>

              <p className="text-sm text-gray-500">
                {formatDateTime(
                  booking.cancelledAt
                )}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>

    {/* PENDING ADMIN ACTIONS */}

    {isPending && (
      <div className="sticky bottom-0 z-20 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg md:p-5">

        {showRejectBox && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Rejection Reason
            </label>

            <textarea
              value={rejectReason}
              onChange={(e) =>
                setRejectReason(
                  e.target.value
                )
              }
              rows={3}
              placeholder="Enter reason for rejecting this booking..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

          <button
            onClick={() => {
              if (showRejectBox) {
                handleReject();
              } else {
                setShowRejectBox(true);
              }
            }}
            disabled={actionLoading}
            className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {actionLoading
              ? "Processing..."
              : showRejectBox
              ? "Reject Booking"
              : "Reject"}
          </button>

          {!showRejectBox && (
            <button
              onClick={handleConfirm}
              disabled={actionLoading}
              className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading
                ? "Processing..."
                : "Confirm & Block Property"}
            </button>
          )}

          {showRejectBox && (
            <button
              onClick={() => {
                setShowRejectBox(false);
                setRejectReason("");
              }}
              disabled={actionLoading}
              className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          )}

        </div>
      </div>
    )}

    {/* CONFIRMED */}

    {isConfirmed && (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 md:p-6">

        <div className="flex gap-3">

          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
            <span className="font-bold text-green-600">
              ✓
            </span>
          </div>

          <div>
            <h2 className="font-bold text-green-800">
              Booking Confirmed
            </h2>

            <p className="mt-1 text-sm text-green-700">
              This property is blocked for the selected booking dates.
            </p>

            {booking.confirmedAt && (
              <p className="mt-2 text-xs text-green-600">
                Confirmed on{" "}
                {formatDateTime(
                  booking.confirmedAt
                )}
              </p>
            )}

            <p className="mt-3 text-xs font-semibold text-green-700">
              Guest documents and payment information are available above for viewing.
            </p>
          </div>

        </div>
      </div>
    )}

  </div>
</div>

);
}