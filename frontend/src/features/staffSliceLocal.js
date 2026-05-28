import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

// Async thunk to fetch staff list
export const fetchStaffList = createAsyncThunk(
    'staff/fetchStaffList',
    async (query, { rejectWithValue }) => {
        try {
            const { page = 1, perPage = 10, search = '' } = query || {};
            const response = await axiosInstance.get(`/firm/staff-list/`, {
                params: { page, perPage, search },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getStaff = createAsyncThunk(
    'staff/getStaff',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/firm/staff/details/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to create staff
export const createStaff = createAsyncThunk(
    'staff/createStaff',
    async (staffData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/firm/create-staff', staffData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to update staff
export const updateStaff = createAsyncThunk(
    'staff/updateStaff',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/firm/update-staff/${payload.id}`, payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete staff
export const deleteStaff = createAsyncThunk(
    'staff/deleteStaff',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/firm/delete-staff/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const staffSliceLocal = createSlice({
    name: 'staff',
    initialState: {
        staffList: {},
        staffDetail: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearStaffState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.staffDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaffList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStaffList.fulfilled, (state, action) => {
                state.loading = false;
                state.staffList = action.payload;
            })
            .addCase(fetchStaffList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
            })
            .addCase(getStaff.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStaff.fulfilled, (state, action) => {
                state.loading = false;
                state.staffDetail = action.payload;
            })
            .addCase(getStaff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
            })
            .addCase(createStaff.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(createStaff.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createStaff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
                state.success = false;
            })
            .addCase(updateStaff.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateStaff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
                state.success = false;
            })
            .addCase(deleteStaff.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.loading = false;
                state.staffList.data = Array.isArray(state.staffList.data) ? state.staffList.data.filter(
                    (staff) => staff.id !== parseInt(action.payload.id)
                  ) : [];
            })
            .addCase(deleteStaff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
            });
    },
});

export const { clearStaffState } = staffSliceLocal.actions;
export default staffSliceLocal;