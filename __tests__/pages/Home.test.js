import React from 'react'
import renderer from 'react-test-renderer'
const { validateRequest } = require('../../sharedLogic/')
// import App from '../App'
import { render, screen, fireEvent } from '@testing-library/react-native'
import Home from '../../pages/Home'

jest.mock('../../sharedLogic', () => ({ validateRequest: jest.fn() }))

describe('<Home />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('correctly calls validateAndRedirect with inserted data', () => {
    // const spy=jest.spyOn()
    render(<Home />)
    const textInputs = screen.getAllByTestId('textInput')
    fireEvent.changeText(textInputs[0], 'user')
    fireEvent.changeText(textInputs[1], 'repo')
    fireEvent.press(screen.getByText('Check Gazers'))
    expect(validateRequest).toBeCalled()
  })
})
