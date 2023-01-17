import SpecificProductComponent from 'components/SpecificProduct/SpecificProduct.jsx';
import Product from 'models/Product.js';
import dbConnect from 'connections/mongodb.js';
import mongoose from 'mongoose';

const SpecificProduct = ({ data }) => {
	const product = JSON.parse(data);
	return <SpecificProductComponent product={product} />;
};

export default SpecificProduct;

export async function getServerSideProps(context) {
	try {
		const { productId } = context.query;

		await dbConnect();
		//update view everytime user request this route
		if (!mongoose.Types.ObjectId.isValid(productId)) {
			throw { message: 'Invalid Id' };
		}

		const product = await Product.findById(productId);
		if (!product) {
			throw { message: 'Invalid Id' };
		}

		product.views += 1;
		await product.save();

		return {
			props: { data: JSON.stringify(product) },
		};
	} catch (err) {
		return {
			props: { data: JSON.stringify(null) },
		};
	}
}
