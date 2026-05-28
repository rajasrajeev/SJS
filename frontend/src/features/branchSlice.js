import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

const initialState = {
  branches: [],
  loading: false,
  error: null,
  success: false
};

// Async thunk for creating a branch
export const createBranch = createAsyncThunk(
  'branches/createBranch',
  async (branchData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/firm/create-branch', branchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a branch
export const deleteBranch = createAsyncThunk(
  'branches/deleteBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/firm/delete-branch/${branchId}`);
      return branchId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a branch
export const updateBranch = createAsyncThunk(
  'branches/updateBranch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/firm/update-branch/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching the list of branches
export const fetchBranches = createAsyncThunk(
  'branches/fetchBranches',
  async (mod, { rejectWithValue }) => {
    try {
      const mode = mod ? mod : '';
      const response = await axiosInstance.get(`/firm/branch-list/?mod=${mode}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const branchSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    clearBranch: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.branches.push(action.payload);
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = state.branches.filter(
          (branch) => branch.id !== action.payload
        );
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.branches.findIndex(
          (branch) => branch.id === action.payload.id
        );
        if (index !== -1) {
          state.branches[index] = action.payload;
        }
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearBranch } = branchSlice.actions;
export default branchSlice;
