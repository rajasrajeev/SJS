import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchOvertimes = createAsyncThunk(
  'overtime/fetchOvertimes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/overtime');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createOvertime = createAsyncThunk(
  'overtime/createOvertime',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/overtime', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOvertime = createAsyncThunk(
  'overtime/updateOvertime',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/master/overtime/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOvertime = createAsyncThunk(
  'overtime/deleteOvertime',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/overtime/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const overtimeSlice = createSlice({
  name: 'overtime',
  initialState: {
    overtimes: [],
    loading: false,
    error: null,
    overtimeSuccess: false
  },
  reducers: {
    clearOvertime: (state) => {
      state.loading = false;
      state.error = null;
      state.overtimeSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOvertimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOvertimes.fulfilled, (state, action) => {
        state.loading = false;
        state.overtimes = action.payload;
      })
      .addCase(fetchOvertimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createOvertime.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.overtimeSuccess = false;
      })
      .addCase(createOvertime.fulfilled, (state, action) => {
        state.loading = false;
        state.overtimes.push(action.payload)
        state.overtimeSuccess = true;
      })
      .addCase(createOvertime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateOvertime.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.overtimeSuccess = false;
      })
      .addCase(updateOvertime.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.overtimes.findIndex(
          (overtime) => overtime.id === action.payload.id
        );
        if (index !== -1) {
          state.overtimes[index] = action.payload;
        }
        state.overtimeSuccess = true;
      })
      .addCase(updateOvertime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteOvertime.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOvertime.fulfilled, (state, action) => {
        state.loading = false;
        state.overtimes = state.overtimes.filter(
          (overtime) => overtime.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteOvertime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })
  },
});

export const { clearOvertime } = overtimeSlice.actions;
export default overtimeSlice;