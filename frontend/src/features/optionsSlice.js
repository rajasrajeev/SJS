import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

export const fetchDeductionTypes = createAsyncThunk(
  'options/fetchDeductionTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/options/deduction-types');
      return response.data?.options || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDeductionCategories = createAsyncThunk(
  'options/fetchDeductionCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/options/deduction-categories');
      return response.data?.options || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMonths = createAsyncThunk(
  'options/fetchMonths',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/options/months');
      return response.data?.options || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFirmStatusOptions = createAsyncThunk(
  'options/fetchFirmStatusOptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/options/firm-status');
      return response.data?.options || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFirmTypeOptions = createAsyncThunk(
  'options/fetchFirmTypeOptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/options/firm-type');
      return response.data?.options || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    deductionTypes: [],
    deductionCategories: [],
    months: [],
    firmStatusOptions: [],
    firmTypeOptions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOptions: (state) => {
        state.loading = false;
        state.error = null;
        state.deductionTypes = [];
        state.deductionCategories = [];
        state.months = [];
        state.firmStatusOptions = [];
        state.firmTypeOptions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeductionTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeductionTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.deductionTypes = action.payload;
      })
      .addCase(fetchDeductionTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot fetch deduction types';
      })
      .addCase(fetchDeductionCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeductionCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.deductionCategories = action.payload;
      })
      .addCase(fetchDeductionCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot fetch deduction categories';
      })
      .addCase(fetchMonths.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonths.fulfilled, (state, action) => {
        state.loading = false;
        state.months = action.payload;
      })
      .addCase(fetchMonths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot fetch months';
      })
      .addCase(fetchFirmStatusOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirmStatusOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.firmStatusOptions = action.payload;
      })
      .addCase(fetchFirmStatusOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot fetch firm status options';
      })
      .addCase(fetchFirmTypeOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirmTypeOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.firmTypeOptions = action.payload;
      })
      .addCase(fetchFirmTypeOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot fetch firm type options';
      });
  },
});


export const { clearOptions } = optionsSlice.actions;
export default optionsSlice.reducer;

