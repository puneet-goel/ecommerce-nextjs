import SearchComponent from 'components/Search';
import Product from 'models/Product.js';
import dbConnect from 'connections/mongodb.js';

const Search = ({ data }) => {
	const products = JSON.parse(data);
	return <SearchComponent products={products} />;
};

export default Search;

export async function getStaticProps() {
	try {
		await dbConnect();
		const data = await Product.find().lean();

		return {
			props: {
				data: JSON.stringify(data),
			},
			revalidate: 3,
		};
	} catch (err) {
		return {
			props: { data: [] },
			revalidate: 3,
		};
	}
}
