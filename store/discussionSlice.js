import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllDiscussions = createAsyncThunk(
	'discussion/fetchAllDiscussions',
	async () => {
		const {
			data: { data, message },
		} = await axios.get('/api/discussion/');

		if (message === 'error') {
			return [];
		} else {
			return data;
		}
	}
);

export const updateDiscussion = createAsyncThunk(
	'discussion/updateDiscussion',
	async (updatedDiscussion) => {
		const {
			data: { data, message },
		} = await axios.patch('/api/discussion/', updatedDiscussion);

		if (message === 'error') {
			return [];
		} else {
			return data;
		}
	}
);

export const createDiscussion = createAsyncThunk(
	'discussion/createDiscussion',
	async (newDiscussion) => {
		const {
			data: { data, message },
		} = await axios.post('/api/discussion/', newDiscussion);

		if (message === 'error') {
			return null;
		} else {
			return data;
		}
	}
);

export const updateView = createAsyncThunk(
	'discussion/updateView',
	async (discussionId) => {
		const {
			data: { data, message },
		} = await axios.patch('/api/discussion/updateView/', {
			discussionId: discussionId,
		});

		if (message === 'error') {
			return [];
		} else {
			return data;
		}
	}
);

const initialState = {
	discussions: [],
};

const discussionSlice = createSlice({
	name: 'discussion',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllDiscussions.fulfilled, (state, action) => {
				state.discussions = action.payload;
			})
			.addCase(updateDiscussion.fulfilled, (state, action) => {
				state.discussions.forEach((cur, idx) => {
					if (cur._id === action.payload._id) {
						state.discussions[idx] = action.payload;
					}
				});
			})
			.addCase(createDiscussion.fulfilled, (state, action) => {
				state.discussions.push(action.payload);
			})
			.addCase(updateView.fulfilled, (state, action) => {
				state.discussions.forEach((cur, idx) => {
					if (cur._id === action.payload._id) {
						state.discussions[idx] = action.payload;
					}
				});
			});
	},
});

export default discussionSlice.reducer;
