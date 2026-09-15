import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileUpload } from './file-upload'

describe(FileUpload, () => {
  it('forwards the selected file', async () => {
    const files: File[] = []
    const { getByTestId } = render(<FileUpload label="Logo file" name="logo-file" onFile={file => files.push(file)} />)
    const file = new File(['logo'], 'logo.png', { type: 'image/png' })
    await userEvent.upload(getByTestId('input-logo-file'), file)
    expect(files.map(item => item.name)).toStrictEqual(['logo.png'])
  })
  it('does not forward anything when the selection is cleared', async () => {
    const files: File[] = []
    const { getByTestId } = render(<FileUpload label="Logo file" name="logo-file" onFile={file => files.push(file)} />)
    const input = getByTestId('input-logo-file')
    const file = new File(['logo'], 'logo.png', { type: 'image/png' })
    await userEvent.upload(input, file)
    await userEvent.upload(input, [])
    expect(files.map(item => item.name)).toStrictEqual(['logo.png'])
  })
})
