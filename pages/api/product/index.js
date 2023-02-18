import Product from 'models/Product.js';
import User from 'models/User.js';
import dbConnect from 'connections/mongodb.js';
import userAuthencation from 'firebase-auth/firebase-admin.js';
import cloudinary from 'connections/cloudinary.js';
import mongoose from 'mongoose';

const handleGet = async (req, res) => {
	try {
		const data = await Product.find().lean();
		return res.status(200).json({ message: 'ok', data });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const handlePost = async (req, res) => {
	try {
		const decodedToken = await userAuthencation(req, res);
		const { email } = decodedToken;

		const upload = await cloudinary.uploader.upload(req.body.fileData.base64, {
			folder: 'next-js/ecommerce',
			resource_type: 'auto',
		});

		const newProduct = new Product({
			title: req.body.title,
			description: req.body.description,
			image: {
				file: upload.secure_url,
				public_id: upload.public_id,
			},
			perUnitPrice: req.body.perUnitPrice,
			quantity: req.body.quantity,
			category: req.body.category,
			retailer: email,
			size: req.body.size,
			color: req.body.color,
		});

		await newProduct.save();

		const user = await User.findOne({ email });
		user.products.push(newProduct._id);
		await user.save();

		return res.status(201).json({ message: 'ok', data: newProduct });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const handlePatch = async (req, res) => {
	try {
		const decodedToken = await userAuthencation(req, res);
		const { email } = decodedToken;

		if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
			return res.status(400).json({ message: 'Invalid Id' });
		}

		const oldProduct = await Product.findById(req.body._id);

		if (!oldProduct) {
			return res.status(400).json({ message: 'Invalid Id' });
		}

		if (oldProduct.retailer !== email) {
			return res
				.status(403)
				.json({ message: 'Tried to change other user data' });
		}

		const upload = await cloudinary.uploader.upload(req.body.fileData.base64, {
			folder: 'next-js/ecommerce',
			resource_type: 'auto',
		});

		//objects references are copied hence changing oldProduct also affects prevImageData.
		// const prevImageData = oldProduct.image;

		const prevImagePublicId = oldProduct.image.public_id;

		oldProduct.title = req.body.title;
		oldProduct.description = req.body.description;
		oldProduct.image = {
			file: upload.secure_url,
			public_id: upload.public_id,
		};
		oldProduct.perUnitPrice = req.body.perUnitPrice;
		oldProduct.quantity = req.body.quantity;
		oldProduct.category = req.body.category;
		oldProduct.size = req.body.size;
		oldProduct.color = req.body.color;

		await oldProduct.save();

		// delete old image
		await cloudinary.uploader.destroy(prevImagePublicId);

		return res.status(200).json({ message: 'ok', data: oldProduct });
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
		case 'PATCH':
			return handlePatch(req, res);
		default:
			return res.status(400).json({ message: 'This method is not supported' });
	}
};

export default handler;
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb',
		},
	},
};
