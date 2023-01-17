import CouponsComponent from 'components/CouponsComponent/CouponsComponent.jsx';
import CouponsJson from 'utility/coupons.json';

const Coupons = ({ data }) => {
	return <CouponsComponent coupons={data} />;
};

export default Coupons;

export async function getStaticProps() {
	return {
		props: {
			data: CouponsJson.coupons,
		},
		revalidate: 10,
	};
}
