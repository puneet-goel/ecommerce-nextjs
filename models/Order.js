import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
	{
		productId: {
			type: String,
			required: true,
		},
		productName: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const OrderSchema = new mongoose.Schema(
	{
		orderedBy: {
			type: String,
			required: true,
		},
		products: {
			type: [ItemSchema],
			default: [],
		},
		totalAmount: {
			type: Number,
			default: 0,
		},
		paymentMode: {
			type: String,
			default: 'Cash on Delivery',
		},
		coupon: {
			type: String,
			default: '',
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

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
