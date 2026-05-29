import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

export const fetchMonthlyEarningMasters = createAsyncThunk(
  'earningsMonthly/fetchMonthlyEarningMasters',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/earnings/monthly-master', { params: query });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMonthlyEarningMasterDetails = createAsyncThunk(
  'earningsMonthly/fetchMonthlyEarningMasterDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/earnings/monthly-master/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createMonthlyEarningMaster = createAsyncThunk(
  'earningsMonthly/createMonthlyEarningMaster',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/earnings/monthly-master', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateMonthlyEarningMaster = createAsyncThunk(
  'earningsMonthly/updateMonthlyEarningMaster',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/earnings/monthly-master/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMonthlyEarningMaster = createAsyncThunk(
  'earningsMonthly/deleteMonthlyEarningMaster',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/earnings/monthly-master/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createMonthlyEarning = createAsyncThunk(
  'earningsMonthly/createMonthlyEarning',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/earnings/monthly', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateMonthlyEarning = createAsyncThunk(
  'earningsMonthly/updateMonthlyEarning',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/earnings/monthly/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchMonthlyEarnings = createAsyncThunk(
  'earningsMonthly/fetchMonthlyEarnings',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/earnings/monthly', { params: query });
      console.log("response->monthly-earning", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const earningsMonthlySlice = createSlice({
  name: 'earningsMonthly',
  initialState: {
    monthlyEarningMasters: null,
    monthlyEarningMasterDetails: null,
    monthlyEarnings: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearEarningsMonthlyState: (state) => {
      state.monthlyEarningMasters = null;
      state.monthlyEarningMasterDetails = null;
      state.monthlyEarnings = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyEarningMasters.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchMonthlyEarningMasters.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyEarningMasters = action.payload;
      })
      .addCase(fetchMonthlyEarningMasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot fetch earnings monthly masters';
      })
      .addCase(fetchMonthlyEarningMasterDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyEarningMasterDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyEarningMasterDetails = action.payload;
      })
      .addCase(fetchMonthlyEarningMasterDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot fetch details';
      })
      .addCase(createMonthlyEarningMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createMonthlyEarningMaster.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createMonthlyEarningMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot create monthly earning master';
      })
      .addCase(updateMonthlyEarningMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMonthlyEarningMaster.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateMonthlyEarningMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot update monthly earning master';
      })
      .addCase(createMonthlyEarning.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createMonthlyEarning.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createMonthlyEarning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cannot create monthly earning';
      });
  },
});

export const { clearEarningsMonthlyState } = earningsMonthlySlice.actions;
export default earningsMonthlySlice.reducer;

