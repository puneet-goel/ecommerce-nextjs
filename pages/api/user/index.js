import User from 'models/User.js';
import dbConnect from 'connections/mongodb.js';
import cloudinary from 'connections/cloudinary.js';
import userAuthencation from 'firebase-auth/firebase-admin.js';

const handleGet = async (req, res) => {
	try {
		const decodedToken = await userAuthencation(req, res);
		const { email } = decodedToken;

		const user = await User.findOne({ email }).lean();
		return res.status(200).json({ message: 'ok', data: user });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

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

const handlePatch = async (req, res) => {
	try {
		const decodedToken = await userAuthencation(req, res);
		const { email } = decodedToken;
		const user = await User.findOne({ email });

		const prevImagePublicId = user.image.public_id;
		user.infoData = req.body.infoData;

		if (req.body.fileData && req.body.fileData.base64) {
			const upload = await cloudinary.uploader.upload(
				req.body.fileData.base64,
				{
					folder: 'next-js/ecommerce-user',
					resource_type: 'auto',
				}
			);
			user.image = {
				file: upload.secure_url,
				public_id: upload.public_id,
			};
		}

		await user.save();

		// delete old image
		if (prevImagePublicId) await cloudinary.uploader.destroy(prevImagePublicId);

		return res.status(200).json({ message: 'ok', data: user });
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
