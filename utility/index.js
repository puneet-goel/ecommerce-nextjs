export const stringToColor = (username = null) => {
	let string = username ? username : 'null';
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
