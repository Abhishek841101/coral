// import { useEffect, useMemo, useState } from "react";
// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";

// import {
//   getPropertyById,
//   selectSelectedProperty,
//   selectPropertyLoading,
//   selectSelectedPropertyError,
// } from "../features/properties/propertySlice";

// import {
//   createBooking,
//   selectCreateBookingLoading,
//   selectCreateBookingError,
// } from "../features/bookings/bookingSlice";

// export default function Booking() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();

//   const dispatch = useDispatch();

//   /* =====================================================
//      PROPERTY ID
     
//      Primary:
//      /booking?property=MONGODB_ID

//      Fallback:
//      location.state?.propertyId
//   ===================================================== */

//   const propertyId =
//     searchParams.get("property") ||
//     location.state?.propertyId ||
//     "";

//   /* =====================================================
//      REDUX
//   ===================================================== */

//   const property = useSelector(
//     selectSelectedProperty
//   );

//   const propertyLoading = useSelector(
//     selectPropertyLoading
//   );

//   const propertyError = useSelector(
//     selectSelectedPropertyError
//   );

//   const createLoading = useSelector(
//     selectCreateBookingLoading
//   );

//   const createError = useSelector(
//     selectCreateBookingError
//   );

//   /* =====================================================
//      BOOKING DETAILS
//   ===================================================== */

//   const previousBooking = location.state || {};

//   const [bookingDetails, setBookingDetails] =
//     useState({
//       checkIn:
//         previousBooking.checkIn || "",
//       checkOut:
//         previousBooking.checkOut || "",
//       guests:
//         Number(previousBooking.guests) || 2,
//       rooms:
//         Number(previousBooking.rooms) || 1,
//     });

//   /* =====================================================
//      GUEST FORM
//   ===================================================== */

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     requests: "",
//   });

//   const [formError, setFormError] =
//     useState("");

//   /* =====================================================
//      FETCH PROPERTY
//   ===================================================== */

//   useEffect(() => {
//     if (!propertyId) return;

//     dispatch(
//       getPropertyById(propertyId)
//     );
//   }, [dispatch, propertyId]);

//   /* =====================================================
//      FORM CHANGE
//   ===================================================== */

//   const handleChange = (e) => {
//     const {
//       name,
//       value,
//     } = e.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     setFormError("");
//   };

//   /* =====================================================
//      BOOKING DETAILS CHANGE
//   ===================================================== */

//   const handleBookingChange = (e) => {
//     const {
//       name,
//       value,
//     } = e.target;

//     setBookingDetails((previous) => ({
//       ...previous,
//       [name]:
//         name === "guests" ||
//         name === "rooms"
//           ? Number(value)
//           : value,
//     }));

//     setFormError("");
//   };

//   /* =====================================================
//      NIGHTS
//   ===================================================== */

//   const nights = useMemo(() => {
//     if (
//       !bookingDetails.checkIn ||
//       !bookingDetails.checkOut
//     ) {
//       return 0;
//     }

//     const start = new Date(
//       bookingDetails.checkIn
//     );

//     const end = new Date(
//       bookingDetails.checkOut
//     );

//     if (
//       Number.isNaN(start.getTime()) ||
//       Number.isNaN(end.getTime()) ||
//       end <= start
//     ) {
//       return 0;
//     }

//     return Math.ceil(
//       (end - start) /
//         (1000 * 60 * 60 * 24)
//     );
//   }, [
//     bookingDetails.checkIn,
//     bookingDetails.checkOut,
//   ]);

//   /* =====================================================
//      DISPLAY PRICE
     
//      IMPORTANT:
//      Final price is calculated again by backend.
//   ===================================================== */

//   const pricePerNight =
//     Number(property?.rent) || 0;

//   const roomCount =
//     Number(bookingDetails.rooms) || 1;

//   const stayTotal =
//     pricePerNight *
//     nights *
//     roomCount;

//   const taxes = Math.round(
//     stayTotal * 0.05
//   );

//   const totalPrice =
//     stayTotal + taxes;

//   /* =====================================================
//      PRIMARY IMAGE
//   ===================================================== */

//   const propertyImage =
//     property?.images?.find(
//       (image) => image.isPrimary
//     )?.url ||
//     property?.images?.[0]?.url ||
//     "";

//   /* =====================================================
//      BACK TO PROPERTY
//   ===================================================== */

//   const propertyUrl = propertyId
//     ? `/property/${propertyId}`
//     : "/";

//   /* =====================================================
//      SUBMIT
//   ===================================================== */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setFormError("");

//     /* ================= PROPERTY ================= */

//     if (!propertyId) {
//       setFormError(
//         "Property information is missing. Please select a property again."
//       );
//       return;
//     }

//     if (!property) {
//       setFormError(
//         "Property information could not be loaded."
//       );
//       return;
//     }

//     /* ================= DATES ================= */

//     if (
//       !bookingDetails.checkIn ||
//       !bookingDetails.checkOut
//     ) {
//       setFormError(
//         "Please select check-in and check-out dates."
//       );
//       return;
//     }

//     if (nights < 1) {
//       setFormError(
//         "Check-out date must be after check-in date."
//       );
//       return;
//     }

//     /* ================= GUESTS ================= */

//     if (
//       !Number.isInteger(
//         bookingDetails.guests
//       ) ||
//       bookingDetails.guests < 1
//     ) {
//       setFormError(
//         "Please select at least one guest."
//       );
//       return;
//     }

//     if (
//       !Number.isInteger(
//         bookingDetails.rooms
//       ) ||
//       bookingDetails.rooms < 1
//     ) {
//       setFormError(
//         "Please select at least one room."
//       );
//       return;
//     }

//     /* ================= FORM ================= */

//     if (
//       !form.firstName.trim() ||
//       !form.lastName.trim() ||
//       !form.email.trim() ||
//       !form.phone.trim()
//     ) {
//       setFormError(
//         "Please complete all required guest details."
//       );
//       return;
//     }

//     /* ================= EMAIL ================= */

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(form.email)) {
//       setFormError(
//         "Please enter a valid email address."
//       );
//       return;
//     }

//     /* ================= PHONE ================= */

//     const phoneDigits =
//       form.phone.replace(/\D/g, "");

//     if (phoneDigits.length < 10) {
//       setFormError(
//         "Please enter a valid mobile number."
//       );
//       return;
//     }

//     /* ================= CREATE BOOKING ================= */

//     const result = await dispatch(
//       createBooking({
//         propertyId,

//         checkIn:
//           bookingDetails.checkIn,

//         checkOut:
//           bookingDetails.checkOut,

//         guests:
//           Number(
//             bookingDetails.guests
//           ),

//         rooms:
//           Number(
//             bookingDetails.rooms
//           ),

//         guestName:
//           `${form.firstName.trim()} ${form.lastName.trim()}`,

//         guestPhone:
//           form.phone.trim(),

//         guestEmail:
//           form.email
//             .trim()
//             .toLowerCase(),

//         specialRequest:
//           form.requests.trim(),
//       })
//     );

//     /* ================= SUCCESS ================= */

//     if (
//       createBooking.fulfilled.match(
//         result
//       )
//     ) {
//       const createdBooking =
//         result.payload?.booking;

//       if (!createdBooking?._id) {
//         setFormError(
//           "Booking was created, but confirmation details could not be loaded."
//         );
//         return;
//       }

//       navigate(
//         "/booking-confirmation",
//         {
//           state: {
//             bookingId:
//               createdBooking._id,
//           },
//         }
//       );
//     }
//   };

//   /* =====================================================
//      PROPERTY LOADING
//   ===================================================== */

//   if (propertyLoading) {
//     return (
//       <main className="min-h-screen bg-[#F8F9F7]">
//         <header className="border-b border-[#E5E7EB] bg-white">
//           <div className="mx-auto max-w-7xl px-5 py-4">
//             <Link
//               to="/"
//               className="flex items-center gap-2.5"
//             >
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] font-extrabold text-[#073F32]">
//                 C
//               </div>

//               <span className="text-xl font-extrabold text-[#073F32]">
//                 Coral
//               </span>
//             </Link>
//           </div>
//         </header>

//         <section className="px-5 py-12 sm:px-8 lg:px-10">
//           <div className="mx-auto max-w-7xl">

//             <div className="h-10 w-72 animate-pulse rounded-xl bg-gray-200" />

//             <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">

//               <div className="rounded-[30px] bg-white p-8">
//                 <div className="h-7 w-52 animate-pulse rounded bg-gray-200" />

//                 <div className="mt-8 grid gap-4 sm:grid-cols-2">
//                   <div className="h-14 animate-pulse rounded-2xl bg-gray-200" />
//                   <div className="h-14 animate-pulse rounded-2xl bg-gray-200" />
//                 </div>

//                 <div className="mt-5 h-14 animate-pulse rounded-2xl bg-gray-200" />
//                 <div className="mt-5 h-14 animate-pulse rounded-2xl bg-gray-200" />
//               </div>

//               <div className="overflow-hidden rounded-[30px] bg-white">
//                 <div className="h-[230px] animate-pulse bg-gray-200" />
//                 <div className="p-6">
//                   <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
//                   <div className="mt-4 h-5 w-1/2 animate-pulse rounded bg-gray-200" />
//                 </div>
//               </div>

//             </div>
//           </div>
//         </section>
//       </main>
//     );
//   }

//   /* =====================================================
//      PROPERTY ERROR
//   ===================================================== */

//   if (propertyError || !property) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
//         <div className="text-center">

//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
//             🏠
//           </div>

//           <h1 className="mt-5 text-3xl font-extrabold text-[#10254A]">
//             Property unavailable
//           </h1>

//           <p className="mt-3 text-sm text-[#667085]">
//             {propertyError ||
//               "Please select a valid property and try again."}
//           </p>

//           <Link
//             to="/"
//             className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white"
//           >
//             Back to Coral
//           </Link>

//         </div>
//       </main>
//     );
//   }

//   /* =====================================================
//      MAIN
//   ===================================================== */

//   return (
//     <main className="min-h-screen bg-[#F8F9F7]">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <header className="border-b border-[#E5E7EB] bg-white">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

//           <Link
//             to="/"
//             className="flex items-center gap-2.5"
//           >
//             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] font-extrabold text-[#073F32]">
//               C
//             </div>

//             <span className="text-xl font-extrabold text-[#073F32]">
//               Coral
//             </span>
//           </Link>

//           <Link
//             to={propertyUrl}
//             className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32]"
//           >
//             ← Back to stay
//           </Link>

//         </div>
//       </header>

//       {/* =================================================
//           CONTENT
//       ================================================= */}

//       <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
//         <div className="mx-auto max-w-7xl">

//           {/* ================= HEADING ================= */}

//           <div className="mb-10">
//             <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
//               CORAL BOOKING
//             </p>

//             <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
//               Complete your booking
//             </h1>

//             <p className="mt-3 text-sm text-[#667085]">
//               Just a few details and your stay request is ready.
//             </p>
//           </div>

//           <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

//             {/* =================================================
//                 FORM
//             ================================================= */}

//             <form
//               onSubmit={handleSubmit}
//               className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
//             >

//               {/* ================= STAY DETAILS ================= */}

//               <h2 className="text-2xl font-extrabold text-[#10254A]">
//                 Stay details
//               </h2>

//               <p className="mt-2 text-sm text-[#667085]">
//                 Select your dates and number of guests.
//               </p>

//               <div className="mt-7 grid gap-4 sm:grid-cols-2">

//                 {/* CHECK IN */}

//                 <div>
//                   <label className="text-xs font-extrabold text-[#667085]">
//                     CHECK-IN *
//                   </label>

//                   <input
//                     type="date"
//                     name="checkIn"
//                     value={
//                       bookingDetails.checkIn
//                     }
//                     min={
//                       new Date()
//                         .toISOString()
//                         .split("T")[0]
//                     }
//                     onChange={
//                       handleBookingChange
//                     }
//                     className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                   />
//                 </div>

//                 {/* CHECK OUT */}

//                 <div>
//                   <label className="text-xs font-extrabold text-[#667085]">
//                     CHECK-OUT *
//                   </label>

//                   <input
//                     type="date"
//                     name="checkOut"
//                     value={
//                       bookingDetails.checkOut
//                     }
//                     min={
//                       bookingDetails.checkIn ||
//                       new Date()
//                         .toISOString()
//                         .split("T")[0]
//                     }
//                     onChange={
//                       handleBookingChange
//                     }
//                     className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                   />
//                 </div>

//               </div>

//               <div className="mt-5 grid gap-4 sm:grid-cols-2">

//                 {/* GUESTS */}

//                 <div>
//                   <label className="text-xs font-extrabold text-[#667085]">
//                     GUESTS *
//                   </label>

//                   <input
//                     type="number"
//                     name="guests"
//                     min="1"
//                     max="50"
//                     value={
//                       bookingDetails.guests
//                     }
//                     onChange={
//                       handleBookingChange
//                     }
//                     className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                   />
//                 </div>

//                 {/* ROOMS */}

//                 <div>
//                   <label className="text-xs font-extrabold text-[#667085]">
//                     ROOMS *
//                   </label>

//                   <input
//                     type="number"
//                     name="rooms"
//                     min="1"
//                     max="20"
//                     value={
//                       bookingDetails.rooms
//                     }
//                     onChange={
//                       handleBookingChange
//                     }
//                     className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                   />
//                 </div>

//               </div>

//               {/* ================= GUEST ================= */}

//               <div className="mt-9 border-t border-[#E5E7EB] pt-8">

//                 <h2 className="text-2xl font-extrabold text-[#10254A]">
//                   Guest details
//                 </h2>

//                 <p className="mt-2 text-sm text-[#667085]">
//                   Enter the details of the primary guest.
//                 </p>

//               </div>

//               {/* NAME */}

//               <div className="mt-7 grid gap-4 sm:grid-cols-2">

//                 <div>
//                   <label className="text-xs font-extrabold text-[#667085]">
//                     FIRST NAME *
//                   </label>

//                   <input
//                     name="firstName"
//                     value={
//                       form.firstName
//                     }
//                     onChange={
//                       handleChange
//                     }
//                     placeholder="First name"
//                     autoComplete="given-name"
//                     className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs font-extrabold text-[#667085]">
//                     LAST NAME *
//                   </label>

//                   <input
//                     name="lastName"
//                     value={
//                       form.lastName
//                     }
//                     onChange={
//                       handleChange
//                     }
//                     placeholder="Last name"
//                     autoComplete="family-name"
//                     className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                   />
//                 </div>

//               </div>

//               {/* EMAIL */}

//               <div className="mt-5">
//                 <label className="text-xs font-extrabold text-[#667085]">
//                   EMAIL ADDRESS *
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   value={
//                     form.email
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                   className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                 />
//               </div>

//               {/* PHONE */}

//               <div className="mt-5">
//                 <label className="text-xs font-extrabold text-[#667085]">
//                   MOBILE NUMBER *
//                 </label>

//                 <input
//                   type="tel"
//                   name="phone"
//                   value={
//                     form.phone
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   placeholder="+91 98765 43210"
//                   autoComplete="tel"
//                   className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                 />
//               </div>

//               {/* REQUESTS */}

//               <div className="mt-5">
//                 <label className="text-xs font-extrabold text-[#667085]">
//                   SPECIAL REQUESTS
//                 </label>

//                 <textarea
//                   name="requests"
//                   value={
//                     form.requests
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   rows="4"
//                   placeholder="Anything we should know?"
//                   className="mt-2 w-full resize-none rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                 />
//               </div>

//               {/* ================= ERROR ================= */}

//               {(formError ||
//                 createError) && (
//                 <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
//                   <p className="text-sm font-semibold leading-6 text-red-600">
//                     {formError ||
//                       createError}
//                   </p>
//                 </div>
//               )}

//               {/* ================= TERMS ================= */}

//               <div className="mt-6 rounded-2xl bg-[#F8F9F7] p-4">
//                 <p className="text-xs leading-5 text-[#667085]">
//                   By continuing, you agree to Coral's
//                   booking terms, cancellation policy and
//                   privacy policy.
//                 </p>
//               </div>

//               {/* ================= SUBMIT ================= */}

//               <button
//                 type="submit"
//                 disabled={createLoading}
//                 className="mt-6 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {createLoading
//                   ? "Creating booking..."
//                   : "Continue to confirmation →"}
//               </button>

//             </form>

//             {/* =================================================
//                 SUMMARY
//             ================================================= */}

//             <aside className="h-fit lg:sticky lg:top-6">

//               <div className="overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white shadow-lg">

//                 {/* IMAGE */}

//                 <div className="h-[230px] bg-[#E9F8F0]">

//                   {propertyImage ? (
//                     <img
//                       src={propertyImage}
//                       alt={
//                         property.title
//                       }
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full items-center justify-center text-6xl">
//                       🏠
//                     </div>
//                   )}

//                 </div>

//                 {/* DETAILS */}

//                 <div className="p-6">

//                   <div className="flex items-center gap-2">

//                     <span className="rounded-full bg-[#E9F8F0] px-3 py-1.5 text-xs font-extrabold capitalize text-[#073F32]">
//                       {property.propertyType}
//                     </span>

//                     {property.availability && (
//                       <span className="text-xs text-[#667085]">
//                         {property.availability}
//                       </span>
//                     )}

//                   </div>

//                   <h2 className="mt-3 text-xl font-extrabold text-[#10254A]">
//                     {property.title}
//                   </h2>

//                   <p className="mt-1 text-sm text-[#667085]">
//                     📍 {property.locality},{" "}
//                     {property.city}
//                   </p>

//                   {/* ================= BOOKING INFO ================= */}

//                   <div className="mt-6 space-y-4 border-t border-[#E5E7EB] pt-5">

//                     <div className="flex justify-between gap-4">
//                       <span className="text-sm text-[#667085]">
//                         Check-in
//                       </span>

//                       <span className="text-right text-sm font-bold text-[#10254A]">
//                         {bookingDetails.checkIn ||
//                           "Select date"}
//                       </span>
//                     </div>

//                     <div className="flex justify-between gap-4">
//                       <span className="text-sm text-[#667085]">
//                         Check-out
//                       </span>

//                       <span className="text-right text-sm font-bold text-[#10254A]">
//                         {bookingDetails.checkOut ||
//                           "Select date"}
//                       </span>
//                     </div>

//                     <div className="flex justify-between gap-4">
//                       <span className="text-sm text-[#667085]">
//                         Guests
//                       </span>

//                       <span className="text-sm font-bold text-[#10254A]">
//                         {bookingDetails.guests}
//                       </span>
//                     </div>

//                     <div className="flex justify-between gap-4">
//                       <span className="text-sm text-[#667085]">
//                         Rooms
//                       </span>

//                       <span className="text-sm font-bold text-[#10254A]">
//                         {bookingDetails.rooms}
//                       </span>
//                     </div>

//                     <div className="flex justify-between gap-4">
//                       <span className="text-sm text-[#667085]">
//                         Nights
//                       </span>

//                       <span className="text-sm font-bold text-[#10254A]">
//                         {nights || "—"}
//                       </span>
//                     </div>

//                   </div>

//                   {/* ================= PRICE ================= */}

//                   <div className="mt-6 border-t border-[#E5E7EB] pt-5">

//                     <div className="flex justify-between text-sm text-[#667085]">
//                       <span>
//                         ₹
//                         {pricePerNight.toLocaleString(
//                           "en-IN"
//                         )}{" "}
//                         × {nights || 0} nights ×{" "}
//                         {roomCount}{" "}
//                         {roomCount === 1
//                           ? "room"
//                           : "rooms"}
//                       </span>

//                       <span>
//                         ₹
//                         {stayTotal.toLocaleString(
//                           "en-IN"
//                         )}
//                       </span>
//                     </div>

//                     <div className="mt-3 flex justify-between text-sm text-[#667085]">
//                       <span>
//                         Taxes & fees
//                       </span>

//                       <span>
//                         ₹
//                         {taxes.toLocaleString(
//                           "en-IN"
//                         )}
//                       </span>
//                     </div>

//                     <div className="mt-5 flex justify-between border-t border-[#E5E7EB] pt-5">

//                       <span className="font-extrabold text-[#10254A]">
//                         Total
//                       </span>

//                       <span className="text-xl font-extrabold text-[#073F32]">
//                         ₹
//                         {totalPrice.toLocaleString(
//                           "en-IN"
//                         )}
//                       </span>

//                     </div>

//                     <p className="mt-2 text-right text-[11px] leading-4 text-[#98A2B3]">
//                       Final amount is verified by Coral
//                       server before booking confirmation.
//                     </p>

//                   </div>

//                 </div>
//               </div>

//               {/* ================= TRUST ================= */}

//               <div className="mt-4 rounded-[24px] bg-[#E9F8F0] p-5">

//                 <p className="text-sm font-extrabold text-[#073F32]">
//                   ✓ Secure Coral booking
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-[#667085]">
//                   Your details are protected. Your booking
//                   request will be sent for confirmation.
//                 </p>

//               </div>

//             </aside>

//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }




import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  getPropertyById,
  selectSelectedProperty,
  selectPropertyLoading,
  selectSelectedPropertyError,
} from "../features/properties/propertySlice";

import {
  createBooking,
  selectCreateBookingLoading,
  selectCreateBookingError,
} from "../features/bookings/bookingSlice";

/* =====================================================
   BOOKING RULE
===================================================== */

// Maximum 3 guests are allowed per room.
const MAX_GUESTS_PER_ROOM = 3;

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  /* =====================================================
     PROPERTY ID

     Primary:
     /booking?property=MONGODB_ID

     Fallback:
     location.state?.propertyId
  ===================================================== */

  const propertyId =
    searchParams.get("property") ||
    location.state?.propertyId ||
    "";

  /* =====================================================
     REDUX
  ===================================================== */

  const property = useSelector(
    selectSelectedProperty
  );

  const propertyLoading = useSelector(
    selectPropertyLoading
  );

  const propertyError = useSelector(
    selectSelectedPropertyError
  );

  const createLoading = useSelector(
    selectCreateBookingLoading
  );

  const createError = useSelector(
    selectCreateBookingError
  );

  /* =====================================================
     PREVIOUS BOOKING / STATE
  ===================================================== */

  const previousBooking = location.state || {};

  /* =====================================================
     BOOKING DETAILS

     Default:
     1 guest
     1 room
  ===================================================== */

  const [bookingDetails, setBookingDetails] =
    useState({
      checkIn:
        previousBooking.checkIn || "",

      checkOut:
        previousBooking.checkOut || "",

      guests:
        Number(previousBooking.guests) || 1,

      rooms:
        Number(previousBooking.rooms) || 1,
    });

  /* =====================================================
     GUEST FORM
  ===================================================== */

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requests: "",
  });

  const [formError, setFormError] =
    useState("");

  /* =====================================================
     GUEST CAPACITY

     1 room  = 3 guests
     2 rooms = 6 guests
     3 rooms = 9 guests
  ===================================================== */

  const roomCount =
    Number(bookingDetails.rooms) || 1;

  const maximumGuests =
    MAX_GUESTS_PER_ROOM * roomCount;

  /* =====================================================
     FETCH PROPERTY
  ===================================================== */

  useEffect(() => {
    if (!propertyId) return;

    dispatch(
      getPropertyById(propertyId)
    );
  }, [dispatch, propertyId]);

  /* =====================================================
     NORMALIZE GUEST COUNT

     If rooms are reduced and current guests
     become greater than allowed capacity,
     automatically reduce guests.
  ===================================================== */

  useEffect(() => {
    setBookingDetails((previous) => {
      const currentGuests =
        Number(previous.guests) || 1;

      const currentRooms =
        Number(previous.rooms) || 1;

      const maxAllowed =
        MAX_GUESTS_PER_ROOM *
        currentRooms;

      const safeGuests =
        Math.min(
          Math.max(currentGuests, 1),
          maxAllowed
        );

      if (
        safeGuests === currentGuests
      ) {
        return previous;
      }

      return {
        ...previous,
        guests: safeGuests,
      };
    });
  }, [bookingDetails.rooms]);

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  /* =====================================================
     BOOKING DETAILS CHANGE
  ===================================================== */

  const handleBookingChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (
      name === "rooms"
    ) {
      const nextRooms =
        Math.max(
          1,
          Number(value) || 1
        );

      const nextMaximumGuests =
        MAX_GUESTS_PER_ROOM *
        nextRooms;

      setBookingDetails((previous) => ({
        ...previous,
        rooms: nextRooms,
        guests: Math.min(
          Number(previous.guests) || 1,
          nextMaximumGuests
        ),
      }));

      setFormError("");

      return;
    }

    if (
      name === "guests"
    ) {
      const nextGuests =
        Math.max(
          1,
          Number(value) || 1
        );

      setBookingDetails((previous) => ({
        ...previous,
        guests: Math.min(
          nextGuests,
          maximumGuests
        ),
      }));

      setFormError("");

      return;
    }

    setBookingDetails((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  /* =====================================================
     NIGHTS
  ===================================================== */

  const nights = useMemo(() => {
    if (
      !bookingDetails.checkIn ||
      !bookingDetails.checkOut
    ) {
      return 0;
    }

    const start = new Date(
      bookingDetails.checkIn
    );

    const end = new Date(
      bookingDetails.checkOut
    );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      end <= start
    ) {
      return 0;
    }

    return Math.ceil(
      (end - start) /
        (1000 * 60 * 60 * 24)
    );
  }, [
    bookingDetails.checkIn,
    bookingDetails.checkOut,
  ]);

  /* =====================================================
     DISPLAY PRICE

     IMPORTANT:
     Final price is calculated again by backend.
  ===================================================== */

  const pricePerNight =
    Number(property?.rent) || 0;

  const stayTotal =
    pricePerNight *
    nights *
    roomCount;

  const taxes = Math.round(
    stayTotal * 0.05
  );

  const totalPrice =
    stayTotal + taxes;

  /* =====================================================
     PRIMARY IMAGE
  ===================================================== */

  const propertyImage =
    property?.images?.find(
      (image) => image.isPrimary
    )?.url ||
    property?.images?.[0]?.url ||
    "";

  /* =====================================================
     BACK TO PROPERTY
  ===================================================== */

  const propertyUrl = propertyId
    ? `/property/${propertyId}`
    : "/";

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    /* ================= PROPERTY ================= */

    if (!propertyId) {
      setFormError(
        "Property information is missing. Please select a property again."
      );

      return;
    }

    if (!property) {
      setFormError(
        "Property information could not be loaded."
      );

      return;
    }

    /* ================= DATES ================= */

    if (
      !bookingDetails.checkIn ||
      !bookingDetails.checkOut
    ) {
      setFormError(
        "Please select check-in and check-out dates."
      );

      return;
    }

    if (nights < 1) {
      setFormError(
        "Check-out date must be after check-in date."
      );

      return;
    }

    /* ================= GUESTS ================= */

    if (
      !Number.isInteger(
        bookingDetails.guests
      ) ||
      bookingDetails.guests < 1
    ) {
      setFormError(
        "Please select at least one guest."
      );

      return;
    }

    /* ================= ROOMS ================= */

    if (
      !Number.isInteger(
        bookingDetails.rooms
      ) ||
      bookingDetails.rooms < 1
    ) {
      setFormError(
        "Please select at least one room."
      );

      return;
    }

    /* ================= CAPACITY ================= */

    const allowedGuests =
      MAX_GUESTS_PER_ROOM *
      bookingDetails.rooms;

    if (
      bookingDetails.guests >
      allowedGuests
    ) {
      setFormError(
        `Maximum ${allowedGuests} guests are allowed for ${bookingDetails.rooms} room(s).`
      );

      return;
    }

    /* ================= FORM ================= */

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setFormError(
        "Please complete all required guest details."
      );

      return;
    }

    /* ================= EMAIL ================= */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        form.email.trim()
      )
    ) {
      setFormError(
        "Please enter a valid email address."
      );

      return;
    }

    /* ================= PHONE ================= */

    const phoneDigits =
      form.phone.replace(
        /\D/g,
        ""
      );

    if (phoneDigits.length < 10) {
      setFormError(
        "Please enter a valid mobile number."
      );

      return;
    }

    /* ================= CREATE BOOKING ================= */

    const result = await dispatch(
      createBooking({
        propertyId,

        checkIn:
          bookingDetails.checkIn,

        checkOut:
          bookingDetails.checkOut,

        guests:
          Number(
            bookingDetails.guests
          ),

        rooms:
          Number(
            bookingDetails.rooms
          ),

        guestName:
          `${form.firstName.trim()} ${form.lastName.trim()}`,

        guestPhone:
          form.phone.trim(),

        guestEmail:
          form.email
            .trim()
            .toLowerCase(),

        specialRequest:
          form.requests.trim(),
      })
    );

    /* ================= SUCCESS ================= */

    if (
      createBooking.fulfilled.match(
        result
      )
    ) {
      const createdBooking =
        result.payload?.booking;

      if (!createdBooking?._id) {
        setFormError(
          "Booking was created, but confirmation details could not be loaded."
        );

        return;
      }

     navigate(
"/booking-confirmation",
{
state: {
bookingId: createdBooking._id,
booking: createdBooking,
},
}
);

    }
  };

  /* =====================================================
     PROPERTY LOADING
  ===================================================== */

  if (propertyLoading) {
    return (
      <main className="min-h-screen bg-[#F8F9F7]">
        <header className="border-b border-[#E5E7EB] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <Link
              to="/"
              className="flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] font-extrabold text-[#073F32]">
                C
              </div>

              <span className="text-xl font-extrabold text-[#073F32]">
                Coral
              </span>
            </Link>
          </div>
        </header>

        <section className="px-5 py-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">

            <div className="h-10 w-72 animate-pulse rounded-xl bg-gray-200" />

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">

              <div className="rounded-[30px] bg-white p-8">
                <div className="h-7 w-52 animate-pulse rounded bg-gray-200" />

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="h-14 animate-pulse rounded-2xl bg-gray-200" />
                  <div className="h-14 animate-pulse rounded-2xl bg-gray-200" />
                </div>

                <div className="mt-5 h-14 animate-pulse rounded-2xl bg-gray-200" />
                <div className="mt-5 h-14 animate-pulse rounded-2xl bg-gray-200" />
              </div>

              <div className="overflow-hidden rounded-[30px] bg-white">
                <div className="h-[230px] animate-pulse bg-gray-200" />

                <div className="p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="mt-4 h-5 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =====================================================
     PROPERTY ERROR
  ===================================================== */

  if (
    propertyError ||
    !property
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            🏠
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-[#10254A]">
            Property unavailable
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            {propertyError ||
              "Please select a valid property and try again."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white"
          >
            Back to Coral
          </Link>

        </div>
      </main>
    );
  }

  /* =====================================================
     MAIN
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

            <span className="text-xl font-extrabold text-[#073F32]">
              Coral
            </span>
          </Link>

          <Link
            to={propertyUrl}
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32]"
          >
            ← Back to stay
          </Link>

        </div>
      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">

          {/* ================= HEADING ================= */}

          <div className="mb-10">
            <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              CORAL BOOKING
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Complete your booking
            </h1>

            <p className="mt-3 text-sm text-[#667085]">
              Just a few details and your stay request is ready.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
            >

              {/* ================= STAY DETAILS ================= */}

              <h2 className="text-2xl font-extrabold text-[#10254A]">
                Stay details
              </h2>

              <p className="mt-2 text-sm text-[#667085]">
                Select your dates and number of guests.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                {/* CHECK IN */}

                <div>
                  <label className="text-xs font-extrabold text-[#667085]">
                    CHECK-IN *
                  </label>

                  <input
                    type="date"
                    name="checkIn"
                    value={
                      bookingDetails.checkIn
                    }
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={
                      handleBookingChange
                    }
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />
                </div>

                {/* CHECK OUT */}

                <div>
                  <label className="text-xs font-extrabold text-[#667085]">
                    CHECK-OUT *
                  </label>

                  <input
                    type="date"
                    name="checkOut"
                    value={
                      bookingDetails.checkOut
                    }
                    min={
                      bookingDetails.checkIn ||
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={
                      handleBookingChange
                    }
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />
                </div>

              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                {/* GUESTS */}

                <div>
                  <label className="text-xs font-extrabold text-[#667085]">
                    GUESTS *
                  </label>

                  <input
                    type="number"
                    name="guests"
                    min="1"
                    max={maximumGuests}
                    value={
                      bookingDetails.guests
                    }
                    onChange={
                      handleBookingChange
                    }
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />

                  <p className="mt-2 text-xs text-[#98A2B3]">
                    Up to {maximumGuests}{" "}
                    {maximumGuests === 1
                      ? "guest"
                      : "guests"}{" "}
                    for {roomCount}{" "}
                    {roomCount === 1
                      ? "room"
                      : "rooms"}
                  </p>
                </div>

                {/* ROOMS */}

                <div>
                  <label className="text-xs font-extrabold text-[#667085]">
                    ROOMS *
                  </label>

                  <input
                    type="number"
                    name="rooms"
                    min="1"
                    max="20"
                    value={
                      bookingDetails.rooms
                    }
                    onChange={
                      handleBookingChange
                    }
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />

                  <p className="mt-2 text-xs text-[#98A2B3]">
                    Maximum 3 guests per room
                  </p>
                </div>

              </div>

              {/* ================= CAPACITY INFO ================= */}

              <div className="mt-5 rounded-2xl bg-[#E9F8F0] px-4 py-3">
                <p className="text-xs font-semibold leading-5 text-[#073F32]">
                  👥 {roomCount}{" "}
                  {roomCount === 1
                    ? "room"
                    : "rooms"}{" "}
                  can accommodate up to{" "}
                  {maximumGuests}{" "}
                  {maximumGuests === 1
                    ? "guest"
                    : "guests"}.
                </p>
              </div>

              {/* ================= GUEST DETAILS ================= */}

              <div className="mt-9 border-t border-[#E5E7EB] pt-8">

                <h2 className="text-2xl font-extrabold text-[#10254A]">
                  Guest details
                </h2>

                <p className="mt-2 text-sm text-[#667085]">
                  Enter the details of the primary guest.
                </p>

              </div>

              {/* NAME */}

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="text-xs font-extrabold text-[#667085]">
                    FIRST NAME *
                  </label>

                  <input
                    name="firstName"
                    value={
                      form.firstName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="First name"
                    autoComplete="given-name"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#667085]">
                    LAST NAME *
                  </label>

                  <input
                    name="lastName"
                    value={
                      form.lastName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Last name"
                    autoComplete="family-name"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />
                </div>

              </div>

              {/* EMAIL */}

              <div className="mt-5">
                <label className="text-xs font-extrabold text-[#667085]">
                  EMAIL ADDRESS *
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />
              </div>

              {/* PHONE */}

              <div className="mt-5">
                <label className="text-xs font-extrabold text-[#667085]">
                  MOBILE NUMBER *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    form.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />
              </div>

              {/* REQUESTS */}

              <div className="mt-5">
                <label className="text-xs font-extrabold text-[#667085]">
                  SPECIAL REQUESTS
                </label>

                <textarea
                  name="requests"
                  value={
                    form.requests
                  }
                  onChange={
                    handleChange
                  }
                  rows="4"
                  placeholder="Anything we should know?"
                  className="mt-2 w-full resize-none rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />
              </div>

              {/* ================= ERROR ================= */}

              {(formError ||
                createError) && (
                <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
                  <p className="text-sm font-semibold leading-6 text-red-600">
                    {formError ||
                      createError}
                  </p>
                </div>
              )}

              {/* ================= TERMS ================= */}

              <div className="mt-6 rounded-2xl bg-[#F8F9F7] p-4">
                <p className="text-xs leading-5 text-[#667085]">
                  By continuing, you agree to Coral's
                  booking terms, cancellation policy and
                  privacy policy.
                </p>
              </div>

              {/* ================= SUBMIT ================= */}

              <button
                type="submit"
                disabled={createLoading}
                className="mt-6 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createLoading
                  ? "Creating booking..."
                  : "Continue to confirmation →"}
              </button>

            </form>

            {/* =================================================
                SUMMARY
            ================================================= */}

            <aside className="h-fit lg:sticky lg:top-6">

              <div className="overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white shadow-lg">

                {/* IMAGE */}

                <div className="h-[230px] bg-[#E9F8F0]">

                  {propertyImage ? (
                    <img
                      src={propertyImage}
                      alt={
                        property.title
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl">
                      🏠
                    </div>
                  )}

                </div>

                {/* DETAILS */}

                <div className="p-6">

                  <div className="flex items-center gap-2">

                    <span className="rounded-full bg-[#E9F8F0] px-3 py-1.5 text-xs font-extrabold capitalize text-[#073F32]">
                      {property.propertyType}
                    </span>

                    {property.availability && (
                      <span className="text-xs text-[#667085]">
                        {property.availability}
                      </span>
                    )}

                  </div>

                  <h2 className="mt-3 text-xl font-extrabold text-[#10254A]">
                    {property.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#667085]">
                    📍 {property.locality},{" "}
                    {property.city}
                  </p>

                  {/* ================= BOOKING INFO ================= */}

                  <div className="mt-6 space-y-4 border-t border-[#E5E7EB] pt-5">

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Check-in
                      </span>

                      <span className="text-right text-sm font-bold text-[#10254A]">
                        {bookingDetails.checkIn ||
                          "Select date"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Check-out
                      </span>

                      <span className="text-right text-sm font-bold text-[#10254A]">
                        {bookingDetails.checkOut ||
                          "Select date"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Guests
                      </span>

                      <span className="text-sm font-bold text-[#10254A]">
                        {bookingDetails.guests}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Rooms
                      </span>

                      <span className="text-sm font-bold text-[#10254A]">
                        {bookingDetails.rooms}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Nights
                      </span>

                      <span className="text-sm font-bold text-[#10254A]">
                        {nights || "—"}
                      </span>
                    </div>

                  </div>

                  {/* ================= PRICE ================= */}

                  <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                    <div className="flex justify-between text-sm text-[#667085]">
                      <span>
                        ₹
                        {pricePerNight.toLocaleString(
                          "en-IN"
                        )}{" "}
                        × {nights || 0} nights ×{" "}
                        {roomCount}{" "}
                        {roomCount === 1
                          ? "room"
                          : "rooms"}
                      </span>

                      <span>
                        ₹
                        {stayTotal.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between text-sm text-[#667085]">
                      <span>
                        Taxes & fees
                      </span>

                      <span>
                        ₹
                        {taxes.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="mt-5 flex justify-between border-t border-[#E5E7EB] pt-5">

                      <span className="font-extrabold text-[#10254A]">
                        Total
                      </span>

                      <span className="text-xl font-extrabold text-[#073F32]">
                        ₹
                        {totalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                    <p className="mt-2 text-right text-[11px] leading-4 text-[#98A2B3]">
                      Final amount is verified by Coral
                      server before booking confirmation.
                    </p>

                  </div>

                </div>
              </div>

              {/* ================= TRUST ================= */}

              <div className="mt-4 rounded-[24px] bg-[#E9F8F0] p-5">

                <p className="text-sm font-extrabold text-[#073F32]">
                  ✓ Secure Coral booking
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Your details are protected. Your booking
                  request will be sent for confirmation.
                </p>

              </div>

            </aside>

          </div>
        </div>
      </section>
    </main>
  );
}

