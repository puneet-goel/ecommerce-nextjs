import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { firebaseAuth } from '../connections/firebase.js';

const AuthContext = createContext({});

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
			} else {
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
			console.error(err);
			return false;
		}
	};

	const login = async (email, password) => {
		try {
			await signInWithEmailAndPassword(firebaseAuth, email, password);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	};

	const logout = async () => {
		try {
			setUser(null);
			await signOut(firebaseAuth);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, signup, logout }}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
