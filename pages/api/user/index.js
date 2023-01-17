import User from 'models/User.js';
import dbConnect from 'connections/mongodb.js';

const handlePost = async (req, res) => {
	try {
		const { email } = req.body;
		const newUser = new User({ email });
		await newUser.save();

		return res.status(201).json({ message: 'ok', data: newUser });
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
