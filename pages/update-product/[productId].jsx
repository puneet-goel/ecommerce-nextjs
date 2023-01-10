import AddProductComponent from 'components/AddProduct/AddProduct.jsx';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const UpdateSpecificProduct = () => {
	const router = useRouter();
	const product = useSelector((state) => state.products.products);
	const productUpdate = product.filter(
		(product) => product._id === router.query.productId
	)[0];

	if (!productUpdate) {
		return <AddProductComponent validProduct={false} />;
	}

	return (
		<AddProductComponent
			title={productUpdate.title}
			description={productUpdate.description}
			perUnitPrice={productUpdate.perUnitPrice}
			quantity={productUpdate.quantity}
			size={productUpdate.size}
			color={productUpdate.color}
			category={productUpdate.category}
			editMode={true}
			_id={productUpdate._id}
		/>
	);
};

export default UpdateSpecificProduct;
