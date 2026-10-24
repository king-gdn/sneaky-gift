<script setup lang="ts">

function throwError() {
  throw createError({
    statusMessage: "Cannot load"
  })
}

const {list, memberId} = useRoute().params

if (!list && !memberId) {
  throwError()
}

type InviteMember = { name: string | null }
type InviteResponse = { list: string, from: InviteMember, to: InviteMember }

const fetchFn = useRequestFetch()
const request = fetchFn as unknown as (url: string) => Promise<InviteResponse>
const {data, ...rest} = useQuery({
  key: () => [`${list}`, `${memberId}`],
  query: () => request(`/api/invites/${list}/${memberId}`),
})
</script>

<template>
  <UContainer class="flex flex-col items-center">
    <div v-if="data" class="h-12 space-y-2">

      <p>👋 Hi <strong>{{ data.from.name }}</strong>! As part of the
        <strong>{{ data.list }}</strong>
        gift exchange you're selecting for:
      </p>
      <RevealableName :name="data.to.name ?? ''" class="w-full"/>
    </div>
  </UContainer>
</template>
