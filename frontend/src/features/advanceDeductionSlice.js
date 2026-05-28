import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

export const fetchAdvanceDeductions = createAsyncThunk(
  'advanceDeduction/fetchAdvanceDeductions',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/deduction/monthly-advance', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAdvanceDeductionById = createAsyncThunk(
  'advanceDeduction/fetchAdvanceDeductionById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/deduction/monthly-advance/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAdvanceDeduction = createAsyncThunk(
  'advanceDeduction/createAdvanceDeduction',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/deduction/monthly-advance', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAdvanceDeduction = createAsyncThunk(
  'advanceDeduction/updateAdvanceDeduction',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/deduction/monthly-advance/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAdvanceDeduction = createAsyncThunk(
  'advanceDeduction/deleteAdvanceDeduction',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/deduction/monthly-advance/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const advanceDeductionSlice = createSlice({
  name: 'advanceDeduction',
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
      .addCase(fetchAdvanceDeductions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdvanceDeductions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdvanceDeductions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAdvanceDeduction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAdvanceDeduction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAdvanceDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAdvanceDeduction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAdvanceDeduction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateAdvanceDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdvanceDeduction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteAdvanceDeduction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteAdvanceDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetSuccess } = advanceDeductionSlice.actions;

export default advanceDeductionSlice.reducer;
