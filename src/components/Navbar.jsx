import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  logoutUser,
  selectIsAuthenticated,
  selectUser,
  selectLogoutLoading,
} from "../features/auth/authSlice";

const navItems = [
  {
    label: "Properties",
    href: "#properties",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* =====================================================
     AUTH STATE
  ===================================================== */

  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );

  const user = useSelector(selectUser);

  const logoutLoading = useSelector(
    selectLogoutLoading
  );

  /* =====================================================
     MENU
  ===================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = () => {
    closeMenu();

    navigate("/login");
  };

  /* =====================================================
     GET STARTED
  ===================================================== */

  const handleGetStarted = () => {
    closeMenu();

    if (isAuthenticated) {
      navigate("/profile");
      return;
    }

    navigate("/login");
  };

  /* =====================================================
     PROFILE
  ===================================================== */

  const handleProfile = () => {
    setProfileOpen(false);
    closeMenu();

    navigate("/profile");
  };

  /* =====================================================
     DASHBOARD
  ===================================================== */

  const handleDashboard = () => {
    setProfileOpen(false);
    closeMenu();

    if (user?.role === "admin") {
      navigate("/admin");
      return;
    }

    navigate("/dashboard");
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    const result = await dispatch(
      logoutUser()
    );

    if (
      logoutUser.fulfilled.match(result)
    ) {
      setProfileOpen(false);
      closeMenu();

      navigate("/", {
        replace: true,
      });
    }
  };

  return (
    <header className="absolute left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">

      <nav className="mx-auto max-w-7xl rounded-[24px] bg-white/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:px-6 lg:rounded-full">

        {/* =================================================
            MAIN NAV
        ================================================= */}

        <div className="flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] text-base font-extrabold text-[#073F32]">
              C
            </div>

            <span className="text-xl font-extrabold tracking-tight text-[#073F32]">
              Coral
            </span>
          </button>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <div className="hidden items-center gap-7 lg:flex">

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-2 text-sm font-bold text-[#18C66A] transition hover:text-[#18A85B]"
              >
                {item.label}

                <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#18C66A]" />
              </a>
            ))}

          </div>

          {/* =================================================
              DESKTOP RIGHT
          ================================================= */}

          <div className="hidden items-center gap-2 lg:flex">

            {/* ================= CURRENCY ================= */}

            <button
              type="button"
              className="rounded-full px-4 py-2.5 text-sm font-bold text-[#10254A] transition hover:bg-[#E9F8F0]"
            >
              INR ₹
            </button>

            {/* =================================================
                LOGGED OUT
            ================================================= */}

            {!isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="rounded-full px-4 py-2.5 text-sm font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
                >
                  Sign in
                </button>

                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="rounded-full bg-[#073F32] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
                >
                  Get Started
                </button>
              </>
            )}

            {/* =================================================
                LOGGED IN
            ================================================= */}

            {isAuthenticated && (
              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen(
                      (previous) =>
                        !previous
                    )
                  }
                  className="flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white py-1.5 pl-2 pr-4 transition hover:bg-[#E9F8F0]"
                >

                  {/* AVATAR */}

                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#18C66A] text-sm font-black text-[#073F32]">

                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"
                    )}

                  </div>

                  {/* NAME */}

                  <div className="max-w-[130px] text-left">

                    <p className="truncate text-sm font-extrabold text-[#073F32]">
                      {user?.name ||
                        "User"}
                    </p>

                    <p className="text-[10px] font-semibold capitalize text-gray-400">
                      {user?.role ||
                        "user"}
                    </p>

                  </div>

                  <span className="text-xs text-gray-400">
                    ▼
                  </span>

                </button>

                {/* ================= DROPDOWN ================= */}

                {profileOpen && (
                  <div className="absolute right-0 top-[52px] w-56 overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white p-2 shadow-xl">

                    <button
                      type="button"
                      onClick={handleProfile}
                      className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
                    >
                      My Profile
                    </button>

                    <button
                      type="button"
                      onClick={handleDashboard}
                      className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
                    >
                      {user?.role === "admin"
                        ? "Admin Dashboard"
                        : "My Dashboard"}
                    </button>

                    <div className="my-1 border-t border-[#E5E7EB]" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {logoutLoading
                        ? "Logging out..."
                        : "Logout"}
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (previous) =>
                  !previous
              )
            }
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9F8F0] text-[#073F32] transition hover:bg-[#18C66A] lg:hidden"
          >
            {menuOpen ? (
              <span className="text-2xl leading-none">
                ×
              </span>
            ) : (
              <span className="text-lg leading-none">
                ☰
              </span>
            )}
          </button>

        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && (
          <div className="mt-4 border-t border-[#E5E7EB] pt-4 lg:hidden">

            {/* ================= LINKS ================= */}

            <div className="flex flex-col gap-1">

              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3.5 text-sm font-bold text-[#10254A] transition hover:bg-[#F8F9F7] hover:text-[#073F32]"
                >
                  {item.label}
                </a>
              ))}

            </div>

            {/* =================================================
                MOBILE LOGGED OUT
            ================================================= */}

            {!isAuthenticated && (
              <div className="mt-3 grid grid-cols-2 gap-2">

                <button
                  type="button"
                  onClick={handleLogin}
                  className="rounded-full border border-[#E5E7EB] py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
                >
                  Sign in
                </button>

                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="rounded-full bg-[#073F32] py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
                >
                  Get Started
                </button>

              </div>
            )}

            {/* =================================================
                MOBILE LOGGED IN
            ================================================= */}

            {isAuthenticated && (
              <div className="mt-3 rounded-[22px] bg-[#F8F9F7] p-3">

                {/* USER */}

                <div className="flex items-center gap-3 px-2 py-2">

                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#18C66A] font-black text-[#073F32]">

                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"
                    )}

                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-extrabold text-[#073F32]">
                      {user?.name ||
                        "User"}
                    </p>

                    <p className="truncate text-xs text-gray-400">
                      {user?.email}
                    </p>

                  </div>

                </div>

                {/* PROFILE */}

                <button
                  type="button"
                  onClick={handleProfile}
                  className="mt-2 w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-[#073F32] hover:bg-white"
                >
                  My Profile
                </button>

                {/* DASHBOARD */}

                <button
                  type="button"
                  onClick={handleDashboard}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-[#073F32] hover:bg-white"
                >
                  {user?.role === "admin"
                    ? "Admin Dashboard"
                    : "My Dashboard"}
                </button>

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-red-500 hover:bg-red-50 disabled:opacity-50"
                >
                  {logoutLoading
                    ? "Logging out..."
                    : "Logout"}
                </button>

              </div>
            )}

            {/* CURRENCY */}

            <button
              type="button"
              className="mt-3 w-full rounded-full bg-[#F8F9F7] py-3 text-sm font-bold text-[#10254A]"
            >
              INR ₹
            </button>

          </div>
        )}

      </nav>
    </header>
  );
}