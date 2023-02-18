import SearchComponent from 'components/Search';
import Product from 'models/Product.js';
import dbConnect from 'connections/mongodb.js';
import { getPlaiceholder } from 'plaiceholder';

const Search = ({ data }) => {
	const products = JSON.parse(data);
	return <SearchComponent products={products} />;
};

export default Search;

export async function getServerSideProps() {
	try {
		await dbConnect();
		let data = await Product.find().lean();

		//shuffle products
		data.sort(() => Math.random() - 0.5);

		for (let i = 0; i < data.length; i++) {
			const { base64 } = await getPlaiceholder(data[i].image.file);
			data[i].image.blurDataURL = base64;
		}

		return {
			props: {
				data: JSON.stringify(data),
			},
		};
	} catch (err) {
		return {
			props: { data: JSON.stringify([]) },
		};
	}
}
