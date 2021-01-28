import axios from 'axios';
export const getReverse = async ({ latitude,longitude }: { latitude: any,longitude: any }) => {
	return await axios.get(
		`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt&key=${process.env.BIGDATACLOUDAPI}`,
	);
};
