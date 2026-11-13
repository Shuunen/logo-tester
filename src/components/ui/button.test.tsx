import { render } from '@testing-library/react'
import { Button } from './button'

describe(Button, () => {
  it('renders a button by default', () => {
    const { getByTestId } = render(<Button name="save">Save</Button>)
    expect(getByTestId('button-save').tagName).toBe('BUTTON')
  })

  it('renders its child instead of a button when asChild is set', () => {
    const { getByTestId } = render(
      <Button asChild name="docs">
        <a href="https://example.com">Docs</a>
      </Button>,
    )
    expect(getByTestId('button-docs').tagName).toBe('A')
  })
})
