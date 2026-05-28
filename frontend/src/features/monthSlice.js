import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMonth: new Date().toISOString().slice(0, 7), // default to current month YYYY-MM
};

const monthSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setSelectedMonth } = monthSlice.actions;
export default monthSlice.reducer;
