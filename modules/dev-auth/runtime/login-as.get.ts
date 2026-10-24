import {DEV_USER_COOKIE, DEV_USERS} from '#shared/devAuth'

export default defineEventHandler((event) => {
  const user = getRouterParam(event, 'user') ?? ''
  if (!Object.hasOwn(DEV_USERS, user)) {
    throw createError({statusCode: 404, message: `Unknown dev user "${user}"`})
  }
  setCookie(event, DEV_USER_COOKIE, user, {path: '/', sameSite: 'lax'})
  return sendRedirect(event, '/lists')
})
