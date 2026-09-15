import { getCriteriaIndexes, getImgTagsWithoutAlt, hasContiguousCriteriaIndexes, rules } from './lint.rules'

describe('img alt', () => {
  it('accepts an img with an alt attribute', () => {
    expect(getImgTagsWithoutAlt('<img alt="a logo" src="a.png" />')).toStrictEqual([])
  })
  it('reports an img without an alt attribute', () => {
    expect(getImgTagsWithoutAlt('<img src="a.png" />')).toHaveLength(1)
  })
  it('does not confuse a src named alt-something with an alt attribute', () => {
    expect(getImgTagsWithoutAlt('<img src="alt=x.png" />')).toHaveLength(1)
  })
})

describe('criteria indexes', () => {
  it('reads every index', () => {
    expect(getCriteriaIndexes('setPointAtIndex(0, a) setPointAtIndex(1, b)')).toStrictEqual([0, 1])
  })
  it('accepts a file without criteria', () => {
    expect(hasContiguousCriteriaIndexes('const a = 1')).toBe(true)
  })
  it('accepts contiguous indexes in any order', () => {
    expect(hasContiguousCriteriaIndexes('setPointAtIndex(1, a) setPointAtIndex(0, b)')).toBe(true)
  })
  it('rejects a duplicated index', () => {
    expect(hasContiguousCriteriaIndexes('setPointAtIndex(0, a) setPointAtIndex(0, b)')).toBe(false)
  })
  it('rejects a skipped index', () => {
    expect(hasContiguousCriteriaIndexes('setPointAtIndex(0, a) setPointAtIndex(2, b)')).toBe(false)
  })
})

describe('rules', () => {
  it('all pass on a clean source', () => {
    const content = '<img alt="ok" src="a.png" /> setPointAtIndex(0, a)'
    expect(rules.filter(rule => !rule.check(content))).toStrictEqual([])
  })
})
