/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-constructor */
/* eslint-disable consistent-return */
import axios, { AxiosInstance } from 'axios'
import { computed, makeAutoObservable } from 'mobx'
import { apiConfig } from '../config/api'
import { RootStore } from './rootStore'

export class AxiosStore {
  public axiosInstance: AxiosInstance | any = null

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.axiosInstance = axios.create({ baseURL: apiConfig.baseUrl })
    this.axiosInstance.defaults.withCredentials = true
  }

  public get AxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }

  public get(
    url: string,
    params?: unknown,
    headers?: unknown
  ): Promise<unknown> {
    return this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params: params || null,
      headers: headers || null
    })
  }

  public post(url: string, data?: any, params?: any): Promise<any> {
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
      withCredentials: true
    })
  }

  public async enableInterceptors(): Promise<void> {
    this.axiosInstance.interceptors.response.use(
      function (response: any) {
        console.log(response, 'response')
        return response
      },
      function (error: any) {
        console.log(error, 'err')
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }
}

// this.axiosInstance.interceptors.response.use(
//   (response: any) => response,
//   (err: any) => {
//     return new Promise((resolve) => {
//       console.log('aaaaaaaaaaaaaaaaa')
//       const originalRequest = err.config
//       if (
//         err.response.status === 401 &&
//         err.config &&
//         !err.config.__isRetryRequest
//       ) {
//         originalRequest._retry = true
//         const response = fetch(`${this.baseUrl}/users/me/refresh-token`, {
//           method: 'POST',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//             Device: 'device'
//           }
//         })
//           .then((res) => res.json())
//           .then(() => {
//             // originalRequest.headers['Device'] = 'device'
//             axios(originalRequest)
//           })
//         resolve(response)
//       }
//       return Promise.reject(err)
//     })
//   }
// )
