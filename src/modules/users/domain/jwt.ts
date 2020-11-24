import authConfig from '@config/jwt.config';
import { IBootstrap } from '@shared/infra/bootstrap';
import { container } from 'tsyringe';
import { decode, encode, isTokenExpired } from '@shared/helpers/jwt';
interface IJWTProps {
  sub: string;
}
interface IJWTPayload {
  name: string;
  matricula: string;
}
export class JWT {
  public sub: string;
  public token: string;
  private constructor(props: IJWTProps) {
    this.sub = props.sub;
  }
  public static verifyRefreshToken = async (token: string) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    const refreshToken = isTokenExpired(decode(token, authConfig.secret));
    const redis = container
      .resolve<IBootstrap>('bootstrap')
      .getRedisServer()
      .getClient();
    return new Promise<any>((resolve, reject) => {
      redis.get(refreshToken.matricula, (err, data) => {
        if (err) reject(err);
        if (data !== refreshToken) reject(new Error(`Invalid Token`));
        resolve(data);
      });
    });
  };
  public static verifyAcessToken = (token: string) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    const validToken = decode(token, authConfig.secret);
    if (!validToken) throw new Error(`Not Authenticated`);
    return validToken;
  };
  private static generateRefreshToken = async (matricula: string) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    const refreshToken = encode({}, authConfig.secret, { expiresIn: '30d' });
    const redis = container
      .resolve<IBootstrap>('bootstrap')
      .getRedisServer()
      .getClient();
    const hasAdded = redis.set(matricula, refreshToken, 'EX', 720 * 60 * 60);
    if (!hasAdded) throw new Error(`Problem to add refresh Token to storage`);
    return refreshToken;
  };
  private static generateAccessToken = (
    props: IJWTProps,
    payload: IJWTPayload,
  ) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    const token = encode(payload, authConfig.secret, {
      subject: props.sub,
      expiresIn: authConfig.tokenExpiryTimeInSeconds,
    });
    return token;
  };
  public static create(props: IJWTProps, payload: IJWTPayload): JWT {
    if (!props.sub) throw new Error(`Subscribe has invalid value`);
    const signedToken = this.generateAccessToken(props, payload);
    const jwtToken = new JWT(props);
    jwtToken.token = signedToken;
    return jwtToken;
  }
}
