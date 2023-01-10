import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		products: [
			{
				productId: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					default: 1,
				},
				perUnitPrice: {
					type: Number,
					required: true,
				},
			},
		],
		totalAmount: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const UserInfoDataSchema = new mongoose.Schema({
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

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		products: {
			type: [String],
			default: [],
		},
		infoData: {
			type: UserInfoDataSchema,
			default: () => ({}),
		},
		ordersData: {
			type: OrderSchema,
			default: () => ({}),
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
