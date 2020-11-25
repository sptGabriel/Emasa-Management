import authConfig from '@config/jwt.config';
import { IBootstrap } from '@shared/infra/bootstrap';
import { container } from 'tsyringe';
import { decode, encode, isTokenNOTExpired } from '@shared/helpers/jwt';
interface IJWTProps {
  sub: string;
}
export interface IJWTAcessPayload {
  login: string;
  matricula: string;
  name: string;
  position: string;
  departament_id: string;
}
export class JWT {
  public sub: string;
  public token: string;
  private constructor(props: IJWTProps) {
    this.sub = props.sub;
  }
  public static getRefreshToken = async (matricula: string) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    // const refreshToken = isTokenExpired(decode(token, authConfig.secret));
    const redis = container.resolve<IBootstrap>('bootstrap').getRedisServer();
    const rfToken = await redis.getValueFromKey(matricula);
    return rfToken && isTokenNOTExpired(rfToken)
      ? rfToken
      : await JWT.generateRefreshToken(matricula);
  };
  public static getAcessToken = (token: string) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    const validToken = decode(token, authConfig.secret);
    if (!validToken) throw new Error(`Not Authenticated`);
    return validToken;
  };
  private static generateRefreshToken = async (matricula: string) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    const refreshToken = encode({}, authConfig.secret, {
      subject: matricula,
      expiresIn: '30d',
    });
    const redis = container.resolve<IBootstrap>('bootstrap').getRedisServer();
    await redis.setKeyWithEX(matricula, refreshToken, 720 * 60 * 60);
    return refreshToken;
  };
  private static generateAccessToken = (
    props: IJWTProps,
    payload: IJWTAcessPayload,
  ) => {
    if (!authConfig.secret) throw new Error(`Invalid public key`);
    const token = encode(payload, authConfig.secret, {
      subject: props.sub,
      expiresIn: authConfig.tokenExpiryTimeInSeconds,
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
  public static buildRefreshToken = async (matricula: string) => {
    const refreshToken = await JWT.getRefreshToken(matricula);
    if (!refreshToken) throw new Error(`Internal Error to Generate Token`);
    const token = new JWT({ sub: matricula });
    token.token = refreshToken;
    return token;
  };
}
