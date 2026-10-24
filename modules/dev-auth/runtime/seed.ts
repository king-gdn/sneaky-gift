import {DEV_USERS} from '#shared/devAuth'

// Fake exchange owned by the dev organizer so a signed-in preview has something to show.
export default defineNitroPlugin(() => {
  onHubReady(async () => {
    const db = useDrizzle()
    const listId = 'dev-fake-list'
    if (await db.query.lists.findFirst({where: eq(tables.lists.id, listId)})) return

    const names = ['Alex Example', 'Sam Sample', 'Pat Placeholder']
    const memberRows = names.map((name, i) => ({id: `dev-fake-member-${i}`, name, createdAt: new Date()}))
    await db.batch([
      db.insert(tables.lists).values({
        id: listId,
        name: 'Fake Office Party (dev data)',
        createdAt: new Date(),
        owner: DEV_USERS.organizer.id,
        currentScenario: JSON.stringify([1, 2, 0]),
      }),
      db.insert(tables.members).values(memberRows),
      db.insert(tables.membershipToList).values(memberRows.map((m, i) => ({
        memberId: m.id, list: listId, position: i, exclusions: JSON.stringify([]),
      }))),
    ])
  })
})
