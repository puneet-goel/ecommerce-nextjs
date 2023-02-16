import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import Image from 'next/Image';
import Link from 'next/link';

const SlideShow = ({ id, data, title = '' }) => {
	const [slide, setSlide] = useState(0);
	const maxSlides = data.length;

	const handleContols = (operation = 1) => {
		setSlide((cur) => (cur + operation + maxSlides) % maxSlides);
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSlide((cur) => (cur + 1 + maxSlides) % maxSlides);
		}, 3000);

		return () => clearInterval(intervalId);
	}, [maxSlides]);

	useEffect(() => {
		if (document) {
			let slides = document.getElementsByClassName(`carousel_slide${id}`);
			for (let i = 0; i < slides.length; i++) {
				slides[i].style.display = 'none';
			}
			slides[slide].style.display = 'block';
		}
	}, [slide, id]);

	return (
		<div className='carousel_container' id={`carousel${id}`}>
			{!!title && <p className='carousel_header'>{title}</p>}
			<div className='carousel_wrapper'>
				<Link
					href={`/search${
						title ? '?category=' + encodeURIComponent(title) : ''
					}`}
				>
					<div className='carousel_slides'>
						{data.map((cur, idx) => {
							return (
								<Image
									src={cur}
									width='2560'
									height='500'
									key={idx}
									className={`carousel_slide fade carousel_slide${id} elevation`}
									alt={`${title} slideshow`}
									priority={idx === 0}
								/>
							);
						})}
					</div>
				</Link>
				<KeyboardArrowLeftIcon
					className='carousel_controls carousel_left'
					onClick={(e) => handleContols(-1)}
				/>
				<KeyboardArrowRightIcon
					className='carousel_controls carousel_right'
					onClick={(e) => handleContols()}
				/>
			</div>
		</div>
	);
};

export default SlideShow;
