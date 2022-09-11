import React from 'react'
import renderer from 'react-test-renderer'
const { validateRequest, getRepoHistory } = require('../../sharedLogic/')
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'
import Home from '../../pages/Home'
import { Alert } from 'react-native'

jest.mock('../../sharedLogic', () => ({
  validateRequest: jest.fn(),
  getRepoHistory: jest.fn(),
}))

jest.spyOn(Alert, 'alert')

describe('<Home />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('correctly calls validateAndRedirect with inserted data', () => {
    render(<Home />)
    const textInputs = screen.getAllByTestId('textInput')
    fireEvent.changeText(textInputs[0], 'user')
    fireEvent.changeText(textInputs[1], 'repo')
    fireEvent.press(screen.getByText('Check Gazers'))
    expect(validateRequest).toBeCalled()
  })
  it('correctly calls getRepoHistory when wanting to redirect to recent', async () => {
    render(<Home />)
    fireEvent.press(screen.getByText('Recent repos'))
    await expect(getRepoHistory).toBeCalled()
  })
  it('correctly displays an alert message in case no repo history has been found', async () => {
    render(<Home />)
    getRepoHistory.mockReturnValueOnce([])
    fireEvent.press(screen.getByText('Recent repos'))
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'No recent repos',
        "Look some repos up and they'll be added to your history."
      )
    )
  })
})
