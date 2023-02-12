import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		products: [
			{
				productId: String,
				productName: String,
				quantity: Number,
				perUnitPrice: Number,
			},
		],
		totalAmount: Number,
		paymentMode: {
			type: String,
			default: 'Cash on Delivery',
		},
		deliveryStatus: {
			type: String,
			default: 'Processing',
		},
		eta: {
			type: Date,
			default: new Date(),
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
		default: 9999999999,
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
			default: {},
		},
		ordersData: {
			type: [OrderSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
