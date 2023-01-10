import { combineReducers, configureStore } from '@reduxjs/toolkit';

import users from './userSlice';
import products from './productSlice';

const combinedReducers = combineReducers({
	users,
	products,
});

const store = configureStore({
	reducer: combinedReducers,
});

export default store;
