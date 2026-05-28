import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchFirm = createAsyncThunk(
  'firm/fetchFirm',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/firm/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateFirm = createAsyncThunk(
  'firm/updateFirm',
  async (payload, { rejectWithValue }) => {
    try {
      
      for (const [key, value] of payload.formData.entries()) {
        console.log(payload);
        console.log(`${key}: ${value}`);
      }
      const response = await axiosInstance.patch(`/firm/profile/${payload.id}`, payload.formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const firmSlice = createSlice({
  name: 'firm',
  initialState: {
    firm: null,
    loading: false,
    error: null,
    firmSuccess: false
  },
  reducers: {
    clearFirm: (state) => {
      state.loading = false;
      state.error = null;
      state.firmSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirm.fulfilled, (state, action) => {
        state.loading = false;
        state.firm = action.payload;
      })
      .addCase(fetchFirm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(updateFirm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.firmSuccess = false;
      })
      .addCase(updateFirm.fulfilled, (state, action) => {
        state.loading = false;
        state.firmSuccess = true;
      })
      .addCase(updateFirm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
  },
});

export const { clearFirm } = firmSlice.actions;
export default firmSlice;