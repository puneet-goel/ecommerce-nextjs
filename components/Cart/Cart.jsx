import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from 'styles/cart.module.scss';
import { initCart, updateCartItem } from 'utility/client.js';

const CartComponent = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(initCart());
	}, []);

	const handleUpdateCart = (cur) => {
		updateCartItem(cur);
		setItems(initCart());
	};

	return (
		<div className={styles.cart_wrapper}>
			<h1>Cart</h1>
			<div className={styles.cart_container}>
				<div className={styles.cart_products}>
					<h3>Shopping Cart</h3>
					<table>
						<tbody>
							<tr>
								<th>{''}</th>
								<th>Product</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Subtotal</th>
							</tr>
							{items.map((cur, idx) => {
								return (
									<tr key={idx}>
										<td>
											<CloseIcon
												onClick={(e) => {
													removeCartItem({ _id: cur._id });
													setItems(initCart());
												}}
											/>
										</td>
										<td>{cur.product_name}</td>
										<td>{cur.price}</td>
										<td>
											<div className={styles.table_controls}>
												<RemoveIcon
													onClick={() =>
														handleUpdateCart({
															...cur,
															quantity: cur.quantity - 1,
														})
													}
												/>
												{cur.quantity}
												<AddIcon
													onClick={() =>
														handleUpdateCart({
															...cur,
															quantity: cur.quantity + 1,
														})
													}
												/>
											</div>
										</td>
										<td>{cur.price * cur.quantity}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className={styles.cart_bill}>
					<h3>Cart Totals</h3>
					<p>subtotal</p>
					<p>delivery</p>
					<p>tax</p>
					<p>final</p>
				</div>
			</div>
		</div>
	);
};

export default CartComponent;
