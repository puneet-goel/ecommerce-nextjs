import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from 'styles/cart.module.scss';
import Image from 'next/Image';
import { getUserEmail, createToken as payloadHeader } from 'utility/client.js';
import cart from 'utility/cart.js';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import axios from 'axios';

const CartComponent = () => {
	const [items, setItems] = useState([]);
	const [code, setCode] = useState('No Coupon');
	const [subtotal, setSubtotal] = useState(0);
	const [discountMoney, setDiscountMoney] = useState(0);
	const [delivery, setDelivery] = useState(0);

	const router = useRouter();

	useEffect(() => {
		setItems(cart.getCart());
		const x = localStorage.getItem('couponCode');
		if (x) setCode(x);
	}, []);

	useEffect(() => {
		let total = items.reduce(
			(prev, ele) => (prev += ele.quantity * ele.price),
			0
		);

		if (total) {
			setDelivery(100);
		} else {
			setDelivery(0);
		}
		setSubtotal(total);

		let x = localStorage.getItem('save') || '';

		if (total) total += 100;
		let money = 0;

		switch (x) {
			case 'Shipping':
				money = total === 0 ? 0 : 100;
				break;
			case 'Gift':
				money = 0;
				break;
			case 'SAVE 20%':
				money = total * 0.2;
				break;
			case 'SAVE 25%':
				money = total * 0.25;
				break;
			case 'SAVE 50%':
				money = total * 0.5;
				break;
			case 'SAVE 75%':
				money = total * 0.75;
				break;
			case 'SAVE 500₹':
				money = Math.min(500, total);
				break;
			case 'SAVE 200₹':
				money = Math.min(200, total);
				break;
			case 'SAVE 100₹':
				money = Math.min(100, total);
				break;
			default:
				money = 0;
				break;
		}

		setDiscountMoney(money);
	}, [items]);

	const placeOrder = async (e) => {
		e.preventDefault();
		const toastID = toast.loading('Placing your order');
		const x = getUserEmail();

		if (!x) {
			return router.push('/login');
		}

		const totalAmount = (subtotal + delivery - discountMoney + tax).toFixed(2);

		if (items.length === 0) {
			toast.update(toastID, {
				render: 'Cart is empty',
				type: 'error',
				hideProgressBar: true,
				isLoading: false,
				autoClose: 3000,
			});
			return;
		}

		const products = items.map((item) => {
			return {
				productId: item._id,
				productName: item.product_name,
				quantity: item.quantity,
			};
		});

		try {
			const { data } = await axios.post(
				'/api/order',
				{
					products,
					totalAmount,
					paymentMode: 'Cash on Delivery',
					coupon: code,
				},
				payloadHeader()
			);

			if (data.message === 'ok') {
				localStorage.setItem('couponCode', 'No Coupon');
				cart.removeAll();
				localStorage.setItem('save', '0');
				router.push('/order-history');
			} else {
				toast.update(toastID, {
					render: 'Could not place your order',
					type: 'error',
					hideProgressBar: true,
					isLoading: false,
					autoClose: 3000,
				});
			}
		} catch (err) {
			toast.update(toastID, {
				render: 'Could not place your order',
				type: 'error',
				hideProgressBar: true,
				isLoading: false,
				autoClose: 3000,
			});
		}
	};

	const handleUpdateCart = (cur) => {
		setItems(cart.updateCartItem(cur));
	};

	const tax = (subtotal + delivery - discountMoney) * 0.18;
	const finalPrice = (subtotal + delivery - discountMoney + tax).toFixed(2);

	return (
		<div className={styles.cart_wrapper}>
			<h1>
				<Image
					src='/cart/shopping-bag.png'
					alt='shopping bag'
					width='50'
					height='50'
				/>
				Your Cart
			</h1>
			<div className={styles.cart_container}>
				<div className={styles.cart_products}>
					<h2>Shopping Cart &nbsp; ({items.length} items)</h2>
					<table>
						<thead>
							<tr>
								<th>{''}</th>
								<th>Product</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Subtotal</th>
								<th>{''}</th>
							</tr>
						</thead>
						<tbody>
							{items.map((cur, idx) => {
								return (
									<tr key={idx}>
										<td>
											<Link href={`/search/${cur._id}`}>
												<Image
													src={cur.image}
													alt='product'
													width='100'
													height='100'
												/>
											</Link>
										</td>
										<td>{cur.product_name}</td>
										<td>{cur.price} &#8377;</td>
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
										<td>{cur.price * cur.quantity} &#8377;</td>
										<td>
											<CloseIcon
												onClick={(e) =>
													setItems(cart.removeCartItem({ _id: cur._id }))
												}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className={styles.cart_bill}>
					<h2>Cart Totals</h2>

					<div className={styles.coupon_applied}>
						<p>Coupon Applied</p>
						<p>{code}</p>
					</div>

					<div className={styles.bill_detail}>
						<p title='subtutle'>Subtotal</p>
						<p>{subtotal.toFixed(2)} &#8377;</p>
					</div>

					<div className={styles.bill_detail}>
						<p>Shipping Cost</p>
						<p>{delivery.toFixed(2)} &#8377;</p>
					</div>

					<div className={styles.bill_detail}>
						<p>Discount</p>
						<p>{discountMoney.toFixed(2)} &#8377;</p>
					</div>

					<div className={styles.bill_detail}>
						<p>
							Tax&nbsp;
							<Tooltip title='18% GST' arrow>
								<HelpIcon fontSize='small' />
							</Tooltip>
						</p>
						<p>{tax.toFixed(2)} &#8377;</p>
					</div>

					<hr />
					<div className={styles.bill_detail}>
						<h3>Estimated Total</h3>
						<h3>{finalPrice} &#8377;</h3>
					</div>

					<Link href='/coupons'>Add a coupon and get a heavy discount.</Link>
					<button className='button button_outlined' onClick={placeOrder}>
						Place Order
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default CartComponent;
