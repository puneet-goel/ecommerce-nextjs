import * as admin from 'firebase-admin';

try {
	admin.initializeApp({
		credential: admin.credential.cert(
			JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY || {})
		),
		databaseURL: `https://${process.env.FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
	});
} catch (error) {
	if (!/already exists/u.test(error.message)) {
		console.log('Firebase admin initialization error', error.stack);
	}
}

const userAuthencation = async (req, res) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const decodedToken = await admin.auth().verifyIdToken(token);
		if (!decodedToken.email) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		return decodedToken;
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export default userAuthencation;
