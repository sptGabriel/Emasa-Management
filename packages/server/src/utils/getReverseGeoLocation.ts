import axios from 'axios';
interface IReverse {
  latitude: any;
  longitude: any;
}
export const getReverse = async ({ latitude, longitude }: IReverse) => {
  const fetch = await axios
    .get(
      `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt&key=${process.env.BIGDATACLOUDAPI}`,
    )
    .then(res => res.data)
    .catch(err => ({
      continent: null,
      continentCode: null,
      principalSubdivision: null,
      principalSubdivisionCode: null,
      country: null,
      city: null,
    }));
  console.log(fetch, 'fetching');
  return fetch;
};
