import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchShifts = createAsyncThunk(
  'shift/fetchShifts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/shift');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createShift = createAsyncThunk(
  'shift/createShift',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/shift', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateShift = createAsyncThunk(
  'shift/updateShift',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/master/shift/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteShift = createAsyncThunk(
  'shift/deleteShift',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/shift/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const shiftSlice = createSlice({
  name: 'shift',
  initialState: {
    shifts: [],
    loading: false,
    error: null,
    shiftSuccess: false
  },
  reducers: {
    clearShift: (state) => {
      state.loading = false;
      state.error = null;
      state.shiftSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShifts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts = action.payload;
      })
      .addCase(fetchShifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createShift.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.shiftSuccess = false;
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts.push(action.payload)
        state.shiftSuccess = true;
      })
      .addCase(createShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateShift.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.shiftSuccess = false;
      })
      .addCase(updateShift.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shifts.findIndex(
          (shift) => shift.id === action.payload.id
        );
        if (index !== -1) {
          state.shifts[index] = action.payload;
        }
        state.shiftSuccess = true;
      })
      .addCase(updateShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteShift.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts = state.shifts.filter(
          (shift) => shift.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })
  },
});

export const { clearShift } = shiftSlice.actions;
export default shiftSlice;