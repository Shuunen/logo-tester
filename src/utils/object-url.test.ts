import { replaceObjectUrl } from './object-url'

describe(replaceObjectUrl, () => {
  it('creates an object url for the given file', () => {
    const created: string[] = []
    const file = new File(['logo'], 'logo.png', { type: 'image/png' })
    const spy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:fake-one')
    created.push(replaceObjectUrl('https://i.imgur.com/zo0aebs.png', file))
    expect(created).toStrictEqual(['blob:fake-one'])
    spy.mockRestore()
  })

  it('does not revoke a remote url', () => {
    const revoked: string[] = []
    const file = new File(['logo'], 'logo.png', { type: 'image/png' })
    const createSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:fake-one')
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(url => revoked.push(url))
    replaceObjectUrl('https://i.imgur.com/zo0aebs.png', file)
    expect(revoked).toStrictEqual([])
    createSpy.mockRestore()
    revokeSpy.mockRestore()
  })

  it('revokes the previous object url', () => {
    const revoked: string[] = []
    const file = new File(['logo'], 'logo.png', { type: 'image/png' })
    const createSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:fake-two')
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(url => revoked.push(url))
    replaceObjectUrl('blob:fake-one', file)
    expect(revoked).toStrictEqual(['blob:fake-one'])
    createSpy.mockRestore()
    revokeSpy.mockRestore()
  })
})
