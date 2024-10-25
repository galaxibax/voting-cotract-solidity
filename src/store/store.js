import { configureStore } from '@reduxjs/toolkit';
import contractReducer from './contractSlice'; 
import accountReducer from './accountSlice';

const store = configureStore({
  reducer: {
    contract : contractReducer, 
    account :  accountReducer
  },
});

export default store;
