import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/Image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import styles from 'styles/search/card.module.scss';

const Card = ({ product }) => {
	const [sale, setSale] = useState(() => false);
	const filledStars = Math.floor(product.rating);
	const halfStars = product.rating - Math.floor(product.rating) > 0 ? 1 : 0;
	const emptyStars = 5 - filledStars - halfStars;

	useEffect(() => {
		if (Math.random() > 0.5) setSale(true);
	}, []);

	return (
		<Link
			href={`/product/${product._id}`}
			className={`${styles.card} elevation`}
		>
			<Image
				src={product.image.file}
				alt='product'
				className={styles.card_image}
				width={200}
				height={200}
			/>
			<div className={styles.card_header}>
				<h3> {product.title} </h3>
				<p> {product.category} </p>
			</div>
			<div className={styles.card_rating}>
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
			<div className={styles.card_pricing}>
				&#8377;<span>{product.perUnitPrice}</span>
				{sale && <span className={`badge ${styles.card_badge}`}>Sale</span>}
			</div>
		</Link>
	);
};

export default Card;
