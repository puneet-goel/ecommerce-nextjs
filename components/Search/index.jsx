import { useState, useMemo } from 'react';
import styles from 'styles/search/search.module.scss';
import Card from './Card';
import Filter from './Filter';

const SearchComponent = ({ products }) => {
	const [filters, setFilters] = useState({
		sort: '',
		stars: 0,
		category: '',
		title: '',
		retailer: '',
		price: 0,
	});

	/**
	 * @description filter according to category
	 */
	let filteredProducts = useMemo(() => {
		const filterCategory = filters.category.toLowerCase().trim();

		if (filterCategory === '') return products;
		return products.filter((product) =>
			product.category.toLowerCase().includes(filterCategory)
		);
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
		return filteredProducts.filter(
			(product) => product.perUnitPrice >= filters.price
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
			filteredProducts.sort((a, b) => a.rating - b.rating);
			break;
		case 'arrivals':
			filteredProducts.sort((a, b) => a.createdAt - b.createdAt);
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
