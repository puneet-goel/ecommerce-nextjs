import mongoose from 'mongoose';

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
	createdBy: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	comments: {
		type: Array,
		default: [],
	},
	views: {
		type: Number,
		default: 1,
	},
	activeUsers: {
		type: Array,
		default: [],
	},
	upVotes: {
		type: Array,
		default: [],
	},
	downVotes: {
		type: Array,
		default: [],
	},
});

module.exports =
	mongoose.models.Discussion || mongoose.model('Discussion', DiscussionSchema);
