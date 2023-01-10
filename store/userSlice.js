import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	users: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {},
		signup: (state, action) => {},
		logout: (state, action) => {},
	},
});

export default userSlice.reducer;
export const { login, signup, logout } = userSlice.actions;
