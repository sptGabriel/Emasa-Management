import { JsonWebTokenError, Secret, sign, TokenExpiredError, verify, VerifyErrors } from 'jsonwebtoken';
import instance from 'tsyringe/dist/typings/dependency-container';
    const now = Date.now().valueOf() / 1000;
export function isExpiredTokenERROR(error:Error) {
  return error instanceof TokenExpiredError
}
export const encode = (args: any, secret: Secret, options: object) => {
  return sign(args, secret, options) as any;
};
export const decode = async (args: string, secret: Secret) => {
  if (args === null || args === undefined || !secret) return;
  const decode = verify(args, secret);
  if (!decode) return;
  return decode;
};

export const promisifyDecode = async (
  args: string,
  secret: Secret,
): Promise<VerifyErrors | Error | any> => {
  if (args === null && !args) throw new Error(`Token not provided`);
  if (!secret) throw new Error(`Secret not provided`);
  return new Promise<any | VerifyErrors>((resolve, reject) => {
    verify(args, secret, (err, decoded) => {
      if (err) resolve(err);
      resolve(decoded);
    });
  });
};
export const isTokenNOTExpired = (decodedToken: any) => {
  console.log(decodedToken.exp)
  if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now) {
    return false;
  }
  if (typeof decodedToken.nbf !== 'undefined' && decodedToken.nbf > now) {
    return false;
  }
  return true;
};

export async function isValidOrExpiredToken (error: Error){
  if(!isExpiredTokenERROR(error) || error instanceof Error) return false; 
  return true;
} 