// import {
//   createAsyncThunk,
//   createSlice,
// } from "@reduxjs/toolkit";

// const API_URL =
//   "http://localhost:5000/api";

// /* =====================================================
//    GET PUBLIC PROPERTIES
//    GET /api/properties
// ===================================================== */

// export const getProperties = createAsyncThunk(
//   "properties/getProperties",

//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const query = new URLSearchParams();

//       Object.entries(params).forEach(
//         ([key, value]) => {
//           if (
//             value !== undefined &&
//             value !== null &&
//             value !== ""
//           ) {
//             query.append(key, value);
//           }
//         }
//       );

//       const queryString =
//         query.toString();

//       const response = await fetch(
//         `${API_URL}/properties${
//           queryString
//             ? `?${queryString}`
//             : ""
//         }`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );

//       const data =
//         await response.json();

//       if (!response.ok) {
//         return rejectWithValue(
//           data.message ||
//             "Unable to fetch properties."
//         );
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.message ||
//           "Unable to connect to server."
//       );
//     }
//   }
// );

// /* =====================================================
//    GET SINGLE PROPERTY
//    GET /api/properties/:id
// ===================================================== */

// export const getPropertyById =
//   createAsyncThunk(
//     "properties/getPropertyById",

//     async (
//       id,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/properties/${id}`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch property."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    GET MY PROPERTIES
//    GET /api/properties/my
// ===================================================== */

// export const getMyProperties =
//   createAsyncThunk(
//     "properties/getMyProperties",

//     async (
//       _,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/properties/my`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to fetch your properties."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    CREATE PROPERTY
//    POST /api/properties
// ===================================================== */

// export const createProperty =
//   createAsyncThunk(
//     "properties/createProperty",

//     async (
//       propertyData,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/properties`,
//           {
//             method: "POST",
//             credentials: "include",

//             headers: {
//               "Content-Type":
//                 "application/json",
//             },

//             body: JSON.stringify(
//               propertyData
//             ),
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to create property."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    UPDATE PROPERTY
//    PUT /api/properties/:id
// ===================================================== */

// export const updateProperty =
//   createAsyncThunk(
//     "properties/updateProperty",

//     async (
//       { id, propertyData },
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/properties/${id}`,
//           {
//             method: "PUT",
//             credentials: "include",

//             headers: {
//               "Content-Type":
//                 "application/json",
//             },

//             body: JSON.stringify(
//               propertyData
//             ),
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to update property."
//           );
//         }

//         return data;
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    DELETE PROPERTY
//    DELETE /api/properties/:id
// ===================================================== */

// export const deleteProperty =
//   createAsyncThunk(
//     "properties/deleteProperty",

//     async (
//       id,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await fetch(
//           `${API_URL}/properties/${id}`,
//           {
//             method: "DELETE",
//             credentials: "include",
//           }
//         );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           return rejectWithValue(
//             data.message ||
//               "Unable to delete property."
//           );
//         }

//         return {
//           ...data,
//           id,
//         };
//       } catch (error) {
//         return rejectWithValue(
//           error.message ||
//             "Unable to connect to server."
//         );
//       }
//     }
//   );

// /* =====================================================
//    INITIAL STATE
// ===================================================== */

// const initialState = {
//   properties: [],
//   myProperties: [],
//   property: null,

//   total: 0,
//   page: 1,
//   pages: 0,

//   loading: false,
//   propertyLoading: false,
//   myPropertiesLoading: false,
//   createLoading: false,
//   updateLoading: false,
//   deleteLoading: false,

//   error: null,
//   propertyError: null,
//   myPropertiesError: null,
//   createError: null,
//   updateError: null,
//   deleteError: null,
// };

// /* =====================================================
//    SLICE
// ===================================================== */

// const propertySlice =
//   createSlice({
//     name: "properties",

//     initialState,

//     reducers: {
//       clearPropertyError: (
//         state
//       ) => {
//         state.error = null;
//       },

//       clearPropertyDetails: (
//         state
//       ) => {
//         state.property = null;
//         state.propertyError = null;
//       },

//       clearCreatePropertyError: (
//         state
//       ) => {
//         state.createError = null;
//       },

//       clearUpdatePropertyError: (
//         state
//       ) => {
//         state.updateError = null;
//       },

//       clearDeletePropertyError: (
//         state
//       ) => {
//         state.deleteError = null;
//       },
//     },

//     extraReducers: (
//       builder
//     ) => {
//       /* =================================================
//          GET PROPERTIES
//       ================================================= */

//       builder
//         .addCase(
//           getProperties.pending,
//           (state) => {
//             state.loading = true;
//             state.error = null;
//           }
//         )

//         .addCase(
//           getProperties.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;

//             state.properties =
//               action.payload
//                 .properties || [];

//             state.total =
//               action.payload
//                 .total || 0;

//             state.page =
//               action.payload
//                 .page || 1;

//             state.pages =
//               action.payload
//                 .pages || 0;
//           }
//         )

//         .addCase(
//           getProperties.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;

//             state.error =
//               action.payload ||
//               "Unable to fetch properties.";
//           }
//         );

//       /* =================================================
//          GET SINGLE PROPERTY
//       ================================================= */

//       builder
//         .addCase(
//           getPropertyById.pending,
//           (state) => {
//             state.propertyLoading =
//               true;

//             state.propertyError =
//               null;
//           }
//         )

//         .addCase(
//           getPropertyById.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.propertyLoading =
//               false;

//             state.property =
//               action.payload
//                 .property || null;
//           }
//         )

//         .addCase(
//           getPropertyById.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.propertyLoading =
//               false;

//             state.propertyError =
//               action.payload ||
//               "Unable to fetch property.";
//           }
//         );

//       /* =================================================
//          MY PROPERTIES
//       ================================================= */

//       builder
//         .addCase(
//           getMyProperties.pending,
//           (state) => {
//             state.myPropertiesLoading =
//               true;

//             state.myPropertiesError =
//               null;
//           }
//         )

//         .addCase(
//           getMyProperties.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.myPropertiesLoading =
//               false;

//             state.myProperties =
//               action.payload
//                 .properties || [];
//           }
//         )

//         .addCase(
//           getMyProperties.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.myPropertiesLoading =
//               false;

//             state.myPropertiesError =
//               action.payload ||
//               "Unable to fetch your properties.";
//           }
//         );

//       /* =================================================
//          CREATE
//       ================================================= */

//       builder
//         .addCase(
//           createProperty.pending,
//           (state) => {
//             state.createLoading =
//               true;

//             state.createError =
//               null;
//           }
//         )

//         .addCase(
//           createProperty.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.createLoading =
//               false;

//             const property =
//               action.payload
//                 .property;

//             if (property) {
//               state.myProperties.unshift(
//                 property
//               );
//             }
//           }
//         )

//         .addCase(
//           createProperty.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.createLoading =
//               false;

//             state.createError =
//               action.payload ||
//               "Unable to create property.";
//           }
//         );

//       /* =================================================
//          UPDATE
//       ================================================= */

//       builder
//         .addCase(
//           updateProperty.pending,
//           (state) => {
//             state.updateLoading =
//               true;

//             state.updateError =
//               null;
//           }
//         )

//         .addCase(
//           updateProperty.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.updateLoading =
//               false;

//             const updatedProperty =
//               action.payload
//                 .property;

//             if (!updatedProperty) {
//               return;
//             }

//             state.property =
//               updatedProperty;

//             const index =
//               state.myProperties.findIndex(
//                 (item) =>
//                   item._id ===
//                   updatedProperty._id
//               );

//             if (index !== -1) {
//               state.myProperties[
//                 index
//               ] = updatedProperty;
//             }
//           }
//         )

//         .addCase(
//           updateProperty.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.updateLoading =
//               false;

//             state.updateError =
//               action.payload ||
//               "Unable to update property.";
//           }
//         );

//       /* =================================================
//          DELETE
//       ================================================= */

//       builder
//         .addCase(
//           deleteProperty.pending,
//           (state) => {
//             state.deleteLoading =
//               true;

//             state.deleteError =
//               null;
//           }
//         )

//         .addCase(
//           deleteProperty.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.deleteLoading =
//               false;

//             state.myProperties =
//               state.myProperties.filter(
//                 (item) =>
//                   item._id !==
//                   action.payload.id
//               );

//             if (
//               state.property?._id ===
//               action.payload.id
//             ) {
//               state.property = null;
//             }
//           }
//         )

//         .addCase(
//           deleteProperty.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.deleteLoading =
//               false;

//             state.deleteError =
//               action.payload ||
//               "Unable to delete property.";
//           }
//         );
//     },
//   });

// /* =====================================================
//    ACTIONS
// ===================================================== */

// export const {
//   clearPropertyError,
//   clearPropertyDetails,
//   clearCreatePropertyError,
//   clearUpdatePropertyError,
//   clearDeletePropertyError,
// } = propertySlice.actions;

// /* =====================================================
//    SELECTORS
// ===================================================== */

// export const selectProperties = (
//   state
// ) =>
//   state.properties.properties;

// export const selectProperty = (
//   state
// ) =>
//   state.properties.property;

// export const selectMyProperties = (
//   state
// ) =>
//   state.properties.myProperties;

// export const selectPropertiesLoading = (
//   state
// ) =>
//   state.properties.loading;

// export const selectPropertyLoading = (
//   state
// ) =>
//   state.properties.propertyLoading;

// export const selectMyPropertiesLoading = (
//   state
// ) =>
//   state.properties.myPropertiesLoading;

// export const selectCreatePropertyLoading = (
//   state
// ) =>
//   state.properties.createLoading;

// export const selectUpdatePropertyLoading = (
//   state
// ) =>
//   state.properties.updateLoading;

// export const selectDeletePropertyLoading = (
//   state
// ) =>
//   state.properties.deleteLoading;

// export const selectPropertiesError = (
//   state
// ) =>
//   state.properties.error;

// export const selectPropertyError = (
//   state
// ) =>
//   state.properties.propertyError;

// export const selectMyPropertiesError = (
//   state
// ) =>
//   state.properties.myPropertiesError;

// export const selectCreatePropertyError = (
//   state
// ) =>
//   state.properties.createError;

// export const selectUpdatePropertyError = (
//   state
// ) =>
//   state.properties.updateError;

// export const selectDeletePropertyError = (
//   state
// ) =>
//   state.properties.deleteError;

// export default propertySlice.reducer;




import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api";

/* =====================================================
   GET PUBLIC PROPERTIES
   GET /api/properties
===================================================== */

export const getProperties = createAsyncThunk(
  "properties/getProperties",

  async (params = {}, { rejectWithValue }) => {
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
        `${API_URL}/properties${
          queryString ? `?${queryString}` : ""
        }`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message ||
            "Unable to fetch properties."
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
   GET SINGLE PROPERTY
   GET /api/properties/:id
===================================================== */

export const getPropertyById = createAsyncThunk(
  "properties/getPropertyById",

  async (
    id,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/properties/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message ||
            "Unable to fetch property."
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
   GET MY PROPERTIES
   GET /api/properties/my
===================================================== */

export const getMyProperties = createAsyncThunk(
  "properties/getMyProperties",

  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/properties/my`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message ||
            "Unable to fetch your properties."
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
   CREATE PROPERTY
   POST /api/properties
===================================================== */

export const createProperty = createAsyncThunk(
  "properties/createProperty",

  async (
    propertyData,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/properties`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            propertyData
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message ||
            "Unable to create property."
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
   UPDATE PROPERTY
   PUT /api/properties/:id
===================================================== */

export const updateProperty = createAsyncThunk(
  "properties/updateProperty",

  async (
    { id, propertyData },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/properties/${id}`,
        {
          method: "PUT",
          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            propertyData
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message ||
            "Unable to update property."
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
   DELETE PROPERTY
   DELETE /api/properties/:id
===================================================== */

export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",

  async (
    id,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/properties/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message ||
            "Unable to delete property."
        );
      }

      return {
        ...data,
        id,
      };
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

/* =====================================================
   SLICE
===================================================== */

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

    /*
      Compatibility action for PropertyDetails.jsx
    */
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
  },

  extraReducers: (builder) => {
    /* =================================================
       GET PROPERTIES
    ================================================= */

    builder
      .addCase(
        getProperties.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getProperties.fulfilled,
        (state, action) => {
          state.loading = false;

          state.properties =
            action.payload?.properties || [];

          state.total =
            action.payload?.total || 0;

          state.page =
            action.payload?.page || 1;

          state.pages =
            action.payload?.pages || 0;
        }
      )

      .addCase(
        getProperties.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Unable to fetch properties.";
        }
      );

    /* =================================================
       GET SINGLE PROPERTY
    ================================================= */

    builder
      .addCase(
        getPropertyById.pending,
        (state) => {
          state.propertyLoading = true;
          state.propertyError = null;
          state.property = null;
        }
      )

      .addCase(
        getPropertyById.fulfilled,
        (state, action) => {
          state.propertyLoading = false;

          state.property =
            action.payload?.property ||
            null;
        }
      )

      .addCase(
        getPropertyById.rejected,
        (state, action) => {
          state.propertyLoading = false;

          state.propertyError =
            action.payload ||
            "Unable to fetch property.";

          state.property = null;
        }
      );

    /* =================================================
       MY PROPERTIES
    ================================================= */

    builder
      .addCase(
        getMyProperties.pending,
        (state) => {
          state.myPropertiesLoading = true;
          state.myPropertiesError = null;
        }
      )

      .addCase(
        getMyProperties.fulfilled,
        (state, action) => {
          state.myPropertiesLoading = false;

          state.myProperties =
            action.payload?.properties ||
            [];
        }
      )

      .addCase(
        getMyProperties.rejected,
        (state, action) => {
          state.myPropertiesLoading = false;

          state.myPropertiesError =
            action.payload ||
            "Unable to fetch your properties.";
        }
      );

    /* =================================================
       CREATE
    ================================================= */

    builder
      .addCase(
        createProperty.pending,
        (state) => {
          state.createLoading = true;
          state.createError = null;
        }
      )

      .addCase(
        createProperty.fulfilled,
        (state, action) => {
          state.createLoading = false;

          const property =
            action.payload?.property;

          if (property) {
            state.myProperties.unshift(
              property
            );
          }
        }
      )

      .addCase(
        createProperty.rejected,
        (state, action) => {
          state.createLoading = false;

          state.createError =
            action.payload ||
            "Unable to create property.";
        }
      );

    /* =================================================
       UPDATE
    ================================================= */

    builder
      .addCase(
        updateProperty.pending,
        (state) => {
          state.updateLoading = true;
          state.updateError = null;
        }
      )

      .addCase(
        updateProperty.fulfilled,
        (state, action) => {
          state.updateLoading = false;

          const updatedProperty =
            action.payload?.property;

          if (!updatedProperty) {
            return;
          }

          state.property =
            updatedProperty;

          const index =
            state.myProperties.findIndex(
              (item) =>
                item._id ===
                updatedProperty._id
            );

          if (index !== -1) {
            state.myProperties[index] =
              updatedProperty;
          }

          const publicIndex =
            state.properties.findIndex(
              (item) =>
                item._id ===
                updatedProperty._id
            );

          if (publicIndex !== -1) {
            state.properties[
              publicIndex
            ] = updatedProperty;
          }
        }
      )

      .addCase(
        updateProperty.rejected,
        (state, action) => {
          state.updateLoading = false;

          state.updateError =
            action.payload ||
            "Unable to update property.";
        }
      );

    /* =================================================
       DELETE
    ================================================= */

    builder
      .addCase(
        deleteProperty.pending,
        (state) => {
          state.deleteLoading = true;
          state.deleteError = null;
        }
      )

      .addCase(
        deleteProperty.fulfilled,
        (state, action) => {
          state.deleteLoading = false;

          state.myProperties =
            state.myProperties.filter(
              (item) =>
                item._id !==
                action.payload.id
            );

          state.properties =
            state.properties.filter(
              (item) =>
                item._id !==
                action.payload.id
            );

          if (
            state.property?._id ===
            action.payload.id
          ) {
            state.property = null;
          }
        }
      )

      .addCase(
        deleteProperty.rejected,
        (state, action) => {
          state.deleteLoading = false;

          state.deleteError =
            action.payload ||
            "Unable to delete property.";
        }
      );
  },
});

/* =====================================================
   ACTIONS
===================================================== */

export const {
  clearPropertyError,
  clearPropertyDetails,
  clearSelectedProperty,
  clearCreatePropertyError,
  clearUpdatePropertyError,
  clearDeletePropertyError,
} = propertySlice.actions;

/* =====================================================
   SELECTORS
===================================================== */

export const selectProperties = (state) =>
  state.properties.properties;

export const selectProperty = (state) =>
  state.properties.property;

/*
  Compatibility selector for PropertyDetails.jsx
*/
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

/*
  Compatibility selector for PropertyDetails.jsx
*/
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

/* =====================================================
   DEFAULT EXPORT
===================================================== */

export default propertySlice.reducer;