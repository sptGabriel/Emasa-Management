/* eslint-disable no-underscore-dangle */
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import {makeAutoObservable} from 'mobx'
import {apiConfig} from '../config/api'
import {RootStore} from './rootStore'

export class AxiosStore {
  axiosInstance: AxiosInstance

  isAlreadyFetchingAccessToken = false

  subscribers: any = []

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.axiosInstance = axios.create({baseURL: apiConfig.baseUrl})
    this.axiosInstance.defaults.withCredentials = true
  }

  public get AxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }

  public get = async (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<any> => {
    return this.axiosInstance.get(url, {
      ...config,
      withCredentials: true,
      // prettier-ignore
      headers: {
        'Authorization': `bearer ${this.rootStore.currentUserStore.accessToken}`,
      },
    })
  }

  public post = async (url: string, data?: any): Promise<any> => {
    return this.axiosInstance.post(url, data, {
      withCredentials: true,
      headers: {
        crossDomain: true,
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.rootStore.currentUserStore.accessToken}`,
      },
    })
  }

  public put = async (url: string, data?: any): Promise<any> => {
    return this.axiosInstance.put(url, data, {
      withCredentials: true,
      headers: {
        crossDomain: true,
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.rootStore.currentUserStore.accessToken}`,
      },
    })
  }

  public enableInterceptors = async (): Promise<void> => {
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        return response
      },
      (error: any) => {
        const {config, response} = error
        const originalRequest = config
        if (error.message === 'Network Error') throw error
        if (response && response.status !== 401) throw error
        if (
          originalRequest.url !== '/users/me/refresh-token' &&
          originalRequest.url !== '/users/me/logout' &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true
          this.rootStore.authStore
            .refreshToken()
            .then(() => axios(originalRequest))
            .catch(() => {
              this.rootStore.authStore.logout()
            })
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      },
    )
  }
}
