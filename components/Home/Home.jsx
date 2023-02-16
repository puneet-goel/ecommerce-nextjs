import SlideShow from './SlideShow.jsx';
import styles from 'styles/home.module.scss';
import Link from 'next/link';
import Image from 'next/Image';

const data1 = [
	'/home/FirstCarousel/1.jpg',
	'/home/FirstCarousel/2.webp',
	'/home/FirstCarousel/3.jpg',
	'/home/FirstCarousel/4.png',
];

const data2 = [
	'/home/SecondCarousel/1.jpg',
	'/home/SecondCarousel/2.jpg',
	'/home/SecondCarousel/3.jpg',
	'/home/SecondCarousel/4.png',
];

const data3 = [
	'/home/ThirdCarousel/1.webp',
	'/home/ThirdCarousel/2.webp',
	'/home/ThirdCarousel/3.jpg',
	'/home/ThirdCarousel/4.jpg',
	'/home/ThirdCarousel/5.jpg',
];

const data4 = [
	'/home/FourthCarousel/1.jpg',
	'/home/FourthCarousel/2.jpg',
	'/home/FourthCarousel/3.jpg',
	'/home/FourthCarousel/4.jpg',
];

const HomeComponent = () => {
	return (
		<div className={styles.home_container}>
			<SlideShow id={1} data={data1} />
			<div className={styles.facility_container}>
				<div>
					<Image
						src='/product/fast-delivery.png'
						width='60'
						height='60'
						alt='fast delivery'
					/>
					Fast Delivery
				</div>
				<div>
					<Image
						src='/product/cash-on-delivery.png'
						width='60'
						height='60'
						alt='cash on delivery'
					/>
					Cash on Delivery
				</div>
				<div>
					<Image
						src='/home/discounts.png'
						width='60'
						height='60'
						alt='Discounts'
					/>
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
