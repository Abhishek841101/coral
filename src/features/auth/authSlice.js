import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api";

/* =====================================================
   REGISTER USER
   POST /api/auth/register
===================================================== */

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message ||
            "Registration failed."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message ||
          "Unable to connect to server."
      );
    }
  }
);


/* =====================================================
   LOGIN USER / ADMIN
   POST /api/auth/login
===================================================== */

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email:
              email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message ||
            "Login failed."
        );
      }

      if (!data.user) {
        return rejectWithValue(
          "Login successful, but user data was not returned."
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message ||
          "Unable to connect to server."
      );
    }
  }
);


/* =====================================================
   GET CURRENT USER
   GET /api/auth/me
===================================================== */

export const getCurrentUser =
  createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data.message ||
              "User session not found."
          );
        }

        if (!data.user) {
          return rejectWithValue(
            "User session not found."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error.message ||
            "Unable to connect to server."
        );
      }
    }
  );


/* =====================================================
   LOGOUT USER
   POST /api/auth/logout
===================================================== */

export const logoutUser =
  createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/auth/logout`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data.message ||
              "Logout failed."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error.message ||
            "Unable to connect to server."
        );
      }
    }
  );


/* =====================================================
   INITIAL STATE
===================================================== */

const initialState = {
  user: null,

  isAuthenticated: false,

  loading: false,

  loginLoading: false,

  registerLoading: false,

  logoutLoading: false,

  sessionLoading: true,

  error: null,

  loginError: null,

  registerError: null,

  logoutError: null,
};


/* =====================================================
   SLICE
===================================================== */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    /* =================================================
       CLEAR GENERAL ERROR
    ================================================= */

    clearAuthError: (state) => {
      state.error = null;
    },


    /* =================================================
       CLEAR LOGIN ERROR
    ================================================= */

    clearLoginError: (state) => {
      state.loginError = null;
    },


    /* =================================================
       CLEAR REGISTER ERROR
    ================================================= */

    clearRegisterError: (state) => {
      state.registerError = null;
    },


    /* =================================================
       CLEAR LOGOUT ERROR
    ================================================= */

    clearLogoutError: (state) => {
      state.logoutError = null;
    },


    /* =================================================
       CLEAR USER
    ================================================= */

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },


  /* ===================================================
     ASYNC ACTIONS
  =================================================== */

  extraReducers: (builder) => {

    /* =================================================
       REGISTER
    ================================================= */

    builder

      .addCase(
        registerUser.pending,
        (state) => {
          state.registerLoading = true;
          state.registerError = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.registerLoading = false;

          state.registerError = null;

          state.user =
            action.payload?.user ||
            null;

          state.isAuthenticated =
            Boolean(
              action.payload?.user
            );
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.registerLoading = false;

          state.registerError =
            action.payload ||
            "Registration failed.";
        }
      );


    /* =================================================
       LOGIN
    ================================================= */

    builder

      .addCase(
        loginUser.pending,
        (state) => {
          state.loginLoading = true;

          state.loginError = null;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loginLoading = false;

          state.loginError = null;

          state.user =
            action.payload?.user ||
            null;

          state.isAuthenticated =
            Boolean(
              action.payload?.user
            );
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loginLoading = false;

          state.loginError =
            action.payload ||
            "Login failed.";

          /*
            Failed login par purana user
            state mein nahi rehna chahiye.
          */

          state.user = null;

          state.isAuthenticated = false;
        }
      );


    /* =================================================
       CURRENT USER / SESSION
    ================================================= */

    builder

      .addCase(
        getCurrentUser.pending,
        (state) => {
          state.sessionLoading = true;
        }
      )

      .addCase(
        getCurrentUser.fulfilled,
        (state, action) => {
          state.sessionLoading = false;

          state.user =
            action.payload?.user ||
            null;

          state.isAuthenticated =
            Boolean(
              action.payload?.user
            );
        }
      )

      .addCase(
        getCurrentUser.rejected,
        (state) => {
          state.sessionLoading = false;

          state.user = null;

          state.isAuthenticated = false;
        }
      );


    /* =================================================
       LOGOUT
    ================================================= */

    builder

      .addCase(
        logoutUser.pending,
        (state) => {
          state.logoutLoading = true;

          state.logoutError = null;
        }
      )

      .addCase(
        logoutUser.fulfilled,
        (state) => {
          state.logoutLoading = false;

          state.logoutError = null;

          state.user = null;

          state.isAuthenticated = false;
        }
      )

      .addCase(
        logoutUser.rejected,
        (state, action) => {
          state.logoutLoading = false;

          state.logoutError =
            action.payload ||
            "Logout failed.";
        }
      );
  },
});


/* =====================================================
   ACTIONS
===================================================== */

export const {
  clearAuthError,
  clearLoginError,
  clearRegisterError,
  clearLogoutError,
  clearUser,
} = authSlice.actions;


/* =====================================================
   SELECTORS
===================================================== */

export const selectUser = (state) =>
  state.auth.user;


export const selectIsAuthenticated = (
  state
) => state.auth.isAuthenticated;


export const selectUserRole = (state) =>
  state.auth.user?.role || null;


export const selectIsAdmin = (state) =>
  state.auth.user?.role === "admin";


export const selectIsUser = (state) =>
  state.auth.user?.role === "user";


export const selectAuthLoading = (state) =>
  state.auth.loading;


export const selectLoginLoading = (state) =>
  state.auth.loginLoading;


export const selectRegisterLoading = (
  state
) => state.auth.registerLoading;


export const selectLogoutLoading = (
  state
) => state.auth.logoutLoading;


export const selectSessionLoading = (
  state
) => state.auth.sessionLoading;


export const selectAuthError = (state) =>
  state.auth.error;


export const selectLoginError = (state) =>
  state.auth.loginError;


export const selectRegisterError = (
  state
) => state.auth.registerError;


export const selectLogoutError = (state) =>
  state.auth.logoutError;


/* =====================================================
   DEFAULT EXPORT
===================================================== */

export default authSlice.reducer;