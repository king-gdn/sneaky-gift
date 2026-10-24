import {addServerHandler, addServerPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'

// Dev-only sign-in for previews that run without Clerk keys.
// Active only in `nuxt dev` with no publishable key; a production build registers nothing from here.
export default defineNuxtModule({
  meta: {name: 'dev-auth'},
  setup(_options, nuxt) {
    const active = nuxt.options.dev && !process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    nuxt.options.runtimeConfig.public.devAuth = active
    if (!active) return

    const {resolve} = createResolver(import.meta.url)
    addServerHandler({route: '/_dev/login-as/:user', method: 'get', handler: resolve('./runtime/login-as.get')})
    addServerHandler({route: '/_dev/logout', method: 'get', handler: resolve('./runtime/logout.get')})
    addServerPlugin(resolve('./runtime/seed'))
  },
})
