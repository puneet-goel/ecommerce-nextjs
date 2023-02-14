import styles from 'styles/order-summary.module.scss';
import Link from 'next/link';
import Image from 'next/Image';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import moment from 'moment';

const OrderSummaryComponent = ({ order }) => {
	let subtotal = 0;
	let discountMoney = 0;
	let delivery = 0;
	let total =
		order?.products?.reduce(
			(prev, ele) => (prev += ele.quantity * ele.price),
			0
		) || 0;

	if (total) {
		delivery = 100;
		subtotal = total;
		total += 100;
	}

	switch (order.coupon) {
		case 'FREESHIP':
			discountMoney = total === 0 ? 0 : 100;
			break;
		case 'GIFTGIFT':
			discountMoney = 0;
			break;
		case 'FIRSTORDER20':
			discountMoney = total * 0.2;
			break;
		case 'QUARTER25':
			discountMoney = total * 0.25;
			break;
		case 'HALF50':
			discountMoney = total * 0.5;
			break;
		case 'SPECIAL75':
			discountMoney = total * 0.75;
			break;
		case 'FLAT500':
			discountMoney = Math.min(500, total);
			break;
		case 'FLAT200':
			discountMoney = Math.min(200, total);
			break;
		case 'FLAT100':
			discountMoney = Math.min(100, total);
			break;
		default:
			discountMoney = 0;
			break;
	}

	const tax = ((subtotal + delivery - discountMoney) * 0.18).toFixed(2);

	return (
		<div className={styles.order_summary_wrapper}>
			<h1>
				<Image
					src='/order-summary/bill.png'
					alt='invoice'
					width='50'
					height='50'
				/>
				Order Summary
			</h1>
			<hr />

			<div className={styles.summary_container}>
				<div className={styles.input_box}>
					<p>Ordered By:</p>
					<p>{order.orderedBy || 'N/A'}</p>
				</div>
				<div className={styles.input_box}>
					<p>Ordered On:</p>
					<p>
						{order?.createdAt
							? moment(order.createdAt).format('MMMM Do YYYY')
							: 'N/A'}
					</p>
				</div>
				<div className={styles.input_box}>
					<p>Order Time:</p>
					<p>
						{order?.createdAt
							? moment(order.createdAt).format('h:mm:ss a')
							: 'N/A'}
					</p>
				</div>
				<div className={styles.input_box}>
					<p>Delivery Status:</p>
					<p>{order.deliveryStatus || 'N/A'}</p>
				</div>
				<div className={styles.input_box}>
					<p>Expected Time of Arrival:</p>
					<p>{order?.eta ? moment(order.eta).format('h:mm:ss a') : 'N/A'}</p>
				</div>
				<div className={styles.input_box}>
					<p>Payment Mode:</p>
					<p>{order.paymentMode || 'N/A'}</p>
				</div>
			</div>
			<div className={styles.cart_container}>
				<div className={styles.cart_products}>
					<h2>Total items: &nbsp; {order?.products?.length || 0}</h2>
					<table>
						<thead>
							<tr>
								<th>{''}</th>
								<th>Product</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Subtotal</th>
							</tr>
						</thead>
						<tbody>
							{(order?.products || []).map((cur, idx) => {
								return (
									<tr key={idx}>
										<td>
											<Link href={`/search/${cur._id}`}>
												<Image
													src={cur.image}
													alt='shopping bag'
													width='50'
													height='50'
												/>
											</Link>
										</td>
										<td>{cur.productName}</td>
										<td>{cur.price} &#8377;</td>
										<td>{cur.quantity}</td>
										<td>{cur.price * cur.quantity} &#8377;</td>
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
						<p>{order.coupon || 'N/A'}</p>
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
						<p>{tax} &#8377;</p>
					</div>

					<hr />
					<div className={styles.bill_detail}>
						<h3>Estimated Total</h3>
						<h3>{order.totalAmount || 0} &#8377;</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummaryComponent;
