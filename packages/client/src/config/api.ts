const isProduction = process.env.NODE_ENV === 'production';

const apiConfig = {
  baseUrl: 'http://localhost:4000/api/v1',
};

const apiSecret = 'aaaaa';
// const apiConfig = isProduction ? prodApiConfig : devApiConfig;

export { apiConfig, apiSecret };
