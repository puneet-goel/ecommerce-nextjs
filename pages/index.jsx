import HomeComponent from 'components/Home/Home';

const Home = () => {
	return <HomeComponent />;
};

export default Home;

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
