import { useEffect, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

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

/* =====================================================
   LOGIN PAGE
===================================================== */

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  /* =====================================================
     USER STATE
  ===================================================== */

  const isUserAuthenticated = useSelector(
    selectIsAuthenticated
  );

  const user = useSelector(
    selectUser
  );

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
     FORM
  ===================================================== */

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  /* =====================================================
     LOCAL ERROR

     IMPORTANT:
     Admin login failure is NOT shown immediately.

     Because every normal user first goes through
     admin login attempt.

     Only if BOTH admin + user login fail,
     we show error.
  ===================================================== */

  const [loginError, setLoginError] =
    useState("");

  /* =====================================================
     LOADING
  ===================================================== */

  const loading =
    userLoading ||
    adminLoading;

  /* =====================================================
     DEBUG - COMPONENT MOUNT
  ===================================================== */

  useEffect(() => {
    console.log(
      "=================================================="
    );

    console.log(
      "[LOGIN] Login page mounted"
    );

    console.log(
      "[LOGIN] Current URL:",
      window.location.href
    );

    console.log(
      "[LOGIN] Current path:",
      window.location.pathname
    );

    console.log(
      "[LOGIN] Admin token exists:",
      Boolean(
        localStorage.getItem(
          "coral_admin_token"
        )
      )
    );

    console.log(
      "[LOGIN] User token exists:",
      Boolean(
        localStorage.getItem(
          "coral_token"
        )
      )
    );

    console.log(
      "[LOGIN] User authenticated:",
      isUserAuthenticated
    );

    console.log(
      "[LOGIN] Admin authenticated:",
      isAdminAuthenticated
    );

    console.log(
      "=================================================="
    );

    return () => {
      console.log(
        "[LOGIN] Login page unmounted"
      );
    };
  }, []);

  /* =====================================================
     REDIRECT AFTER AUTH

     ADMIN -> HOME
     USER  -> HOME
  ===================================================== */

  useEffect(() => {
    console.log(
      "=================================================="
    );

    console.log(
      "[LOGIN REDIRECT CHECK]"
    );

    console.log(
      "[LOGIN REDIRECT CHECK] User authenticated:",
      isUserAuthenticated
    );

    console.log(
      "[LOGIN REDIRECT CHECK] Admin authenticated:",
      isAdminAuthenticated
    );

    console.log(
      "[LOGIN REDIRECT CHECK] User:",
      user
    );

    /* ===================================================
       ADMIN -> HOME
    =================================================== */

    if (
      isAdminAuthenticated
    ) {
      console.log(
        "[LOGIN] ADMIN AUTHENTICATED"
      );

      console.log(
        "[LOGIN] Admin role detected"
      );

      console.log(
        "[LOGIN] Redirecting ADMIN -> HOME /"
      );

      navigate(
        "/",
        {
          replace: true,
        }
      );

      console.log(
        "[LOGIN] Admin successfully redirected to HOME"
      );

      console.log(
        "=================================================="
      );

      return;
    }

    /* ===================================================
       USER -> HOME
    =================================================== */

    if (
      isUserAuthenticated &&
      user
    ) {
      console.log(
        "[LOGIN] USER AUTHENTICATED"
      );

      console.log(
        "[LOGIN] User:",
        user
      );

      console.log(
        "[LOGIN] User role:",
        user.role
      );

      console.log(
        "[LOGIN] Redirecting USER -> HOME /"
      );

      navigate(
        "/",
        {
          replace: true,
        }
      );

      console.log(
        "[LOGIN] User successfully redirected to HOME"
      );

      console.log(
        "=================================================="
      );

      return;
    }

    console.log(
      "[LOGIN REDIRECT CHECK] No authenticated account yet"
    );

    console.log(
      "=================================================="
    );
  }, [
    isUserAuthenticated,
    isAdminAuthenticated,
    user,
    navigate,
  ]);

  /* =====================================================
     ERROR DEBUG ONLY

     DO NOT SHOW ADMIN ERROR HERE.

     Admin error is expected for normal users.
  ===================================================== */

  useEffect(() => {
    if (adminError) {
      console.log(
        "[LOGIN] Admin login attempt failed."
      );

      console.log(
        "[LOGIN] This is NORMAL for a regular user."
      );

      console.log(
        "[LOGIN] Admin error will NOT be shown to user:"
      );

      console.log(
        adminError
      );
    }
  }, [adminError]);

  /* =====================================================
     USER ERROR DEBUG

     We don't immediately show it because admin login
     may have already failed.

     Final error is handled in handleSubmit.
  ===================================================== */

  useEffect(() => {
    if (userError) {
      console.log(
        "[LOGIN] Normal user login error:"
      );

      console.log(
        userError
      );
    }
  }, [userError]);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    console.log(
      "[LOGIN] Input changed:",
      name
    );

    setForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

    /* Clear UI error */

    setLoginError("");

    /* Clear Redux user error */

    if (userError) {
      dispatch(
        clearLoginError()
      );
    }
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "=================================================="
    );

    console.log(
      "[LOGIN] SUBMIT START"
    );

    const email =
      form.email
        .trim()
        .toLowerCase();

    const password =
      form.password;

    console.log(
      "[LOGIN] Email:",
      email
    );

    console.log(
      "[LOGIN] Password present:",
      Boolean(password)
    );

    console.log(
      "[LOGIN] Existing admin token:",
      Boolean(
        localStorage.getItem(
          "coral_admin_token"
        )
      )
    );

    console.log(
      "[LOGIN] Existing user token:",
      Boolean(
        localStorage.getItem(
          "coral_token"
        )
      )
    );

    console.log(
      "=================================================="
    );

    /* =================================================
       VALIDATION
    ================================================= */

    if (
      !email ||
      !password
    ) {
      console.error(
        "[LOGIN] Email/password missing"
      );

      setLoginError(
        "Email and password are required."
      );

      return;
    }

    /* =================================================
       PREVENT DUPLICATE REQUEST
    ================================================= */

    if (loading) {
      console.warn(
        "[LOGIN] Login already in progress"
      );

      return;
    }

    /* =================================================
       CLEAR PREVIOUS ERROR
    ================================================= */

    setLoginError("");

    if (userError) {
      dispatch(
        clearLoginError()
      );
    }

    /* =================================================
       STEP 1
       TRY ADMIN LOGIN
    ================================================= */

    console.log(
      "=================================================="
    );

    console.log(
      "[LOGIN] STEP 1"
    );

    console.log(
      "[LOGIN] Trying ADMIN login..."
    );

    console.log(
      "[LOGIN] IMPORTANT:"
    );

    console.log(
      "[LOGIN] Admin failure will NOT be shown to user."
    );

    console.log(
      "=================================================="
    );

    let adminResult = null;

    try {
      adminResult =
        await dispatch(
          adminLogin({
            email,
            password,
          })
        );

      console.log(
        "[LOGIN] Admin result:",
        adminResult
      );

    } catch (error) {

      console.error(
        "[LOGIN] Admin dispatch crashed:",
        error
      );
    }

    /* =================================================
       ADMIN SUCCESS
    ================================================= */

    if (
      adminResult &&
      adminLogin.fulfilled.match(
        adminResult
      )
    ) {
      console.log(
        "=================================================="
      );

      console.log(
        "[LOGIN] ADMIN LOGIN SUCCESS"
      );

      console.log(
        "[LOGIN] Admin response:",
        adminResult.payload
      );

      console.log(
        "[LOGIN] Admin token received:",
        Boolean(
          adminResult.payload?.token
        )
      );

      console.log(
        "[LOGIN] Saved admin token:",
        Boolean(
          localStorage.getItem(
            "coral_admin_token"
          )
        )
      );

      console.log(
        "[LOGIN] Admin authentication complete"
      );

      console.log(
        "[LOGIN] Redirecting ADMIN -> HOME /"
      );

      console.log(
        "=================================================="
      );

      navigate(
        "/",
        {
          replace: true,
        }
      );

      return;
    }

    /* =================================================
       ADMIN FAILED

       IMPORTANT:
       DO NOT SET loginError.

       This is expected for normal users.
    ================================================= */

    console.log(
      "=================================================="
    );

    console.log(
      "[LOGIN] ADMIN LOGIN FAILED"
    );

    console.log(
      "[LOGIN] This does NOT mean overall login failed."
    );

    console.log(
      "[LOGIN] Trying normal USER login now..."
    );

    console.log(
      "[LOGIN] Admin error hidden from UI."
    );

    console.log(
      "=================================================="
    );

    /* =================================================
       STEP 2
       TRY NORMAL USER LOGIN
    ================================================= */

    let userResult = null;

    try {
      userResult =
        await dispatch(
          loginUser({
            email,
            password,
          })
        );

      console.log(
        "[LOGIN] User result:",
        userResult
      );

    } catch (error) {

      console.error(
        "[LOGIN] User dispatch crashed:",
        error
      );
    }

    /* =================================================
       USER SUCCESS
    ================================================= */

    if (
      userResult &&
      loginUser.fulfilled.match(
        userResult
      )
    ) {
      console.log(
        "=================================================="
      );

      console.log(
        "[LOGIN] USER LOGIN SUCCESS"
      );

      console.log(
        "[LOGIN] User response:",
        userResult.payload
      );

      const loggedUser =
        userResult.payload?.user;

      console.log(
        "[LOGIN] Logged user:",
        loggedUser
      );

      console.log(
        "[LOGIN] Logged user role:",
        loggedUser?.role
      );

      /* ===============================================
         IMPORTANT

         Even if role accidentally comes as admin,
         we still go HOME.

         Admin authentication is handled separately
         through adminLogin.
      =============================================== */

      console.log(
        "[LOGIN] User authentication successful"
      );

      console.log(
        "[LOGIN] Redirecting USER -> HOME /"
      );

      console.log(
        "=================================================="
      );

      navigate(
        "/",
        {
          replace: true,
        }
      );

      return;
    }

    /* =================================================
       BOTH LOGIN METHODS FAILED

       ONLY NOW SHOW ERROR
    ================================================= */

    console.log(
      "=================================================="
    );

    console.error(
      "[LOGIN] BOTH LOGIN METHODS FAILED"
    );

    console.error(
      "[LOGIN] Admin result:",
      adminResult
    );

    console.error(
      "[LOGIN] User result:",
      userResult
    );

    console.log(
      "=================================================="
    );

    /* =================================================
       GET FINAL USER-FACING ERROR

       Prefer normal user error.

       Never show:
       "Admin authentication required"
       "Invalid admin credentials"
       etc.
    ================================================= */

    let finalMessage =
      "Invalid email or password.";

    if (
      userResult &&
      loginUser.rejected.match(
        userResult
      )
    ) {
      if (
        typeof userResult.payload ===
        "string"
      ) {
        finalMessage =
          userResult.payload;
      }
    }

    /* =================================================
       CLEAN ADMIN ERROR MESSAGES

       These should NEVER be displayed for a normal
       user when admin login was simply unsuccessful.
    ================================================= */

    const adminErrorText =
      typeof adminResult?.payload ===
      "string"
        ? adminResult.payload
        : "";

    const isAdminOnlyError =
      adminErrorText.includes(
        "Admin authentication"
      ) ||
      adminErrorText.includes(
        "Invalid admin"
      ) ||
      adminErrorText.includes(
        "Admin login"
      );

    if (
      isAdminOnlyError
    ) {
      console.log(
        "[LOGIN] Ignoring admin-only error."
      );

      finalMessage =
        "Invalid email or password.";
    }

    console.error(
      "[LOGIN] FINAL USER ERROR:",
      finalMessage
    );

    setLoginError(
      finalMessage
    );
  };

  /* =====================================================
     UI
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
          LOGIN SECTION
      ================================================= */}

      <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-10 sm:py-12">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-xl lg:grid-cols-2">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="hidden bg-[#073F32] p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
                C
              </div>

              <p className="mt-10 text-xs font-extrabold uppercase tracking-[0.2em] text-[#18C66A]">
                Welcome to Coral
              </p>

              <h1 className="mt-4 max-w-sm text-4xl font-black leading-tight">
                Your next stay starts here.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                Find rooms, flats, apartments and homes across Nagpur with Coral.
              </p>

            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] text-sm font-black text-[#073F32]">
                  ✓
                </div>

                <div>

                  <p className="text-sm font-bold">
                    Secure access
                  </p>

                  <p className="mt-1 text-xs text-white/50">
                    Users and administrators can use the same login.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="p-7 sm:p-10 lg:p-12">

            <div className="mx-auto max-w-md">

              <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#18A85B]">
                Welcome back
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#073F32] sm:text-4xl">
                Login to Coral
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Login with your Coral user or admin credentials.
              </p>

              {/* =================================================
                  ERROR

                  IMPORTANT:
                  This only shows when BOTH login attempts fail.
              ================================================= */}

              {loginError && (
                <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">

                  <p className="text-sm font-semibold text-red-600">
                    {loginError}
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
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition placeholder:text-gray-300 focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
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
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition placeholder:text-gray-300 focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                  />

                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !form.email.trim() ||
                    !form.password
                  }
                  className="mt-7 w-full rounded-full bg-[#18C66A] px-6 py-4 text-sm font-black text-[#073F32] transition hover:bg-[#073F32] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading
                    ? "Signing in..."
                    : "Login to Coral"}

                </button>

              </form>

              {/* REGISTER */}

              <div className="mt-7 text-center">

                <p className="text-sm text-gray-500">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="font-extrabold text-[#073F32] transition hover:text-[#18A85B]"
                  >
                    Create account
                  </Link>

                </p>

              </div>

              {/* INFO */}

              <div className="mt-8 rounded-2xl bg-[#F8F9F7] px-4 py-3">

                <p className="text-center text-[11px] font-semibold leading-5 text-gray-400">
                  Administrators can use their Coral admin credentials on this same login.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}