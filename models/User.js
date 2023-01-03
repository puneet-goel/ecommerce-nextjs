import mongoose from 'mongoose';

const UserMetaDataSchema = new mongoose.Schema({
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
});

const UserInfoDataSchema = new mongoose.Schema({
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
	externalLinks: {
		facebook: String,
		github: String,
		twitter: String,
		linkedin: String,
		other: String,
	},
});

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	joinedOn: {
		type: Date,
		default: new Date(),
	},
	userDiscussions: {
		type: [String],
		default: [],
	},
	infoData: {
		type: UserInfoDataSchema,
		default: () => ({}),
	},
	metaData: {
		type: UserMetaDataSchema,
		default: () => ({}),
	},
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
