import { Request } from 'express';

export const getRequestIpAddress = (request: Request) => {
  const requestIpAddress =
    (<string>request.headers['x-forwarded-for'] || '').split(',').pop() ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress;
    if (!requestIpAddress) return null;
    requestIpAddress.trim()
  return requestIpAddress;
};
