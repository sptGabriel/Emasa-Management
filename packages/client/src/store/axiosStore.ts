/* eslint-disable no-underscore-dangle */
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

  public get = async (url: string): Promise<any> => {
    return this.axiosInstance.get(url, {
      withCredentials: true
    })
  }

  public post = async (url: string, data?: any): Promise<any> => {
    return this.axiosInstance.post(url, data, {
      withCredentials: true,
      headers: {
        crossDomain: true,
        'Content-Type': 'application/json'
      }
    })
  }

  public enableInterceptors = async (): Promise<void> => {
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        return response
      },
      (error: any) => {
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
          originalRequest._retry = true
          this.rootStore.authStore
            .refreshToken()
            .then(() => axios(originalRequest))
            .catch((err) => {
              this.rootStore.authStore.logout()
              throw err
            })
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        return Promise.reject(error)
      }
    )
  }
}