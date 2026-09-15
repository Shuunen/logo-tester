import type { ReactNode } from 'react'

function hasChildren(node: object): node is { props: { children: ReactNode } } {
  return 'props' in node && typeof node.props === 'object' && node.props !== null && 'children' in node.props
}

/**
 * Extract the plain text of a React node, used to derive stable test ids
 * @param node the React node to read
 * @returns the concatenated text, empty string when there is none
 */
export function getNodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return node.toString()
  if (typeof node !== 'object' || node === null) return ''
  if (Array.isArray(node)) return node.map(child => getNodeText(child as ReactNode)).join('')
  if (hasChildren(node)) return getNodeText(node.props.children)
  return ''
}
