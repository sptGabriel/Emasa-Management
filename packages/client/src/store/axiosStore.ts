/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-constructor */
/* eslint-disable consistent-return */
import axios, { AxiosInstance } from 'axios'
import { makeAutoObservable } from 'mobx'
import { apiConfig } from '../config/api'
import { RootStore } from './rootStore'

export class AxiosStore {
  axiosInstance: AxiosInstance

  isAlreadyFetchingAccessToken = false

  subscribers: any = []

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.axiosInstance = axios.create({ baseURL: apiConfig.baseUrl })
    this.axiosInstance.defaults.withCredentials = true
  }

  public get AxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }

  public async get(url: string): Promise<any> {
    return this.axiosInstance.get(url, {
      withCredentials: true
    })
  }

  public async post(url: string, data?: any): Promise<any> {
    return this.axiosInstance.post(url, data, {
      withCredentials: true,
      headers: {
        crossDomain: true,
        'Content-Type': 'application/json'
      }
    })
  }

  public async enableInterceptors(): Promise<void> {
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        console.log('sucess')
        return response
      },
      (error: any) => {
        console.log(error, 'err')
        const {
          config,
          response: { status }
        } = error
        const originalRequest = config
        if (status !== 401) throw error
        if (
          originalRequest.url !== 'users/me/refresh-token/' &&
          !originalRequest._retry
        ) {
          try {
            originalRequest._retry = true
            this.rootStore.authStore
              .refreshToken()
              .then(() => axios(originalRequest))
          } catch (err) {
            // log user out if fail to refresh (due to expired or missing token) or persistent 401 errors from original requests
            if (
              err === 'user has not logged in' ||
              (err.response && err.response.status === 401)
            ) {
              this.rootStore.authStore.logout()
            }
            // suppress original error to throw the new one to get new information
            throw err
          }
        }
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
