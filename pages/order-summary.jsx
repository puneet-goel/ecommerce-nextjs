import OrderSummaryComponent from 'components/OrderSummary/OrderSummary.jsx';
import Order from 'models/Order.js';
import Product from 'models/Product.js';
import dbConnect from 'connections/mongodb.js';
import mongoose from 'mongoose';

const OrderSummary = ({ data }) => {
	const order = JSON.parse(data);
	return <OrderSummaryComponent order={order} />;
};

export default OrderSummary;

export async function getServerSideProps(context) {
	try {
		const query = context.query;

		if (!query._id) {
			return {
				props: { data: JSON.stringify({}) },
			};
		}

		await dbConnect();
		//update view everytime user request this route
		if (!mongoose.Types.ObjectId.isValid(query._id)) {
			throw { message: 'Invalid Id' };
		}

		const order = await Order.findById(query._id);
		if (!order) {
			throw { message: 'Invalid Id' };
		}

		//mongoose documents cant use spread operator
		const temp = { ...JSON.parse(JSON.stringify(order)) };

		//Promise all accepts an array of promises
		//async await inside forEach will just throw promises won't wait for it to be processed
		await Promise.all(
			temp.products.map(async (item, idx) => {
				const product = await Product.findById(item.productId).lean();

				if (product) {
					temp.products[idx] = {
						...item,
						image: product.image.file,
						price: product.perUnitPrice,
					};
				}
			})
		);

		return {
			props: { data: JSON.stringify(temp) },
		};
	} catch (err) {
		console.log(err);
		return {
			props: { data: JSON.stringify({}) },
		};
	}
}
