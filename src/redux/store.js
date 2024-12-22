// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSLice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
