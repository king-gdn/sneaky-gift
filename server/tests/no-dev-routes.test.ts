import {execSync} from 'node:child_process'
import {readdirSync, readFileSync, statSync} from 'node:fs'
import {join} from 'node:path'
import {describe, expect, it} from 'vitest'

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

describe('production build', () => {
  it('contains no dev sign-in route or bypass', () => {
    execSync('pnpm nuxt build', {
      env: {...process.env, NODE_ENV: 'production', NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ''},
      stdio: 'pipe',
    })
    const hits = walk('dist').filter(f => /\.(m?js|json)$/.test(f))
      .filter(f => /_dev\/login-as|dev_organizer|dev_user/.test(readFileSync(f, 'utf8')))
    expect(hits).toEqual([])
  }, 600_000)
})
