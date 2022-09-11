import React from 'react'
import renderer from 'react-test-renderer'
const { validateRequest } = require('../../sharedLogic/')
// import App from '../App'
import { render, screen, fireEvent, act } from '@testing-library/react-native'
import Recents from '../../pages/Recents'

// jest.mock('../../sharedLogic', () => ({ validateRequest: jest.fn() }))

describe('<Recents />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Recents />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  //   it('correctly calls validateAndRedirect with inserted data', () => {
  //     render(<Home />)
  //     const textInputs = screen.getAllByTestId('textInput')
  //     fireEvent.changeText(textInputs[0], 'user')
  //     fireEvent.changeText(textInputs[1], 'repo')
  //     fireEvent.press(screen.getByText('Check Gazers'))
  //     expect(validateRequest).toBeCalled()
  //   })
})
