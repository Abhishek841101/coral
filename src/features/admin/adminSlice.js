
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

/* =====================================================
   DEBUG START
===================================================== */

console.log(
  "=================================================="
);

console.log(
  "[ADMIN SLICE] adminSlice.js LOADED"
);

console.log(
  "[ADMIN SLICE] Current time:",
  new Date().toISOString()
);

console.log(
  "=================================================="
);

/* =====================================================
   API
===================================================== */

const API_URL =
  import.meta.env.VITE_API_URL;

const ADMIN_TOKEN_KEY =
  "coral_admin_token";

console.log(
  "[ADMIN SLICE] API_URL:",
  API_URL
);

console.log(
  "[ADMIN SLICE] TOKEN KEY:",
  ADMIN_TOKEN_KEY
);

/* =====================================================
   TOKEN HELPERS
===================================================== */

const getAdminToken = () => {
  const token =
    localStorage.getItem(
      ADMIN_TOKEN_KEY
    );

  console.log(
    "[ADMIN TOKEN] getAdminToken()"
  );

  console.log(
    "[ADMIN TOKEN] Token exists:",
    Boolean(token)
  );

  if (token) {
    console.log(
      "[ADMIN TOKEN] Token length:",
      token.length
    );

    console.log(
      "[ADMIN TOKEN] Token preview:",
      `${token.substring(0, 20)}...`
    );
  } else {
    console.warn(
      "[ADMIN TOKEN] NO TOKEN FOUND"
    );
  }

  return token;
};

const saveAdminToken = (token) => {
  console.log(
    "[ADMIN TOKEN] saveAdminToken() called"
  );

  console.log(
    "[ADMIN TOKEN] Token received:",
    Boolean(token)
  );

  if (token) {
    localStorage.setItem(
      ADMIN_TOKEN_KEY,
      token
    );

    console.log(
      "[ADMIN TOKEN] Token SAVED"
    );

    console.log(
      "[ADMIN TOKEN] Saved successfully:",
      Boolean(
        localStorage.getItem(
          ADMIN_TOKEN_KEY
        )
      )
    );
  } else {
    console.error(
      "[ADMIN TOKEN] Cannot save empty token"
    );
  }
};

const removeAdminToken = () => {
  console.log(
    "[ADMIN TOKEN] removeAdminToken()"
  );

  localStorage.removeItem(
    ADMIN_TOKEN_KEY
  );

  console.log(
    "[ADMIN TOKEN] Token after remove:",
    Boolean(
      localStorage.getItem(
        ADMIN_TOKEN_KEY
      )
    )
  );
};

/* =====================================================
   AUTH HEADERS
===================================================== */

const getAuthHeaders = (
  extraHeaders = {}
) => {
  console.log(
    "[ADMIN HEADERS] Creating auth headers"
  );

  console.log(
    "[ADMIN HEADERS] Extra headers:",
    extraHeaders
  );

  const token =
    getAdminToken();

  const headers = {
    ...extraHeaders,
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;

    console.log(
      "[ADMIN HEADERS] Authorization header ADDED"
    );

    console.log(
      "[ADMIN HEADERS] Authorization:",
      "Bearer TOKEN_PRESENT"
    );
  } else {
    console.error(
      "[ADMIN HEADERS] Authorization header NOT added"
    );
  }

  console.log(
    "[ADMIN HEADERS] Final headers:",
    {
      ...headers,
      Authorization: token
        ? "Bearer TOKEN_PRESENT"
        : "MISSING",
    }
  );

  return headers;
};

/* =====================================================
   RESPONSE HELPER
===================================================== */

const parseResponse = async (
  response,
  fallback
) => {
  console.log(
    "[ADMIN RESPONSE] parseResponse()"
  );

  console.log(
    "[ADMIN RESPONSE] Status:",
    response.status
  );

  console.log(
    "[ADMIN RESPONSE] OK:",
    response.ok
  );

  try {
    const data =
      await response.json();

    console.log(
      "[ADMIN RESPONSE] Parsed data:",
      data
    );

    if (!response.ok) {
      console.error(
        "[ADMIN RESPONSE] Request failed:",
        data?.message
      );

      throw new Error(
        data?.message ||
          fallback
      );
    }

    console.log(
      "[ADMIN RESPONSE] Request successful"
    );

    return data;

  } catch (error) {

    console.error(
      "[ADMIN RESPONSE] Parse error:",
      error
    );

    if (
      error instanceof Error
    ) {
      throw error;
    }

    throw new Error(
      fallback
    );
  }
};

/* =====================================================
   ADMIN LOGIN
   POST /api/admin/login
===================================================== */

export const adminLogin =
  createAsyncThunk(
    "admin/adminLogin",
    async (
      {
        email,
        password,
      },
      { rejectWithValue }
    ) => {

      console.log(
        "=================================================="
      );

      console.log(
        "[ADMIN LOGIN] START"
      );

      console.log(
        "[ADMIN LOGIN] Email:",
        email
      );

      console.log(
        "[ADMIN LOGIN] Password present:",
        Boolean(password)
      );

      console.log(
        "[ADMIN LOGIN] API URL:",
        `${API_URL}/admin/login`
      );

      console.log(
        "[ADMIN LOGIN] Existing admin token:",
        Boolean(
          localStorage.getItem(
            ADMIN_TOKEN_KEY
          )
        )
      );

      try {

        const requestBody = {
          email:
            email
              .trim()
              .toLowerCase(),
          password,
        };

        console.log(
          "[ADMIN LOGIN] Request body:",
          {
            email:
              requestBody.email,
            password:
              "[HIDDEN]",
          }
        );

        console.log(
          "[ADMIN LOGIN] Sending POST request..."
        );

        const response =
          await fetch(
            `${API_URL}/admin/login`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  requestBody
                ),
            }
          );

        console.log(
          "[ADMIN LOGIN] Response received"
        );

        console.log(
          "[ADMIN LOGIN] Status:",
          response.status
        );

        console.log(
          "[ADMIN LOGIN] Status text:",
          response.statusText
        );

        const data =
          await response.json();

        console.log(
          "[ADMIN LOGIN] Response data:",
          {
            success:
              data?.success,
            message:
              data?.message,
            hasToken:
              Boolean(data?.token),
            admin:
              data?.admin,
          }
        );

        if (!response.ok) {

          console.error(
            "[ADMIN LOGIN] FAILED"
          );

          console.error(
            "[ADMIN LOGIN] Status:",
            response.status
          );

          console.error(
            "[ADMIN LOGIN] Message:",
            data?.message
          );

          return rejectWithValue(
            data?.message ||
              "Admin login failed."
          );
        }

        console.log(
          "[ADMIN LOGIN] HTTP 200 SUCCESS"
        );

        /* =================================================
           SAVE BEARER TOKEN
        ================================================= */

        if (data?.token) {

          console.log(
            "[ADMIN LOGIN] Token received from backend"
          );

          console.log(
            "[ADMIN LOGIN] Token length:",
            data.token.length
          );

          saveAdminToken(
            data.token
          );

          console.log(
            "[ADMIN LOGIN] Token stored in localStorage"
          );

        } else {

          console.error(
            "[ADMIN LOGIN] TOKEN MISSING FROM BACKEND RESPONSE"
          );

          return rejectWithValue(
            "Admin token was not received from server."
          );
        }

        console.log(
          "[ADMIN LOGIN] Final localStorage token:",
          Boolean(
            localStorage.getItem(
              ADMIN_TOKEN_KEY
            )
          )
        );

        console.log(
          "[ADMIN LOGIN] ADMIN:",
          data?.admin
        );

        console.log(
          "[ADMIN LOGIN] SUCCESS"
        );

        console.log(
          "=================================================="
        );

        return data;

      } catch (error) {

        console.error(
          "[ADMIN LOGIN] EXCEPTION:",
          error
        );

        console.error(
          "[ADMIN LOGIN] Error message:",
          error?.message
        );

        console.log(
          "=================================================="
        );

        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   GET ADMIN ME
   GET /api/admin/me
===================================================== */

export const getAdminMe =
  createAsyncThunk(
    "admin/getAdminMe",
    async (
      _,
      { rejectWithValue }
    ) => {

      console.log(
        "=================================================="
      );

      console.log(
        "[ADMIN ME] START"
      );

      try {

        const token =
          getAdminToken();

        console.log(
          "[ADMIN ME] Token present:",
          Boolean(token)
        );

        if (!token) {

          console.error(
            "[ADMIN ME] NO TOKEN"
          );

          return rejectWithValue(
            "Admin authentication required."
          );
        }

        console.log(
          "[ADMIN ME] Calling:",
          `${API_URL}/admin/me`
        );

        const headers =
          getAuthHeaders();

        console.log(
          "[ADMIN ME] Headers:",
          {
            ...headers,
            Authorization:
              "Bearer TOKEN_PRESENT",
          }
        );

        const response =
          await fetch(
            `${API_URL}/admin/me`,
            {
              method: "GET",
              headers,
            }
          );

        console.log(
          "[ADMIN ME] Response status:",
          response.status
        );

        console.log(
          "[ADMIN ME] Response status text:",
          response.statusText
        );

        const data =
          await response.json();

        console.log(
          "[ADMIN ME] Response data:",
          data
        );

        if (!response.ok) {

          console.error(
            "[ADMIN ME] FAILED"
          );

          console.error(
            "[ADMIN ME] Status:",
            response.status
          );

          console.error(
            "[ADMIN ME] Message:",
            data?.message
          );

          if (
            response.status === 401
          ) {

            console.warn(
              "[ADMIN ME] 401 received -> removing token"
            );

            removeAdminToken();
          }

          return rejectWithValue(
            data?.message ||
              "Unable to fetch admin."
          );
        }

        console.log(
          "[ADMIN ME] SUCCESS"
        );

        console.log(
          "[ADMIN ME] Admin:",
          data?.admin
        );

        console.log(
          "=================================================="
        );

        return data;

      } catch (error) {

        console.error(
          "[ADMIN ME] EXCEPTION:",
          error
        );

        console.error(
          "[ADMIN ME] Error message:",
          error?.message
        );

        console.log(
          "=================================================="
        );

        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   ADMIN LOGOUT
   POST /api/admin/logout
===================================================== */

export const adminLogout =
  createAsyncThunk(
    "admin/adminLogout",
    async (
      _,
      { rejectWithValue }
    ) => {

      console.log(
        "=================================================="
      );

      console.log(
        "[ADMIN LOGOUT] START"
      );

      try {

        const token =
          getAdminToken();

        console.log(
          "[ADMIN LOGOUT] Token present:",
          Boolean(token)
        );

        console.log(
          "[ADMIN LOGOUT] Calling:",
          `${API_URL}/admin/logout`
        );

        const headers =
          getAuthHeaders();

        console.log(
          "[ADMIN LOGOUT] Headers prepared"
        );

        const response =
          await fetch(
            `${API_URL}/admin/logout`,
            {
              method: "POST",
              headers,
            }
          );

        console.log(
          "[ADMIN LOGOUT] Status:",
          response.status
        );

        const data =
          await response.json();

        console.log(
          "[ADMIN LOGOUT] Response:",
          data
        );

        /* Always remove local token */

        console.log(
          "[ADMIN LOGOUT] Removing local token"
        );

        removeAdminToken();

        if (!response.ok) {

          console.error(
            "[ADMIN LOGOUT] Server logout failed:",
            data?.message
          );

          return rejectWithValue(
            data?.message ||
              "Unable to logout admin."
          );
        }

        console.log(
          "[ADMIN LOGOUT] SUCCESS"
        );

        console.log(
          "=================================================="
        );

        return data;

      } catch (error) {

        console.error(
          "[ADMIN LOGOUT] EXCEPTION:",
          error
        );

        console.log(
          "[ADMIN LOGOUT] Removing token anyway"
        );

        removeAdminToken();

        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   GET ADMIN PROPERTIES
   GET /api/admin/properties
===================================================== */

export const getAdminProperties =
  createAsyncThunk(
    "admin/getAdminProperties",
    async (
      params = {},
      { rejectWithValue }
    ) => {

      console.log(
        "=================================================="
      );

      console.log(
        "[ADMIN PROPERTIES] START"
      );

      console.log(
        "[ADMIN PROPERTIES] Params:",
        params
      );

      try {

        const query =
          new URLSearchParams();

        Object.entries(
          params
        ).forEach(
          ([key, value]) => {

            console.log(
              "[ADMIN PROPERTIES] Param:",
              key,
              value
            );

            if (
              value !== undefined &&
              value !== null &&
              value !== ""
            ) {

              query.append(
                key,
                value
              );
            }
          }
        );

        const queryString =
          query.toString();

        const url =
          `${API_URL}/admin/properties${
            queryString
              ? `?${queryString}`
              : ""
          }`;

        console.log(
          "[ADMIN PROPERTIES] URL:",
          url
        );

        const token =
          getAdminToken();

        if (!token) {

          console.error(
            "[ADMIN PROPERTIES] TOKEN MISSING"
          );

          return rejectWithValue(
            "Admin authentication required."
          );
        }

        const headers =
          getAuthHeaders();

        console.log(
          "[ADMIN PROPERTIES] Sending request"
        );

        const response =
          await fetch(
            url,
            {
              method: "GET",
              headers,
            }
          );

        console.log(
          "[ADMIN PROPERTIES] Status:",
          response.status
        );

        const data =
          await response.json();

        console.log(
          "[ADMIN PROPERTIES] Response:",
          data
        );

        if (!response.ok) {

          console.error(
            "[ADMIN PROPERTIES] FAILED:",
            data?.message
          );

          return rejectWithValue(
            data?.message ||
              "Unable to fetch properties."
          );
        }

        console.log(
          "[ADMIN PROPERTIES] SUCCESS"
        );

        return data;

      } catch (error) {

        console.error(
          "[ADMIN PROPERTIES] EXCEPTION:",
          error
        );

        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   GET PENDING PROPERTIES
   GET /api/admin/properties/pending
===================================================== */

export const getPendingProperties =
  createAsyncThunk(
    "admin/getPendingProperties",
    async (
      _,
      { rejectWithValue }
    ) => {

      console.log(
        "=================================================="
      );

      console.log(
        "[PENDING PROPERTIES] START"
      );

      try {

        const token =
          getAdminToken();

        console.log(
          "[PENDING PROPERTIES] Token:",
          Boolean(token)
        );

        if (!token) {

          console.error(
            "[PENDING PROPERTIES] TOKEN MISSING"
          );

          return rejectWithValue(
            "Admin authentication required."
          );
        }

        const url =
          `${API_URL}/admin/properties/pending`;

        console.log(
          "[PENDING PROPERTIES] URL:",
          url
        );

        const response =
          await fetch(
            url,
            {
              method: "GET",
              headers:
                getAuthHeaders(),
            }
          );

        console.log(
          "[PENDING PROPERTIES] Status:",
          response.status
        );

        const data =
          await response.json();

        console.log(
          "[PENDING PROPERTIES] Response:",
          data
        );

        if (!response.ok) {

          console.error(
            "[PENDING PROPERTIES] FAILED:",
            data?.message
          );

          return rejectWithValue(
            data?.message ||
              "Unable to fetch pending properties."
          );
        }

        console.log(
          "[PENDING PROPERTIES] SUCCESS"
        );

        return data;

      } catch (error) {

        console.error(
          "[PENDING PROPERTIES] EXCEPTION:",
          error
        );

        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   PROPERTY STATS
   GET /api/admin/properties/stats
===================================================== */

export const getPropertyStats =
  createAsyncThunk(
    "admin/getPropertyStats",
    async (
      _,
      { rejectWithValue }
    ) => {

      console.log(
        "=================================================="
      );

      console.log(
        "[PROPERTY STATS] START"
      );

      try {

        const token =
          getAdminToken();

        console.log(
          "[PROPERTY STATS] Token present:",
          Boolean(token)
        );

        if (!token) {

          console.error(
            "[PROPERTY STATS] TOKEN MISSING"
          );

          return rejectWithValue(
            "Admin authentication required."
          );
        }

        const url =
          `${API_URL}/admin/properties/stats`;

        console.log(
          "[PROPERTY STATS] URL:",
          url
        );

        const response =
          await fetch(
            url,
            {
              method: "GET",
              headers:
                getAuthHeaders(),
            }
          );

        console.log(
          "[PROPERTY STATS] Status:",
          response.status
        );

        console.log(
          "[PROPERTY STATS] Status text:",
          response.statusText
        );

        const data =
          await response.json();

        console.log(
          "[PROPERTY STATS] Response:",
          data
        );

        if (!response.ok) {

          console.error(
            "[PROPERTY STATS] FAILED:",
            data?.message
          );

          return rejectWithValue(
            data?.message ||
              "Unable to fetch property stats."
          );
        }

        console.log(
          "[PROPERTY STATS] SUCCESS"
        );

        return data;

      } catch (error) {

        console.error(
          "[PROPERTY STATS] EXCEPTION:",
          error
        );

        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   APPROVE PROPERTY
===================================================== */

export const approveProperty =
  createAsyncThunk(
    "admin/approveProperty",
    async (
      id,
      { rejectWithValue }
    ) => {

      console.log(
        "=================================================="
      );

      console.log(
        "[APPROVE PROPERTY] START"
      );

      console.log(
        "[APPROVE PROPERTY] ID:",
        id
      );

      try {

        if (!id) {

          console.error(
            "[APPROVE PROPERTY] ID MISSING"
          );

          return rejectWithValue(
            "Property ID is required."
          );
        }

        const url =
          `${API_URL}/admin/properties/${id}/approve`;

        console.log(
          "[APPROVE PROPERTY] URL:",
          url
        );

        const token =
          getAdminToken();

        console.log(
          "[APPROVE PROPERTY] Token:",
          Boolean(token)
        );

        if (!token) {

          console.error(
            "[APPROVE PROPERTY] TOKEN MISSING"
          );

          return rejectWithValue(
            "Admin authentication required."
          );
        }

        const response =
          await fetch(
            url,
            {
              method: "PATCH",
              headers:
                getAuthHeaders(),
            }
          );

        console.log(
          "[APPROVE PROPERTY] Status:",
          response.status
        );

        const data =
          await response.json();

        console.log(
          "[APPROVE PROPERTY] Response:",
          data
        );

        if (!response.ok) {

          console.error(
            "[APPROVE PROPERTY] FAILED:",
            data?.message
          );

          return rejectWithValue(
            data?.message ||
              "Unable to approve property."
          );
        }

        console.log(
          "[APPROVE PROPERTY] SUCCESS"
        );

        return data;

      } catch (error) {

        console.error(
          "[APPROVE PROPERTY] EXCEPTION:",
          error
        );

        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   REJECT PROPERTY
===================================================== */

export const rejectProperty =
  createAsyncThunk(
    "admin/rejectProperty",
    async (
      {
        id,
        reason = "",
      },
      { rejectWithValue }
    ) => {

      console.log(
        "=================================================="
      );

      console.log(
        "[REJECT PROPERTY] START"
      );

      console.log(
        "[REJECT PROPERTY] ID:",
        id
      );

      console.log(
        "[REJECT PROPERTY] Reason:",
        reason
      );

      try {

        if (!id) {

          console.error(
            "[REJECT PROPERTY] ID MISSING"
          );

          return rejectWithValue(
            "Property ID is required."
          );
        }

        const url =
          `${API_URL}/admin/properties/${id}/reject`;

        console.log(
          "[REJECT PROPERTY] URL:",
          url
        );

        const token =
          getAdminToken();

        console.log(
          "[REJECT PROPERTY] Token:",
          Boolean(token)
        );

        if (!token) {

          console.error(
            "[REJECT PROPERTY] TOKEN MISSING"
          );

          return rejectWithValue(
            "Admin authentication required."
          );
        }

        const headers =
          getAuthHeaders({
            "Content-Type":
              "application/json",
          });

        console.log(
          "[REJECT PROPERTY] Headers:",
          {
            ...headers,
            Authorization:
              "Bearer TOKEN_PRESENT",
          }
        );

        const body = {
          reason,
        };

        console.log(
          "[REJECT PROPERTY] Body:",
          body
        );

        const response =
          await fetch(
            url,
            {
              method: "PATCH",

              headers,

              body:
                JSON.stringify(
                  body
                ),
            }
          );

        console.log(
          "[REJECT PROPERTY] Status:",
          response.status
        );

        console.log(
          "[REJECT PROPERTY] Status text:",
          response.statusText
        );

        const data =
          await response.json();

        console.log(
          "[REJECT PROPERTY] Response:",
          data
        );

        if (!response.ok) {

          console.error(
            "[REJECT PROPERTY] FAILED:",
            data?.message
          );

          return rejectWithValue(
            data?.message ||
              "Unable to reject property."
          );
        }

        console.log(
          "[REJECT PROPERTY] SUCCESS"
        );

        return data;

      } catch (error) {

        console.error(
          "[REJECT PROPERTY] EXCEPTION:",
          error
        );

        console.error(
          "[REJECT PROPERTY] Error message:",
          error?.message
        );

        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   ACTIVATE PROPERTY
===================================================== */

export const activateProperty =
  createAsyncThunk(
    "admin/activateProperty",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/${id}/activate`,
          {
            method: "PATCH",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to activate property."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   DEACTIVATE PROPERTY
===================================================== */

export const deactivateProperty =
  createAsyncThunk(
    "admin/deactivateProperty",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/${id}/deactivate`,
          {
            method: "PATCH",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to deactivate property."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   DELETE PROPERTY
===================================================== */

export const deleteAdminProperty =
  createAsyncThunk(
    "admin/deleteAdminProperty",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/properties/${id}`,
          {
            method: "DELETE",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to delete property."
          );
        }

        return {
          ...data,
          id,
        };
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   GET ADMIN BOOKINGS
===================================================== */

export const getAdminBookings =
  createAsyncThunk(
    "admin/getAdminBookings",
    async (
      params = {},
      { rejectWithValue }
    ) => {
      try {
        const query = new URLSearchParams();

        Object.entries(params).forEach(
          ([key, value]) => {
            if (
              value !== undefined &&
              value !== null &&
              value !== ""
            ) {
              query.append(key, value);
            }
          }
        );

        const queryString = query.toString();

        const response = await fetch(
          `${API_URL}/admin/bookings${
            queryString
              ? `?${queryString}`
              : ""
          }`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch bookings."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   PENDING BOOKINGS
===================================================== */

export const getPendingBookings =
  createAsyncThunk(
    "admin/getPendingBookings",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/pending`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch pending bookings."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   BOOKING STATS
===================================================== */

export const getBookingStats =
  createAsyncThunk(
    "admin/getBookingStats",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/stats`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch booking stats."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   CONFIRM BOOKING
===================================================== */

export const confirmBooking =
  createAsyncThunk(
    "admin/confirmBooking",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/${id}/confirm`,
          {
            method: "PATCH",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to confirm booking."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   REJECT BOOKING
===================================================== */

export const rejectBooking =
  createAsyncThunk(
    "admin/rejectBooking",
    async (
      {
        id,
        reason = "",
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/${id}/reject`,
          {
            method: "PATCH",

            headers: getAuthHeaders({
              "Content-Type":
                "application/json",
            }),

            body: JSON.stringify({
              reason,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to reject booking."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   CANCEL BOOKING
===================================================== */

export const cancelBooking =
  createAsyncThunk(
    "admin/cancelBooking",
    async (
      {
        id,
        reason = "",
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/${id}/cancel`,
          {
            method: "PATCH",

            headers: getAuthHeaders({
              "Content-Type":
                "application/json",
            }),

            body: JSON.stringify({
              reason,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to cancel booking."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   COMPLETE BOOKING
===================================================== */

export const completeBooking =
  createAsyncThunk(
    "admin/completeBooking",
    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/bookings/${id}/complete`,
          {
            method: "PATCH",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to complete booking."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   GET ADMIN ENQUIRIES
===================================================== */

export const getAdminEnquiries =
  createAsyncThunk(
    "admin/getAdminEnquiries",
    async (
      params = {},
      { rejectWithValue }
    ) => {
      try {
        const query = new URLSearchParams();

        Object.entries(params).forEach(
          ([key, value]) => {
            if (
              value !== undefined &&
              value !== null &&
              value !== ""
            ) {
              query.append(key, value);
            }
          }
        );

        const queryString = query.toString();

        const response = await fetch(
          `${API_URL}/admin/enquiries${
            queryString
              ? `?${queryString}`
              : ""
          }`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch enquiries."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   ENQUIRY STATS
===================================================== */

export const getEnquiryStats =
  createAsyncThunk(
    "admin/getEnquiryStats",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/enquiries/stats`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to fetch enquiry stats."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   UPDATE ENQUIRY STATUS
===================================================== */

export const updateEnquiryStatus =
  createAsyncThunk(
    "admin/updateEnquiryStatus",
    async (
      {
        id,
        status,
        adminNote = "",
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/admin/enquiries/${id}/status`,
          {
            method: "PATCH",

            headers: getAuthHeaders({
              "Content-Type":
                "application/json",
            }),

            body: JSON.stringify({
              status,
              adminNote,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data?.message ||
              "Unable to update enquiry."
          );
        }

        return data;
      } catch (error) {
        return rejectWithValue(
          error?.message ||
            "Unable to connect to server."
        );
      }
    }
  );

/* =====================================================
   INITIAL STATE
===================================================== */

const initialState = {
  /* ================= ADMIN ================= */

  admin: null,

  isAuthenticated: false,

  loginLoading: false,

  meLoading: false,

  logoutLoading: false,

  loginError: null,

  error: null,

  /* ================= PROPERTIES ================= */

  properties: [],

  pendingProperties: [],

  propertyStats: null,

  propertyTotal: 0,

  propertyPage: 1,

  propertyPages: 0,

  propertiesLoading: false,

  pendingPropertiesLoading: false,

  propertyStatsLoading: false,

  /* ================= BOOKINGS ================= */

  bookings: [],

  pendingBookings: [],

  bookingStats: null,

  bookingTotal: 0,

  bookingPage: 1,

  bookingPages: 0,

  bookingLoading: false,

  pendingBookingsLoading: false,

  bookingStatsLoading: false,

  /* ================= ENQUIRIES ================= */

  enquiries: [],

  enquiryStats: null,

  enquiryTotal: 0,

  enquiryPage: 1,

  enquiryPages: 0,

  enquiryLoading: false,

  enquiryStatsLoading: false,

  /* ================= ACTION ================= */

  actionLoading: false,
};

/* =====================================================
   SLICE
===================================================== */

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },

    clearAdminLoginError: (state) => {
      state.loginError = null;
    },

    clearAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;

      removeAdminToken();
    },
  },

  extraReducers: (builder) => {
    /* =================================================
       ADMIN LOGIN
    ================================================= */

    builder
      .addCase(
        adminLogin.pending,
        (state) => {
          state.loginLoading = true;
          state.loginError = null;
          state.error = null;
        }
      )

      .addCase(
        adminLogin.fulfilled,
        (state, action) => {
          state.loginLoading = false;

          state.admin =
            action.payload?.admin || null;

          state.isAuthenticated =
            Boolean(
              action.payload?.admin &&
                action.payload?.token
            );

          state.loginError = null;
        }
      )

      .addCase(
        adminLogin.rejected,
        (state, action) => {
          state.loginLoading = false;

          state.isAuthenticated = false;

          state.admin = null;

          state.loginError =
            action.payload ||
            "Admin login failed.";
        }
      );

    /* =================================================
       ADMIN ME
    ================================================= */

    builder
      .addCase(
        getAdminMe.pending,
        (state) => {
          state.meLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getAdminMe.fulfilled,
        (state, action) => {
          state.meLoading = false;

          state.admin =
            action.payload?.admin || null;

          state.isAuthenticated =
            Boolean(
              action.payload?.admin
            );
        }
      )

      .addCase(
        getAdminMe.rejected,
        (state) => {
          state.meLoading = false;

          state.admin = null;

          state.isAuthenticated = false;
        }
      );

    /* =================================================
       ADMIN LOGOUT
    ================================================= */

    builder
      .addCase(
        adminLogout.pending,
        (state) => {
          state.logoutLoading = true;
        }
      )

      .addCase(
        adminLogout.fulfilled,
        (state) => {
          state.logoutLoading = false;

          state.admin = null;

          state.isAuthenticated = false;

          state.loginError = null;

          state.error = null;
        }
      )

      .addCase(
        adminLogout.rejected,
        (state) => {
          state.logoutLoading = false;

          state.admin = null;

          state.isAuthenticated = false;

          state.loginError = null;
        }
      );

    /* =================================================
       ADMIN PROPERTIES
    ================================================= */

    builder
      .addCase(
        getAdminProperties.pending,
        (state) => {
          state.propertiesLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getAdminProperties.fulfilled,
        (state, action) => {
          state.propertiesLoading = false;

          state.properties =
            action.payload?.properties ||
            [];

          state.propertyTotal =
            action.payload?.total || 0;

          state.propertyPage =
            action.payload?.page || 1;

          state.propertyPages =
            action.payload?.pages || 0;
        }
      )

      .addCase(
        getAdminProperties.rejected,
        (state, action) => {
          state.propertiesLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch properties.";
        }
      );

    /* =================================================
       PENDING PROPERTIES
    ================================================= */

    builder
      .addCase(
        getPendingProperties.pending,
        (state) => {
          state.pendingPropertiesLoading = true;
        }
      )

      .addCase(
        getPendingProperties.fulfilled,
        (state, action) => {
          state.pendingPropertiesLoading = false;

          state.pendingProperties =
            action.payload?.properties ||
            [];
        }
      )

      .addCase(
        getPendingProperties.rejected,
        (state, action) => {
          state.pendingPropertiesLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch pending properties.";
        }
      );

    /* =================================================
       PROPERTY STATS
    ================================================= */

    builder
      .addCase(
        getPropertyStats.pending,
        (state) => {
          state.propertyStatsLoading = true;
        }
      )

      .addCase(
        getPropertyStats.fulfilled,
        (state, action) => {
          state.propertyStatsLoading = false;

          state.propertyStats =
            action.payload?.stats ||
            null;
        }
      )

      .addCase(
        getPropertyStats.rejected,
        (state, action) => {
          state.propertyStatsLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch property stats.";
        }
      );

    /* =================================================
       PROPERTY ACTIONS
    ================================================= */

    builder

      .addCase(
        approveProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        approveProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const property =
            action.payload?.property;

          if (!property) return;

          state.pendingProperties =
            state.pendingProperties.filter(
              (item) =>
                item._id !== property._id
            );

          const index =
            state.properties.findIndex(
              (item) =>
                item._id === property._id
            );

          if (index !== -1) {
            state.properties[index] =
              property;
          } else {
            state.properties.unshift(
              property
            );
          }
        }
      )

      .addCase(
        approveProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to approve property.";
        }
      )

      .addCase(
        rejectProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        rejectProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const property =
            action.payload?.property;

          if (!property) return;

          state.pendingProperties =
            state.pendingProperties.filter(
              (item) =>
                item._id !== property._id
            );

          const index =
            state.properties.findIndex(
              (item) =>
                item._id === property._id
            );

          if (index !== -1) {
            state.properties[index] =
              property;
          }
        }
      )

      .addCase(
        rejectProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to reject property.";
        }
      )

      .addCase(
        activateProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        activateProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const property =
            action.payload?.property;

          if (!property) return;

          const index =
            state.properties.findIndex(
              (item) =>
                item._id === property._id
            );

          if (index !== -1) {
            state.properties[index] =
              property;
          }
        }
      )

      .addCase(
        activateProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to activate property.";
        }
      )

      .addCase(
        deactivateProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        deactivateProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const property =
            action.payload?.property;

          if (!property) return;

          const index =
            state.properties.findIndex(
              (item) =>
                item._id === property._id
            );

          if (index !== -1) {
            state.properties[index] =
              property;
          }
        }
      )

      .addCase(
        deactivateProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to deactivate property.";
        }
      )

      .addCase(
        deleteAdminProperty.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        deleteAdminProperty.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const id =
            action.payload?.id;

          state.properties =
            state.properties.filter(
              (item) =>
                item._id !== id
            );

          state.pendingProperties =
            state.pendingProperties.filter(
              (item) =>
                item._id !== id
            );
        }
      )

      .addCase(
        deleteAdminProperty.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to delete property.";
        }
      );

    /* =================================================
       ADMIN BOOKINGS
    ================================================= */

    builder
      .addCase(
        getAdminBookings.pending,
        (state) => {
          state.bookingLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getAdminBookings.fulfilled,
        (state, action) => {
          state.bookingLoading = false;

          state.bookings =
            action.payload?.bookings ||
            [];

          state.bookingTotal =
            action.payload?.total || 0;

          state.bookingPage =
            action.payload?.page || 1;

          state.bookingPages =
            action.payload?.pages || 0;
        }
      )

      .addCase(
        getAdminBookings.rejected,
        (state, action) => {
          state.bookingLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch bookings.";
        }
      );

    /* =================================================
       PENDING BOOKINGS
    ================================================= */

    builder
      .addCase(
        getPendingBookings.pending,
        (state) => {
          state.pendingBookingsLoading = true;
        }
      )

      .addCase(
        getPendingBookings.fulfilled,
        (state, action) => {
          state.pendingBookingsLoading = false;

          state.pendingBookings =
            action.payload?.bookings ||
            [];
        }
      )

      .addCase(
        getPendingBookings.rejected,
        (state, action) => {
          state.pendingBookingsLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch pending bookings.";
        }
      );

    /* =================================================
       BOOKING STATS
    ================================================= */

    builder
      .addCase(
        getBookingStats.pending,
        (state) => {
          state.bookingStatsLoading = true;
        }
      )

      .addCase(
        getBookingStats.fulfilled,
        (state, action) => {
          state.bookingStatsLoading = false;

          state.bookingStats =
            action.payload?.stats ||
            null;
        }
      )

      .addCase(
        getBookingStats.rejected,
        (state, action) => {
          state.bookingStatsLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch booking stats.";
        }
      );

    /* =================================================
       BOOKING ACTIONS
    ================================================= */

    builder

      .addCase(
        confirmBooking.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        confirmBooking.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const booking =
            action.payload?.booking;

          if (!booking) return;

          state.pendingBookings =
            state.pendingBookings.filter(
              (item) =>
                item._id !== booking._id
            );

          const index =
            state.bookings.findIndex(
              (item) =>
                item._id === booking._id
            );

          if (index !== -1) {
            state.bookings[index] =
              booking;
          } else {
            state.bookings.unshift(
              booking
            );
          }
        }
      )

      .addCase(
        confirmBooking.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to confirm booking.";
        }
      )

      .addCase(
        rejectBooking.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        rejectBooking.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const booking =
            action.payload?.booking;

          if (!booking) return;

          state.pendingBookings =
            state.pendingBookings.filter(
              (item) =>
                item._id !== booking._id
            );

          const index =
            state.bookings.findIndex(
              (item) =>
                item._id === booking._id
            );

          if (index !== -1) {
            state.bookings[index] =
              booking;
          }
        }
      )

      .addCase(
        rejectBooking.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to reject booking.";
        }
      )

      .addCase(
        cancelBooking.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        cancelBooking.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const booking =
            action.payload?.booking;

          if (!booking) return;

          const index =
            state.bookings.findIndex(
              (item) =>
                item._id === booking._id
            );

          if (index !== -1) {
            state.bookings[index] =
              booking;
          }
        }
      )

      .addCase(
        cancelBooking.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to cancel booking.";
        }
      )

      .addCase(
        completeBooking.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        completeBooking.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const booking =
            action.payload?.booking;

          if (!booking) return;

          const index =
            state.bookings.findIndex(
              (item) =>
                item._id === booking._id
            );

          if (index !== -1) {
            state.bookings[index] =
              booking;
          }
        }
      )

      .addCase(
        completeBooking.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to complete booking.";
        }
      );

    /* =================================================
       ADMIN ENQUIRIES
    ================================================= */

    builder
      .addCase(
        getAdminEnquiries.pending,
        (state) => {
          state.enquiryLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getAdminEnquiries.fulfilled,
        (state, action) => {
          state.enquiryLoading = false;

          state.enquiries =
            action.payload?.enquiries ||
            [];

          state.enquiryTotal =
            action.payload?.total || 0;

          state.enquiryPage =
            action.payload?.page || 1;

          state.enquiryPages =
            action.payload?.pages || 0;
        }
      )

      .addCase(
        getAdminEnquiries.rejected,
        (state, action) => {
          state.enquiryLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch enquiries.";
        }
      );

    /* =================================================
       ENQUIRY STATS
    ================================================= */

    builder
      .addCase(
        getEnquiryStats.pending,
        (state) => {
          state.enquiryStatsLoading = true;
        }
      )

      .addCase(
        getEnquiryStats.fulfilled,
        (state, action) => {
          state.enquiryStatsLoading = false;

          state.enquiryStats =
            action.payload?.stats ||
            null;
        }
      )

      .addCase(
        getEnquiryStats.rejected,
        (state, action) => {
          state.enquiryStatsLoading = false;

          state.error =
            action.payload ||
            "Unable to fetch enquiry stats.";
        }
      );

    /* =================================================
       UPDATE ENQUIRY
    ================================================= */

    builder
      .addCase(
        updateEnquiryStatus.pending,
        (state) => {
          state.actionLoading = true;
        }
      )

      .addCase(
        updateEnquiryStatus.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const enquiry =
            action.payload?.enquiry;

          if (!enquiry) return;

          const index =
            state.enquiries.findIndex(
              (item) =>
                item._id === enquiry._id
            );

          if (index !== -1) {
            state.enquiries[index] =
              enquiry;
          }
        }
      )

      .addCase(
        updateEnquiryStatus.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload ||
            "Unable to update enquiry.";
        }
      );
  },
});

/* =====================================================
   ACTIONS
===================================================== */

export const {
  clearAdminError,
  clearAdminLoginError,
  clearAdmin,
} = adminSlice.actions;

/* =====================================================
   ADMIN SELECTORS
===================================================== */

export const selectAdmin = (state) =>
  state.admin.admin;

export const selectAdminAuthenticated = (
  state
) => state.admin.isAuthenticated;

export const selectIsAdminAuthenticated = (
  state
) => state.admin.isAuthenticated;

export const selectAdminLoginLoading = (
  state
) => state.admin.loginLoading;

export const selectAdminMeLoading = (
  state
) => state.admin.meLoading;

export const selectAdminLogoutLoading = (
  state
) => state.admin.logoutLoading;

export const selectAdminLoginError = (
  state
) => state.admin.loginError;

export const selectAdminError = (
  state
) => state.admin.error;

/* =====================================================
   PROPERTY SELECTORS
===================================================== */

export const selectAdminProperties = (
  state
) => state.admin.properties;

export const selectPendingProperties = (
  state
) => state.admin.pendingProperties;

export const selectPropertyStats = (
  state
) => state.admin.propertyStats;

export const selectAdminPropertiesLoading = (
  state
) => state.admin.propertiesLoading;

export const selectPendingPropertiesLoading = (
  state
) => state.admin.pendingPropertiesLoading;

export const selectPropertyStatsLoading = (
  state
) => state.admin.propertyStatsLoading;

/* =====================================================
   BOOKING SELECTORS
===================================================== */

export const selectAdminBookings = (
  state
) => state.admin.bookings;

export const selectPendingBookings = (
  state
) => state.admin.pendingBookings;

export const selectBookingStats = (
  state
) => state.admin.bookingStats;

export const selectAdminBookingsLoading = (
  state
) => state.admin.bookingLoading;

export const selectPendingBookingsLoading = (
  state
) => state.admin.pendingBookingsLoading;

export const selectBookingStatsLoading = (
  state
) => state.admin.bookingStatsLoading;

/* =====================================================
   ENQUIRY SELECTORS
===================================================== */

export const selectAdminEnquiries = (
  state
) => state.admin.enquiries;

export const selectEnquiryStats = (
  state
) => state.admin.enquiryStats;

export const selectAdminEnquiriesLoading = (
  state
) => state.admin.enquiryLoading;

export const selectEnquiryStatsLoading = (
  state
) => state.admin.enquiryStatsLoading;

/* =====================================================
   DEFAULT EXPORT
===================================================== */

export default adminSlice.reducer;