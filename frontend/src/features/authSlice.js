import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';
import history from '../utils/history';

const initialState = {
    loading: false,
    user: null,
    authError: null,
    success: false,
    emailSuccess: false,
    otpSuccess: false,
    resetSuccess: false,
    resetId: null
}

export const login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.post('auth/login', data);
            return res.data;
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                return thunkAPI.rejectWithValue(errorMessage);
            } else {
                return thunkAPI.rejectWithValue('Something went wrong');
            }
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.post('auth/forgot-password', data);
            return res.data;
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                return thunkAPI.rejectWithValue(errorMessage);
            } else {
                return thunkAPI.rejectWithValue('Something went wrong');
            }
        }
    }
);

export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.post('auth/verify-otp', data);
            return res.data;
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                return thunkAPI.rejectWithValue(errorMessage);
            } else {
                return thunkAPI.rejectWithValue('Something went wrong');
            }
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.post('accounts/reset-password', data);
            return res.data;
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                return thunkAPI.rejectWithValue(errorMessage);
            } else {
                return thunkAPI.rejectWithValue('Something went wrong');
            }
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: {
            reducer: (state, action) => {
                state.authError = null;
                state.user = null;
                localStorage.clear();
                history.push('/');
            }
        },

        clearState: {
            reducer: (state, action) => {
                state.authError = null;
                state.success = false;
                state.emailSuccess = false;
                state.otpSuccess = false;
                state.resetSuccess = false;
            }
        }
    },

    extraReducers:(builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.authError = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem("menu", JSON.stringify(action.payload.menu));
            localStorage.setItem("access_token", state.user.token.token);
            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + state.user.token.token;
            //localStorage.setItem("user_role", state.user.user.role);
            localStorage.setItem("user_id", state.user.user.id);
            localStorage.setItem("user_name", state.user.user.email);
            localStorage.setItem("da_type", JSON.stringify(action.payload.da_type));
            //localStorage.setItem("mod", JSON.stringify(state.user.mod));
            history.push("/firm-dashboard");
            
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.authError = action.payload;
        })
        .addCase(forgotPassword.pending, (state, action) => {
            state.loading = true;
            state.emailSuccess = false;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.emailSuccess = true;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.authError = action.payload;
        })
        .addCase(verifyOTP.pending, (state, action) => {
            state.loading = true;
            state.otpSuccess = false;
        })
        .addCase(verifyOTP.fulfilled, (state, action) => {
            state.loading = false;
            state.otpSuccess = true;
            state.resetId = action.payload.id;
        })
        .addCase(verifyOTP.rejected, (state, action) => {
            state.loading = false;
            state.authError = action.payload;
        })
        .addCase(resetPassword.pending, (state, action) => {
            state.loading = true;
            state.resetSuccess = false;
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.resetSuccess = true;
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.authError = action.payload;
        })
    }
});

export const { logout, clearState } = authSlice.actions;
export default authSlice;