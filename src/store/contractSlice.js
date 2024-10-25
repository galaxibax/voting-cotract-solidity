import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contract: {},
};

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    saveContract: (state, action) => {
      state.contract = action.payload;
    },
  },
});

export const { saveContract } = contractSlice.actions;

export default contractSlice.reducer;
