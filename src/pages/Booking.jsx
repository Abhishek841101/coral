



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

// /* =====================================================
//    BOOKING RULE
// ===================================================== */

// // Maximum 3 guests are allowed per room.
// const MAX_GUESTS_PER_ROOM = 3;

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
//      PREVIOUS BOOKING / STATE
//   ===================================================== */

//   const previousBooking = location.state || {};

//   /* =====================================================
//      BOOKING DETAILS

//      Default:
//      1 guest
//      1 room
//   ===================================================== */

//   const [bookingDetails, setBookingDetails] =
//     useState({
//       checkIn:
//         previousBooking.checkIn || "",

//       checkOut:
//         previousBooking.checkOut || "",

//       guests:
//         Number(previousBooking.guests) || 1,

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
//      GUEST CAPACITY

//      1 room  = 3 guests
//      2 rooms = 6 guests
//      3 rooms = 9 guests
//   ===================================================== */

//   const roomCount =
//     Number(bookingDetails.rooms) || 1;

//   const maximumGuests =
//     MAX_GUESTS_PER_ROOM * roomCount;

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
//      NORMALIZE GUEST COUNT

//      If rooms are reduced and current guests
//      become greater than allowed capacity,
//      automatically reduce guests.
//   ===================================================== */

//   useEffect(() => {
//     setBookingDetails((previous) => {
//       const currentGuests =
//         Number(previous.guests) || 1;

//       const currentRooms =
//         Number(previous.rooms) || 1;

//       const maxAllowed =
//         MAX_GUESTS_PER_ROOM *
//         currentRooms;

//       const safeGuests =
//         Math.min(
//           Math.max(currentGuests, 1),
//           maxAllowed
//         );

//       if (
//         safeGuests === currentGuests
//       ) {
//         return previous;
//       }

//       return {
//         ...previous,
//         guests: safeGuests,
//       };
//     });
//   }, [bookingDetails.rooms]);

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

//     if (
//       name === "rooms"
//     ) {
//       const nextRooms =
//         Math.max(
//           1,
//           Number(value) || 1
//         );

//       const nextMaximumGuests =
//         MAX_GUESTS_PER_ROOM *
//         nextRooms;

//       setBookingDetails((previous) => ({
//         ...previous,
//         rooms: nextRooms,
//         guests: Math.min(
//           Number(previous.guests) || 1,
//           nextMaximumGuests
//         ),
//       }));

//       setFormError("");

//       return;
//     }

//     if (
//       name === "guests"
//     ) {
//       const nextGuests =
//         Math.max(
//           1,
//           Number(value) || 1
//         );

//       setBookingDetails((previous) => ({
//         ...previous,
//         guests: Math.min(
//           nextGuests,
//           maximumGuests
//         ),
//       }));

//       setFormError("");

//       return;
//     }

//     setBookingDetails((previous) => ({
//       ...previous,
//       [name]: value,
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

//     /* ================= ROOMS ================= */

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

//     /* ================= CAPACITY ================= */

//     const allowedGuests =
//       MAX_GUESTS_PER_ROOM *
//       bookingDetails.rooms;

//     if (
//       bookingDetails.guests >
//       allowedGuests
//     ) {
//       setFormError(
//         `Maximum ${allowedGuests} guests are allowed for ${bookingDetails.rooms} room(s).`
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

//     if (
//       !emailRegex.test(
//         form.email.trim()
//       )
//     ) {
//       setFormError(
//         "Please enter a valid email address."
//       );

//       return;
//     }

//     /* ================= PHONE ================= */

//     const phoneDigits =
//       form.phone.replace(
//         /\D/g,
//         ""
//       );

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

//      navigate(
// "/booking-confirmation",
// {
// state: {
// bookingId: createdBooking._id,
// booking: createdBooking,
// },
// }
// );

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

//   if (
//     propertyError ||
//     !property
//   ) {
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
//                     max={maximumGuests}
//                     value={
//                       bookingDetails.guests
//                     }
//                     onChange={
//                       handleBookingChange
//                     }
//                     className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
//                   />

//                   <p className="mt-2 text-xs text-[#98A2B3]">
//                     Up to {maximumGuests}{" "}
//                     {maximumGuests === 1
//                       ? "guest"
//                       : "guests"}{" "}
//                     for {roomCount}{" "}
//                     {roomCount === 1
//                       ? "room"
//                       : "rooms"}
//                   </p>
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

//                   <p className="mt-2 text-xs text-[#98A2B3]">
//                     Maximum 3 guests per room
//                   </p>
//                 </div>

//               </div>

//               {/* ================= CAPACITY INFO ================= */}

//               <div className="mt-5 rounded-2xl bg-[#E9F8F0] px-4 py-3">
//                 <p className="text-xs font-semibold leading-5 text-[#073F32]">
//                   👥 {roomCount}{" "}
//                   {roomCount === 1
//                     ? "room"
//                     : "rooms"}{" "}
//                   can accommodate up to{" "}
//                   {maximumGuests}{" "}
//                   {maximumGuests === 1
//                     ? "guest"
//                     : "guests"}.
//                 </p>
//               </div>

//               {/* ================= GUEST DETAILS ================= */}

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


















import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPropertyById } from "../features/properties/propertySlice";
import {
createBooking,
clearCreateBookingError,
} from "../features/bookings/bookingSlice";

const Booking = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
const [searchParams] = useSearchParams();

const propertyId =
searchParams.get("property") ||
searchParams.get("propertyId") ||
location.state?.propertyId ||
location.state?.property?._id;

const { property, loading: propertyLoading, error: propertyError } =
useSelector((state) => state.properties || {});

const {
createLoading,
createError,
} = useSelector((state) => state.bookings || {});

const { user, isAuthenticated } = useSelector(
(state) => state.auth || {}
);

const [bookingDetails, setBookingDetails] = useState({
checkIn: "",
checkOut: "",
guests: 1,
});

const [customerDetails, setCustomerDetails] = useState({
guestName: "",
guestPhone: "",
guestEmail: "",
specialRequest: "",
});

const [formError, setFormError] = useState("");

useEffect(() => {
if (!propertyId) return;


dispatch(getPropertyById(propertyId));


}, [dispatch, propertyId]);

useEffect(() => {
if (!user) return;


setCustomerDetails((prev) => ({
  ...prev,
  guestName:
    prev.guestName ||
    user.name ||
    user.fullName ||
    `${user.firstName || ""} ${user.lastName || ""}`.trim(),
  guestPhone:
    prev.guestPhone ||
    user.phone ||
    user.mobile ||
    user.phoneNumber ||
    "",
  guestEmail:
    prev.guestEmail ||
    user.email ||
    "",
}));


}, [user]);

useEffect(() => {
dispatch(clearCreateBookingError());
setFormError("");
}, [dispatch]);

const maximumGuests = useMemo(() => {
const value =
property?.maxGuests ??
property?.guests ??
1;


const parsed = Number(value);

return Number.isFinite(parsed) && parsed > 0
  ? Math.floor(parsed)
  : 1;
}, [property]);

useEffect(() => {
setBookingDetails((prev) => ({
...prev,
guests: Math.min(
Math.max(Number(prev.guests) || 1, 1),
maximumGuests
),
}));
}, [maximumGuests]);

const today = useMemo(() => {
const date = new Date();


const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");

return `${year}-${month}-${day}`;

}, []);

const nights = useMemo(() => {
if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
return 0;
}


const start = new Date(
  `${bookingDetails.checkIn}T00:00:00`
);

const end = new Date(
  `${bookingDetails.checkOut}T00:00:00`
);

const difference = end.getTime() - start.getTime();

if (difference <= 0) {
  return 0;
}

return Math.ceil(
  difference / (1000 * 60 * 60 * 24)
);


}, [
bookingDetails.checkIn,
bookingDetails.checkOut,
]);

const pricePerNight = Number(property?.rent) || 0;

const subtotal = useMemo(() => {
if (!nights || !pricePerNight) {
return 0;
}


return pricePerNight * nights;

}, [nights, pricePerNight]);

const taxes = 0;

const totalAmount = subtotal + taxes;

const formatCurrency = (amount) => {
return new Intl.NumberFormat("en-IN", {
style: "currency",
currency: "INR",
maximumFractionDigits: 0,
}).format(amount || 0);
};

const formatDate = (dateString) => {
if (!dateString) return "";


const date = new Date(
  `${dateString}T00:00:00`
);

if (Number.isNaN(date.getTime())) {
  return dateString;
}

return date.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});


};

const handleBookingChange = (event) => {
const { name, value } = event.target;


setFormError("");

setBookingDetails((prev) => ({
  ...prev,
  [name]:
    name === "guests"
      ? Math.min(
          Math.max(Number(value) || 1, 1),
          maximumGuests
        )
      : value,
}));


};

const handleCustomerChange = (event) => {
const { name, value } = event.target;

setFormError("");

setCustomerDetails((prev) => ({
  ...prev,
  [name]: value,
}));


};

const validateForm = () => {
if (!propertyId) {
return "Property information is missing.";
}


if (!isAuthenticated) {
  return "Please login before submitting a booking request.";
}

if (!property) {
  return "Property information could not be loaded.";
}

if (
  property.approvalStatus &&
  property.approvalStatus !== "approved"
) {
  return "This property is not currently available for booking.";
}

if (
  property.status &&
  property.status !== "active"
) {
  return "This property is not currently available for booking.";
}

if (!bookingDetails.checkIn) {
  return "Please select your check-in date.";
}

if (!bookingDetails.checkOut) {
  return "Please select your check-out date.";
}

if (bookingDetails.checkIn < today) {
  return "Check-in date cannot be in the past.";
}

if (bookingDetails.checkOut <= bookingDetails.checkIn) {
  return "Check-out date must be after check-in date.";
}

const guestCount = Number(bookingDetails.guests);

if (!Number.isInteger(guestCount) || guestCount < 1) {
  return "Please enter a valid number of guests.";
}

if (guestCount > maximumGuests) {
  return `This property allows a maximum of ${maximumGuests} guest${
    maximumGuests > 1 ? "s" : ""
  }.`;
}

if (!customerDetails.guestName.trim()) {
  return "Please enter customer name.";
}

if (!customerDetails.guestPhone.trim()) {
  return "Please enter customer phone number.";
}

const phone = customerDetails.guestPhone.trim();

if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
  return "Please enter a valid phone number.";
}

if (!customerDetails.guestEmail.trim()) {
  return "Please enter customer email.";
}

const email = customerDetails.guestEmail.trim();

if (
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
) {
  return "Please enter a valid email address.";
}

if (!nights) {
  return "Please select valid booking dates.";
}

if (pricePerNight <= 0) {
  return "This property does not have a valid rent amount.";
}

return "";


};

const handleSubmit = async (event) => {
event.preventDefault();


setFormError("");
dispatch(clearCreateBookingError());

const validationError = validateForm();

if (validationError) {
  setFormError(validationError);
  return;
}

const payload = {
  propertyId,
  checkIn: bookingDetails.checkIn,
  checkOut: bookingDetails.checkOut,
  guests: Number(bookingDetails.guests),

  guestName: customerDetails.guestName.trim(),
  guestPhone: customerDetails.guestPhone.trim(),
  guestEmail: customerDetails.guestEmail.trim(),

  specialRequest:
    customerDetails.specialRequest.trim(),

  pricePerNight,
  nights,
  subtotal,
  taxes: 0,
  totalAmount,
};

try {
  const result = await dispatch(
    createBooking(payload)
  ).unwrap();

  const createdBooking =
    result?.booking ||
    result?.data?.booking ||
    result?.data ||
    result;

  const bookingId =
    createdBooking?._id ||
    createdBooking?.id ||
    result?.bookingId;

  navigate("/booking-confirmation", {
    state: {
      bookingId,
      booking: createdBooking,
      property,
      status: "pending",
    },
  });
} catch (error) {
  const message =
    typeof error === "string"
      ? error
      : error?.message ||
        error?.error ||
        "Unable to submit booking request. Please try again.";

  setFormError(message);
}

};

if (!propertyId) {
return ( <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4"> <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm"> <h1 className="text-2xl font-semibold text-gray-900">
Property not found </h1>


      <p className="mt-3 text-gray-600">
        We could not find the property for this booking.
      </p>

      <Link
        to="/properties"
        className="inline-flex mt-6 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
      >
        Browse Properties
      </Link>
    </div>
  </div>
);


}

if (propertyLoading && !property) {
return ( <div className="min-h-screen bg-gray-50 flex items-center justify-center"> <div className="text-gray-600">
Loading property... </div> </div>
);
}

if (propertyError && !property) {
return ( <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4"> <div className="w-full max-w-lg bg-white border border-red-200 rounded-2xl p-8 text-center"> <h1 className="text-xl font-semibold text-gray-900">
Unable to load property </h1>


      <p className="mt-3 text-red-600">
        {typeof propertyError === "string"
          ? propertyError
          : propertyError?.message ||
            "Something went wrong while loading the property."}
      </p>

      <Link
        to="/properties"
        className="inline-flex mt-6 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
      >
        Back to Properties
      </Link>
    </div>
  </div>
);


}

return ( <div className="min-h-screen bg-gray-50"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> <div className="mb-6">
<Link
to={`/property/${propertyId}`}
className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
>
← Back to Property </Link>


      <h1 className="mt-4 text-3xl font-bold text-gray-900">
        Request to Book
      </h1>

      <p className="mt-2 text-gray-600">
        Submit your booking request. The property will be confirmed by the admin after verification.
      </p>
    </div>

    {!isAuthenticated && (
      <div className="mb-6 bg-white border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800">
          Please login before submitting a booking request.
        </p>

        <Link
          to="/login"
          state={{
            from: `/booking?property=${propertyId}`,
          }}
          className="inline-block mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Login
        </Link>
      </div>
    )}

    {(formError || createError) && (
      <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-sm text-red-700">
          {formError ||
            (typeof createError === "string"
              ? createError
              : createError?.message ||
                createError?.error ||
                "Unable to submit booking request.")}
        </p>
      </div>
    )}

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Property
          </h2>

          <div className="mt-5 flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {property?.images?.[0] ? (
                <img
                  src={property.images[0]}
                  alt={property.title || "Property"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                  No image
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {property?.title || "Property"}
              </h3>

              <p className="mt-1 text-gray-600">
                {property?.locality}
                {property?.locality && property?.city
                  ? ", "
                  : ""}
                {property?.city}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {property?.propertyType && (
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                    {property.propertyType}
                  </span>
                )}

                {property?.bhk && (
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                    {property.bhk} BHK
                  </span>
                )}

                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                  Up to {maximumGuests} guest
                  {maximumGuests > 1 ? "s" : ""}
                </span>
              </div>

              <p className="mt-4 text-lg font-bold text-gray-900">
                {formatCurrency(pricePerNight)}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {property?.rentPeriod
                    ? `/ ${property.rentPeriod}`
                    : ""}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Booking Details
          </h2>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="checkIn"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Check-in
              </label>

              <input
                id="checkIn"
                name="checkIn"
                type="date"
                min={today}
                value={bookingDetails.checkIn}
                onChange={handleBookingChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="checkOut"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Check-out
              </label>

              <input
                id="checkOut"
                name="checkOut"
                type="date"
                min={
                  bookingDetails.checkIn || today
                }
                value={bookingDetails.checkOut}
                onChange={handleBookingChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Guests
              </label>

              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max={maximumGuests}
                value={bookingDetails.guests}
                onChange={handleBookingChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              <p className="mt-2 text-xs text-gray-500">
                Maximum {maximumGuests} guest
                {maximumGuests > 1 ? "s" : ""} for this property.
              </p>
            </div>
          </div>

          {nights > 0 && (
            <div className="mt-5 p-4 bg-indigo-50 rounded-xl">
              <p className="text-sm text-indigo-800">
                {formatDate(bookingDetails.checkIn)}
                {" to "}
                {formatDate(bookingDetails.checkOut)}
                {" · "}
                {nights} night
                {nights > 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Customer Details
          </h2>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="guestName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>

              <input
                id="guestName"
                name="guestName"
                type="text"
                value={customerDetails.guestName}
                onChange={handleCustomerChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="guestPhone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>

              <input
                id="guestPhone"
                name="guestPhone"
                type="tel"
                value={customerDetails.guestPhone}
                onChange={handleCustomerChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="guestEmail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="guestEmail"
                name="guestEmail"
                type="email"
                value={customerDetails.guestEmail}
                onChange={handleCustomerChange}
                placeholder="Enter email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="specialRequest"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Special Request
                <span className="ml-1 text-gray-400">
                  (Optional)
                </span>
              </label>

              <textarea
                id="specialRequest"
                name="specialRequest"
                rows="4"
                value={customerDetails.specialRequest}
                onChange={handleCustomerChange}
                placeholder="Any additional information for the property owner..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Before You Submit
          </h2>

          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <p>
              Your booking will first be submitted as a request.
            </p>

            <p>
              The admin will review your request and confirm the property after verification.
            </p>

            <p>
              Multiple booking requests can be submitted for the same property and dates. Only an admin-confirmed booking blocks those dates.
            </p>

            <p>
              Payment is not collected online at this stage.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Booking Summary
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-600">
                Property
              </span>

              <span className="font-medium text-gray-900 text-right">
                {property?.title || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-600">
                Check-in
              </span>

              <span className="font-medium text-gray-900">
                {formatDate(
                  bookingDetails.checkIn
                ) || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-600">
                Check-out
              </span>

              <span className="font-medium text-gray-900">
                {formatDate(
                  bookingDetails.checkOut
                ) || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-600">
                Guests
              </span>

              <span className="font-medium text-gray-900">
                {bookingDetails.guests}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-600">
                  Rent
                </span>

                <span className="font-medium text-gray-900">
                  {formatCurrency(pricePerNight)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm mt-3">
                <span className="text-gray-600">
                  Nights
                </span>

                <span className="font-medium text-gray-900">
                  {nights || 0}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm mt-3">
                <span className="text-gray-600">
                  Rent × Nights
                </span>

                <span className="font-medium text-gray-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm mt-3">
                <span className="text-gray-600">
                  Taxes & Fees
                </span>

                <span className="font-medium text-gray-900">
                  {formatCurrency(0)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center gap-4">
                <span className="text-base font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={
                  createLoading ||
                  propertyLoading ||
                  !property
                }
                className="w-full px-5 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {createLoading
                  ? "Submitting Request..."
                  : "Submit Booking Request"}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center leading-5">
              This does not confirm your booking immediately. Your request will be reviewed by the admin.
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>


);
};

export default Booking;
