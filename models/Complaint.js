import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema(
	{
		complaintBy: {
			type: String,
			required: true,
		},
		query: {
			type: String,
			default: 'Other Issue',
		},
		description: {
			type: String,
			required: true,
		},
		feedback: {
			type: Number,
			default: 1,
			min: 1,
			max: 5,
		},
	},
	{ timestamps: true }
);

module.exports =
	mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);
