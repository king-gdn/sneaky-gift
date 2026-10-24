import { getPossibility, getTotalPossibilites } from '../utils/matching'
import { test, expect } from 'vitest'

test('should give us a new list of ids', () => {
  const initial = [1,2,3,4]
  const deranged = getPossibility(initial)
  expect(initial.some((item, index) => item === deranged[index])).toBeFalsy()
})

test('should respect exclusions', () => {
  const initial = [0,1,2]
  const exclusions = [[2,0]]
  const deranged = getPossibility(initial, exclusions)
  expect(deranged[2]).not.toBe(0)
})

test('should return a number of getTotalPossibilites', () => {
  const initial = [0,1,2,3,4]
  const exclusions = [[2,3]]
  const total = getTotalPossibilites(initial, exclusions)
  expect(total).toBe(33)
})

test('should respect exclusions larger', () => {
  const initial = [0,1,2,3,4]
  const exclusions = [[0,1],[2,3]]
  const deranged = getPossibility(initial, exclusions)
  expect(deranged[0]).not.toBe(1)
  expect(deranged[2]).not.toBe(3)
})


test('should respect exclusions two', () => {
  const initial = [0,1,2,3,4]
  const exclusions = [[1,3],[1,4]]
  const deranged = getPossibility(initial, exclusions)
  expect(deranged[1]).not.toBe(3)
  expect(deranged[1]).not.toBe(4)
})
