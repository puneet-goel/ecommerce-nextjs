const Coupons = () => {
	return <p>Coupons</p>;
};

export default Coupons;

export async function getStaticProps() {
	try {
		return {
			props: {},
			revalidate: 10,
		};
	} catch (err) {
		return {
			props: {},
			revalidate: 10,
		};
	}
}
