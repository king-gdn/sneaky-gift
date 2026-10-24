<script setup lang="ts">
import {DEV_USERS} from '#shared/devAuth'

// Dev-only: loaded by TheHeader / LoginCTA behind `import.meta.dev`, so it is not in production builds.
defineProps<{cta?: boolean}>()
const {isSignedIn} = useAppAuth()
</script>

<template>
  <UButton v-if="cta" label="Sign in as sample user" size="lg" to="/_dev/login-as/organizer" external/>
  <UButton v-else-if="isSignedIn" label="Dev sign out" to="/_dev/logout" external/>
  <UPopover v-else>
    <UButton label="Sign In (dev)"/>
    <template #content>
      <div class="flex flex-col gap-2 p-3">
        <UButton
          v-for="(user, key) in DEV_USERS" :key="key" :label="user.name" variant="ghost"
          :to="`/_dev/login-as/${key}`" external/>
      </div>
    </template>
  </UPopover>
</template>
