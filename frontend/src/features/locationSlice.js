import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

// Async thunk to fetch countries
export const fetchCountries = createAsyncThunk(
  'location/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/location/country');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk to submit countries
export const createCountries = createAsyncThunk(
  'location/createCountries',
  async (countries, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/location/country', countries);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk to delete countries
export const deleteCountry = createAsyncThunk(
  'location/deleteCountry',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/location/country/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating country
export const updateCountry = createAsyncThunk(
  'location/updateCountry',
  async (data, thunkAPI) => {
    try {
      // Prepare payload for the API
      const countryName = { name: data.name }; 
      const response = await axiosInstance.put(`/location/country/${data.id}`, countryName);
      return response.data; // Return the updated country data
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'Failed to update country';
        return thunkAPI.rejectWithValue(errorMessage); // Provide a meaningful error message
      } else {
        return thunkAPI.rejectWithValue('Something went wrong'); // Handle unexpected errors
      }
    }
  }
);


// Async thunk to fetch states based on selected country
export const fetchStates = createAsyncThunk(
  'location/fetchStates',
  async (countryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/location/state/${countryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk to submit state
export const createStates = createAsyncThunk(
  'location/createStates',
  async (states, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/location/state', states);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateState = createAsyncThunk(
  'location/updateState',
  async (states, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/location/state/${states.selectedId}`, states);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk to delete state
export const deleteState = createAsyncThunk(
  'location/deleteState',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/location/state/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch districts based on selected state
export const fetchDistricts = createAsyncThunk(
  'location/fetchDistricts',
  async (stateId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/location/district/${stateId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllDistricts = createAsyncThunk(
  'location/fetchAllDistricts',
  async (query, { rejectWithValue }) => {
    try {
      const { mode='' } = query || {};
      const response = await axiosInstance.get(`/location/district/-1`, {
        params: { mode },
    });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDistrict = createAsyncThunk(
  'location/updateDistrict',
  async (district, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/location/district/${district.selectedId}`, district);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createDistricts = createAsyncThunk(
  'location/createDistricts',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/location/district', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDistrict = createAsyncThunk(
  'location/deleteDistrict',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/location/district/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    countries: [],
    states: [],
    districts: [],
    loading: false,
    error: null,
    created: null,
    skipped: null,
    locationSuccess: false
  },
  reducers: {
    clearLocation: (state) => {
      state.loading = false;
      state.error = null;
      state.created = null;
      state.skipped = null;
      state.locationSuccess = false;
    },
    clearStates: (state) => {
      state.states = [];
    },
    clearDistricts: (state) => {
      state.districts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(createCountries.pending, (state) => {
        state.loading = true;
        state.locationSuccess = false;
      })
      .addCase(createCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload.data;
        state.created = action.payload.created;
        state.skipped = action.payload.skipped;
        state.locationSuccess = true;
      })
      .addCase(createCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        state.locationSuccess = false;
      })
      .addCase(deleteCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = state.countries.filter(
          (country) => country.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(updateCountry.pending, (state) => {
        state.loading = true;
        state.locationSuccess = false;
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.countries.findIndex(
          (countries) => countries.id === action.payload.id
        );
        if (index !== -1) {
          state.countries[index] = action.payload;
        }
        state.locationSuccess = true;
      })
      .addCase(updateCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(createStates.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload.data;
        state.created = action.payload.created;
        state.skipped = action.payload.skipped;
        state.locationSuccess = true;
      })
      .addCase(createStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(updateState.pending, (state, action) => {
        state.loading = true;
        state.locationSuccess = false;
      })
      .addCase(updateState.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.states.findIndex(
          (state) => state.id === action.payload.id
        );
        if (index !== -1) {
          state.states[index] = action.payload;
        }
        state.locationSuccess = true;
      })
      .addCase(updateState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(deleteState.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteState.fulfilled, (state, action) => {
        state.loading = false;
        state.states = state.states.filter(
          (state) => state.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(fetchDistricts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(createDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload.data;
        state.created = action.payload.created;
        state.skipped = action.payload.skipped;
        state.locationSuccess = true;
      })
      .addCase(createDistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(createDistricts.pending, (state, action) => {
        state.loading = true;
        state.locationSuccess = false;
      })
      .addCase(deleteDistrict.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = state.districts.filter(
          (district) => district.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(updateDistrict.pending, (state, action) => {
        state.loading = true;
        state.locationSuccess = false;
      })
      .addCase(updateDistrict.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.districts.findIndex(
          (district) => district.id === action.payload.id
        );
        if (index !== -1) {
          state.districts[index] = action.payload;
        }
        state.locationSuccess = true;
      })
      .addCase(updateDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(fetchAllDistricts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(fetchAllDistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
  },
});

export const { clearStates, clearDistricts, clearLocation } = locationSlice.actions;
export default locationSlice;