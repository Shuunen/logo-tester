import { getNodeText } from './node-text'

describe(getNodeText, () => {
  it('reads a string node', () => {
    expect(getNodeText('Logo Tester')).toBe('Logo Tester')
  })
  it('reads a number node', () => {
    expect(getNodeText(42)).toBe('42')
  })
  it('returns an empty string for undefined', () => {
    expect(getNodeText(undefined)).toBe('')
  })
  it('returns an empty string for a boolean', () => {
    expect(getNodeText(true)).toBe('')
  })
  it('concatenates an array of nodes', () => {
    expect(getNodeText(['Logo', ' ', 'Tester'])).toBe('Logo Tester')
  })
  it('reads the children of an element', () => {
    expect(getNodeText(<span>Readable slogan</span>)).toBe('Readable slogan')
  })
  it('reads nested element children', () => {
    expect(
      getNodeText(
        <div>
          <span>Simple</span> <b>icon</b>
        </div>,
      ),
    ).toBe('Simple icon')
  })
  it('returns an empty string for an element without children', () => {
    expect(getNodeText(<hr />)).toBe('')
  })
})
