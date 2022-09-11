
import React from 'react'
// import { TextInput } from 'react-native'
import renderer from 'react-test-renderer'
// import App from '../App'
const { clearRepoHistory } = require('../../sharedLogic/')
import { render, screen, fireEvent } from '@testing-library/react-native'
import Settings from '../../pages/Settings'

jest.mock('../../sharedLogic', () => ({ clearRepoHistory: jest.fn() }))
describe('<Settings />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Settings />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('correctly calls the history-clearing function', () => {
    // const spy=jest.spyOn()
    render(<Settings />)
    fireEvent.press(screen.getByText('Reset app data'))
    expect(clearRepoHistory).toBeCalled()
  })
})
