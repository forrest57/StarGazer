import { fireEvent, render, screen } from '@testing-library/react-native'

import React from 'react'
import Settings from '../../pages/Settings'
import renderer from 'react-test-renderer'
const { clearRepoHistory } = require('../../sharedLogic/asyncStorageManager')

jest.mock('../../sharedLogic/asyncStorageManager.js', () => ({
  clearRepoHistory: jest.fn(),
}))

describe('<Settings />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Settings />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('correctly calls the history-clearing function', () => {
    render(<Settings />)
    fireEvent.press(screen.getByText('Reset app data'))
    expect(clearRepoHistory).toBeCalled()
  })
})
