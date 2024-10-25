import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    saveAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { saveAccount } = accountSlice.actions;

export default accountSlice.reducer;
