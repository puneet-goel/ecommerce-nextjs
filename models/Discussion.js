import mongoose from 'mongoose';

const DiscussionMetaDataSchema = new mongoose.Schema({
	views: {
		type: Number,
		default: 1,
	},
	activeUsers: {
		type: [String],
		default: [],
	},
	upVotes: {
		type: [String],
		default: [],
	},
	downVotes: {
		type: [String],
		default: [],
	},
});

const CommentSchema = new mongoose.Schema({
	commentedBy: {
		type: String,
		default: '',
	},
	message: {
		type: String,
		default: '',
	},
	commentedAt: {
		type: Date,
		default: new Date(),
	},
});

const DiscussionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	subtitle: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		default: '',
	},
	tags: {
		type: [],
		default: '',
	},
	createdBy: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	comments: {
		type: [CommentSchema],
		default: [],
	},
	metaData: {
		type: DiscussionMetaDataSchema,
		default: () => ({}),
	},
});

module.exports =
	mongoose.models.Discussion || mongoose.model('Discussion', DiscussionSchema);
