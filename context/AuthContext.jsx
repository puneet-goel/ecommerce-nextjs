import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword,
} from 'firebase/auth';
import { firebaseAuth } from '../connections/firebase.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				setUser({
					uid: user.uid,
					email: user.email,
				});
				localStorage.setItem('email', user.email);
			} else {
				localStorage.removeItem('email');
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const signup = async (email, password) => {
		try {
			await createUserWithEmailAndPassword(firebaseAuth, email, password);
			return true;
		} catch (err) {
			console.error(err.message);
			return false;
		}
	};

	const login = async (email, password) => {
		try {
			await signInWithEmailAndPassword(firebaseAuth, email, password);
			return true;
		} catch (err) {
			console.error(err.message);
			return false;
		}
	};

	const logout = async () => {
		try {
			await signOut(firebaseAuth);
			setUser(null);
			return true;
		} catch (err) {
			console.error(err.message);
			return false;
		}
	};

	const resetPassword = async (email) => {
		try {
			await sendPasswordResetEmail(firebaseAuth, email);
			return true;
		} catch (err) {
			console.error(err.message);
			return false;
		}
	};

	const updateUserEmail = async (email) => {
		try {
			await updateEmail(firebaseAuth, email);
			return true;
		} catch (err) {
			console.error(err.message);
			return false;
		}
	};

	const updateUserPassword = async (password) => {
		try {
			await updatePassword(firebaseAuth, password);
			return true;
		} catch (err) {
			console.error(err.message);
			return false;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				signup,
				logout,
				resetPassword,
				updateUserEmail,
				updateUserPassword,
			}}
		>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
