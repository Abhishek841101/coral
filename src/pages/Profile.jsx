import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  selectUser,
} from "../features/auth/authSlice";

export default function Profile() {
  const user = useSelector(selectUser);

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <h1 className="text-2xl font-black text-[#073F32]">
            Please login first
          </h1>

          <Link
            to="/login"
            className="mt-5 inline-block rounded-full bg-[#18C66A] px-6 py-3 font-bold text-[#073F32]"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  const firstLetter =
    user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      {/* HEADER */}

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
            to="/"
            className="text-sm font-bold text-[#073F32] hover:text-[#18A85B]"
          >
            Back to home
          </Link>

        </div>
      </header>

      {/* CONTENT */}

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* SIDEBAR */}

          <aside className="rounded-[28px] bg-white p-6 shadow-sm">

            <div className="flex flex-col items-center text-center">

              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#18C66A] text-3xl font-black text-[#073F32]">

                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  firstLetter
                )}

              </div>

              <h2 className="mt-4 text-xl font-black text-[#073F32]">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>

              <span className="mt-3 rounded-full bg-[#E9F8F0] px-4 py-1.5 text-xs font-extrabold capitalize text-[#18A85B]">
                {user.role}
              </span>

            </div>

            <div className="my-6 border-t border-[#E5E7EB]" />

            <nav className="space-y-1">

              <Link
                to="/profile"
                className="block rounded-xl bg-[#E9F8F0] px-4 py-3 text-sm font-bold text-[#073F32]"
              >
                My Profile
              </Link>

              <Link
                to="/dashboard"
                className="block rounded-xl px-4 py-3 text-sm font-bold text-gray-600 transition hover:bg-[#F8F9F7] hover:text-[#073F32]"
              >
                My Dashboard
              </Link>

              <Link
                to="/properties"
                className="block rounded-xl px-4 py-3 text-sm font-bold text-gray-600 transition hover:bg-[#F8F9F7] hover:text-[#073F32]"
              >
                Explore Properties
              </Link>

            </nav>

          </aside>

          {/* PROFILE */}

          <div className="space-y-6">

            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#18A85B]">
                Account
              </p>

              <h1 className="mt-2 text-3xl font-black text-[#073F32]">
                My Profile
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Manage your Coral account information.
              </p>
            </div>

            {/* PERSONAL INFO */}

            <div className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-lg font-black text-[#073F32]">
                Personal information
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <Info
                  label="Full name"
                  value={user.name}
                />

                <Info
                  label="Email address"
                  value={user.email}
                />

                <Info
                  label="Mobile number"
                  value={user.phone || "Not added"}
                />

                <Info
                  label="Account type"
                  value={user.role}
                  capitalize
                />

              </div>

            </div>

            {/* ACCOUNT STATUS */}

            <div className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-lg font-black text-[#073F32]">
                Account status
              </h2>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F8F9F7] px-5 py-4">

                <div>
                  <p className="text-sm font-bold text-[#073F32]">
                    Account
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Your Coral account is currently active.
                  </p>
                </div>

                <span className="rounded-full bg-[#E9F8F0] px-4 py-2 text-xs font-extrabold text-[#18A85B]">
                  {user.isActive === false
                    ? "Inactive"
                    : "Active"}
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =====================================================
   INFO COMPONENT
===================================================== */

function Info({
  label,
  value,
  capitalize = false,
}) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] p-4">

      <p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p
        className={`mt-2 text-sm font-bold text-[#073F32] ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value || "Not available"}
      </p>

    </div>
  );
}