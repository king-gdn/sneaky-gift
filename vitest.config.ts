import { defineConfig } from 'vitest/config'

// @nuxt/test-utils 4 requires Vitest 4, which is not part of this bump, so
// unit tests run in a plain node environment for now.
export default defineConfig({
  test: {
    environment: 'node',
  },
})
