import { expect, test } from 'vitest'
import { extractDiff } from './FeedPumpSummaryUtil'

test('able to find difference of 2 values', () => {
  const diff = extractDiff(
    ['1'],
    [{
      date: '1',
      vol: 100
    }],
    [{
      date: '1',
      vol: 90
    }]
  )

  expect(diff.length).toBe(1)
  expect(diff[0]).toBe(10)
})

test('able to find difference with empty pump', () => {
  const diff = extractDiff(
    ['1'],
    [],
    [{
      date: '1',
      vol: 90
    }]
  )

  expect(diff.length).toBe(1)
  expect(diff[0]).toBe(-90)
})

test('able to find difference with empty feed', () => {
  const diff = extractDiff(
    ['1'],
    [{
      date: '1',
      vol: 90
    }],
    []
  )

  expect(diff.length).toBe(1)
  expect(diff[0]).toBe(90)
})