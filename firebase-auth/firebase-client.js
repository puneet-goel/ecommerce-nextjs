import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword,
} from 'firebase/auth';
import { firebaseAuth } from 'connections/firebaseClient.js';
import axios from 'axios';

export const signup = async (email, password) => {
	try {
		const auth = await createUserWithEmailAndPassword(
			firebaseAuth,
			email,
			password
		);

		await axios.post('/api/user', { email: auth.user.email });

		return true;
	} catch (err) {
		console.error(err.message);
		return false;
	}
};

export const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(firebaseAuth, email, password);
		return true;
	} catch (err) {
		console.error(err.message);
		return false;
	}
};

export const logout = async () => {
	try {
		if (window) {
			localStorage.clear();
		}

		await signOut(firebaseAuth);
		if (location) location.reload();
		return true;
	} catch (err) {
		console.error(err.message);
		return false;
	}
};

export const resetPassword = async (email) => {
	try {
		await sendPasswordResetEmail(firebaseAuth, email);
		return true;
	} catch (err) {
		console.error(err.message);
		return false;
	}
};

export const updateUserEmail = async (email) => {
	try {
		await updateEmail(firebaseAuth, email);
		return true;
	} catch (err) {
		console.error(err.message);
		return false;
	}
};

export const updateUserPassword = async (password) => {
	try {
		await updatePassword(firebaseAuth, password);
		return true;
	} catch (err) {
		console.error(err.message);
		return false;
	}
};
