import { combineReducers, configureStore } from '@reduxjs/toolkit';
import products from './productSlice';

const combinedReducers = combineReducers({ products });

const store = configureStore({
	reducer: combinedReducers,
});

export default store;
