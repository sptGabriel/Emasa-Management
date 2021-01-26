import {AuthStore} from '../../store/authStore'
import {CookieStore} from '../../store/cookieStore'
import {CurrentUserStore} from '../../store/currentUserStore'
import {useRootStore} from '../infra/mobx'

export const useAuthStore = (): AuthStore => {
  const rootStore = useRootStore()
  return rootStore.authStore
}
export const useCurrentUserStore = (): CurrentUserStore => {
  const {currentUserStore} = useRootStore()
  return currentUserStore
}
export const useCookiesStore = (): CookieStore => {
  const {cookieStore} = useRootStore()
  return cookieStore
}
