import AboutComponent from 'components/About/About.jsx';
import Product from 'models/Product.js';
import User from 'models/User.js';
import Order from 'models/Order.js';
import dbConnect from 'connections/mongodb.js';

const About = ({ data }) => {
	return <AboutComponent data={JSON.parse(data)} />;
};

export default About;

export async function getStaticProps() {
	const data = {
		users: 0,
		products: 0,
		orders: 0,
		quotation: 'We make online buying and selling superbly easy.',
		about: 'We buy and sell products.',
	};

	try {
		await dbConnect();
		const products = await Product.find().lean();
		const users = await User.find().lean();
		const orders = await Order.find().lean();

		data.users = users.length;
		data.products = products.length;
		data.orders = orders.length;

		return {
			props: { data: JSON.stringify(data) },
			revalidate: 3,
		};
	} catch (err) {
		return {
			props: { data: JSON.stringify(data) },
			revalidate: 3,
		};
	}
}
