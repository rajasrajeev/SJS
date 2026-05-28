import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchLeaves = createAsyncThunk(
  'leave/fetchLeaves',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/leave');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createLeave = createAsyncThunk(
  'leave/createLeave',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/leave', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLeave = createAsyncThunk(
  'leave/updateLeave',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/master/leave/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLeave = createAsyncThunk(
  'leave/deleteLeave',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/leave/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const leaveSlice = createSlice({
  name: 'leave',
  initialState: {
    leaves: [],
    loading: false,
    error: null,
    leaveSuccess: false
  },
  reducers: {
    clearLeave: (state) => {
      state.loading = false;
      state.error = null;
      state.leaveSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.leaveSuccess = false;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves.push(action.payload)
        state.leaveSuccess = true;
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.leaveSuccess = false;
      })
      .addCase(updateLeave.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.leaves.findIndex(
          (leave) => leave.id === action.payload.id
        );
        if (index !== -1) {
          state.leaves[index] = action.payload;
        }
        state.leaveSuccess = true;
      })
      .addCase(updateLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteLeave.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = state.leaves.filter(
          (leave) => leave.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })
  },
});

export const { clearLeave } = leaveSlice.actions;
export default leaveSlice;