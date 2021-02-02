import authConfig from '@config/jwt.config';
import { IBootstrap } from '@shared/infra/bootstrap';
import { container } from 'tsyringe';
import { decode, encode, isTokenNOTExpired } from '@shared/helpers/jwt';
import { ensure } from '@utils/ensure';
interface IJWTProps {
  sub: string;
}
export interface IJWTAcessPayload {
  id:string,
  matricula: string,
}
export class JWT {
  public sub: string;
  public token: string;
  private constructor(props: IJWTProps) {
    this.sub = props.sub;
  }
  public static getRefreshToken = async (id: string) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    // const refreshToken = isTokenExpired(decode(token, authConfig.secret));
    //const redis = container.resolve<IBootstrap>('bootstrap').getRedisServer();
    //const rfToken = await redis.getValueFromKey(id);
    //return rfToken && isTokenNOTExpired(rfToken)
    //  ? rfToken
    //  : await JWT.generateRefreshToken(id);
  };
  public static getAcessToken = (token: string) => {
    if (!token) throw new Error(`jwt must be provided`);
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    const validToken = decode(token, authConfig.secret);
    if (!validToken) throw new Error(`Not Authenticated`);
    return validToken;
  };
  private static generateRefreshToken = async (id: string) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    const refreshToken = encode({}, ensure(authConfig.rfSecret), {
      subject: id,
      expiresIn: 720 * 60 * 60 * 1000,
    });
    return refreshToken;
  };
  private static generateAccessToken = (
    props: IJWTProps,
    payload: IJWTAcessPayload,
  ) => {
    // authConfig.tokenExpiryTimeInSeconds
    const token = encode(payload, ensure(authConfig.secret), {
      subject: props.sub,
      expiresIn: '60m',
    });
    return token;
  };
  public static buildAcessToken(
    props: IJWTProps,
    payload: IJWTAcessPayload,
  ): JWT {
    if (!props.sub) throw new Error(`Subscribe has invalid value`);
    const AccessToken = this.generateAccessToken(props, payload);
    const jwtToken = new JWT(props);
    jwtToken.token = AccessToken;
    return jwtToken;
  }
  public static buildRefreshToken = async (id: string) => {
    const refreshToken = await JWT.generateRefreshToken(id);
    if (!refreshToken) throw new Error(`Internal Error to Generate Token`);
    const token = new JWT({ sub: id });
    token.token = refreshToken;
    return token;
  };
}
