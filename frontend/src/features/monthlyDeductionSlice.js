import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

export const fetchMonthlyDeductions = createAsyncThunk(
  'monthlyDeduction/fetchMonthlyDeductions',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/deduction/monthly-monthly', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMonthlyDeductionById = createAsyncThunk(
  'monthlyDeduction/fetchMonthlyDeductionById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/deduction/monthly-monthly/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createMonthlyDeduction = createAsyncThunk(
  'monthlyDeduction/createMonthlyDeduction',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/deduction/monthly-monthly', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMonthlyDeduction = createAsyncThunk(
  'monthlyDeduction/updateMonthlyDeduction',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/deduction/monthly-monthly/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMonthlyDeduction = createAsyncThunk(
  'monthlyDeduction/deleteMonthlyDeduction',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/deduction/monthly-monthly/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const monthlyDeductionSlice = createSlice({
  name: 'monthlyDeduction',
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSuccess(state) {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyDeductions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyDeductions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMonthlyDeductions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createMonthlyDeduction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createMonthlyDeduction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createMonthlyDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMonthlyDeduction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMonthlyDeduction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateMonthlyDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMonthlyDeduction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteMonthlyDeduction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteMonthlyDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetSuccess } = monthlyDeductionSlice.actions;

export default monthlyDeductionSlice.reducer;
