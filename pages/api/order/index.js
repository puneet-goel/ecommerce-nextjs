import User from 'models/User.js';
import dbConnect from 'connections/mongodb.js';
import userAuthencation from 'firebase-auth/firebase-admin.js';

const handleGet = async (req, res, email) => {
	try {
		const data = await User.findOne({ email }).select({ ordersData: 1 }).lean();
		return res.status(200).json({ message: 'ok', data: data.ordersData });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const handlePost = async (req, res, email) => {
	try {
		const orders = await User.findOne({ email }).select({ ordersData: 1 });
		const now = new Date();
		now.setDate(now.getDate() + 4);

		const newOrder = {
			products: req.body.products,
			totalAmount: req.body.totalAmount,
			paymentMode: req.body.paymentMode,
			eta: now,
		};

		orders.ordersData.push(newOrder);
		await orders.save();

		return res.status(201).json({ message: 'ok' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();

	const decodedToken = await userAuthencation(req, res);
	const { email } = decodedToken;

	switch (method) {
		case 'GET':
			return handleGet(req, res, email);
		case 'POST':
			return handlePost(req, res, email);
		default:
			return res.status(400).json({ message: 'This method is not supported' });
	}
};

export default handler;
