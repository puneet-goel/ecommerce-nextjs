import SpecificProductComponent from 'components/SpecificProduct/SpecificProduct.jsx';
import Product from 'models/Product.js';
import dbConnect from 'connections/mongodb.js';

const SpecificProduct = () => {
	return <SpecificProductComponent />;
};

export default SpecificProduct;

export async function getServerSideProps() {
	try {
		await dbConnect();
		const data = await Product.find().lean();

		return {
			props: { data },
		};
	} catch (err) {
		return {
			props: { data: [] },
		};
	}
}
