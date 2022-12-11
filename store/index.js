import { combineReducers, configureStore } from '@reduxjs/toolkit';

import users from './userSlice';
import discussions from './discussionSlice';

const combinedReducers = combineReducers({
	users,
	discussions,
});

const store = configureStore({
	reducer: combinedReducers,
});

export default store;
