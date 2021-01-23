export default {
  secret: process.env.ACCESS_SECRET,
  rfSecret: process.env.REFRESH_SECRET,
  tokenExpiryTimeInSeconds: 8 * 60 * 60,
};
