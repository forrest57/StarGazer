// import App from '../App'
import { fireEvent, render, screen } from '@testing-library/react-native'

import React from 'react'
import Recents from '../../pages/Recents'
import renderer from 'react-test-renderer'

const { getGazers } = require('../../sharedLogic/apiManager')

jest.mock('../../sharedLogic/apiManager.js', () => ({
  getGazers: jest.fn(),
}))
const route = {
  params: {
    repos: ['lorem/ipsum', 'ipsum/lorem'],
  },
}

describe('<Recents />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Recents route={route} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('correctly renders the passed props', () => {
    render(<Recents route={route} />)
    const firstRepo = screen.getByText('lorem/ipsum')
    const secondRepo = screen.getByText('ipsum/lorem')

    expect(firstRepo).toBeTruthy()
    expect(secondRepo).toBeTruthy()
  })
  it('correctly calls getGazers with inserted data', async () => {
    render(<Recents route={route} />)
    const firstRepo = screen.getByText('lorem/ipsum')
    fireEvent.press(firstRepo)
    expect(getGazers).toBeCalledWith('lorem', 'ipsum')
  })
})
