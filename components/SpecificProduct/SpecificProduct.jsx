import { useEffect } from 'react';
import Image from 'next/Image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import styles from 'styles/specific_product.module.scss';
import moment from 'moment';
import Reviews from './Reviews';
import parse from 'html-react-parser';
import { magnify } from 'utility/client.js';

const SpecificProductComponent = ({ product }) => {
	useEffect(() => {
		magnify('product_image_zoom', 3);
	}, []);

	if (!product) {
		return <h1 className='min_container_height'>No such product</h1>;
	}

	const filledStars = Math.floor(product.rating);
	const halfStars = product.rating - Math.floor(product.rating) > 0 ? 1 : 0;
	const emptyStars = 5 - filledStars - halfStars;

	return (
		<div className={styles.specific_product_container}>
			<div className={styles.product_wrapper}>
				<div className={styles.image_wrapper}>
					<div className='img_magnifier_glass' />
					<Image
						src={product.image.file}
						width={1024}
						height={400}
						alt='product'
						className={styles.product_image}
						id='product_image_zoom'
						priority
					/>
				</div>
				<div className={`${styles.product_content} elevation`}>
					<h1>{product.title}</h1>
					<h3>({product.category})</h3>
					<p className={styles.retailer}>
						<strong>Retailer:</strong> {product.retailer}
					</p>
					<p className={styles.created_at}>
						{moment(product.createdAt).fromNow()}
					</p>
					<div className={styles.product_rating}>
						{[...Array(filledStars).keys()].map((id) => {
							return <StarIcon key={id} className={styles.golden_svg} />;
						})}
						{[...Array(halfStars).keys()].map((id) => {
							return <StarHalfIcon key={id} className={styles.golden_svg} />;
						})}
						{[...Array(emptyStars).keys()].map((id) => {
							return <StarBorderIcon key={id} className={styles.golden_svg} />;
						})}
						<span>
							{product.rating} ({product.reviews.length} reviews)
						</span>
					</div>
					<table className={styles.product_pricing}>
						<tbody>
							<tr>
								<th>Pricing</th>
							</tr>
							<tr>
								<td>
									<strong>M.R.P.:</strong>
									<span>&#8377;{product.perUnitPrice}</span>
								</td>
							</tr>
							<tr>
								<td>
									<strong>Tax:</strong>
									<span>18&#37;</span>
								</td>
							</tr>
							<tr>
								<td>
									<strong>Effective Price:</strong>
									<span>&#8377;{product.perUnitPrice * 1.18}</span>
									(inclusive of all taxes)
								</td>
							</tr>
						</tbody>
					</table>
					<h3>
						{!!product.description
							? parse(product.description)
							: 'No Description'}
					</h3>
					<h4>
						Available Quantity: <span>{product.quantity}</span>
					</h4>
					<h4> Available Sizes: {product.size === '' && '0'}</h4>
					<div className={styles.product_specs}>
						{product.size.split(',').map((cur, idx) => {
							let x = cur.trim();
							if (x === '') return null;
							return <div key={idx}> {cur}</div>;
						})}
					</div>

					<h4> Available Colors: {product.color === '' && '0'}</h4>
					<div className={styles.product_specs}>
						{product.color.split(',').map((cur, idx) => {
							let x = cur.trim();
							if (x === '') return null;
							return (
								<div key={idx} style={{ backgroundColor: cur }}>
									{cur}
								</div>
							);
						})}
					</div>

					<table className={styles.product_options_available}>
						<tbody>
							<tr>
								<th>
									<Image
										src='/product/fast-delivery.png'
										width='60'
										height='60'
										alt='delivery'
									/>
									<p>Free Delivery</p>
								</th>
								<th>
									<Image
										src='/product/cash-on-delivery.png'
										width='60'
										height='60'
										alt='delivery'
									/>
									<p>Cash On Delivery Available</p>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<hr />
			<Reviews reviews={product.reviews} _id={product._id} />
		</div>
	);
};

export default SpecificProductComponent;
