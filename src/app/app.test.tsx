import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TooltipProvider } from '../components/ui/tooltip'
import { App } from './app'

function renderApp() {
  return render(
    <TooltipProvider>
      <App />
    </TooltipProvider>,
  )
}

describe(App, () => {
  it('should render successfully', () => {
    const { baseElement } = renderApp()
    expect(baseElement).toBeDefined()
  })

  it('should have a title', () => {
    const { getByTestId } = renderApp()
    expect(getByTestId('title-logo-tester')).toBeDefined()
  })

  it('should offer a logo and an icon upload', () => {
    const { getByTestId } = renderApp()
    expect(getByTestId('input-logo-file')).toBeDefined()
    expect(getByTestId('input-logo-icon-file')).toBeDefined()
  })

  it('should disable the copy button until a criteria is rated', () => {
    const { getByTestId } = renderApp()
    expect(getByTestId('button-copy')).toHaveProperty('disabled', true)
  })

  it('should enable the copy button once a criteria is rated', async () => {
    const { getByTestId, getAllByTestId } = renderApp()
    await userEvent.click(getAllByTestId('button-yes-clearly')[0])
    expect(getByTestId('button-copy')).toHaveProperty('disabled', false)
  })

  it('should copy the points to the clipboard and confirm it', async () => {
    const copied: string[] = []
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: (text: string) => {
          copied.push(text)
          return Promise.resolve()
        },
      },
    })
    const { getByTestId, getAllByTestId } = renderApp()
    await userEvent.click(getAllByTestId('button-yes-clearly')[0])
    await userEvent.click(getByTestId('button-copy'))
    expect(copied).toStrictEqual(['3'])
    expect(getAllByTestId('paragraph-muted').map(node => node.textContent)).toContain('Results copied to clipboard')
  })

  it('should copy one tab separated value per rated criteria', async () => {
    const copied: string[] = []
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: (text: string) => {
          copied.push(text)
          return Promise.resolve()
        },
      },
    })
    const { getByTestId, getAllByTestId } = renderApp()
    await userEvent.click(getAllByTestId('button-no-not-at-all')[0])
    await userEvent.click(getAllByTestId('button-average-okay')[1])
    await userEvent.click(getAllByTestId('button-yes-clearly')[2])
    await userEvent.click(getByTestId('button-copy'))
    expect(copied).toStrictEqual(['1\t2\t3'])
  })

  it('should show an error when the clipboard is unavailable', async () => {
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: () => Promise.reject(new Error('denied')),
      },
    })
    const { getByTestId, getAllByTestId } = renderApp()
    await userEvent.click(getAllByTestId('button-yes-clearly')[0])
    await userEvent.click(getByTestId('button-copy'))
    expect(getByTestId('paragraph-error').textContent).toBe('Copy failed, your browser denied clipboard access')
  })

  it('should hide the copied confirmation when a criteria changes again', async () => {
    const { getByTestId, getAllByTestId, queryAllByTestId } = renderApp()
    await userEvent.click(getAllByTestId('button-yes-clearly')[0])
    await userEvent.click(getByTestId('button-copy'))
    await userEvent.click(getAllByTestId('button-no-not-at-all')[0])
    expect(queryAllByTestId('paragraph-muted').map(node => node.textContent)).not.toContain('Results copied to clipboard')
  })
})
