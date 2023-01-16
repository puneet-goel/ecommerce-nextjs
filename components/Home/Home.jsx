import SlideShow from './SlideShow.jsx';

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
		<div>
			<SlideShow id={1} data={data1} />
			<SlideShow id={2} data={data2} title='Clothing' />
			<SlideShow id={3} data={data3} title='Electronics' />
			<SlideShow id={4} data={data4} title='Footwear and Cosmetics' />
		</div>
	);
};

export default HomeComponent;
