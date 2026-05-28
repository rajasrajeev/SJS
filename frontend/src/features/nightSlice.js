import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchNights = createAsyncThunk(
  'night/fetchNights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/night');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createNight = createAsyncThunk(
  'night/createNight',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/night', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNight = createAsyncThunk(
  'night/updateNight',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/master/night/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNight = createAsyncThunk(
  'night/deleteNight',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/night/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const nightSlice = createSlice({
  name: 'night',
  initialState: {
    nights: [],
    loading: false,
    error: null,
    nightSuccess: false
  },
  reducers: {
    clearNight: (state) => {
      state.loading = false;
      state.error = null;
      state.nightSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNights.fulfilled, (state, action) => {
        state.loading = false;
        state.nights = action.payload;
      })
      .addCase(fetchNights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createNight.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.nightSuccess = false;
      })
      .addCase(createNight.fulfilled, (state, action) => {
        state.loading = false;
        state.nights.push(action.payload)
        state.nightSuccess = true;
      })
      .addCase(createNight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateNight.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.nightSuccess = false;
      })
      .addCase(updateNight.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.nights.findIndex(
          (night) => night.id === action.payload.id
        );
        if (index !== -1) {
          state.nights[index] = action.payload;
        }
        state.nightSuccess = true;
      })
      .addCase(updateNight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteNight.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNight.fulfilled, (state, action) => {
        state.loading = false;
        state.nights = state.nights.filter(
          (night) => night.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteNight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })
  },
});

export const { clearNight } = nightSlice.actions;
export default nightSlice;