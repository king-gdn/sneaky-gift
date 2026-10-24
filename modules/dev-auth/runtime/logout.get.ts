import {DEV_USER_COOKIE} from '#shared/devAuth'

export default defineEventHandler((event) => {
  deleteCookie(event, DEV_USER_COOKIE, {path: '/'})
  return sendRedirect(event, '/')
})
