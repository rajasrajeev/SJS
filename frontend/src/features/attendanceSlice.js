import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

export const fetchMonthlyManualAttendance = createAsyncThunk(
  'attendance/fetchMonthlyManualAttendance',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/attendance/manual-monthly', {
        params: { month, year },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const upsertMonthlyManualAttendance = createAsyncThunk(
  'attendance/upsertMonthlyManualAttendance',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/attendance/manual-monthly', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    monthlyManual: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearAttendance: (state) => {
      state.monthlyManual = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyManualAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchMonthlyManualAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyManual = action.payload;
        state.success = false;
      })
      .addCase(fetchMonthlyManualAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot fetch attendance';
      })
      .addCase(upsertMonthlyManualAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(upsertMonthlyManualAttendance.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(upsertMonthlyManualAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot save attendance';
      });
  },
});

export const { clearAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;

