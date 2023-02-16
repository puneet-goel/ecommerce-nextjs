import Complaint from 'models/Complaint.js';
import dbConnect from 'connections/mongodb.js';
import userAuthencation from 'firebase-auth/firebase-admin.js';

const handlePost = async (req, res) => {
	try {
		const decodedToken = await userAuthencation(req, res);
		const { email } = decodedToken;

		const complaint = new Complaint({
			complaintBy: email,
			query: req.body.query,
			description: req.body.description,
			feedback: req.body.feedback,
		});

		await complaint.save();

		return res.status(201).json({ message: 'ok' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'POST':
			return handlePost(req, res);
		default:
			return res.status(400).json({ message: 'This method is not supported' });
	}
};

export default handler;
