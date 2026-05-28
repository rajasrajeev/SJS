import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchDesignations = createAsyncThunk(
  'designation/fetchDesignations',
  async (department_id, { rejectWithValue }) => {
    try {
      const query = { 'department_id': department_id };
      const response = await axiosInstance.get('/master/designation', { params: query });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createDesignation = createAsyncThunk(
  'designation/createDesignation',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/designation', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDesignation = createAsyncThunk(
  'designation/updateDesignation',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/master/designation/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDesignation = createAsyncThunk(
  'designation/deleteDesignation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/designation/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const designationSlice = createSlice({
  name: 'designation',
  initialState: {
    designations: [],
    loading: false,
    error: null,
    designationSuccess: false
  },
  reducers: {
    clearDesignation: (state) => {
      state.loading = false;
      state.error = null;
      state.designationSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.loading = false;
        state.designations = action.payload;
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createDesignation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.designationSuccess = false;
      })
      .addCase(createDesignation.fulfilled, (state, action) => {
        state.loading = false;
        state.designations.push(action.payload)
        state.designationSuccess = true;
      })
      .addCase(createDesignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateDesignation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.designationSuccess = false;
      })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        const index = state.designations.findIndex(
          (designation) => designation.id === action.payload.id
        );
        if (index !== -1) {
          state.designations[index] = action.payload;
        }
        state.designationSuccess = true;
      })
      .addCase(updateDesignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteDesignation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.loading = false;
        state.designations = state.designations.filter(
          (designation) => designation.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteDesignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })
  },
});

export const { clearDesignation } = designationSlice.actions;
export default designationSlice;