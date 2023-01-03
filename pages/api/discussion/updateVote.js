import Discussion from '../../../models/Discussion.js';
import dbConnect from '../../../connections/mongodb.js';
import mongoose from 'mongoose';

const handlePatch = async (req, res) => {
	try {
		const { discussionId, email, action } = req.body;

		if (!mongoose.Types.ObjectId.isValid(discussionId)) {
			return res.status(400).json({ message: 'Invalid Id' });
		}

		const { metaData } = await Discussion.findById(discussionId)
			.select({ metaData: 1 })
			.lean();

		if (!metaData) {
			return res.status(400).json({ message: 'Invalid Id' });
		}

		const upIndex = metaData.upVotes.indexOf(email);
		const downIndex = metaData.downVotes.indexOf(email);

		if (action === 'upvote') {
			if (upIndex >= 0) {
				metaData.upVotes.splice(upIndex, 1);
			} else {
				metaData.upVotes.push(email);
				if (downIndex >= 0) {
					metaData.downVotes.splice(downIndex, 1);
				}
			}
		} else if (action === 'downvote') {
			const downIndex = metaData.downVotes.indexOf(email);

			if (downIndex >= 0) {
				metaData.downVotes.splice(downIndex, 1);
			} else {
				metaData.downVotes.push(email);
				if (upIndex >= 0) {
					metaData.upVotes.splice(upIndex, 1);
				}
			}
		}

		const updatedDiscussion = await Discussion.findByIdAndUpdate(
			discussionId,
			{ metaData: metaData },
			{ new: true }
		).lean();

		return res.status(200).json({ message: 'ok', data: updatedDiscussion });
	} catch (err) {
		return res.status(500).json({ message: 'error' });
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
