import Product from 'models/Product.js';
import dbConnect from 'connections/mongodb.js';
import mongoose from 'mongoose';

const handlePatch = async (req, res) => {
	try {
		const { _id } = req.body;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			return res.status(400).json({ message: 'Invalid Id' });
		}

		const product = await Product.findById(_id);

		if (!product) {
			return res.status(400).json({ message: 'Invalid Id' });
		}

		product.views += 1;
		await product.save();

		return res.status(200).json({ message: 'ok', data: product });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'PATCH':
			return handlePatch(req, res);
		default:
			return res.status(400).json({ message: 'This method is not supported' });
	}
};

export default handler;
