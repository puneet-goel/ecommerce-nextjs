// import Discussion from 'models/Discussion.js';
// import dbConnect from 'connections/mongodb.js';
// import mongoose from 'mongoose';
// import { decodeIDToken } from 'firebase-auth/firebase-admin.js';

// const handlePatch = async (req, res) => {
// 	const { decodedToken, request, response } = await decodeIDToken(req, res);
// 	console.log(decodedToken, request, response);
// 	try {
// 		const { discussionId } = req.body;

// 		if (!mongoose.Types.ObjectId.isValid(discussionId)) {
// 			return res.status(400).json({ message: 'Invalid Id' });
// 		}

// 		const { metaData } = await Discussion.findById(discussionId)
// 			.select({ metaData: 1 })
// 			.lean();

// 		if (!metaData) {
// 			return res.status(400).json({ message: 'Invalid Id' });
// 		}

// 		metaData.views += 1;
// 		const updatedDiscussion = await Discussion.findByIdAndUpdate(
// 			discussionId,
// 			{ metaData: metaData },
// 			{ new: true }
// 		).lean();

// 		return res.status(200).json({ message: 'ok', data: updatedDiscussion });
// 	} catch (err) {
// 		return res.status(500).json({ message: 'error' });
// 	}
// };

// const handler = async (req, res) => {
// 	const { method } = req;
// 	await dbConnect();

// 	switch (method) {
// 		case 'PATCH':
// 			return handlePatch(req, res);
// 		default:
// 			return res.status(400).json({ message: 'This method is not supported' });
// 	}
// };

// export default handler;
