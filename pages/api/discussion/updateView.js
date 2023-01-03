import Discussion from '../../../models/Discussion.js';
import dbConnect from '../../../connections/mongodb.js';

const handlePatch = async (req, res) => {
	try {
		const { discussionId } = req.body;

		const discussion = await Discussion.findById(discussionId).lean();
		discussion.metaData.views += 1;

		const updatedDiscussion = await Discussion.findByIdAndUpdate(
			discussionId,
			{
				...discussion,
				discussionId,
			},
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
