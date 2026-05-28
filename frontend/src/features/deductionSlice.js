import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

export const fetchDeductions = createAsyncThunk(
  'deduction/fetchDeductions',
  async (payload, { rejectWithValue }) => {
    try {
      var query = ``;
      if(payload)
        query=`?page=${payload.page}&perPage=${payload.perPage}&search=${payload.search}`;
        if(payload.deduction_id)
          query+=`&deduction_id=${payload.deduction_id}`
        if(payload.emp_id)
          query+=`&emp_id=${payload.emp_id}`;
        if(payload.unwanted)
          query+=`&unwanted=${payload.unwanted}`;
        if(payload.unrecover)
          query+=`&unrecover=${payload.unrecover}`;
      const response = await axiosInstance.get('/deduction'+ query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createDeduction = createAsyncThunk(
  'deduction/createDeduction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/deduction', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDeduction = createAsyncThunk(
  'deduction/updateDeduction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/deduction/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDeduction = createAsyncThunk(
  'deduction/deleteDeduction',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/deduction/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deductionSlice = createSlice({
  name: 'deduction',
  initialState: {
    deductionMain: [],
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
      .addCase(fetchDeductions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeductions.fulfilled, (state, action) => {
        state.loading = false;
        state.deductionMain = action.payload;
      })
      .addCase(fetchDeductions.rejected, (state, action) => {
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
        state.deductionMain.data.push(action.payload);
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
        const index = state.deductionMain.data.findIndex(
          (deduction) => deduction.id === action.payload.id
        );
        if (index !== -1) {
          state.deductionMain[index] = action.payload;
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
        state.deductionMain = state.deductionMain.data.filter(
          (deduction) => deduction.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      });
  },
});

export const { clearDeduction } = deductionSlice.actions;
export default deductionSlice;
