import { useEffect, useState } from 'react';
import styles from 'styles/order-history.module.scss';
import Image from 'next/Image';
import { createToken as payloadHeader } from 'utility/client.js';
import axios from 'axios';
import moment from 'moment';
import { exportTableToCSV } from 'utility/client.js';

const OrderHistoryComponent = () => {
	const [orders, setOrders] = useState([]);

	const caller = async () => {
		try {
			const { data } = await axios.get('/api/order', payloadHeader());
			if (data.message === 'ok') {
				const temp = data.data;
				temp.reverse();
				setOrders(temp);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		caller();
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => caller(), 3000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className={styles.order_history_wrapper}>
			<h1>
				<Image
					src='/order-history/transaction-history.png'
					alt='transactions'
					width='50'
					height='50'
				/>
				Order History
			</h1>
			<hr />

			<div className={styles.csv_button}>
				<button
					className='button button_outlined'
					onClick={(e) => exportTableToCSV()}
				>
					Export as CSV file (.csv)
				</button>
			</div>

			<div className={styles.order_container}>
				<table id='order-history'>
					<thead>
						<tr>
							<th>S.No.</th>
							<th>Product</th>
							<th>Number of items</th>
							<th>Order Date</th>
							<th>Order Time</th>
							<th>Delivery Pricing</th>
							<th>Delivery Date</th>
							<th>Delivery Status</th>
							<th>Payment Mode</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((cur, idx) => {
							const order_date = new Date(Date.parse(cur.createdAt));
							let products = '';
							cur.products.forEach((product, idx) => {
								products += product.productName;
								if (idx !== cur.products.length - 1) {
									products += ', ';
								}
							});

							const days = Math.round((new Date() - order_date) / 86400000);
							let status = 'Processing';
							let color = '#1976d2';

							switch (days) {
								case 0:
								case 1:
									status = 'Processing';
									color = '#1976d2';
									break;
								case 2:
									status = 'Processed';
									color = '#ffa41c';
									break;
								case 3:
									status = 'Out for Delivery';
									color = '#d32f2f';
									break;
								case 4:
									status = 'Arriving today';
									color = '#2c7ed1';
									break;
								default:
									status = 'Order Completed';
									color = '#2e7d32';
									break;
							}

							return (
								<tr key={idx}>
									<td>{idx + 1}.</td>
									<td>{products}</td>
									<td>{cur.products.length}</td>
									<td>{moment(order_date).format('MMMM Do YYYY')}</td>
									<td>{moment(order_date).format('h:mm:ss a')}</td>
									<td>&#8377;{cur.totalAmount}</td>
									<td>{moment(cur.eta).format('MMMM Do YYYY')}</td>
									<td>
										<div
											className='badge'
											style={{
												color: color,
												border: `1px solid ${color}`,
												padding: '0.4em',
												backgroundColor: color + '1c',
											}}
										>
											{status}
										</div>
									</td>
									<td>{cur.paymentMode}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrderHistoryComponent;
