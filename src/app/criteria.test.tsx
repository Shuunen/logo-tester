import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TooltipProvider } from '../components/ui/tooltip'
import { Criteria } from './criteria'

describe(Criteria, () => {
  it('reports the selected point value', async () => {
    const selections: number[] = []
    const { getByTestId } = render(
      <TooltipProvider>
        <Criteria name="Readable" onSelection={pointValue => selections.push(pointValue)} />
      </TooltipProvider>,
    )
    await userEvent.click(getByTestId('button-yes-clearly'))
    expect(selections).toStrictEqual([3])
  })
})
