import { Secret, sign, verify } from 'jsonwebtoken';
const now = Date.now().valueOf() / 1000;
export const encode = (args: any, secret: Secret, options: object) => {
  return sign(args, secret, options) as any;
};
export const decode = (args: any, secret: Secret) => {
  const decoded = verify(args, secret) as any;
  if (!decoded) {
    throw new Error('Invalid Token');
  }
  return decoded;
};
export const isTokenNOTExpired = (decodedToken: any) => {
  if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now) {
    return false;
  }
  if (typeof decodedToken.nbf !== 'undefined' && decodedToken.nbf > now) {
    return false;
  }
  return true;
};
