import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
	{
		commentedBy: {
			type: String,
		},
		message: {
			type: String,
			default: 'No message by the customer',
		},
		rating: {
			type: Number,
			default: 1,
			min: 1,
			max: 5,
		},
	},
	{ timestamps: true }
);

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: '',
		},
		image: {
			file: {
				type: String,
				required: true,
			},
			public_id: {
				type: String,
				required: true,
			},
		},
		perUnitPrice: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			default: 1,
		},
		category: {
			type: String,
			required: true,
		},
		retailer: {
			type: String,
			required: true,
		},
		size: String,
		color: String,
		reviews: {
			type: [ReviewSchema],
			default: [],
		},
		rating: {
			type: Number,
			default: 0,
			max: 5,
		},
		views: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true }
);

module.exports =
	mongoose.models.Product || mongoose.model('Product', ProductSchema);
