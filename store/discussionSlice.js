import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllDiscussions = createAsyncThunk(
	'discussion/fetchAllDiscussions',
	async () => {
		const {
			data: { data },
		} = await axios.get('/api/discussion/');

		return data;
	}
);

export const updateDiscussion = createAsyncThunk(
	'discussion/updateDiscussion',
	async (updatedDiscussion) => {
		const {
			data: { data },
		} = await axios.patch('/api/discussion/', updatedDiscussion);

		return data;
	}
);

export const createDiscussion = createAsyncThunk(
	'discussion/createDiscussion',
	async (newDiscussion) => {
		const {
			data: { data },
		} = await axios.post('/api/discussion/', newDiscussion);

		return data;
	}
);

export const updateView = createAsyncThunk(
	'discussion/updateView',
	async (discussionId) => {
		const {
			data: { data },
		} = await axios.patch('/api/discussion/updateView/', {
			discussionId: discussionId,
		});

		return data;
	}
);

export const updateVote = createAsyncThunk(
	'discussion/updateVote',
	async (voteData) => {
		const {
			data: { data },
		} = await axios.patch('/api/discussion/updateVote/', voteData);

		return data;
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
			})
			.addCase(updateVote.fulfilled, (state, action) => {
				state.discussions.forEach((cur, idx) => {
					if (cur._id === action.payload._id) {
						state.discussions[idx] = action.payload;
					}
				});
			});
	},
});

export default discussionSlice.reducer;
