import User from 'models/User.js';
import Order from 'models/Order.js';
import dbConnect from 'connections/mongodb.js';
import userAuthencation from 'firebase-auth/firebase-admin.js';

const handleGet = async (req, res) => {
	try {
		let data = await Order.find().lean();

		data = data.filter((order) => {
			if (req.query._id) {
				return req.query._id === order._id;
			} else if (req.query.email) {
				return req.query.email === order.orderedBy;
			}
			return false;
		});

		return res.status(200).json({ message: 'ok', data: data });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const handlePost = async (req, res) => {
	try {
		const decodedToken = await userAuthencation(req, res);
		const { email } = decodedToken;

		const now = new Date();
		now.setDate(now.getDate() + 4);

		const orders = new Order({
			orderedBy: email,
			products: req.body.products,
			totalAmount: req.body.totalAmount,
			paymentMode: req.body.paymentMode,
			coupon: req.body.coupon,
			eta: now,
		});
		await orders.save();

		const user = await User.findOne({ email }).select({ orders: 1 });
		user.orders.push(orders._id);
		await user.save();

		return res.status(201).json({ message: 'ok' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'GET':
			return handleGet(req, res);
		case 'POST':
			return handlePost(req, res);
		default:
			return res.status(400).json({ message: 'This method is not supported' });
	}
};

export default handler;
