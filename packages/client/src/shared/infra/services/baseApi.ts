/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import axios, { AxiosInstance } from 'axios';
import { get } from 'lodash'
import CookieUniversal from 'universal-cookie';
import { apiConfig } from '../../../config/api';
import { RootStore } from '../../../store/rootStore';

const Cookie = new CookieUniversal();
export abstract class BaseAPI {
  protected baseUrl: string;

  private axiosInstance: AxiosInstance | any = null;

  constructor (public rootStore:RootStore) {
    this.rootStore = rootStore
    this.baseUrl = apiConfig.baseUrl
    this.axiosInstance = axios.create({})
    this.axiosInstance.defaults.withCredentials = true;
    this.enableInterceptors();
  }

  private enableInterceptors (): void {
    this.axiosInstance.interceptors.response.use(
      this.getSuccessResponseHandler(),
    )
  }

  private getSuccessResponseHandler () :unknown {
    return (response: unknown) => {
      return response;
    }
  }

  private didAccessTokenExpire (response: unknown): boolean {
    return get(response, 'data.message') === "Token has expired.";
  }

  private async regenerateAccessTokenFromRefreshToken (): Promise<unknown> {
    const response = await axios({
      method: 'GET',
      url: `${this.baseUrl}/users/token/refresh`,
      headers:{
        Cookie: `eid=${Cookie.get('eid')}; accToken=${Cookie.get('Access-Token')};`
      },
      withCredentials:true
    });
    return response.data.accessToken;
  }

  protected get (url: string, params?: unknown, headers?: unknown): Promise<unknown> {
    return this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params: params || null,
      headers: headers || null
    })
  }

  protected post (url: string, data?: any, params?: any): Promise<any> { 
    return this.axiosInstance({
      method: 'POST',
      url: `${this.baseUrl}${url}`,
      data: data || null,
      params: params || null,
      // headers ? headers : null
      headers: {
        crossDomain: true,
        'Content-Type': 'application/json'
      },
      withCredentials:true,
    })
  }
}