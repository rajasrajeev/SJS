import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchEarnings = createAsyncThunk(
  'earning/fetchEarnings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/earnings');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createEarning = createAsyncThunk(
  'earning/createEarning',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/earnings', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEarning = createAsyncThunk(
  'earning/updateEarning',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/master/earnings/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEarning = createAsyncThunk(
  'earning/deleteEarning',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/earnings/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const earningSlice = createSlice({
  name: 'earning',
  initialState: {
    earnings: [],
    loading: false,
    error: null,
    earningSuccess: false
  },
  reducers: {
    clearEarning: (state) => {
      state.loading = false;
      state.error = null;
      state.earningSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarnings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.earnings = action.payload;
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createEarning.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.earningSuccess = false;
      })
      .addCase(createEarning.fulfilled, (state, action) => {
        state.loading = false;
        state.earnings.push(action.payload)
        state.earningSuccess = true;
      })
      .addCase(createEarning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateEarning.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.earningSuccess = false;
      })
      .addCase(updateEarning.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.earnings.findIndex(
          (earning) => earning.id === action.payload.id
        );
        if (index !== -1) {
          state.earnings[index] = action.payload;
        }
        state.earningSuccess = true;
      })
      .addCase(updateEarning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteEarning.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEarning.fulfilled, (state, action) => {
        state.loading = false;
        state.earnings = state.earnings.filter(
          (earning) => earning.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteEarning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })
  },
});

export const { clearEarning } = earningSlice.actions;
export default earningSlice;