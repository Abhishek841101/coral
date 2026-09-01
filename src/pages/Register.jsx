import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  registerUser,
  clearRegisterError,
  selectIsAuthenticated,
  selectRegisterLoading,
  selectRegisterError,
} from "../features/auth/authSlice";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );

  const loading = useSelector(
    selectRegisterLoading
  );

  const error = useSelector(
    selectRegisterError
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");

  /* =====================================================
     REDIRECT AFTER REGISTER
  ===================================================== */

  useEffect(() => {
    if (!isAuthenticated) return;

    const redirectTo =
      location.state?.from || "/";

    navigate(redirectTo, {
      replace: true,
    });
  }, [
    isAuthenticated,
    navigate,
    location.state,
  ]);

  /* =====================================================
     INPUT CHANGE
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

    if (error) {
      dispatch(clearRegisterError());
    }
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    /* ================= REQUIRED ================= */

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setFormError(
        "Please complete all required fields."
      );
      return;
    }

    /* ================= PASSWORD ================= */

    if (form.password.length < 6) {
      setFormError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setFormError(
        "Passwords do not match."
      );
      return;
    }

    /* ================= EMAIL ================= */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
      setFormError(
        "Please enter a valid email address."
      );
      return;
    }

    /* ================= PHONE ================= */

    const phoneDigits =
      form.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10) {
      setFormError(
        "Please enter a valid mobile number."
      );
      return;
    }

    /* =================================================
       REAL BACKEND PAYLOAD

       Backend expects:

       {
         name,
         email,
         phone,
         password
       }
    ================================================= */

    const result = await dispatch(
      registerUser({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        email: form.email
          .trim()
          .toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
      })
    );

    /* =================================================
       SUCCESS
    ================================================= */

    if (
      registerUser.fulfilled.match(result)
    ) {
      const redirectTo =
        location.state?.from || "/";

      navigate(redirectTo, {
        replace: true,
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">

          <Link
            to="/"
            className="flex w-fit items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
              C
            </div>

            <span className="text-xl font-black text-[#073F32]">
              Coral
            </span>
          </Link>

        </div>
      </header>

      {/* =================================================
          REGISTER
      ================================================= */}

      <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-10">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-xl lg:grid-cols-2">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="hidden bg-[#073F32] p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
                C
              </div>

              <h1 className="mt-10 max-w-sm text-4xl font-black leading-tight">
                Find a place that feels like home.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                Create your Coral account and explore
                rooms, flats and homes across Nagpur.
              </p>

            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">

              <p className="text-sm font-bold">
                One account. Everything Coral.
              </p>

              <p className="mt-1 text-xs leading-5 text-white/55">
                Manage your bookings, enquiries and
                profile from one place.
              </p>

            </div>

          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="p-7 sm:p-10">

            <div className="mx-auto max-w-md">

              <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#18A85B]">
                Create account
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#073F32]">
                Join Coral
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Create your account to book and manage
                your stays.
              </p>

              {/* =================================================
                  ERROR
              ================================================= */}

              {(formError || error) && (
                <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">

                  <p className="text-sm font-semibold text-red-600">
                    {formError || error}
                  </p>

                </div>
              )}

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="mt-7"
              >

                {/* ================= NAME ================= */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>

                    <label
                      htmlFor="firstName"
                      className="text-xs font-extrabold text-gray-500"
                    >
                      FIRST NAME *
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      autoComplete="given-name"
                      required
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A]"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="lastName"
                      className="text-xs font-extrabold text-gray-500"
                    >
                      LAST NAME *
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      autoComplete="family-name"
                      required
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A]"
                    />

                  </div>

                </div>

                {/* ================= EMAIL ================= */}

                <div className="mt-5">

                  <label
                    htmlFor="email"
                    className="text-xs font-extrabold text-gray-500"
                  >
                    EMAIL ADDRESS *
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A]"
                  />

                </div>

                {/* ================= PHONE ================= */}

                <div className="mt-5">

                  <label
                    htmlFor="phone"
                    className="text-xs font-extrabold text-gray-500"
                  >
                    MOBILE NUMBER *
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A]"
                  />

                </div>

                {/* ================= PASSWORD ================= */}

                <div className="mt-5">

                  <label
                    htmlFor="password"
                    className="text-xs font-extrabold text-gray-500"
                  >
                    PASSWORD *
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A]"
                  />

                </div>

                {/* ================= CONFIRM ================= */}

                <div className="mt-5">

                  <label
                    htmlFor="confirmPassword"
                    className="text-xs font-extrabold text-gray-500"
                  >
                    CONFIRM PASSWORD *
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A]"
                  />

                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 w-full rounded-full bg-[#18C66A] px-6 py-4 text-sm font-black text-[#073F32] transition hover:bg-[#073F32] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Creating account..."
                    : "Create Coral account"}
                </button>

              </form>

              {/* =================================================
                  LOGIN
              ================================================= */}

              <div className="mt-7 text-center">

                <p className="text-sm text-gray-500">

                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="font-extrabold text-[#073F32] hover:text-[#18A85B]"
                  >
                    Sign in
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}