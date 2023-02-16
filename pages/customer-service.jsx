import CustomerComponent from 'components/Customer/Customer.jsx';
import Complaint from 'models/Complaint.js';
import dbConnect from 'connections/mongodb.js';

const Customer = ({ data }) => {
	const complaints = JSON.parse(data);
	return <CustomerComponent complaints={complaints} />;
};

export default Customer;

export async function getServerSideProps() {
	try {
		await dbConnect();
		const complaints = await Complaint.find().lean();

		let rating = complaints.reduce((prev, cur) => prev + cur.feedback, 0);
		let resolve = Math.floor(Math.random() * 100);
		let timeTook = Math.floor(Math.random() * 100);

		if (complaints.length) {
			rating /= complaints.length;
		}

		rating *= 20;

		return {
			props: {
				data: JSON.stringify({
					rating,
					resolve,
					timeTook,
				}),
			},
		};
	} catch (err) {
		return {
			props: {
				data: JSON.stringify({
					rating: 5,
					resolve: 100,
					timeTook: 50,
				}),
			},
		};
	}
}
