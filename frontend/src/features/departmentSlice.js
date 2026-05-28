import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchDepartments = createAsyncThunk(
  'department/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/department');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createDepartment = createAsyncThunk(
  'department/createDepartment',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/department', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/master/department/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/department/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    departments: [],
    loading: false,
    error: null,
    departmentSuccess: false
  },
  reducers: {
    clearDepartment: (state) => {
      state.loading = false;
      state.error = null;
      state.departmentSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.departmentSuccess = false;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments.push(action.payload)
        state.departmentSuccess = true;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.departmentSuccess = false;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.departments.findIndex(
          (department) => department.id === action.payload.id
        );
        if (index !== -1) {
          state.departments[index] = action.payload;
        }
        state.departmentSuccess = true;
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter(
          (department) => department.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })
  },
});

export const { clearDepartment } = departmentSlice.actions;
export default departmentSlice;