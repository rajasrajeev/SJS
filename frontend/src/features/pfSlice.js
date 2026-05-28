import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

// Async thunk to fetch PF data
export const fetchPfData = createAsyncThunk(
  'pf/fetchPfData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/pf');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create PF data
export const createPfData = createAsyncThunk(
  'pf/createPfData',
  async (pfData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/pf', pfData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update PF data
export const updatePfData = createAsyncThunk(
  'pf/updatePfData',
  async ({ id, pfData }, { rejectWithValue }) => {
    try {
      console.log('Updating PF data with ID:', id, 'and data:', pfData);
      const response = await axiosInstance.patch(`/master/pf/${id}`, pfData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete PF data
export const deletePfData = createAsyncThunk(
  'pf/deletePfData',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/pf/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const pfSlice = createSlice({
  name: 'pf',
  initialState: {
    pfData: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearPfState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch PF data
      .addCase(fetchPfData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPfData.fulfilled, (state, action) => {
        state.loading = false;
        state.pfData = action.payload;
      })
      .addCase(fetchPfData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch PF data';
      })

      // Create PF data
      .addCase(createPfData.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createPfData.fulfilled, (state, action) => {
        state.loading = false;
        state.pfData.push(action.payload);
        state.success = true;
      })
      .addCase(createPfData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create PF data';
      })

      // Update PF data
      .addCase(updatePfData.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updatePfData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pfData.findIndex((pf) => pf.id === action.payload.id);
        if (index !== -1) {
          state.pfData[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updatePfData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update PF data';
      })

      // Delete PF data
      .addCase(deletePfData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePfData.fulfilled, (state, action) => {
        state.loading = false;
        state.pfData = state.pfData.filter((pf) => pf.id !== action.payload.id);
      })
      .addCase(deletePfData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete PF data';
      });
  },
});

export const { clearPfState } = pfSlice.actions;
export default pfSlice;