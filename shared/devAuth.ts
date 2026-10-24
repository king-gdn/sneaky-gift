// Clearly fake users for the dev-only sign-in (see modules/dev-auth). Never used in production builds.
export const DEV_USER_COOKIE = 'dev_user'

export const DEV_USERS = {
  organizer: {id: 'dev_organizer', name: 'Dev Organizer (fake)'},
  member: {id: 'dev_member', name: 'Dev Member (fake)'},
  outsider: {id: 'dev_outsider', name: 'Dev Outsider (fake, in no exchange)'},
} as const

export type DevUserKey = keyof typeof DEV_USERS

export function devUserIdFromCookie(value: string | undefined | null): string | null {
  if (!value || !Object.hasOwn(DEV_USERS, value)) return null
  return DEV_USERS[value as DevUserKey].id
}
