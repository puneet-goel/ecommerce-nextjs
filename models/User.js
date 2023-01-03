import mongoose from 'mongoose';

const UserDataSchema = new mongoose.Schema({
	username: {
		type: String,
		default: '',
	},
	firstName: {
		type: String,
		default: '',
	},
	lastName: {
		type: String,
		default: '',
	},
	phoneNo: {
		type: Number,
		default: '',
	},
	address: {
		type: String,
		default: '',
	},
	about: {
		type: String,
		default: '',
	},
});

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	username: String,
	firstName: String,
	lastName: String,
	phoneNo: Number,
	address: String,
	about: String,
	joinedOn: {
		type: Date,
		default: new Date(),
	},
	upVotes: {
		type: Number,
		default: 0,
	},
	downVotes: {
		type: Number,
		default: 0,
	},
	totalComments: {
		type: Number,
		default: 0,
	},
	userDiscussions: {
		type: Array,
		default: [],
	},
	externalLinks: {
		facebook: String,
		github: String,
		twitter: String,
		linkedin: String,
		others: String,
	},
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
