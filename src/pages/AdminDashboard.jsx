// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import {
//   getAdminMe,
//   selectAdmin,
//   selectAdminAuthenticated,
//   selectAdminMeLoading,
// } from "../features/admin/adminSlice";

// import {
//   getPropertyStats,
//   getBookingStats,
//   getEnquiryStats,

//   selectPropertyStats,
//   selectBookingStats,
//   selectEnquiryStats,

//   selectPropertyStatsLoading,
//   selectBookingStatsLoading,
//   selectEnquiryStatsLoading,
// } from "../features/admin/adminSlice";


// export default function AdminDashboard() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   /* =====================================================
//      ADMIN AUTH
//   ===================================================== */

//   const admin = useSelector(selectAdmin);

//   const isAuthenticated = useSelector(
//     selectAdminAuthenticated
//   );

//   const adminLoading = useSelector(
//     selectAdminMeLoading
//   );


//   /* =====================================================
//      STATS
//   ===================================================== */

//   const propertyStats = useSelector(
//     selectPropertyStats
//   );

//   const bookingStats = useSelector(
//     selectBookingStats
//   );

//   const enquiryStats = useSelector(
//     selectEnquiryStats
//   );


//   const propertyLoading = useSelector(
//     selectPropertyStatsLoading
//   );

//   const bookingLoading = useSelector(
//     selectBookingStatsLoading
//   );

//   const enquiryLoading = useSelector(
//     selectEnquiryStatsLoading
//   );


//   /* =====================================================
//      RESTORE ADMIN SESSION
//   ===================================================== */

//   useEffect(() => {
//     if (!isAuthenticated) {
//       dispatch(getAdminMe());
//     }
//   }, [
//     dispatch,
//     isAuthenticated,
//   ]);


//   /* =====================================================
//      AUTH REDIRECT
//   ===================================================== */

//   useEffect(() => {
//     if (adminLoading) {
//       return;
//     }

//     if (!isAuthenticated) {
//       navigate("/login", {
//         replace: true,
//       });

//       return;
//     }

//     if (admin?.role !== "admin") {
//       navigate("/", {
//         replace: true,
//       });
//     }
//   }, [
//     adminLoading,
//     isAuthenticated,
//     admin,
//     navigate,
//   ]);


//   /* =====================================================
//      FETCH DASHBOARD STATS
//   ===================================================== */

//   useEffect(() => {
//     if (
//       adminLoading ||
//       !isAuthenticated ||
//       admin?.role !== "admin"
//     ) {
//       return;
//     }

//     dispatch(getPropertyStats());
//     dispatch(getBookingStats());
//     dispatch(getEnquiryStats());

//   }, [
//     dispatch,
//     adminLoading,
//     isAuthenticated,
//     admin?.role,
//   ]);


//   /* =====================================================
//      LOADING
//   ===================================================== */

//   if (adminLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#F5F7F6]">
//         <div className="rounded-2xl bg-white px-7 py-6 shadow-sm">
//           <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#E9F8F0]">
//             <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#18C66A] border-t-transparent" />
//           </div>

//           <p className="text-sm font-bold text-[#073F32]">
//             Loading admin dashboard...
//           </p>
//         </div>
//       </div>
//     );
//   }


//   /* =====================================================
//      SECURITY
//   ===================================================== */

//   if (
//     !isAuthenticated ||
//     admin?.role !== "admin"
//   ) {
//     return null;
//   }


//   /* =====================================================
//      DASHBOARD
//   ===================================================== */

//   return (
//     <main className="min-h-screen bg-[#F5F7F6]">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <header className="border-b border-[#E5E7EB] bg-white">

//         <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">

//           {/* LOGO */}

//           <button
//             type="button"
//             onClick={() =>
//               navigate("/admin")
//             }
//             className="flex items-center gap-3"
//           >

//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] text-base font-black text-[#073F32]">
//               C
//             </div>

//             <div className="text-left">

//               <p className="text-lg font-black leading-none text-[#073F32]">
//                 Coral
//               </p>

//               <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-gray-400">
//                 Admin Panel
//               </p>

//             </div>

//           </button>


//           {/* ADMIN */}

//           <div className="flex items-center gap-3">

//             <div className="hidden text-right sm:block">

//               <p className="text-sm font-black text-[#073F32]">
//                 {admin?.name || "Administrator"}
//               </p>

//               <p className="text-xs text-gray-400">
//                 {admin?.email || ""}
//               </p>

//             </div>

//             <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#073F32] text-sm font-black text-white">

//               {admin?.avatar ? (
//                 <img
//                   src={admin.avatar}
//                   alt={admin.name || "Admin"}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 admin?.name
//                   ?.charAt(0)
//                   ?.toUpperCase() || "A"
//               )}

//             </div>

//           </div>

//         </div>

//       </header>


//       {/* =================================================
//           CONTENT
//       ================================================= */}

//       <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">

//         {/* =================================================
//             TITLE
//         ================================================= */}

//         <div>

//           <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#18A85B]">
//             Overview
//           </p>

//           <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
//             Dashboard
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             Welcome back,{" "}
//             <span className="font-bold text-[#073F32]">
//               {admin?.name || "Administrator"}
//             </span>
//             . Manage Coral from here.
//           </p>

//         </div>


//         {/* =================================================
//             PROPERTY STATS
//         ================================================= */}

//         <div className="mt-8">

//           <div className="mb-4 flex items-center justify-between">

//             <h2 className="text-lg font-black text-[#073F32]">
//               Properties
//             </h2>

//             <button
//               type="button"
//               onClick={() =>
//                 navigate("/admin/properties")
//               }
//               className="text-sm font-extrabold text-[#18A85B] transition hover:text-[#073F32]"
//             >
//               Manage →
//             </button>

//           </div>


//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

//             <StatCard
//               title="Total"
//               value={propertyStats?.total}
//               loading={propertyLoading}
//               icon="🏠"
//             />

//             <StatCard
//               title="Pending"
//               value={propertyStats?.pending}
//               loading={propertyLoading}
//               icon="⏳"
//               highlight
//             />

//             <StatCard
//               title="Approved"
//               value={propertyStats?.approved}
//               loading={propertyLoading}
//               icon="✓"
//             />

//             <StatCard
//               title="Active"
//               value={propertyStats?.active}
//               loading={propertyLoading}
//               icon="●"
//             />

//           </div>

//         </div>


//         {/* =================================================
//             BOOKING STATS
//         ================================================= */}

//         <div className="mt-10">

//           <div className="mb-4 flex items-center justify-between">

//             <h2 className="text-lg font-black text-[#073F32]">
//               Bookings
//             </h2>

//             <button
//               type="button"
//               onClick={() =>
//                 navigate("/admin/bookings")
//               }
//               className="text-sm font-extrabold text-[#18A85B] transition hover:text-[#073F32]"
//             >
//               Manage →
//             </button>

//           </div>


//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

//             <StatCard
//               title="Total"
//               value={bookingStats?.total}
//               loading={bookingLoading}
//               icon="📋"
//             />

//             <StatCard
//               title="Pending"
//               value={bookingStats?.pending}
//               loading={bookingLoading}
//               icon="⏳"
//               highlight
//             />

//             <StatCard
//               title="Confirmed"
//               value={bookingStats?.confirmed}
//               loading={bookingLoading}
//               icon="✓"
//             />

//             <StatCard
//               title="Completed"
//               value={bookingStats?.completed}
//               loading={bookingLoading}
//               icon="★"
//             />

//           </div>

//         </div>


//         {/* =================================================
//             ENQUIRY STATS
//         ================================================= */}

//         <div className="mt-10">

//           <div className="mb-4 flex items-center justify-between">

//             <h2 className="text-lg font-black text-[#073F32]">
//               Enquiries
//             </h2>

//             <button
//               type="button"
//               onClick={() =>
//                 navigate("/admin/enquiries")
//               }
//               className="text-sm font-extrabold text-[#18A85B] transition hover:text-[#073F32]"
//             >
//               Manage →
//             </button>

//           </div>


//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

//             <StatCard
//               title="Total"
//               value={enquiryStats?.total}
//               loading={enquiryLoading}
//               icon="💬"
//             />

//             <StatCard
//               title="New"
//               value={enquiryStats?.new}
//               loading={enquiryLoading}
//               icon="✦"
//               highlight
//             />

//             <StatCard
//               title="Contacted"
//               value={enquiryStats?.contacted}
//               loading={enquiryLoading}
//               icon="☎"
//             />

//             <StatCard
//               title="Follow Up"
//               value={enquiryStats?.followUp}
//               loading={enquiryLoading}
//               icon="↻"
//             />

//           </div>

//         </div>


//         {/* =================================================
//             QUICK ACTIONS
//         ================================================= */}

//         <div className="mt-10">

//           <h2 className="mb-4 text-lg font-black text-[#073F32]">
//             Quick Actions
//           </h2>


//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//   <QuickAction
//     title="Add Property"
//     description="Create and submit a new property listing"
//     icon="+"
//     onClick={() =>
//       navigate("/admin/properties/add")
//     }
//   />
//             <QuickAction
//               title="Properties"
//               description="View and manage all property listings"
//               icon="🏠"
//               onClick={() =>
//                 navigate("/admin/properties")
//               }
//             />

//             <QuickAction
//               title="Bookings"
//               description="Review and manage customer bookings"
//               icon="📋"
//               onClick={() =>
//                 navigate("/admin/bookings")
//               }
//             />

//             <QuickAction
//               title="Enquiries"
//               description="Manage customer enquiries"
//               icon="💬"
//               onClick={() =>
//                 navigate("/admin/enquiries")
//               }
//             />

//           </div>

//         </div>

//       </section>

//     </main>
//   );
// }


// /* =====================================================
//    STAT CARD
// ===================================================== */

// function StatCard({
//   title,
//   value,
//   loading,
//   icon,
//   highlight = false,
// }) {
//   return (
//     <div
//       className={`rounded-[24px] border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
//         highlight
//           ? "border-[#BCEFD3]"
//           : "border-[#E5E7EB]"
//       }`}
//     >

//       <div className="flex items-start justify-between">

//         <div
//           className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
//             highlight
//               ? "bg-[#E9F8F0] text-[#18A85B]"
//               : "bg-[#F5F7F6] text-[#073F32]"
//           }`}
//         >
//           {icon}
//         </div>

//       </div>


//       <p className="mt-5 text-xs font-bold uppercase tracking-wider text-gray-400">
//         {title}
//       </p>


//       {loading ? (
//         <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
//       ) : (
//         <p className="mt-1 text-3xl font-black text-[#073F32]">
//           {value ?? 0}
//         </p>
//       )}

//     </div>
//   );
// }


// /* =====================================================
//    QUICK ACTION
// ===================================================== */

// function QuickAction({
//   title,
//   description,
//   icon,
//   onClick,
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="group rounded-[24px] border border-[#E5E7EB] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#BCEFD3] hover:shadow-md"
//     >

//       <div className="flex items-center justify-between">

//         <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E9F8F0] text-lg font-black text-[#073F32] transition group-hover:bg-[#18C66A]">
//           {icon}
//         </div>

//         <span className="text-lg text-gray-300 transition group-hover:text-[#18A85B]">
//           →
//         </span>

//       </div>


//       <h3 className="mt-5 text-sm font-black text-[#073F32]">
//         {title}
//       </h3>

//       <p className="mt-1 text-xs leading-5 text-gray-500">
//         {description}
//       </p>

//     </button>
//   );
// }






import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getAdminMe,
  selectAdmin,
  selectAdminAuthenticated,
  selectAdminMeLoading,
} from "../features/admin/adminSlice";

import {
  getPropertyStats,
  getBookingStats,
  getEnquiryStats,

  selectPropertyStats,
  selectBookingStats,
  selectEnquiryStats,

  selectPropertyStatsLoading,
  selectBookingStatsLoading,
  selectEnquiryStatsLoading,
} from "../features/admin/adminSlice";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_TOKEN_KEY = "coral_admin_token";

const getAuthHeaders = () => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* =====================================================
     ADMIN AUTH
  ===================================================== */

  const admin = useSelector(selectAdmin);

  const isAuthenticated = useSelector(
    selectAdminAuthenticated
  );

  const adminLoading = useSelector(
    selectAdminMeLoading
  );

  /* =====================================================
     STATS
  ===================================================== */

  const propertyStats = useSelector(
    selectPropertyStats
  );

  const bookingStats = useSelector(
    selectBookingStats
  );

  const enquiryStats = useSelector(
    selectEnquiryStats
  );

  const propertyLoading = useSelector(
    selectPropertyStatsLoading
  );

  const bookingLoading = useSelector(
    selectBookingStatsLoading
  );

  const enquiryLoading = useSelector(
    selectEnquiryStatsLoading
  );

  /* =====================================================
     CALENDAR STATE
  ===================================================== */

  const today = useMemo(() => {
    const date = new Date();

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }, []);

  const [calendarDate, setCalendarDate] =
    useState(today);

  const [calendarData, setCalendarData] =
    useState([]);

  const [calendarLoading, setCalendarLoading] =
    useState(false);

  const [calendarError, setCalendarError] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState(null);

  /* =====================================================
     RESTORE ADMIN SESSION
  ===================================================== */

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getAdminMe());
    }
  }, [
    dispatch,
    isAuthenticated,
  ]);

  /* =====================================================
     AUTH REDIRECT
  ===================================================== */

  useEffect(() => {
    if (adminLoading) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    if (admin?.role !== "admin") {
      navigate("/", {
        replace: true,
      });
    }
  }, [
    adminLoading,
    isAuthenticated,
    admin,
    navigate,
  ]);

  /* =====================================================
     FETCH DASHBOARD STATS
  ===================================================== */

  useEffect(() => {
    if (
      adminLoading ||
      !isAuthenticated ||
      admin?.role !== "admin"
    ) {
      return;
    }

    dispatch(getPropertyStats());
    dispatch(getBookingStats());
    dispatch(getEnquiryStats());
  }, [
    dispatch,
    adminLoading,
    isAuthenticated,
    admin?.role,
  ]);

  /* =====================================================
     FETCH CALENDAR
  ===================================================== */

  useEffect(() => {
    if (
      adminLoading ||
      !isAuthenticated ||
      admin?.role !== "admin"
    ) {
      return;
    }

    fetchCalendar();
  }, [
    adminLoading,
    isAuthenticated,
    admin?.role,
    calendarDate,
  ]);

  async function fetchCalendar() {
    try {
      setCalendarLoading(true);
      setCalendarError("");

      const year = calendarDate.getFullYear();
      const month = calendarDate.getMonth() + 1;

      const response = await fetch(
        `${API_URL}/admin/bookings/calendar?year=${year}&month=${month}`,
        {
          method: "GET",
          headers: {
            ...getAuthHeaders(),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to load booking calendar"
        );
      }

      setCalendarData(
        Array.isArray(data?.calendar)
          ? data.calendar
          : []
      );
    } catch (error) {
      setCalendarData([]);
      setCalendarError(
        error?.message ||
          "Unable to load booking calendar"
      );
    } finally {
      setCalendarLoading(false);
    }
  }

  /* =====================================================
     CALENDAR HELPERS
  ===================================================== */

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const monthName = calendarDate.toLocaleString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const calendarCells = [];

  for (let i = 0; i < firstDay; i += 1) {
    calendarCells.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day += 1
  ) {
    calendarCells.push(day);
  }

  const getCalendarDay = (day) => {
    if (!day) {
      return null;
    }

    const dateString =
      `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;

    return calendarData.find(
      (item) =>
        item?.date === dateString
    );
  };

  const isToday = (day) => {
    if (!day) {
      return false;
    }

    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
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

  const goToPreviousMonth = () => {
    setSelectedDate(null);

    setCalendarDate(
      new Date(
        year,
        month - 1,
        1
      )
    );
  };

  const goToNextMonth = () => {
    setSelectedDate(null);

    setCalendarDate(
      new Date(
        year,
        month + 1,
        1
      )
    );
  };

  const goToToday = () => {
    setSelectedDate(null);

    setCalendarDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );
  };

  const handleDateClick = (day) => {
    if (!day) {
      return;
    }

    const dayData = getCalendarDay(day);

    setSelectedDate(
      dayData || {
        date:
          `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`,
        bookingCount: 0,
        bookedRooms: 0,
        bookings: [],
        status: "AVAILABLE",
      }
    );
  };

  /* =====================================================
     TODAY BOOKING COUNT
  ===================================================== */

  const todayString =
    `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;

  const todayCalendarData =
    calendarData.find(
      (item) =>
        item?.date === todayString
    );

  const todayBookingCount =
    todayCalendarData?.bookingCount || 0;

  /* =====================================================
     LOADING
  ===================================================== */

  if (adminLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7F6]">
        <div className="rounded-2xl bg-white px-7 py-6 shadow-sm">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#E9F8F0]">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#18C66A] border-t-transparent" />
          </div>

          <p className="text-sm font-bold text-[#073F32]">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     SECURITY
  ===================================================== */

  if (
    !isAuthenticated ||
    admin?.role !== "admin"
  ) {
    return null;
  }

  /* =====================================================
     DASHBOARD
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#F5F7F6]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">

          <button
            type="button"
            onClick={() =>
              navigate("/admin")
            }
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] text-base font-black text-[#073F32]">
              C
            </div>

            <div className="text-left">
              <p className="text-lg font-black leading-none text-[#073F32]">
                Coral
              </p>

              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-gray-400">
                Admin Panel
              </p>
            </div>
          </button>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-black text-[#073F32]">
                {admin?.name ||
                  "Administrator"}
              </p>

              <p className="text-xs text-gray-400">
                {admin?.email || ""}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#073F32] text-sm font-black text-white">

              {admin?.avatar ? (
                <img
                  src={admin.avatar}
                  alt={
                    admin.name || "Admin"
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                admin?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "A"
              )}

            </div>

          </div>

        </div>
      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">

        {/* =================================================
            TITLE
        ================================================= */}

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#18A85B]">
            Overview
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Welcome back,{" "}
            <span className="font-bold text-[#073F32]">
              {admin?.name ||
                "Administrator"}
            </span>
            . Manage Coral from here.
          </p>
        </div>

        {/* =================================================
            PROPERTY STATS
        ================================================= */}

        <div className="mt-8">

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-[#073F32]">
              Properties
            </h2>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/properties"
                )
              }
              className="text-sm font-extrabold text-[#18A85B] transition hover:text-[#073F32]"
            >
              Manage →
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Total"
              value={
                propertyStats?.total
              }
              loading={
                propertyLoading
              }
              icon="🏠"
            />

            <StatCard
              title="Pending"
              value={
                propertyStats?.pending
              }
              loading={
                propertyLoading
              }
              icon="⏳"
              highlight
            />

            <StatCard
              title="Approved"
              value={
                propertyStats?.approved
              }
              loading={
                propertyLoading
              }
              icon="✓"
            />

            <StatCard
              title="Active"
              value={
                propertyStats?.active
              }
              loading={
                propertyLoading
              }
              icon="●"
            />

          </div>

        </div>

        {/* =================================================
            BOOKING STATS
        ================================================= */}

        <div className="mt-10">

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-[#073F32]">
              Bookings
            </h2>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/bookings"
                )
              }
              className="text-sm font-extrabold text-[#18A85B] transition hover:text-[#073F32]"
            >
              Manage →
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Total"
              value={
                bookingStats?.total
              }
              loading={
                bookingLoading
              }
              icon="📋"
            />

            <StatCard
              title="Pending"
              value={
                bookingStats?.pending
              }
              loading={
                bookingLoading
              }
              icon="⏳"
              highlight
            />

            <StatCard
              title="Confirmed"
              value={
                bookingStats?.confirmed
              }
              loading={
                bookingLoading
              }
              icon="✓"
            />

            <StatCard
              title="Completed"
              value={
                bookingStats?.completed
              }
              loading={
                bookingLoading
              }
              icon="★"
            />

          </div>

        </div>

        {/* =================================================
            BOOKING CALENDAR
        ================================================= */}

        <div className="mt-10">

          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-lg font-black text-[#073F32]">
                Booking Calendar
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Check booking availability by date.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">

              <div className="flex items-center rounded-xl border border-[#E5E7EB] bg-white p-1">

                <button
                  type="button"
                  onClick={
                    goToPreviousMonth
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
                  aria-label="Previous month"
                >
                  ‹
                </button>

                <div className="min-w-[150px] px-3 text-center text-sm font-black text-[#073F32]">
                  {monthName}
                </div>

                <button
                  type="button"
                  onClick={
                    goToNextMonth
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
                  aria-label="Next month"
                >
                  ›
                </button>

              </div>

              <button
                type="button"
                onClick={goToToday}
                className="rounded-xl bg-[#073F32] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#18A85B]"
              >
                Today
              </button>

            </div>

          </div>

          {/* TODAY SUMMARY */}

          <div className="mb-5 grid gap-4 sm:grid-cols-2">

            <div className="rounded-[22px] border border-[#BCEFD3] bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                    Today's Bookings
                  </p>

                  <p className="mt-2 text-3xl font-black text-[#073F32]">
                    {todayBookingCount}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F0] text-xl">
                  📅
                </div>

              </div>

              <p className="mt-2 text-xs text-gray-500">
                Active bookings covering today.
              </p>

            </div>

            <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                    Current Month
                  </p>

                  <p className="mt-2 text-3xl font-black text-[#073F32]">
                    {calendarData.reduce(
                      (
                        total,
                        item
                      ) =>
                        total +
                        Number(
                          item?.bookingCount ||
                            0
                        ),
                      0
                    )}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F7F6] text-xl">
                  📊
                </div>

              </div>

              <p className="mt-2 text-xs text-gray-500">
                Booking entries across this month.
              </p>

            </div>

          </div>

          {/* CALENDAR */}

          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">

            {calendarLoading ? (
              <div className="flex min-h-[420px] items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#E9F8F0]">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#18C66A] border-t-transparent" />
                  </div>

                  <p className="text-sm font-bold text-[#073F32]">
                    Loading calendar...
                  </p>

                </div>

              </div>
            ) : calendarError ? (
              <div className="flex min-h-[420px] items-center justify-center">

                <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-5 text-center">

                  <p className="text-sm font-black text-red-700">
                    Unable to load calendar
                  </p>

                  <p className="mt-1 text-xs text-red-600">
                    {calendarError}
                  </p>

                  <button
                    type="button"
                    onClick={fetchCalendar}
                    className="mt-4 rounded-xl bg-[#073F32] px-4 py-2 text-xs font-black text-white"
                  >
                    Try Again
                  </button>

                </div>

              </div>
            ) : (
              <>
                {/* WEEK DAYS */}

                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">

                  {[
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ].map(
                    (day) => (
                      <div
                        key={day}
                        className="py-2 text-center text-[10px] font-black uppercase tracking-wider text-gray-400 sm:text-xs"
                      >
                        {day}
                      </div>
                    )
                  )}

                </div>

                {/* DAYS */}

                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">

                  {calendarCells.map(
                    (
                      day,
                      index
                    ) => {

                      if (!day) {
                        return (
                          <div
                            key={`empty-${index}`}
                            className="min-h-[90px] rounded-2xl bg-transparent sm:min-h-[115px]"
                          />
                        );
                      }

                      const dayData =
                        getCalendarDay(
                          day
                        );

                      const bookingCount =
                        Number(
                          dayData?.bookingCount ||
                            0
                        );

                      const status =
                        dayData?.status ||
                        "AVAILABLE";

                      const full =
                        status ===
                        "FULL";

                      const selected =
                        selectedDate?.date ===
                        dayData?.date;

                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() =>
                            handleDateClick(
                              day
                            )
                          }
                          className={`group min-h-[90px] rounded-2xl border p-2 text-left transition sm:min-h-[115px] sm:p-3 ${
                            selected
                              ? "border-[#18A85B] bg-[#E9F8F0] shadow-sm"
                              : full
                              ? "border-red-200 bg-red-50/60 hover:border-red-300"
                              : "border-[#E5E7EB] bg-white hover:border-[#BCEFD3] hover:bg-[#F8FFFB]"
                          }`}
                        >

                          <div className="flex items-start justify-between gap-1">

                            <span
                              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black sm:h-8 sm:w-8 sm:text-sm ${
                                isToday(day)
                                  ? "bg-[#18C66A] text-[#073F32]"
                                  : selected
                                  ? "bg-[#073F32] text-white"
                                  : "text-[#073F32]"
                              }`}
                            >
                              {day}
                            </span>

                            {bookingCount >
                              0 && (
                              <span
                                className={`rounded-full px-1.5 py-1 text-[9px] font-black sm:px-2 ${
                                  full
                                    ? "bg-red-100 text-red-700"
                                    : "bg-[#E9F8F0] text-[#168B4B]"
                                }`}
                              >
                                {bookingCount}
                              </span>
                            )}

                          </div>

                          <div className="mt-4">

                            {bookingCount >
                            0 ? (
                              <>
                                <p
                                  className={`text-[9px] font-black uppercase tracking-wide sm:text-[10px] ${
                                    full
                                      ? "text-red-600"
                                      : "text-[#18A85B]"
                                  }`}
                                >
                                  {full
                                    ? "FULL"
                                    : "BOOKED"}
                                </p>

                                <p className="mt-1 text-[9px] text-gray-500 sm:text-[10px]">
                                  {bookingCount}{" "}
                                  booking
                                  {bookingCount !==
                                  1
                                    ? "s"
                                    : ""}
                                </p>
                              </>
                            ) : (
                              <p className="text-[9px] font-black uppercase tracking-wide text-gray-400 sm:text-[10px]">
                                AVAILABLE
                              </p>
                            )}

                          </div>

                        </button>
                      );
                    }
                  )}

                </div>

                {/* LEGEND */}

                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#E5E7EB] pt-4">

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#18C66A]" />
                    <span className="text-xs font-bold text-gray-500">
                      Today
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="text-xs font-bold text-gray-500">
                      Full / Booked
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full border border-[#BCEFD3] bg-[#F8FFFB]" />
                    <span className="text-xs font-bold text-gray-500">
                      Available
                    </span>
                  </div>

                </div>

              </>
            )}

          </div>

          {/* =================================================
              SELECTED DATE DETAILS
          ================================================= */}

          {selectedDate && (
            <div className="mt-5 rounded-[28px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

              <div className="flex flex-col gap-3 border-b border-[#E5E7EB] pb-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#18A85B]">
                    Selected Date
                  </p>

                  <h3 className="mt-1 text-xl font-black text-[#073F32]">
                    {formatDate(
                      selectedDate.date
                    )}
                  </h3>

                </div>

                <div
                  className={`self-start rounded-full px-4 py-2 text-xs font-black ${
                    selectedDate.status ===
                    "FULL"
                      ? "bg-red-100 text-red-700"
                      : "bg-[#E9F8F0] text-[#168B4B]"
                  }`}
                >
                  {selectedDate.status ||
                    "AVAILABLE"}
                </div>

              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#F5F7F6] p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Bookings
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#073F32]">
                    {selectedDate.bookingCount ||
                      0}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F5F7F6] p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Booked Rooms
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#073F32]">
                    {selectedDate.bookedRooms ||
                      0}
                  </p>
                </div>

              </div>

              {Array.isArray(
                selectedDate.bookings
              ) &&
              selectedDate.bookings.length >
                0 ? (
                <div className="mt-5 space-y-3">

                  {selectedDate.bookings.map(
                    (
                      booking,
                      index
                    ) => {

                      const propertyName =
                        booking?.property
                          ?.title ||
                        booking?.property
                          ?.name ||
                        "Property";

                      const guestName =
                        booking?.guestName ||
                        booking?.user
                          ?.name ||
                        "Guest";

                      const guestPhone =
                        booking?.guestPhone ||
                        booking?.user
                          ?.phone ||
                        "";

                      const rooms =
                        booking?.rooms ||
                        1;

                      return (
                        <div
                          key={
                            booking?._id ||
                            `${selectedDate.date}-${index}`
                          }
                          className="rounded-2xl border border-[#E5E7EB] bg-white p-4"
                        >

                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div className="min-w-0">

                              <p className="truncate text-sm font-black text-[#073F32]">
                                {propertyName}
                              </p>

                              <p className="mt-1 text-xs font-bold text-gray-600">
                                {guestName}
                              </p>

                              {guestPhone && (
                                <p className="mt-1 text-xs text-gray-400">
                                  {guestPhone}
                                </p>
                              )}

                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                              <div>
                                <p className="text-[9px] font-black uppercase tracking-wide text-gray-400">
                                  Check In
                                </p>

                                <p className="mt-1 text-xs font-bold text-[#073F32]">
                                  {formatDate(
                                    booking?.checkIn
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-[9px] font-black uppercase tracking-wide text-gray-400">
                                  Check Out
                                </p>

                                <p className="mt-1 text-xs font-bold text-[#073F32]">
                                  {formatDate(
                                    booking?.checkOut
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-[9px] font-black uppercase tracking-wide text-gray-400">
                                  Rooms
                                </p>

                                <p className="mt-1 text-xs font-bold text-[#073F32]">
                                  {rooms}
                                </p>
                              </div>

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-[#BCEFD3] bg-[#F8FFFB] p-6 text-center">

                  <div className="text-2xl">
                    ✓
                  </div>

                  <p className="mt-2 text-sm font-black text-[#073F32]">
                    No active bookings
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    This date is currently available.
                  </p>

                </div>
              )}

            </div>
          )}

        </div>

        {/* =================================================
            ENQUIRY STATS
        ================================================= */}

        <div className="mt-10">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-lg font-black text-[#073F32]">
              Enquiries
            </h2>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/enquiries"
                )
              }
              className="text-sm font-extrabold text-[#18A85B] transition hover:text-[#073F32]"
            >
              Manage →
            </button>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Total"
              value={
                enquiryStats?.total
              }
              loading={
                enquiryLoading
              }
              icon="💬"
            />

            <StatCard
              title="New"
              value={
                enquiryStats?.new
              }
              loading={
                enquiryLoading
              }
              icon="✦"
              highlight
            />

            <StatCard
              title="Contacted"
              value={
                enquiryStats?.contacted
              }
              loading={
                enquiryLoading
              }
              icon="☎"
            />

            <StatCard
              title="Follow Up"
              value={
                enquiryStats?.followUp
              }
              loading={
                enquiryLoading
              }
              icon="↻"
            />

          </div>

        </div>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <div className="mt-10">

          <h2 className="mb-4 text-lg font-black text-[#073F32]">
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <QuickAction
              title="Add Property"
              description="Create and submit a new property listing"
              icon="+"
              onClick={() =>
                navigate(
                  "/admin/properties/add"
                )
              }
            />

            <QuickAction
              title="Properties"
              description="View and manage all property listings"
              icon="🏠"
              onClick={() =>
                navigate(
                  "/admin/properties"
                )
              }
            />

            <QuickAction
              title="Bookings"
              description="Review and manage customer bookings"
              icon="📋"
              onClick={() =>
                navigate(
                  "/admin/bookings"
                )
              }
            />

            <QuickAction
              title="Enquiries"
              description="Manage customer enquiries"
              icon="💬"
              onClick={() =>
                navigate(
                  "/admin/enquiries"
                )
              }
            />

          </div>

        </div>

      </section>

    </main>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  title,
  value,
  loading,
  icon,
  highlight = false,
}) {
  return (
    <div
      className={`rounded-[24px] border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        highlight
          ? "border-[#BCEFD3]"
          : "border-[#E5E7EB]"
      }`}
    >

      <div className="flex items-start justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
            highlight
              ? "bg-[#E9F8F0] text-[#18A85B]"
              : "bg-[#F5F7F6] text-[#073F32]"
          }`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-gray-400">
        {title}
      </p>

      {loading ? (
        <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
      ) : (
        <p className="mt-1 text-3xl font-black text-[#073F32]">
          {value ?? 0}
        </p>
      )}

    </div>
  );
}

/* =====================================================
   QUICK ACTION
===================================================== */

function QuickAction({
  title,
  description,
  icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-[24px] border border-[#E5E7EB] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#BCEFD3] hover:shadow-md"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E9F8F0] text-lg font-black text-[#073F32] transition group-hover:bg-[#18C66A]">
          {icon}
        </div>

        <span className="text-lg text-gray-300 transition group-hover:text-[#18A85B]">
          →
        </span>

      </div>

      <h3 className="mt-5 text-sm font-black text-[#073F32]">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-gray-500">
        {description}
      </p>

    </button>
  );
}

