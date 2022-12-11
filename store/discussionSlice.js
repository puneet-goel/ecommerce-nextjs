import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	discussions: [],
};

const discussionSlice = createSlice({
	name: 'discussion',
	initialState,
	reducers: {
		get: (state, action) => {},
		update: (state, action) => {},
		createTopic: (state, action) => {},
	},
});

export default discussionSlice.reducer;
export const { get, update, createTopic } = discussionSlice.actions;
