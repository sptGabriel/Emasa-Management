import axios from 'axios';
interface IReverse {
	latitude: any,longitude: any
}
export const getReverse = async ({ latitude,longitude }: IReverse) => {
	return await axios.get(
		`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt&key=${process.env.BIGDATACLOUDAPI}`,
	).catch(() => undefined);
};
