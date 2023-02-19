import SpecificProductComponent from 'components/SpecificProduct/SpecificProduct.jsx';
import Product from 'models/Product.js';
import dbConnect from 'connections/mongodb.js';
import mongoose from 'mongoose';
import { getPlaiceholder } from 'plaiceholder';

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

		//mongoose documents cant use spread operator
		const data = { ...JSON.parse(JSON.stringify(product)) };

		try {
			const { base64 } = await getPlaiceholder(data.image.file);
			data.image.props = {
				blurDataURL: base64,
				placeholder: 'blur',
			};
		} catch (err) {
			data.image.props = {};
		}

		return {
			props: { data: JSON.stringify(data) },
		};
	} catch (err) {
		console.log(err);
		return {
			props: { data: JSON.stringify(null) },
		};
	}
}
