export default defineNuxtRouteMiddleware((to, _from) => {

  // go to step one automatically
  if (to.path === '/create' || to.path === '/create/') {
    return navigateTo('/create/1-name/')
  }

})
