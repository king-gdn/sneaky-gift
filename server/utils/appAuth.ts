import type {H3Event} from 'h3'
import {DEV_USER_COOKIE, devUserIdFromCookie} from '#shared/devAuth'

/** The signed-in user's id (Clerk, or the fixture user in dev sign-in mode), or null. */
export function getUserId(evt: H3Event): string | null {
  if (import.meta.dev && useRuntimeConfig(evt).public.devAuth) {
    return devUserIdFromCookie(getCookie(evt, DEV_USER_COOKIE))
  }
  return evt.context.auth().userId ?? null
}
