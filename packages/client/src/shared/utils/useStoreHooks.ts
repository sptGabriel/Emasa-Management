import { AuthStore } from '../../store/authStore'
import { CookieStore } from '../../store/cookieStore'
import { CurrentUserStore } from '../../store/currentUserStore'
import { useRootStore } from '../infra/mobx'

export function useAuthStore(): AuthStore {
  const { authStore } = useRootStore()
  return authStore
}
export function useCurrentUserStore(): CurrentUserStore {
  const { currentUserStore } = useRootStore()
  return currentUserStore
}
export function useCookiesStore(): CookieStore {
  const { cookieStore } = useRootStore()
  return cookieStore
}
