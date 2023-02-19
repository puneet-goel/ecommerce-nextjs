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
			try {
				const { base64 } = await getPlaiceholder(data[i].image.file);
				data[i].image.props = {
					blurDataURL: base64,
					placeholder: 'blur',
				};
			} catch (err) {
				data[i].image.props = {};
			}
		}

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
