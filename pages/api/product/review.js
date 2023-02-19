import Product from 'models/Product.js';
import dbConnect from 'connections/mongodb.js';
import userAuthencation from 'firebase-auth/firebase-admin.js';
import mongoose from 'mongoose';

const handlePost = async (req, res) => {
	try {
		const decodedToken = await userAuthencation(req, res);
		const { email } = decodedToken;

		if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
			return res.status(400).json({ message: 'Invalid Id' });
		}

		const product = await Product.findById(req.body._id);

		if (!product) {
			return res.status(400).json({ message: 'Invalid Id' });
		}

		//check whether user already reviewed
		const userReviewed = product.reviews.find(
			(cur) => cur.commentedBy === email
		);

		if (userReviewed) {
			product.reviews = product.reviews.map((cur) => {
				if (cur.commentedBy === email) {
					return {
						...cur,
						message: req.body.message,
						rating: req.body.rating,
					};
				} else {
					return cur;
				}
			});
		} else {
			product.reviews.push({
				commentedBy: email,
				message: req.body.message,
				rating: req.body.rating,
			});
		}

		//update the product rating
		product.rating = product.reviews.reduce(
			(rating, cur) => rating + cur.rating,
			0
		);
		product.rating /= product.reviews.length || 1;
		product.rating = product.rating.toFixed(1);

		await product.save();

		return res.status(201).json({ message: 'ok', data: product });
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
