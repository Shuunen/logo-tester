import { render } from '@testing-library/react'
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
})
