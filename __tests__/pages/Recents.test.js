import React from 'react'
import renderer from 'react-test-renderer'
const { validateRequest } = require('../../sharedLogic/apiManager')
// import App from '../App'
import { render, screen, fireEvent, act } from '@testing-library/react-native'
import Recents from '../../pages/Recents'

// jest.mock('../../sharedLogic', () => ({ validateRequest: jest.fn() }))
const route = {
  params: {
    repos: ['lorem/Ipsum', 'Ipsum/lorem'],
  },
}

describe('<Recents />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Recents route={route} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('correctly renders the passed props', () => {
    render(<Recents route={route} />)
    const firstRepo = screen.getByText('lorem/Ipsum')
    const secondRepo = screen.getByText('Ipsum/lorem')

    expect(firstRepo).toBeTruthy()
    expect(secondRepo).toBeTruthy()
  })
})
