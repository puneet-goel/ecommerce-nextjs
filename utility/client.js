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
