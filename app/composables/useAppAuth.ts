import {useAuth} from '@clerk/nuxt/composables'
import {DEV_USER_COOKIE, devUserIdFromCookie} from '#shared/devAuth'

/** Auth state from Clerk, or from the fixture user cookie when the dev sign-in is active. */
export default function useAppAuth() {
  if (import.meta.dev && useRuntimeConfig().public.devAuth) {
    const cookie = useCookie<string | null>(DEV_USER_COOKIE)
    const userId = computed(() => devUserIdFromCookie(cookie.value))
    return {
      isLoaded: computed(() => true),
      isSignedIn: computed(() => userId.value !== null),
      userId,
    }
  }
  const {isLoaded, isSignedIn, userId} = useAuth()
  return {isLoaded, isSignedIn, userId}
}
