import SlideShow from './SlideShow.jsx';
import styles from 'styles/home.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import fastDelivery from 'public/product/fast-delivery.png';
import cashOnDelivery from 'public/product/cash-on-delivery.png';
import discounts from 'public/home/discounts.png';

import first1 from 'public/home/FirstCarousel/1.jpg';
import first2 from 'public/home/FirstCarousel/2.webp';
import first3 from 'public/home/FirstCarousel/3.jpg';
import first4 from 'public/home/FirstCarousel/4.png';

import second1 from 'public/home/SecondCarousel/1.jpg';
import second2 from 'public/home/SecondCarousel/2.jpg';
import second3 from 'public/home/SecondCarousel/3.jpg';
import second4 from 'public/home/SecondCarousel/4.png';

import third1 from 'public/home/ThirdCarousel/1.webp';
import third2 from 'public/home/ThirdCarousel/2.webp';
import third3 from 'public/home/ThirdCarousel/3.jpg';
import third4 from 'public/home/ThirdCarousel/4.jpg';
import third5 from 'public/home/ThirdCarousel/5.jpg';

import fourth1 from 'public/home/FourthCarousel/1.jpg';
import fourth2 from 'public/home/FourthCarousel/2.jpg';
import fourth3 from 'public/home/FourthCarousel/3.jpg';
import fourth4 from 'public/home/FourthCarousel/4.jpg';

const data1 = [first1, first2, first3, first4];
const data2 = [second1, second2, second3, second4];
const data3 = [third1, third2, third3, third4, third5];
const data4 = [fourth1, fourth2, fourth3, fourth4];

const HomeComponent = () => {
	return (
		<div className={styles.home_container}>
			<SlideShow id={1} data={data1} />
			<div className={styles.facility_container}>
				<div>
					<Image
						src={fastDelivery}
						width='60'
						height='60'
						alt='fast delivery'
					/>
					Fast Delivery
				</div>
				<div>
					<Image
						src={cashOnDelivery}
						width='60'
						height='60'
						alt='cash on delivery'
					/>
					Cash on Delivery
				</div>
				<div>
					<Image src={discounts} width='60' height='60' alt='Discounts' />
					Best Deals
				</div>
			</div>
			<SlideShow id={2} data={data2} title='Clothing' />
			<div className={styles.pricing_container}>
				<div>
					<Link href='/search?price=199' className='blue_gradient'>
						<div>
							Price Under<h1>199 &#8377;</h1>
						</div>
					</Link>
					<Link href='/search?price=299' className='green_gradient'>
						<div>
							Price Under<h1>299 &#8377;</h1>
						</div>
					</Link>
				</div>
				<div>
					<Link href='/search?price=399' className='red_gradient'>
						<div>
							Price Under<h1>399 &#8377;</h1>
						</div>
					</Link>
					<Link href='/search?price=499' className='orange_gradient'>
						<div>
							Price Under<h1>499 &#8377;</h1>
						</div>
					</Link>
				</div>
			</div>
			<SlideShow id={3} data={data3} title='Electronics' />
			<SlideShow id={4} data={data4} title='Footwear and Cosmetics' />
		</div>
	);
};

export default HomeComponent;
