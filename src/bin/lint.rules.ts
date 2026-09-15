const regexImgTag = /<img\b[^>]*>/gs
const regexAltAttribute = /\salt=/
const regexSetPointAtIndex = /setPointAtIndex\(\s*(?<index>\d+)/g

export function getImgTagsWithoutAlt(content: string): string[] {
  const tags = content.match(regexImgTag) ?? []
  return tags.filter(tag => !regexAltAttribute.test(tag))
}

export function getCriteriaIndexes(content: string): number[] {
  return [...content.matchAll(regexSetPointAtIndex)].map(match => Number(match.groups?.index))
}

/**
 * Criteria scores are stored positionally, so their indexes must start at 0 and never repeat or skip a slot
 * @param content the source file content
 * @returns true when indexes form a contiguous 0..n sequence, or when the file has no criteria at all
 */
export function hasContiguousCriteriaIndexes(content: string): boolean {
  const indexes = getCriteriaIndexes(content)
  if (indexes.length === 0) return true
  const sorted = indexes.toSorted((left, right) => left - right)
  return sorted.every((index, position) => index === position)
}

export type Rule = {
  check: (content: string) => boolean
  error: string
  fixer?: (content: string, filePath: string) => string
  name: string
}

export const rules: Rule[] = [
  {
    check: (content: string) => getImgTagsWithoutAlt(content).length === 0,
    error: 'every <img> must have an alt attribute',
    name: 'img alt',
  },
  {
    check: (content: string) => hasContiguousCriteriaIndexes(content),
    error: 'setPointAtIndex calls must use unique, contiguous indexes starting at 0',
    name: 'criteria indexes',
  },
]
