import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getApps } from 'firebase/app';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let firebaseAuth = null;

/**
 * The (getApps() < 1) check is a clever way of preventing Next.js from accidentally re-initalizing
 * your SDK when Next.js hot reloads your application
 */
try {
	// if (getApps() < 1) {}
	const app = initializeApp(firebaseConfig);
	firebaseAuth = getAuth(app);
} catch (err) {
	console.error(err);
}

export { firebaseAuth };
