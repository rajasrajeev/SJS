/*

Purpose For handling state for FIRM MASTER's Deductions

*/


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchMasterDeductions = createAsyncThunk(
  'deductionMaster/fetchMasterDeductions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/deduction');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createDeduction = createAsyncThunk(
  'deductionMaster/createDeduction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/deduction', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDeduction = createAsyncThunk(
  'deductionMaster/updateDeduction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/master/deduction/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDeduction = createAsyncThunk(
  'deductionMaster/deleteDeduction',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/deduction/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deductionMasterSlice = createSlice({
  name: 'deductionMaster',
  initialState: {
    deductions: [],
    loading: false,
    error: null,
    deductionSuccess: false
  },
  reducers: {
    clearDeduction: (state) => {
      state.loading = false;
      state.error = null;
      state.deductionSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasterDeductions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMasterDeductions.fulfilled, (state, action) => {
        state.loading = false;
        state.deductions = action.payload;
        state.meta = action.payload.meta;
      })
      .addCase(fetchMasterDeductions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createDeduction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deductionSuccess = false;
      })
      .addCase(createDeduction.fulfilled, (state, action) => {
        state.loading = false;
        state.deductions.push(action.payload)
        state.deductionSuccess = true;
      })
      .addCase(createDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateDeduction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deductionSuccess = false;
      })
      .addCase(updateDeduction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.deductions.findIndex(
          (deduction) => deduction.id === action.payload.id
        );
        if (index !== -1) {
          state.deductions[index] = action.payload;
        }
        state.deductionSuccess = true;
      })
      .addCase(updateDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteDeduction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDeduction.fulfilled, (state, action) => {
        state.loading = false;
        state.deductions = state.deductions.filter(
          (deduction) => deduction.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })
  },
});

export const { clearDeduction } = deductionMasterSlice.actions;
export default deductionMasterSlice;