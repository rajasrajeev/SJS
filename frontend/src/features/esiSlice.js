import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

// Async thunk to fetch ESIC data
export const fetchEsiData = createAsyncThunk(
  'esi/fetchEsiData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/esic');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create ESIC data
export const createEsiData = createAsyncThunk(
  'esi/createEsiData',
  async (esiData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/esic', esiData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update ESIC data
export const updateEsiData = createAsyncThunk(
  'esi/updateEsiData',
  async ({ id, esiData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/master/esic/${id}`, esiData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete ESIC data
export const deleteEsiData = createAsyncThunk(
  'esi/deleteEsiData',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/esic/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const esiSlice = createSlice({
  name: 'esi',
  initialState: {
    esiData: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearEsiState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch ESIC data
      .addCase(fetchEsiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEsiData.fulfilled, (state, action) => {
        state.loading = false;
        state.esiData = action.payload;
      })
      .addCase(fetchEsiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch ESIC data';
      })

      // Create ESIC data
      .addCase(createEsiData.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createEsiData.fulfilled, (state, action) => {
        state.loading = false;
        state.esiData.push(action.payload);
        state.success = true;
      })
      .addCase(createEsiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create ESIC data';
      })

      // Update ESIC data
      .addCase(updateEsiData.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateEsiData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.esiData.findIndex((esi) => esi.id === action.payload.id);
        if (index !== -1) {
          state.esiData[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateEsiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update ESIC data';
      })

      // Delete ESIC data
      .addCase(deleteEsiData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEsiData.fulfilled, (state, action) => {
        state.loading = false;
        state.esiData = state.esiData.filter((esi) => esi.id !== action.payload.id);
      })
      .addCase(deleteEsiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete ESIC data';
      });
  },
});

export const { clearEsiState } = esiSlice.actions;
export default esiSlice;