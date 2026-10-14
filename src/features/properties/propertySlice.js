

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const API_URL = import.meta.env.VITE_API_URL;

// /* =====================================================
// HELPER
// ===================================================== */

// const getErrorMessage = async (response, fallback) => {
// try {
// const data = await response.json();

// return (
//   data?.message ||
//   data?.error ||
//   fallback
// );

// } catch {
// return fallback;
// }
// };

// const getRequestConfig = (data, method = "POST") => {
// const isFormData =
// typeof FormData !== "undefined" &&
// data instanceof FormData;

// const config = {
// method,
// credentials: "include",
// };

// if (isFormData) {
// config.body = data;
// } else {
// config.headers = {
// "Content-Type": "application/json",
// };

// config.body = JSON.stringify(data);

// }

// return config;
// };

// /* =====================================================
// GET PUBLIC PROPERTIES

// GET /api/properties
// ===================================================== */

// export const getProperties = createAsyncThunk(
// "properties/getProperties",

// async (params = {}, { rejectWithValue }) => {
// try {
// const query = new URLSearchParams();

//   Object.entries(params).forEach(([key, value]) => {
//     if (
//       value !== undefined &&
//       value !== null &&
//       value !== ""
//     ) {
//       query.append(key, String(value));
//     }
//   });

//   const queryString = query.toString();

//   const response = await fetch(
//     `${API_URL}/properties${
//       queryString ? `?${queryString}` : ""
//     }`,
//     {
//       method: "GET",
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     return rejectWithValue(
//       await getErrorMessage(
//         response,
//         "Unable to fetch properties."
//       )
//     );
//   }

//   return await response.json();
// } catch (error) {
//   return rejectWithValue(
//     error?.message ||
//       "Unable to connect to server."
//   );
// }

// }
// );

// /* =====================================================
// GET SINGLE PROPERTY

// GET /api/properties/:id
// ===================================================== */

// export const getPropertyById = createAsyncThunk(
// "properties/getPropertyById",

// async (id, { rejectWithValue }) => {
// try {
// if (!id) {
// return rejectWithValue(
// "Property ID is required."
// );
// }

//   const response = await fetch(
//     `${API_URL}/properties/${id}`,
//     {
//       method: "GET",
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     return rejectWithValue(
//       await getErrorMessage(
//         response,
//         "Unable to fetch property."
//       )
//     );
//   }

//   return await response.json();
// } catch (error) {
//   return rejectWithValue(
//     error?.message ||
//       "Unable to connect to server."
//   );
// }

// }
// );

// /* =====================================================
// GET MY PROPERTIES

// GET /api/properties/my
// ===================================================== */

// export const getMyProperties = createAsyncThunk(
// "properties/getMyProperties",

// async (_, { rejectWithValue }) => {
// try {
// const response = await fetch(
// `${API_URL}/properties/my`,
// {
// method: "GET",
// credentials: "include",
// }
// );

//   if (!response.ok) {
//     return rejectWithValue(
//       await getErrorMessage(
//         response,
//         "Unable to fetch your properties."
//       )
//     );
//   }

//   return await response.json();
// } catch (error) {
//   return rejectWithValue(
//     error?.message ||
//       "Unable to connect to server."
//   );
// }

// }
// );

// /* =====================================================
// CREATE PROPERTY

// POST /api/properties

// propertyData can be:

// FormData
// Normal JavaScript object
// ===================================================== */

// export const createProperty = createAsyncThunk(
// "properties/createProperty",

// async (propertyData, { rejectWithValue }) => {
// try {
// if (!propertyData) {
// return rejectWithValue(
// "Property data is required."
// );
// }

//   const response = await fetch(
//     `${API_URL}/properties`,
//     getRequestConfig(propertyData, "POST")
//   );

//   if (!response.ok) {
//     return rejectWithValue(
//       await getErrorMessage(
//         response,
//         "Unable to create property."
//       )
//     );
//   }

//   return await response.json();
// } catch (error) {
//   return rejectWithValue(
//     error?.message ||
//       "Unable to connect to server."
//   );
// }

// }
// );

// /* =====================================================
// UPDATE PROPERTY

// PUT /api/properties/:id

// propertyData can be:

// FormData
// Normal JavaScript object
// ===================================================== */

// export const updateProperty = createAsyncThunk(
// "properties/updateProperty",

// async (
// { id, propertyData },
// { rejectWithValue }
// ) => {
// try {
// if (!id) {
// return rejectWithValue(
// "Property ID is required."
// );
// }

//   if (!propertyData) {
//     return rejectWithValue(
//       "Property data is required."
//     );
//   }

//   const response = await fetch(
//     `${API_URL}/properties/${id}`,
//     getRequestConfig(propertyData, "PUT")
//   );

//   if (!response.ok) {
//     return rejectWithValue(
//       await getErrorMessage(
//         response,
//         "Unable to update property."
//       )
//     );
//   }

//   return await response.json();
// } catch (error) {
//   return rejectWithValue(
//     error?.message ||
//       "Unable to connect to server."
//   );
// }

// }
// );

// /* =====================================================
// DELETE PROPERTY

// DELETE /api/properties/:id
// ===================================================== */

// export const deleteProperty = createAsyncThunk(
// "properties/deleteProperty",

// async (id, { rejectWithValue }) => {
// try {
// if (!id) {
// return rejectWithValue(
// "Property ID is required."
// );
// }

//   const response = await fetch(
//     `${API_URL}/properties/${id}`,
//     {
//       method: "DELETE",
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     return rejectWithValue(
//       await getErrorMessage(
//         response,
//         "Unable to delete property."
//       )
//     );
//   }

//   const data = await response.json();

//   return {
//     ...data,
//     id,
//   };
// } catch (error) {
//   return rejectWithValue(
//     error?.message ||
//       "Unable to connect to server."
//   );
// }

// }
// );

// /* =====================================================
// INITIAL STATE
// ===================================================== */

// const initialState = {
// properties: [],
// myProperties: [],
// property: null,

// total: 0,
// page: 1,
// pages: 0,

// loading: false,
// propertyLoading: false,
// myPropertiesLoading: false,

// createLoading: false,
// updateLoading: false,
// deleteLoading: false,

// error: null,
// propertyError: null,
// myPropertiesError: null,

// createError: null,
// updateError: null,
// deleteError: null,
// };

// /* =====================================================
// SLICE
// ===================================================== */

// const propertySlice = createSlice({
// name: "properties",

// initialState,

// reducers: {
// clearPropertyError: (state) => {
// state.error = null;
// },

// clearPropertyDetails: (state) => {
//   state.property = null;
//   state.propertyError = null;
// },

// /*
//   Compatibility action
//   Used by PropertyDetails.jsx
// */
// clearSelectedProperty: (state) => {
//   state.property = null;
//   state.propertyError = null;
// },

// clearCreatePropertyError: (state) => {
//   state.createError = null;
// },

// clearUpdatePropertyError: (state) => {
//   state.updateError = null;
// },

// clearDeletePropertyError: (state) => {
//   state.deleteError = null;
// },

// clearMyPropertiesError: (state) => {
//   state.myPropertiesError = null;
// },

// clearAllPropertyErrors: (state) => {
//   state.error = null;
//   state.propertyError = null;
//   state.myPropertiesError = null;
//   state.createError = null;
//   state.updateError = null;
//   state.deleteError = null;
// },

// },

// extraReducers: (builder) => {
// /* =================================================
// GET PROPERTIES
// ================================================= */

// builder
//   .addCase(
//     getProperties.pending,
//     (state) => {
//       state.loading = true;
//       state.error = null;
//     }
//   )

//   .addCase(
//     getProperties.fulfilled,
//     (state, action) => {
//       state.loading = false;

//       state.properties =
//         action.payload?.properties || [];

//       state.total =
//         action.payload?.total || 0;

//       state.page =
//         action.payload?.page || 1;

//       state.pages =
//         action.payload?.pages || 0;
//     }
//   )

//   .addCase(
//     getProperties.rejected,
//     (state, action) => {
//       state.loading = false;

//       state.error =
//         action.payload ||
//         "Unable to fetch properties.";
//     }
//   );

// /* =================================================
//    GET SINGLE PROPERTY
// ================================================= */

// builder
//   .addCase(
//     getPropertyById.pending,
//     (state) => {
//       state.propertyLoading = true;
//       state.propertyError = null;
//       state.property = null;
//     }
//   )

//   .addCase(
//     getPropertyById.fulfilled,
//     (state, action) => {
//       state.propertyLoading = false;

//       state.property =
//         action.payload?.property || null;
//     }
//   )

//   .addCase(
//     getPropertyById.rejected,
//     (state, action) => {
//       state.propertyLoading = false;

//       state.propertyError =
//         action.payload ||
//         "Unable to fetch property.";

//       state.property = null;
//     }
//   );

// /* =================================================
//    MY PROPERTIES
// ================================================= */

// builder
//   .addCase(
//     getMyProperties.pending,
//     (state) => {
//       state.myPropertiesLoading = true;
//       state.myPropertiesError = null;
//     }
//   )

//   .addCase(
//     getMyProperties.fulfilled,
//     (state, action) => {
//       state.myPropertiesLoading = false;

//       state.myProperties =
//         action.payload?.properties || [];
//     }
//   )

//   .addCase(
//     getMyProperties.rejected,
//     (state, action) => {
//       state.myPropertiesLoading = false;

//       state.myPropertiesError =
//         action.payload ||
//         "Unable to fetch your properties.";
//     }
//   );

// /* =================================================
//    CREATE PROPERTY
// ================================================= */

// builder
//   .addCase(
//     createProperty.pending,
//     (state) => {
//       state.createLoading = true;
//       state.createError = null;
//     }
//   )

//   .addCase(
//     createProperty.fulfilled,
//     (state, action) => {
//       state.createLoading = false;

//       const property =
//         action.payload?.property;

//       if (property) {
//         state.myProperties.unshift(property);
//       }
//     }
//   )

//   .addCase(
//     createProperty.rejected,
//     (state, action) => {
//       state.createLoading = false;

//       state.createError =
//         action.payload ||
//         "Unable to create property.";
//     }
//   );

// /* =================================================
//    UPDATE PROPERTY
// ================================================= */

// builder
//   .addCase(
//     updateProperty.pending,
//     (state) => {
//       state.updateLoading = true;
//       state.updateError = null;
//     }
//   )

//   .addCase(
//     updateProperty.fulfilled,
//     (state, action) => {
//       state.updateLoading = false;

//       const updatedProperty =
//         action.payload?.property;

//       if (!updatedProperty) {
//         return;
//       }

//       state.property = updatedProperty;

//       const myIndex =
//         state.myProperties.findIndex(
//           (item) =>
//             item._id ===
//             updatedProperty._id
//         );

//       if (myIndex !== -1) {
//         state.myProperties[myIndex] =
//           updatedProperty;
//       }

//       const publicIndex =
//         state.properties.findIndex(
//           (item) =>
//             item._id ===
//             updatedProperty._id
//         );

//       if (publicIndex !== -1) {
//         state.properties[publicIndex] =
//           updatedProperty;
//       }
//     }
//   )

//   .addCase(
//     updateProperty.rejected,
//     (state, action) => {
//       state.updateLoading = false;

//       state.updateError =
//         action.payload ||
//         "Unable to update property.";
//     }
//   );

// /* =================================================
//    DELETE PROPERTY
// ================================================= */

// builder
//   .addCase(
//     deleteProperty.pending,
//     (state) => {
//       state.deleteLoading = true;
//       state.deleteError = null;
//     }
//   )

//   .addCase(
//     deleteProperty.fulfilled,
//     (state, action) => {
//       state.deleteLoading = false;

//       const deletedId =
//         action.payload?.id;

//       if (!deletedId) {
//         return;
//       }

//       state.myProperties =
//         state.myProperties.filter(
//           (item) =>
//             item._id !== deletedId
//         );

//       state.properties =
//         state.properties.filter(
//           (item) =>
//             item._id !== deletedId
//         );

//       if (
//         state.property?._id ===
//         deletedId
//       ) {
//         state.property = null;
//       }
//     }
//   )

//   .addCase(
//     deleteProperty.rejected,
//     (state, action) => {
//       state.deleteLoading = false;

//       state.deleteError =
//         action.payload ||
//         "Unable to delete property.";
//     }
//   );

// },
// });

// /* =====================================================
// ACTIONS
// ===================================================== */

// export const {
// clearPropertyError,
// clearPropertyDetails,
// clearSelectedProperty,
// clearCreatePropertyError,
// clearUpdatePropertyError,
// clearDeletePropertyError,
// clearMyPropertiesError,
// clearAllPropertyErrors,
// } = propertySlice.actions;

// /* =====================================================
// SELECTORS
// ===================================================== */

// export const selectProperties = (state) =>
// state.properties.properties;

// export const selectProperty = (state) =>
// state.properties.property;

// /*
// Compatibility selector
// */
// export const selectSelectedProperty = (state) =>
// state.properties.property;

// export const selectMyProperties = (state) =>
// state.properties.myProperties;

// export const selectPropertiesLoading = (state) =>
// state.properties.loading;

// export const selectPropertyLoading = (state) =>
// state.properties.propertyLoading;

// export const selectMyPropertiesLoading = (state) =>
// state.properties.myPropertiesLoading;

// export const selectCreatePropertyLoading = (state) =>
// state.properties.createLoading;

// export const selectUpdatePropertyLoading = (state) =>
// state.properties.updateLoading;

// export const selectDeletePropertyLoading = (state) =>
// state.properties.deleteLoading;

// export const selectPropertiesError = (state) =>
// state.properties.error;

// export const selectPropertyError = (state) =>
// state.properties.propertyError;

// /*
// Compatibility selector
// */
// export const selectSelectedPropertyError = (state) =>
// state.properties.propertyError;

// export const selectMyPropertiesError = (state) =>
// state.properties.myPropertiesError;

// export const selectCreatePropertyError = (state) =>
// state.properties.createError;

// export const selectUpdatePropertyError = (state) =>
// state.properties.updateError;

// export const selectDeletePropertyError = (state) =>
// state.properties.deleteError;

// /* =====================================================
// DEFAULT EXPORT
// ===================================================== */

// export default propertySlice.reducer;



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/*
|--------------------------------------------------------------------------
| API CONFIGURATION
|--------------------------------------------------------------------------
| .env example:
| VITE_API_URL=http://localhost:5000/api
|
| If the URL contains only the server origin, /api is added automatically.
*/

const rawApiUrl = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).trim().replace(/\/+$/, "");

const API_URL = /\/api$/i.test(rawApiUrl)
  ? rawApiUrl
  : `${rawApiUrl}/api`;

const PROPERTY_URL = `${API_URL}/properties`;

/*
|--------------------------------------------------------------------------
| RESPONSE HELPERS
|--------------------------------------------------------------------------
*/

const readResponse = async (response) => {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

const getErrorMessage = (data, fallback) =>
  data?.message || data?.error || fallback;

const handleResponse = async (response, fallback) => {
  const data = await readResponse(response);

  if (!response.ok || data?.success === false) {
    throw new Error(getErrorMessage(data, fallback));
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| REQUEST CONFIG
|--------------------------------------------------------------------------
| FormData: browser automatically sets multipart boundary.
| JSON: content type is application/json.
| credentials: include supports cookie-based authentication.
*/

const getRequestConfig = (data, method = "POST") => {
  const config = {
    method,
    credentials: "include",
  };

  if (typeof FormData !== "undefined" && data instanceof FormData) {
    config.body = data;
  } else {
    config.headers = {
      "Content-Type": "application/json",
    };
    config.body = JSON.stringify(data ?? {});
  }

  return config;
};

const fetchError = (error, fallback) =>
  error?.message || fallback;

/*
|--------------------------------------------------------------------------
| GET PUBLIC PROPERTIES
|--------------------------------------------------------------------------
| GET /api/properties
*/

export const getProperties = createAsyncThunk(
  "properties/getProperties",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      Object.entries(params || {}).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          if (Array.isArray(value)) {
            value.forEach((item) => query.append(key, String(item)));
          } else {
            query.append(key, String(value));
          }
        }
      });

      const queryString = query.toString();
      const url = queryString
        ? `${PROPERTY_URL}?${queryString}`
        : PROPERTY_URL;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      return await handleResponse(
        response,
        "Unable to fetch properties."
      );
    } catch (error) {
      return rejectWithValue(
        fetchError(error, "Unable to connect to server.")
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| GET SINGLE PROPERTY
|--------------------------------------------------------------------------
| GET /api/properties/:id
*/

export const getPropertyById = createAsyncThunk(
  "properties/getPropertyById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Property ID is required.");
      }

      const response = await fetch(
        `${PROPERTY_URL}/${encodeURIComponent(id)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      return await handleResponse(
        response,
        "Unable to fetch property."
      );
    } catch (error) {
      return rejectWithValue(
        fetchError(error, "Unable to connect to server.")
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| GET OWNER PROPERTIES
|--------------------------------------------------------------------------
| GET /api/properties/my
| Requires authenticated owner session.
*/

export const getMyProperties = createAsyncThunk(
  "properties/getMyProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${PROPERTY_URL}/my`, {
        method: "GET",
        credentials: "include",
      });

      return await handleResponse(
        response,
        "Unable to fetch your properties."
      );
    } catch (error) {
      return rejectWithValue(
        fetchError(error, "Unable to connect to server.")
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| CREATE PROPERTY
|--------------------------------------------------------------------------
| POST /api/properties
|
| Supports:
| - FormData for images + property fields
| - JSON object for property fields
|
| New property fields supported through the payload:
| minGuests, maxGuests, extraGuestPolicy,
| sleepingArrangements, petPolicy
*/

export const createProperty = createAsyncThunk(
  "properties/createProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      if (!propertyData) {
        return rejectWithValue("Property data is required.");
      }

      const response = await fetch(
        PROPERTY_URL,
        getRequestConfig(propertyData, "POST")
      );

      return await handleResponse(
        response,
        "Unable to create property."
      );
    } catch (error) {
      return rejectWithValue(
        fetchError(error, "Unable to connect to server.")
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| UPDATE PROPERTY
|--------------------------------------------------------------------------
| PUT /api/properties/:id
|
| Supports FormData and JSON.
| Send only the fields that need updating.
*/

export const updateProperty = createAsyncThunk(
  "properties/updateProperty",
  async ({ id, propertyData } = {}, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Property ID is required.");
      }

      if (!propertyData) {
        return rejectWithValue("Property data is required.");
      }

      const response = await fetch(
        `${PROPERTY_URL}/${encodeURIComponent(id)}`,
        getRequestConfig(propertyData, "PUT")
      );

      return await handleResponse(
        response,
        "Unable to update property."
      );
    } catch (error) {
      return rejectWithValue(
        fetchError(error, "Unable to connect to server.")
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| DELETE PROPERTY
|--------------------------------------------------------------------------
| DELETE /api/properties/:id
| Backend performs a soft delete.
*/

export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Property ID is required.");
      }

      const response = await fetch(
        `${PROPERTY_URL}/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await handleResponse(
        response,
        "Unable to delete property."
      );

      return {
        ...data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        fetchError(error, "Unable to connect to server.")
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| RESPONSE NORMALIZERS
|--------------------------------------------------------------------------
*/

const getPropertyList = (payload) =>
  Array.isArray(payload?.properties) ? payload.properties : [];

const getPropertyObject = (payload) =>
  payload?.property || null;

const getPropertyId = (property) =>
  property?._id || property?.id || null;

/*
|--------------------------------------------------------------------------
| INITIAL STATE
|--------------------------------------------------------------------------
*/

const initialState = {
  properties: [],
  myProperties: [],
  property: null,

  total: 0,
  page: 1,
  pages: 0,

  loading: false,
  propertyLoading: false,
  myPropertiesLoading: false,

  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  error: null,
  propertyError: null,
  myPropertiesError: null,

  createError: null,
  updateError: null,
  deleteError: null,
};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const propertySlice = createSlice({
  name: "properties",
  initialState,

  reducers: {
    clearPropertyError: (state) => {
      state.error = null;
    },

    clearPropertyDetails: (state) => {
      state.property = null;
      state.propertyError = null;
    },

    // Backward compatibility
    clearSelectedProperty: (state) => {
      state.property = null;
      state.propertyError = null;
    },

    clearCreatePropertyError: (state) => {
      state.createError = null;
    },

    clearUpdatePropertyError: (state) => {
      state.updateError = null;
    },

    clearDeletePropertyError: (state) => {
      state.deleteError = null;
    },

    clearMyPropertiesError: (state) => {
      state.myPropertiesError = null;
    },

    clearAllPropertyErrors: (state) => {
      state.error = null;
      state.propertyError = null;
      state.myPropertiesError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | GET PUBLIC PROPERTIES
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = getPropertyList(action.payload);
        state.total = Number(action.payload?.total ?? 0);
        state.page = Number(action.payload?.page ?? 1);
        state.pages = Number(action.payload?.pages ?? 0);
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Unable to fetch properties.";
      });

    /*
    |--------------------------------------------------------------------------
    | GET SINGLE PROPERTY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getPropertyById.pending, (state) => {
        state.propertyLoading = true;
        state.propertyError = null;
        state.property = null;
      })
      .addCase(getPropertyById.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.property = getPropertyObject(action.payload);
      })
      .addCase(getPropertyById.rejected, (state, action) => {
        state.propertyLoading = false;
        state.propertyError =
          action.payload || "Unable to fetch property.";
        state.property = null;
      });

    /*
    |--------------------------------------------------------------------------
    | GET OWNER PROPERTIES
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getMyProperties.pending, (state) => {
        state.myPropertiesLoading = true;
        state.myPropertiesError = null;
      })
      .addCase(getMyProperties.fulfilled, (state, action) => {
        state.myPropertiesLoading = false;
        state.myProperties = getPropertyList(action.payload);
      })
      .addCase(getMyProperties.rejected, (state, action) => {
        state.myPropertiesLoading = false;
        state.myPropertiesError =
          action.payload || "Unable to fetch your properties.";
      });

    /*
    |--------------------------------------------------------------------------
    | CREATE PROPERTY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(createProperty.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.createLoading = false;

        const property = getPropertyObject(action.payload);

        if (property) {
          const id = getPropertyId(property);

          state.myProperties = [
            property,
            ...state.myProperties.filter(
              (item) => getPropertyId(item) !== id
            ),
          ];
        }
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.createLoading = false;
        state.createError =
          action.payload || "Unable to create property.";
      });

    /*
    |--------------------------------------------------------------------------
    | UPDATE PROPERTY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(updateProperty.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.updateLoading = false;

        const updatedProperty = getPropertyObject(action.payload);

        if (!updatedProperty) return;

        const updatedId = getPropertyId(updatedProperty);

        state.property = updatedProperty;

        const myIndex = state.myProperties.findIndex(
          (item) => getPropertyId(item) === updatedId
        );

        if (myIndex !== -1) {
          state.myProperties[myIndex] = updatedProperty;
        }

        const publicIndex = state.properties.findIndex(
          (item) => getPropertyId(item) === updatedId
        );

        if (publicIndex !== -1) {
          state.properties[publicIndex] = updatedProperty;
        }
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError =
          action.payload || "Unable to update property.";
      });

    /*
    |--------------------------------------------------------------------------
    | DELETE PROPERTY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(deleteProperty.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.deleteLoading = false;

        const deletedId = action.payload?.id;

        if (!deletedId) return;

        state.myProperties = state.myProperties.filter(
          (item) => getPropertyId(item) !== deletedId
        );

        state.properties = state.properties.filter(
          (item) => getPropertyId(item) !== deletedId
        );

        if (getPropertyId(state.property) === deletedId) {
          state.property = null;
        }
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError =
          action.payload || "Unable to delete property.";
      });
  },
});

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/

export const {
  clearPropertyError,
  clearPropertyDetails,
  clearSelectedProperty,
  clearCreatePropertyError,
  clearUpdatePropertyError,
  clearDeletePropertyError,
  clearMyPropertiesError,
  clearAllPropertyErrors,
} = propertySlice.actions;

/*
|--------------------------------------------------------------------------
| SELECTORS
|--------------------------------------------------------------------------
*/

export const selectProperties = (state) =>
  state.properties.properties;

export const selectProperty = (state) =>
  state.properties.property;

// Backward compatibility
export const selectSelectedProperty = (state) =>
  state.properties.property;

export const selectMyProperties = (state) =>
  state.properties.myProperties;

export const selectPropertiesLoading = (state) =>
  state.properties.loading;

export const selectPropertyLoading = (state) =>
  state.properties.propertyLoading;

export const selectMyPropertiesLoading = (state) =>
  state.properties.myPropertiesLoading;

export const selectCreatePropertyLoading = (state) =>
  state.properties.createLoading;

export const selectUpdatePropertyLoading = (state) =>
  state.properties.updateLoading;

export const selectDeletePropertyLoading = (state) =>
  state.properties.deleteLoading;

export const selectPropertiesError = (state) =>
  state.properties.error;

export const selectPropertyError = (state) =>
  state.properties.propertyError;

// Backward compatibility
export const selectSelectedPropertyError = (state) =>
  state.properties.propertyError;

export const selectMyPropertiesError = (state) =>
  state.properties.myPropertiesError;

export const selectCreatePropertyError = (state) =>
  state.properties.createError;

export const selectUpdatePropertyError = (state) =>
  state.properties.updateError;

export const selectDeletePropertyError = (state) =>
  state.properties.deleteError;

export default propertySlice.reducer;
