import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'

import { Alert } from 'react-native'
import Home from '../../pages/Home'
import React from 'react'
import renderer from 'react-test-renderer'

const { validateRequest } = require('../../sharedLogic/apiManager')
const { getRepoHistory } = require('../../sharedLogic/asyncStorageManager')

jest.mock('../../sharedLogic/apiManager.js', () => ({
  validateRequest: jest.fn(),
}))
jest.mock('../../sharedLogic/asyncStorageManager.js', () => ({
  getRepoHistory: jest.fn(),
}))

jest.spyOn(Alert, 'alert')

beforeEach(cleanup)

describe('<Home />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('correctly calls validateAndRedirect with inserted valid data', () => {
    render(<Home />)
    const textInputs = screen.getAllByTestId('textInput')
    fireEvent.changeText(textInputs[0], 'user')
    fireEvent.changeText(textInputs[1], 'repo')
    fireEvent.press(screen.getByText('Check Gazers'))
    expect(validateRequest).toBeCalled()
  })
  // it('correctly displays an alert message in case no text has been provided', async () => {
  //   render(<Home />)
  //   const { validateRequest } = jest.requireActual(
  //     '../../sharedLogic/apiManager.js'
  //   )
  //   const textInputs = screen.getAllByTestId('textInput')
  //   fireEvent.changeText(textInputs[0], '')
  //   fireEvent.changeText(textInputs[1], '')
  //   fireEvent.press(screen.getByText('Check Gazers'))
  //   await waitFor(() =>
  //     expect(Alert.alert).toHaveBeenCalledWith(
  //       'error',
  //       'empty search fields, add data first'
  //     )
  //   )
  // })
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
