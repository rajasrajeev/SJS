import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

// Async thunk to fetch staff list
export const fetchEmployees = createAsyncThunk(
    'employee/fetchEmployees',
    async (query, { rejectWithValue }) => {
        try {
            const { page = 1,
                 perPage = 10, 
                 search = '' ,
                 filters = {}
                } = query || {};
            const { department_id = '', branch_id = '', designation_id = '' } = filters;
            const response = await axiosInstance.get(`/employee`, {
                params: { page, perPage, search,department_id,branch_id,designation_id },
            });
           // console.log("Employee Data",JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createEmployee = createAsyncThunk(
    'employee/createEmployee',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/employee', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchEmployeeById = createAsyncThunk(
    'employee/fetchEmployeeById',
    async (empId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/employee/${empId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (Employee, { rejectWithValue }) => {
        try {
                // Log the FormData for debugging
    for (let [key, value] of Employee.formData.entries()) {
        console.log(`${key}:`, value);
    }
            const response = await axiosInstance.patch(`/employee/${Employee.id}`, Employee.formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete Employee
export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/employee/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees:{},
        employeeDetail: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearEmployeeState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.employeeDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
            })
            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                //state.employees.push(action.payload)
                state.success = true;
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Cannot create";
            })
            .addCase(fetchEmployeeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeDetail = action.payload;
            })
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
            })
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
                state.success = false;
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.data = Array.isArray(state.employees.data) ? state.employees.data.filter(
                    (employe) => employe.id !== parseInt(action.payload.id)
                ) : [];
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
            });
    },
});

export const { clearEmployeeState } = employeeSlice.actions;
export default employeeSlice;