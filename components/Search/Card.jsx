import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from 'styles/search/card.module.scss';
import cart from 'utility/cart.js';

const Card = ({ product }) => {
	const [sale, setSale] = useState(() => false);
	const [quantity, setQuantity] = useState(0);
	const filledStars = Math.floor(product.rating);
	const halfStars = product.rating - Math.floor(product.rating) > 0 ? 1 : 0;
	const emptyStars = 5 - filledStars - halfStars;

	const handleCart = (operation) => (event) => {
		event.preventDefault();
		cart.updateCartItem({
			_id: product._id,
			product_name: product.title,
			quantity: quantity + operation,
			price: product.perUnitPrice,
			image: product.image.file,
		});

		const item = cart.getCartItem({ _id: product._id });
		if (item) {
			setQuantity(item.quantity);
		} else {
			setQuantity(0);
		}
	};

	useEffect(() => {
		if (Math.random() > 0.5) setSale(true);
		const item = cart.getCartItem({ _id: product._id });
		if (item) {
			setQuantity(item.quantity);
		}
	}, [product._id]);

	return (
		<Link
			href={`/search/${product._id}`}
			className={`${styles.card} elevation`}
		>
			<div className={styles.card_image}>
				<Image
					src={product.image.file}
					alt='product'
					fill
					sizes='300px'
					blurDataURL={product.image.blurDataURL}
					placeholder='blur'
				/>
			</div>
			<div className={styles.card_content}>
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
			</div>
			<div
				className={`badge ${styles.card_footer}`}
				onClick={(e) => e.preventDefault()}
			>
				<div className={styles.card_pricing}>
					&#8377;<span>{product.perUnitPrice}</span>
				</div>
				<div className={styles.card_icons}>
					<RemoveIcon fontSize='large' onClick={handleCart(-1)} />
					{quantity}
					<AddIcon fontSize='large' onClick={handleCart(1)} />
				</div>
			</div>
			{sale && <div className={`badge ${styles.card_badge}`}></div>}
		</Link>
	);
};

export default Card;
