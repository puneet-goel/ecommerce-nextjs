export const stringToColor = (nameIdentifier = null) => {
	let string = nameIdentifier ? nameIdentifier : 'null';
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';
	//0xff = 255
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 6)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */
	return color;
};

export const createToken = () => {
	let token = '';
	if (typeof window !== 'undefined') {
		token = getCookie('token');
	}

	const payloadHeader = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	return payloadHeader;
};

export const setCookie = (cookieName, cookieValue, expInMiliSec) => {
	const expDate = new Date();
	expDate.setTime(expDate.getTime() + expInMiliSec);

	document.cookie =
		cookieName +
		'=' +
		cookieValue +
		';expires=' +
		expDate.toUTCString() +
		';path=/';
};

export const getCookie = (cookieName) => {
	const name = cookieName + '=';
	const cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++) {
		let c = cookies[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
};

export const deleteCookie = (cookieName) => {
	document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getUserEmail = () => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('email') || '';
	}
	return '';
};

export const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export const magnify = (imgID, zoom) => {
	if (!window) return;
	let img = document.getElementById(imgID);
	let glass = document.getElementsByClassName('img_magnifier_glass');

	if (!img || glass.length === 0) return;
	glass = glass[0];

	/*set background properties for the magnifier glass:*/
	glass.style.backgroundImage = "url('" + img.src + "')";
	glass.style.backgroundSize =
		img.width * zoom + 'px ' + img.height * zoom + 'px';
	let bw = 3;
	let w = glass.offsetWidth / 2;
	let h = glass.offsetHeight / 2;

	/*execute a function when someone moves the magnifier glass over the image:*/
	glass.addEventListener('mousemove', moveMagnifier);
	img.addEventListener('mousemove', moveMagnifier);
	img.addEventListener('mouseout', removeMagnifier);
	glass.addEventListener('mouseout', removeMagnifier);

	/*and also for touch screens:*/
	glass.addEventListener('touchmove', moveMagnifier);
	img.addEventListener('touchmove', moveMagnifier);
	img.addEventListener('touchend', removeMagnifier);
	glass.addEventListener('touchend', removeMagnifier);

	function removeMagnifier(e) {
		e.preventDefault();
		glass.style.display = 'none';
		glass.style.border = '0px';
	}

	function moveMagnifier(e) {
		e.preventDefault();

		glass.style.display = 'block';
		glass.style.border = '3px solid floralwhite';

		/* Get the cursor's x and y positions: */
		let { x, y } = getCursorPos(e);

		/* Prevent the magnifier glass from being positioned outside the image: */
		if (x > img.width - w / zoom) {
			x = img.width - w / zoom;
		}
		if (x < w / zoom) {
			x = w / zoom;
		}
		if (y > img.height - h / zoom) {
			y = img.height - h / zoom;
		}
		if (y < h / zoom) {
			y = h / zoom;
		}

		/* Set the position of the magnifier glass: */
		glass.style.left = x - w + 'px';
		glass.style.top = y - h + 'px';

		/* Display what the magnifier glass "sees": */
		glass.style.backgroundPosition =
			'-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px';
	}

	function getCursorPos(e) {
		e = e || window.event;

		/* Get the x and y positions of the image: */
		let a = img.getBoundingClientRect();

		/* Calculate the cursor's x and y coordinates, relative to the image: */
		let x = e.pageX - a.left;
		let y = e.pageY - a.top;

		/* Consider any page scrolling: */
		x = x - window.pageXOffset;
		y = y - window.pageYOffset;

		return { x: x, y: y };
	}
};

export const initCart = () => {
	if (!window) return [];

	const temp = localStorage.getItem('cart');
	if (!temp) {
		localStorage.setItem('cart', '[]');
		return [];
	} else {
		return JSON.parse(temp);
	}
};

export const addItemToCart = ({ _id, product_name, quantity, price }) => {
	if (!window) return [];

	let cart = initCart();
	if (quantity <= 0) return cart;

	cart.push({
		_id,
		product_name,
		quantity,
		price,
	});

	localStorage.setItem('cart', JSON.stringify(cart));
	return cart;
};

export const getCartItem = ({ _id }) => {
	let cart = initCart();
	const exists = cart.find((item) => item._id === _id);
	return exists;
};

export const removeCartItem = ({ _id }) => {
	if (!window) return [];

	let cart = initCart();
	cart = cart.filter((item) => item._id !== _id);

	localStorage.setItem('cart', JSON.stringify(cart));
	return cart;
};

export const updateCartItem = ({ _id, product_name, quantity, price }) => {
	if (!window) return [];

	let cart = initCart();
	if (quantity <= 0) return removeCartItem({ _id });

	const exists = getCartItem({ _id });
	if (!exists) return addItemToCart({ _id, product_name, quantity, price });

	cart = cart.map((item) => {
		if (item._id === _id) {
			return { _id, product_name, quantity, price };
		}
		return item;
	});

	localStorage.setItem('cart', JSON.stringify(cart));
	return cart;
};
