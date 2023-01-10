import fs from 'fs';

//not needed
export const base64ToFile = (file) => {
	const fileContents = file.base64.replace(/^data:image\/png;base64,/, '');
	fs.mkdirSync('./public/uploads', { recursive: true });
	const fileName = `./public/uploads/${Date.now().toString() + file.fileName}`;
	fs.writeFileSync(fileName, fileContents, 'base64');
	return fileName;
};
