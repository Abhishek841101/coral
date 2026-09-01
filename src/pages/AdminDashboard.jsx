import { useEffect } from "react";
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

          {/* LOGO */}

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


          {/* ADMIN */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-black text-[#073F32]">
                {admin?.name || "Administrator"}
              </p>

              <p className="text-xs text-gray-400">
                {admin?.email || ""}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#073F32] text-sm font-black text-white">

              {admin?.avatar ? (
                <img
                  src={admin.avatar}
                  alt={admin.name || "Admin"}
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
              {admin?.name || "Administrator"}
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
                navigate("/admin/properties")
              }
              className="text-sm font-extrabold text-[#18A85B] transition hover:text-[#073F32]"
            >
              Manage →
            </button>

          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Total"
              value={propertyStats?.total}
              loading={propertyLoading}
              icon="🏠"
            />

            <StatCard
              title="Pending"
              value={propertyStats?.pending}
              loading={propertyLoading}
              icon="⏳"
              highlight
            />

            <StatCard
              title="Approved"
              value={propertyStats?.approved}
              loading={propertyLoading}
              icon="✓"
            />

            <StatCard
              title="Active"
              value={propertyStats?.active}
              loading={propertyLoading}
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
                navigate("/admin/bookings")
              }
              className="text-sm font-extrabold text-[#18A85B] transition hover:text-[#073F32]"
            >
              Manage →
            </button>

          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Total"
              value={bookingStats?.total}
              loading={bookingLoading}
              icon="📋"
            />

            <StatCard
              title="Pending"
              value={bookingStats?.pending}
              loading={bookingLoading}
              icon="⏳"
              highlight
            />

            <StatCard
              title="Confirmed"
              value={bookingStats?.confirmed}
              loading={bookingLoading}
              icon="✓"
            />

            <StatCard
              title="Completed"
              value={bookingStats?.completed}
              loading={bookingLoading}
              icon="★"
            />

          </div>

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
                navigate("/admin/enquiries")
              }
              className="text-sm font-extrabold text-[#18A85B] transition hover:text-[#073F32]"
            >
              Manage →
            </button>

          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Total"
              value={enquiryStats?.total}
              loading={enquiryLoading}
              icon="💬"
            />

            <StatCard
              title="New"
              value={enquiryStats?.new}
              loading={enquiryLoading}
              icon="✦"
              highlight
            />

            <StatCard
              title="Contacted"
              value={enquiryStats?.contacted}
              loading={enquiryLoading}
              icon="☎"
            />

            <StatCard
              title="Follow Up"
              value={enquiryStats?.followUp}
              loading={enquiryLoading}
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
      navigate("/admin/properties/add")
    }
  />
            <QuickAction
              title="Properties"
              description="View and manage all property listings"
              icon="🏠"
              onClick={() =>
                navigate("/admin/properties")
              }
            />

            <QuickAction
              title="Bookings"
              description="Review and manage customer bookings"
              icon="📋"
              onClick={() =>
                navigate("/admin/bookings")
              }
            />

            <QuickAction
              title="Enquiries"
              description="Manage customer enquiries"
              icon="💬"
              onClick={() =>
                navigate("/admin/enquiries")
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