import { useState, useEffect } from 'react';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import styles from 'styles/specific_product.module.scss';
import moment from 'moment';
import Reviews from './Reviews';
import parse from 'html-react-parser';
import { magnify } from 'utility/client.js';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import fastDelivery from 'public/product/fast-delivery.png';
import cashOnDelivery from 'public/product/cash-on-delivery.png';

const SpecificProductComponent = ({ product }) => {
	const [productData, setProductData] = useState(product);
	useEffect(() => {
		magnify('product_image_zoom', 3);
	}, []);

	if (!productData) {
		return (
			<div className='min_container_height'>
				<h1 className={styles.error_container}>No such product</h1>
			</div>
		);
	}

	const filledStars = Math.floor(productData.rating);
	const halfStars =
		productData.rating - Math.floor(productData.rating) > 0 ? 1 : 0;
	const emptyStars = 5 - filledStars - halfStars;

	return (
		<div className={styles.specific_product_container}>
			<div className={styles.product_wrapper}>
				<div className={styles.image_wrapper}>
					<div className='img_magnifier_glass' />
					<Image
						src={productData.image.file}
						width={1024}
						height={400}
						alt='product'
						className={styles.product_image}
						id='product_image_zoom'
						priority
					/>
					<p className={styles.image_zoom_description}>
						<ZoomInIcon />
						Hover over image to view magnified view.
					</p>
				</div>
				<div className={`${styles.product_content} elevation`}>
					<h1>{productData.title}</h1>
					<h3>({productData.category})</h3>
					<p className={styles.retailer}>
						<strong>Retailer:</strong> {productData.retailer}
					</p>
					<p className={styles.created_at}>
						{moment(productData.createdAt).fromNow()}
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
							{productData.rating} ({productData.reviews.length} reviews)
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
									<span>&#8377;{productData.perUnitPrice}</span>
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
									<span>&#8377;{productData.perUnitPrice * 1.18}</span>
									(inclusive of all taxes)
								</td>
							</tr>
						</tbody>
					</table>
					<h3>
						{!!productData.description
							? parse(productData.description)
							: 'No Description'}
					</h3>
					<h4>
						Available Quantity: <span>{productData.quantity}</span>
					</h4>
					<h4> Available Sizes: {productData.size === '' && '0'}</h4>
					<div className={styles.product_specs}>
						{productData.size.split(',').map((cur, idx) => {
							let x = cur.trim();
							if (x === '') return null;
							return <div key={idx}> {cur}</div>;
						})}
					</div>

					<h4> Available Colors: {productData.color === '' && '0'}</h4>
					<div className={styles.product_specs}>
						{productData.color.split(',').map((cur, idx) => {
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
										src={fastDelivery}
										width='60'
										height='60'
										alt='fast delivery'
									/>
									<p>Free Delivery</p>
								</th>
								<th>
									<Image
										src={cashOnDelivery}
										width='60'
										height='60'
										alt='cash on delivery'
									/>
									<p>Cash On Delivery Available</p>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<hr />
			<Reviews
				reviews={productData.reviews}
				_id={productData._id}
				setProductData={setProductData}
			/>
		</div>
	);
};

export default SpecificProductComponent;
