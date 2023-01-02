import Discussion from '../../models/Discussion.js';
import dbConnect from '../../connections/mongodb.js';

const handleGet = async (req, res) => {
	try {
		const data = await Discussion.find().lean();
		return res.status(200).json({ message: 'ok', data });
	} catch (err) {
		return res.status(500).json({ message: 'error' });
	}
};

const handlePost = async (req, res) => {
	try {
		// 	await Discussion.create({
		// 		title: x[i].title,
		// 		subtitle: x[i].subtitle,
		// 		createdBy: x[i].createdBy,
		// 	});
		const data = await Discussion.find().lean();
		return res.status(200).json({ message: 'ok', data });
	} catch (err) {
		return res.status(500).json({ message: 'error' });
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
