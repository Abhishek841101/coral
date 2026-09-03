
// import { useEffect, useState } from "react";
// import {
//   Link,
//   useNavigate,
// } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";

// /* =====================================================
//    USER AUTH
// ===================================================== */

// import {
//   loginUser,
//   clearLoginError,
//   selectIsAuthenticated,
//   selectLoginLoading,
//   selectLoginError,
//   selectUser,
// } from "../features/auth/authSlice";

// /* =====================================================
//    ADMIN AUTH
// ===================================================== */

// import {
//   adminLogin,
//   selectAdminAuthenticated,
//   selectAdminLoginLoading,
//   selectAdminLoginError,
// } from "../features/admin/adminSlice";


// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   /* =====================================================
//      USER STATE
//   ===================================================== */

//   const isUserAuthenticated = useSelector(
//     selectIsAuthenticated
//   );

//   const user = useSelector(selectUser);

//   const userLoading = useSelector(
//     selectLoginLoading
//   );

//   const userError = useSelector(
//     selectLoginError
//   );


//   /* =====================================================
//      ADMIN STATE
//   ===================================================== */

//   const isAdminAuthenticated = useSelector(
//     selectAdminAuthenticated
//   );

//   const adminLoading = useSelector(
//     selectAdminLoginLoading
//   );

//   const adminError = useSelector(
//     selectAdminLoginError
//   );


//   /* =====================================================
//      COMBINED STATE
//   ===================================================== */

//   const loading =
//     userLoading || adminLoading;

//   const error =
//     userError || adminError;


//   /* =====================================================
//      FORM
//   ===================================================== */

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });


//   /* =====================================================
//      REDIRECT AFTER LOGIN

//      USER  -> HOME
//      ADMIN -> HOME

//      Navbar / app logic can decide what to show
//      according to role.
//   ===================================================== */

//   useEffect(() => {
//     if (
//       isUserAuthenticated &&
//       user
//     ) {
//       navigate("/", {
//         replace: true,
//       });

//       return;
//     }

//     if (isAdminAuthenticated) {
//       navigate("/", {
//         replace: true,
//       });
//     }
//   }, [
//     isUserAuthenticated,
//     isAdminAuthenticated,
//     user,
//     navigate,
//   ]);


//   /* =====================================================
//      INPUT CHANGE
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

//     if (userError) {
//       dispatch(clearLoginError());
//     }
//   };


//   /* =====================================================
//      LOGIN

//      SAME LOGIN PAGE

//      1. Try USER login
//      2. If user login fails, try ADMIN login

//      Admin login sets:
//        coral_admin_token

//      User login sets:
//        coral_token
//   ===================================================== */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const email =
//       form.email.trim().toLowerCase();

//     const password =
//       form.password;

//     if (!email || !password) {
//       return;
//     }

//     /* Prevent duplicate request */
//     if (loading) {
//       return;
//     }

//     /* =================================================
//        FIRST: USER LOGIN
//     ================================================= */

//     try {
//       await dispatch(
//         loginUser({
//           email,
//           password,
//         })
//       ).unwrap();

//       /*
//         User login successful.

//         authSlice will update:
//           isAuthenticated
//           user

//         useEffect will redirect to "/".
//       */

//       return;

//     } catch (userLoginError) {

//       console.log(
//         "Normal user login failed. Trying admin login..."
//       );
//     }


//     /* =================================================
//        SECOND: ADMIN LOGIN
//     ================================================= */

//     try {
//       await dispatch(
//         adminLogin({
//           email,
//           password,
//         })
//       ).unwrap();

//       /*
//         Admin login successful.

//         adminSlice will update:
//           isAuthenticated

//         Backend sets:
//           coral_admin_token

//         useEffect will redirect to "/".
//       */

//     } catch (adminLoginError) {

//       console.error(
//         "User/Admin login failed:",
//         adminLoginError
//       );
//     }
//   };


//   /* =====================================================
//      RENDER
//   ===================================================== */

//   return (
//     <main className="min-h-screen bg-[#F8F9F7]">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <header className="border-b border-[#E5E7EB] bg-white">

//         <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">

//           <Link
//             to="/"
//             className="flex w-fit items-center gap-2.5"
//           >

//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
//               C
//             </div>

//             <span className="text-xl font-black text-[#073F32]">
//               Coral
//             </span>

//           </Link>

//         </div>

//       </header>


//       {/* =================================================
//           LOGIN
//       ================================================= */}

//       <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-12">

//         <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-xl lg:grid-cols-2">

//           {/* =================================================
//               LEFT SIDE
//           ================================================= */}

//           <div className="hidden bg-[#073F32] p-10 text-white lg:flex lg:flex-col lg:justify-between">

//             <div>

//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
//                 C
//               </div>

//               <h1 className="mt-10 max-w-sm text-4xl font-black leading-tight">
//                 Your next stay starts here.
//               </h1>

//               <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
//                 Find rooms, flats and homes across
//                 Nagpur with Coral.
//               </p>

//             </div>


//             <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">

//               <p className="text-sm font-bold">
//                 Coral stays
//               </p>

//               <p className="mt-1 text-xs leading-5 text-white/55">
//                 Search, explore and book your
//                 preferred property from one place.
//               </p>

//             </div>

//           </div>


//           {/* =================================================
//               RIGHT SIDE
//           ================================================= */}

//           <div className="p-7 sm:p-10">

//             <div className="mx-auto max-w-md">

//               <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#18A85B]">
//                 Welcome back
//               </p>

//               <h2 className="mt-3 text-3xl font-black text-[#073F32]">
//                 Login to Coral
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-gray-500">
//                 Access your bookings, profile and
//                 property activity.
//               </p>


//               {/* =================================================
//                   ERROR
//               ================================================= */}

//               {error && (
//                 <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">

//                   <p className="text-sm font-semibold text-red-600">
//                     {error}
//                   </p>

//                 </div>
//               )}


//               {/* =================================================
//                   FORM
//               ================================================= */}

//               <form
//                 onSubmit={handleSubmit}
//                 className="mt-8"
//               >

//                 {/* EMAIL */}

//                 <div>

//                   <label
//                     htmlFor="email"
//                     className="text-xs font-extrabold text-gray-500"
//                   >
//                     EMAIL ADDRESS
//                   </label>

//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="you@example.com"
//                     autoComplete="email"
//                     required
//                     disabled={loading}
//                     className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10 disabled:bg-gray-100"
//                   />

//                 </div>


//                 {/* PASSWORD */}

//                 <div className="mt-5">

//                   <label
//                     htmlFor="password"
//                     className="text-xs font-extrabold text-gray-500"
//                   >
//                     PASSWORD
//                   </label>

//                   <input
//                     id="password"
//                     type="password"
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     autoComplete="current-password"
//                     required
//                     disabled={loading}
//                     className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none transition focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10 disabled:bg-gray-100"
//                   />

//                 </div>


//                 {/* =================================================
//                     LOGIN BUTTON
//                 ================================================= */}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="mt-7 w-full rounded-full bg-[#18C66A] px-6 py-4 text-sm font-black text-[#073F32] transition hover:bg-[#073F32] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
//                 >

//                   {loading
//                     ? "Signing in..."
//                     : "Login to Coral"}

//                 </button>

//               </form>


//               {/* =================================================
//                   REGISTER
//               ================================================= */}

//               <div className="mt-7 text-center">

//                 <p className="text-sm text-gray-500">

//                   Don't have an account?{" "}

//                   <Link
//                     to="/register"
//                     className="font-extrabold text-[#073F32] hover:text-[#18A85B]"
//                   >
//                     Create account
//                   </Link>

//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>

//     </main>
//   );
// }




import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  loginUser,
  clearLoginError,
  selectIsAuthenticated,
  selectLoginLoading,
  selectLoginError,
  selectUser,
} from "../features/auth/authSlice";

import {
  adminLogin,
  selectAdminAuthenticated,
  selectAdminLoginLoading,
  selectAdminLoginError,
} from "../features/admin/adminSlice";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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

  const isAdminAuthenticated = useSelector(
    selectAdminAuthenticated
  );

  const adminLoading = useSelector(
    selectAdminLoginLoading
  );

  const adminError = useSelector(
    selectAdminLoginError
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] =
    useState("");

  const loading =
    userLoading || adminLoading;

  /* =====================================================
     LOGIN MOUNT
  ===================================================== */

  useEffect(() => {
    console.log(
      "[LOGIN] Login page mounted"
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
      "[LOGIN] User authenticated:",
      isUserAuthenticated
    );

    console.log(
      "[LOGIN] Admin authenticated:",
      isAdminAuthenticated
    );

    return () => {
      console.log(
        "[LOGIN] Login page unmounted"
      );
    };
  }, []);

  /* =====================================================
     REDIRECT AFTER AUTH
  ===================================================== */

  useEffect(() => {
    console.log(
      "[LOGIN REDIRECT CHECK]",
      {
        isUserAuthenticated,
        isAdminAuthenticated,
        user,
      }
    );

    if (isAdminAuthenticated) {
      console.log(
        "[LOGIN] Admin authenticated"
      );

      console.log(
        "[LOGIN] Navigating -> /admin/dashboard"
      );

      navigate(
        "/admin/dashboard",
        { replace: true }
      );

      return;
    }

    if (
      isUserAuthenticated &&
      user
    ) {
      console.log(
        "[LOGIN] User authenticated:",
        user
      );

      if (
        user.role === "admin"
      ) {
        console.log(
          "[LOGIN] User state contains admin role"
        );

        console.log(
          "[LOGIN] Navigating -> /admin/dashboard"
        );

        navigate(
          "/admin/dashboard",
          { replace: true }
        );

        return;
      }

      const redirectTo =
        location.state?.from || "/";

      console.log(
        "[LOGIN] Normal user redirect ->",
        redirectTo
      );

      navigate(
        redirectTo,
        { replace: true }
      );
    }
  }, [
    isUserAuthenticated,
    isAdminAuthenticated,
    user,
    navigate,
    location.state,
  ]);

  /* =====================================================
     ERROR WATCH
  ===================================================== */

  useEffect(() => {
    if (userError) {
      console.error(
        "[LOGIN] User auth error:",
        userError
      );

      setLoginError(userError);
    }
  }, [userError]);

  useEffect(() => {
    if (
      adminError &&
      !userError
    ) {
      console.error(
        "[LOGIN] Admin auth error:",
        adminError
      );

      setLoginError(adminError);
    }
  }, [
    adminError,
    userError,
  ]);

  /* =====================================================
     INPUT
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

    setLoginError("");

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

    const email =
      form.email
        .trim()
        .toLowerCase();

    const password =
      form.password;

    console.log(
      "===================================="
    );

    console.log(
      "[LOGIN] SUBMIT START"
    );

    console.log(
      "[LOGIN] Email:",
      email
    );

    console.log(
      "[LOGIN] Password entered:",
      Boolean(password)
    );

    console.log(
      "[LOGIN] Admin token before login:",
      Boolean(
        localStorage.getItem(
          "coral_admin_token"
        )
      )
    );

    console.log(
      "===================================="
    );

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

    setLoginError("");

    /* ===================================================
       STEP 1: ADMIN LOGIN
    =================================================== */

    console.log(
      "[LOGIN] STEP 1 -> Trying admin login"
    );

    let adminResult;

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

    if (
      adminResult &&
      adminLogin.fulfilled.match(
        adminResult
      )
    ) {
      console.log(
        "===================================="
      );

      console.log(
        "[LOGIN] ADMIN LOGIN SUCCESS"
      );

      console.log(
        "[LOGIN] Admin response:",
        adminResult.payload
      );

      console.log(
        "[LOGIN] Token exists:",
        Boolean(
          adminResult.payload?.token
        )
      );

      console.log(
        "[LOGIN] Saved token exists:",
        Boolean(
          localStorage.getItem(
            "coral_admin_token"
          )
        )
      );

      console.log(
        "[LOGIN] Navigating -> /admin/dashboard"
      );

      console.log(
        "===================================="
      );

      navigate(
        "/admin/dashboard",
        { replace: true }
      );

      return;
    }

    console.log(
      "[LOGIN] Admin login not successful"
    );

    /* ===================================================
       STEP 2: NORMAL USER LOGIN
    =================================================== */

    console.log(
      "[LOGIN] STEP 2 -> Trying normal user login"
    );

    let userResult;

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

    if (
      userResult &&
      loginUser.fulfilled.match(
        userResult
      )
    ) {
      console.log(
        "===================================="
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

      if (
        loggedUser?.role ===
        "admin"
      ) {
        console.log(
          "[LOGIN] Safety fallback: admin role found"
        );

        navigate(
          "/admin/dashboard",
          { replace: true }
        );

        return;
      }

      const redirectTo =
        location.state?.from || "/";

      console.log(
        "[LOGIN] Normal user redirect:",
        redirectTo
      );

      navigate(
        redirectTo,
        { replace: true }
      );

      return;
    }

    /* ===================================================
       LOGIN FAILED
    =================================================== */

    const message =
      userResult?.payload ||
      adminResult?.payload ||
      "Invalid email or password.";

    console.error(
      "===================================="
    );

    console.error(
      "[LOGIN] LOGIN FAILED:",
      message
    );

    console.error(
      "[LOGIN] Admin result:",
      adminResult
    );

    console.error(
      "[LOGIN] User result:",
      userResult
    );

    console.error(
      "===================================="
    );

    setLoginError(message);
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

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

      <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-10 sm:py-12">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-xl lg:grid-cols-2">

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

              {loginError && (
                <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                  <p className="text-sm font-semibold text-red-600">
                    {loginError}
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8"
              >

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