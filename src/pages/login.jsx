
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

/* =====================================================
   USER AUTH
===================================================== */

import {
  loginUser,
  clearLoginError,
  selectIsAuthenticated,
  selectLoginLoading,
  selectLoginError,
  selectUser,
} from "../features/auth/authSlice";

/* =====================================================
   ADMIN AUTH
===================================================== */

import {
  adminLogin,
  selectAdminAuthenticated,
  selectAdminLoginLoading,
  selectAdminLoginError,
} from "../features/admin/adminSlice";


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* =====================================================
     USER STATE
  ===================================================== */

  const isUserAuthenticated = useSelector(
    selectIsAuthenticated
  );

  const user = useSelector(selectUser);

  const userLoading = useSelector(
    selectLoginLoading
  );

  const userError = useSelector(
    selectLoginError
  );


  /* =====================================================
     ADMIN STATE
  ===================================================== */

  const isAdminAuthenticated = useSelector(
    selectAdminAuthenticated
  );

  const adminLoading = useSelector(
    selectAdminLoginLoading
  );

  const adminError = useSelector(
    selectAdminLoginError
  );


  /* =====================================================
     COMBINED STATE
  ===================================================== */

  const loading =
    userLoading || adminLoading;

  const error =
    userError || adminError;


  /* =====================================================
     FORM
  ===================================================== */

  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  /* =====================================================
     REDIRECT AFTER LOGIN

     USER  -> HOME
     ADMIN -> HOME

     Navbar / app logic can decide what to show
     according to role.
  ===================================================== */

  useEffect(() => {
    if (
      isUserAuthenticated &&
      user
    ) {
      navigate("/", {
        replace: true,
      });

      return;
    }

    if (isAdminAuthenticated) {
      navigate("/", {
        replace: true,
      });
    }
  }, [
    isUserAuthenticated,
    isAdminAuthenticated,
    user,
    navigate,
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

    if (userError) {
      dispatch(clearLoginError());
    }
  };


  /* =====================================================
     LOGIN

     SAME LOGIN PAGE

     1. Try USER login
     2. If user login fails, try ADMIN login

     Admin login sets:
       coral_admin_token

     User login sets:
       coral_token
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email =
      form.email.trim().toLowerCase();

    const password =
      form.password;

    if (!email || !password) {
      return;
    }

    /* Prevent duplicate request */
    if (loading) {
      return;
    }

    /* =================================================
       FIRST: USER LOGIN
    ================================================= */

    try {
      await dispatch(
        loginUser({
          email,
          password,
        })
      ).unwrap();

      /*
        User login successful.

        authSlice will update:
          isAuthenticated
          user

        useEffect will redirect to "/".
      */

      return;

    } catch (userLoginError) {

      console.log(
        "Normal user login failed. Trying admin login..."
      );
    }


    /* =================================================
       SECOND: ADMIN LOGIN
    ================================================= */

    try {
      await dispatch(
        adminLogin({
          email,
          password,
        })
      ).unwrap();

      /*
        Admin login successful.

        adminSlice will update:
          isAuthenticated

        Backend sets:
          coral_admin_token

        useEffect will redirect to "/".
      */

    } catch (adminLoginError) {

      console.error(
        "User/Admin login failed:",
        adminLoginError
      );
    }
  };


  /* =====================================================
     RENDER
  ===================================================== */

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
          LOGIN
      ================================================= */}

      <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-12">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-xl lg:grid-cols-2">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="hidden bg-[#073F32] p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
                C
              </div>

              <h1 className="mt-10 max-w-sm text-4xl font-black leading-tight">
                Your next stay starts here.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                Find rooms, flats and homes across
                Nagpur with Coral.
              </p>

            </div>


            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">

              <p className="text-sm font-bold">
                Coral stays
              </p>

              <p className="mt-1 text-xs leading-5 text-white/55">
                Search, explore and book your
                preferred property from one place.
              </p>

            </div>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="p-7 sm:p-10">

            <div className="mx-auto max-w-md">

              <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#18A85B]">
                Welcome back
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#073F32]">
                Login to Coral
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Access your bookings, profile and
                property activity.
              </p>


              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">

                  <p className="text-sm font-semibold text-red-600">
                    {error}
                  </p>

                </div>
              )}


              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="mt-8"
              >

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="text-xs font-extrabold text-gray-500"
                  >
                    EMAIL ADDRESS
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
                    disabled={loading}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10 disabled:bg-gray-100"
                  />

                </div>


                {/* PASSWORD */}

                <div className="mt-5">

                  <label
                    htmlFor="password"
                    className="text-xs font-extrabold text-gray-500"
                  >
                    PASSWORD
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10 disabled:bg-gray-100"
                  />

                </div>


                {/* =================================================
                    LOGIN BUTTON
                ================================================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 w-full rounded-full bg-[#18C66A] px-6 py-4 text-sm font-black text-[#073F32] transition hover:bg-[#073F32] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading
                    ? "Signing in..."
                    : "Login to Coral"}

                </button>

              </form>


              {/* =================================================
                  REGISTER
              ================================================= */}

              <div className="mt-7 text-center">

                <p className="text-sm text-gray-500">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="font-extrabold text-[#073F32] hover:text-[#18A85B]"
                  >
                    Create account
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

