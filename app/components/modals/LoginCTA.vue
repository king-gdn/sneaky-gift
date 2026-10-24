<script setup lang="ts">
defineProps<{redirectUrl?: string}>()
const DevSignIn = import.meta.dev && useRuntimeConfig().public.devAuth
  ? defineAsyncComponent(() => import('~~/modules/dev-auth/runtime/DevSignIn.vue'))
  : null
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <UModal v-model:open="open" title="Log in" >

    <template #body>
      <div class="flex flex-col mx-auto ps-4">
        Sign in to save your secret santa and enjoy features such as:
        <ul class="list-disc p-5">
          <li>Sharing</li>
          <li>Blind Drawing</li>
          <li>and more</li>
        </ul>
        <DevSignIn v-if="DevSignIn" cta/>
        <SignInButton v-else class="flex-none" mode="modal" :force-redirect-url="redirectUrl">
          <UButton label="Sign In" size="lg" @click="open = false"/>
        </SignInButton>
      </div> 
    </template>
  </UModal>
</template>