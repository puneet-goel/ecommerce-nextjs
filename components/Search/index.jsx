import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/search/search.module.scss';
import Card from './Card';
import Filter from './Filter';

const SearchComponent = ({ products }) => {
	const router = useRouter();
	const query = router.query;

	const [filters, setFilters] = useState({
		sort: '',
		stars: 0,
		category: '',
		title: '',
		retailer: '',
		price: 0,
	});

	useEffect(() => {
		if (query.price) {
			setFilters((filters) => ({
				...filters,
				price: Number(query.price),
			}));
		}
		if (query.category) {
			let temp = query.category;
			if (temp === 'Clothing') {
				temp = 'T-Shirt';
			} else if (temp === 'Footwear and Cosmetics') {
				temp = 'shoes, cosmetics';
			}

			setFilters((filters) => ({
				...filters,
				category: temp,
			}));
		}
	}, [query]);

	/**
	 * @description filter according to category
	 */
	let filteredProducts = useMemo(() => {
		if (filters.category === '') return products;
		const temp = filters.category.split(',');

		return products.filter((product) => {
			for (let i = 0; i < temp.length; ++i) {
				if (
					product.category.toLowerCase().includes(temp[i].toLowerCase().trim())
				)
					return true;
			}
		});
	}, [filters.category, products]);

	/**
	 * @description filter according to title
	 */
	filteredProducts = useMemo(() => {
		const filterTitle = filters.title.toLowerCase().trim();

		if (filterTitle === '') return filteredProducts;
		return filteredProducts.filter((product) =>
			product.title.toLowerCase().includes(filterTitle)
		);
	}, [filters.title, filteredProducts]);

	/**
	 * @description filter according to price
	 */
	filteredProducts = useMemo(() => {
		if (filters.price === 0) return filteredProducts;
		return filteredProducts.filter(
			(product) => product.perUnitPrice <= filters.price
		);
	}, [filters.price, filteredProducts]);

	/**
	 * @description filter according to stars
	 */
	filteredProducts = useMemo(() => {
		return filteredProducts.filter(
			(product) => product.rating >= filters.stars
		);
	}, [filters.stars, filteredProducts]);

	/**
	 * @description sort filters
	 */
	switch (filters.sort) {
		case 'rating':
			//highest rating first
			filteredProducts.sort((a, b) => b.rating - a.rating);
			break;
		case 'arrivals':
			//new arrivals first
			filteredProducts.sort((a, b) => {
				let dif = new Date(b.createdAt) - new Date(a.createdAt);
				return dif;
			});
			break;
		case 'lh-price':
			filteredProducts.sort((a, b) => a.perUnitPrice - b.perUnitPrice);
			break;
		case 'hl-price':
			filteredProducts.sort((a, b) => b.perUnitPrice - a.perUnitPrice);
			break;
		default:
			filteredProducts.sort((a, b) => a._id - b._id);
	}

	return (
		<div className={`${styles.search} min_container_height`}>
			<div className={styles.left}>
				<Filter filters={filters} setFilters={setFilters} />
			</div>
			<div className={styles.right}>
				{filteredProducts.length > 0 ? (
					filteredProducts.map((product, idx) => {
						return <Card key={idx} product={product} />;
					})
				) : (
					<h3>Refresh the page</h3>
				)}
			</div>
		</div>
	);
};

export default SearchComponent;
