<script setup lang="ts">
import TheLogo from './TheLogo.vue';

const defaultMenuItems =
  [{
    label: 'About',
    to: '/about',
  },]

const authMenuItems = [{
  label: 'Lists',
  to: '/lists',
},

]

function selectHandler() {
  return drawerOpen.value = false
}

const {isSignedIn} = useAppAuth()
const DevSignIn = import.meta.dev && useRuntimeConfig().public.devAuth
  ? defineAsyncComponent(() => import('~~/modules/dev-auth/runtime/DevSignIn.vue'))
  : null

const getMenuItems = () => {
  const items = isSignedIn.value
    ? [...authMenuItems, ...defaultMenuItems]
    : defaultMenuItems
  return items.map((row) => {
    return {
      onSelect() {selectHandler()},
      ...row
    }
  })
}

const menuItems = ref(getMenuItems())

const drawerOpen = ref(false)

watch(isSignedIn, () => {
  menuItems.value = getMenuItems()
})

</script>

<template>
  <div class='max-w-2xl mx-auto flex items-center p-2 sticky justify-between'>
    <TheLogo/>
    <div class="flex gap-4 justify-end">
      <UNavigationMenu :items="menuItems" class="block max-sm:hidden"/>
      <UDrawer v-model:open="drawerOpen" title="Menu" direction="right" class="w-2/3">

        <UButton icon="i-lucide-menu" color="neutral" variant="ghost" class="sm:hidden" aria-text="Menu"/>
        <template #body>
          <UNavigationMenu orientation="vertical" :items="menuItems" class="z-10"/>
        </template>
      </UDrawer>
      <ClientOnly>
        <DevSignIn v-if="DevSignIn"/>
        <template v-else>
          <UserButton v-if="isSignedIn"/>
          <SignInButton v-else mode="modal" class="cursor-pointer">
            <UButton label="Sign In"/>
          </SignInButton>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
