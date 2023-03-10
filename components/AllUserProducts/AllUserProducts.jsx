import { useSelector } from 'react-redux';
import { getUserEmail } from 'utility/client';
import Link from 'next/link';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import styles from 'styles/all_user_products.module.scss';
import cardStyles from 'styles/search/card.module.scss';

const AllUserProducts = () => {
	const email = getUserEmail();
	const products = useSelector((state) => state.products.products);
	const userProducts = products.filter((product) => product.retailer === email);

	return (
		<div className={`${styles.user_products_wrapper} min_container_height`}>
			<h1> Your Products:</h1>
			<hr />
			<div className={styles.user_products_container}>
				{userProducts.length === 0 && <h1> You have zero products</h1>}
				{userProducts.map((product) => {
					const filledStars = Math.floor(product.rating);
					const halfStars =
						product.rating - Math.floor(product.rating) > 0 ? 1 : 0;
					const emptyStars = 5 - filledStars - halfStars;

					return (
						<Link
							key={product._id}
							href={`/update-product/${product._id}`}
							className={`${cardStyles.card} elevation`}
						>
							<div className={cardStyles.card_image}>
								<Image
									src={product.image.file}
									alt='product'
									fill
									sizes='300px'
								/>
							</div>
							<div className={cardStyles.card_content}>
								<div className={cardStyles.card_header}>
									<h3> {product.title} </h3>
									<p> {product.category} </p>
								</div>
								<div className={cardStyles.card_rating}>
									{[...Array(filledStars).keys()].map((id) => {
										return (
											<StarIcon key={id} className={cardStyles.golden_svg} />
										);
									})}
									{[...Array(halfStars).keys()].map((id) => {
										return (
											<StarHalfIcon
												key={id}
												className={cardStyles.golden_svg}
											/>
										);
									})}
									{[...Array(emptyStars).keys()].map((id) => {
										return (
											<StarBorderIcon
												key={id}
												className={cardStyles.golden_svg}
											/>
										);
									})}
									<span>
										{product.rating} ({product.reviews.length} reviews)
									</span>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default AllUserProducts;
