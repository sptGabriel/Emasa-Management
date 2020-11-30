/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import axios, { AxiosInstance } from 'axios';
import { apiConfig } from '../../../config/api';
import { get } from 'lodash'
import CookieUniversal from 'universal-cookie';
import { RootStore } from '../../../store/rootStore';
const Cookie = new CookieUniversal();
export abstract class BaseAPI {
  protected baseUrl: string;
  private axiosInstance: AxiosInstance | any = null;

  constructor (protected rootStore:RootStore) {
    this.rootStore = rootStore
    this.baseUrl = apiConfig.baseUrl
    this.axiosInstance = axios.create({})
    this.axiosInstance.defaults.withCredentials = true;
    this.enableInterceptors();
  }

  private enableInterceptors (): void {
    this.axiosInstance.interceptors.response.use(
      this.getSuccessResponseHandler(),
      this.getErrorResponseHandler()
    )
  }

  private getSuccessResponseHandler () {
    return (response: any) => {
      return response;
    }
  }

  private didAccessTokenExpire (response: any): boolean {
    return get(response, 'data.message') === "Token has expired.";
  }
  private async regenerateAccessTokenFromRefreshToken (): Promise<any> {
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

  private getErrorResponseHandler () {
    return async (error: any) => {
      if (this.didAccessTokenExpire(error.response)) {
        try {
          const accessToken = await this
          .regenerateAccessTokenFromRefreshToken();
        } catch (error) {
          this.authService.removeToken();
        }
        // if (accessToken) {
        //   try {
        //     // Get the new access token
        //     const accessToken = await this
        //       .regenerateAccessTokenFromRefreshToken();

        //     // Save token
        //     this.authService.setToken('access-token', accessToken);

        //     // Retry request
        //     error.config.headers['authorization'] = accessToken;
        //     return this.axiosInstance.request(error.config);
            
        //   } catch (err) {
        //     // remove access and refresh tokens
        //     this.authService.removeToken('access-token');
        //     this.authService.removeToken('refresh-token');
        //     console.log(err);
        //   }
        // }
        
      }
      return Promise.reject({ ...error })
    }
  }

  protected get (url: string, params?: any, headers?: any): Promise<any> {
    return this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params: params ? params : null,
      headers: headers ? headers : null
    })
  }

  protected post (url: string, data?: any, params?: any, headers?: any): Promise<any> { 
    return this.axiosInstance({
      method: 'POST',
      url: `${this.baseUrl}${url}`,
      data: data ? data : null,
      params: params ? params : null,
      // headers ? headers : null
      headers: {
        crossDomain: true,
        'Content-Type': 'application/json'
      },
      withCredentials:true,
    })
  }
}