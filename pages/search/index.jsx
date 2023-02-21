import SearchComponent from 'components/Search';
import Product from 'models/Product.js';
import dbConnect from 'connections/mongodb.js';

const Search = ({ data }) => {
	const products = JSON.parse(data);

	for (let i = 0; i < products.length; i++) {
		if (products[i].image.blurDataURL) {
			products[i].image.props = {
				blurDataURL: products[i].image.blurDataURL,
				placeholder: 'blur',
			};
		} else {
			products[i].image.props = {};
		}
	}

	return <SearchComponent products={products} />;
};

export default Search;

export async function getServerSideProps() {
	try {
		await dbConnect();
		let data = await Product.find().lean();

		//shuffle products
		data.sort(() => Math.random() - 0.5);

		return {
			props: {
				data: JSON.stringify(data),
			},
		};
	} catch (err) {
		console.log(err);
		return {
			props: { data: JSON.stringify([]) },
		};
	}
}
