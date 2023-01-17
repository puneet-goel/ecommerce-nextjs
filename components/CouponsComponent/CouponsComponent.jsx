import { useEffect, useState } from 'react';
import styles from 'styles/coupon.module.scss';

const CouponsComponent = ({ coupons }) => {
	const [curCoupon, setCurCoupon] = useState('No Coupon');

	useEffect(() => {
		if (window) {
			const code = localStorage.getItem('couponCode');
			if (code) setCurCoupon(code);
		}
	}, []);

	const handleCoupon = (code, save) => {
		if (window) {
			if (curCoupon === code) {
				localStorage.setItem('curCoupon', 'No Coupon');
				localStorage.setItem('save', '0');
				setCurCoupon('No Coupon');
			} else {
				localStorage.setItem('couponCode', code);
				localStorage.setItem('save', save);
				setCurCoupon(code);
			}
		}
	};

	return (
		<div className={styles.coupons_section}>
			<h1> Coupons </h1>
			<div className={styles.coupons_subheader}>
				<h3>Instructions:</h3>
				<ul>
					<li>Only one coupon can be applied at a time.</li>
					<li>
						Simply click <span className={styles.coupon_badge}>Claim Now</span>,
						and the coupon will be applied automatically during checkout.
					</li>
				</ul>
				<h3>
					Coupon Applied: <span>{curCoupon}</span>
				</h3>
			</div>

			<div className={styles.coupons_container}>
				{coupons.map((cur, idx) => {
					return (
						<div className={styles.coupon_wrapper} key={idx}>
							<span className={styles.coupon_left_circle} />
							<span className={styles.coupon_right_circle} />

							<div className={styles.coupon_header}>
								<p className={styles.coupon_reason}>{cur.reason}</p>
								<p className={styles.coupon_save}>{cur.save}</p>
							</div>
							<p className={styles.coupon_code}>{cur.code}</p>
							<button
								className='button'
								style={{
									backgroundColor: curCoupon === cur.code ? '#2e7d32' : '',
								}}
								onClick={(e) => handleCoupon(cur.code, cur.save)}
							>
								{curCoupon === cur.code ? 'Applied' : 'Claim Now'}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CouponsComponent;
