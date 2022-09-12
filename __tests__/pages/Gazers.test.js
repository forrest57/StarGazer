import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react-native'

import Gazers from '../../pages/Gazers'
import React from 'react'
import { loadNextPage } from '../../sharedLogic/apiManager'
import renderer from 'react-test-renderer'

afterEach(cleanup)

const route = {
  params: {
    repo: 'loremIpsum',
    data: [
      { id: 1, login: 'lorem', avatar_url: null },
      { id: 2, login: 'lorem', avatar_url: null },
      { id: 3, login: 'lorem', avatar_url: null },
    ],
  },
}
const moreItems = {
  repo: 'loremIpsum',
  data: [
    { id: 4, login: 'new', avatar_url: null },
    { id: 5, login: 'new2', avatar_url: null },
    { id: 6, login: 'new3', avatar_url: null },
  ],
}

jest.mock('../../sharedLogic/apiManager.js', () => ({
  loadNextPage: jest.fn(),
}))

const eventData = {
  nativeEvent: {
    contentOffset: {
      y: -5000,
    },
    contentSize: {
      // Dimensions of the scrollable content
      height: 200,
      width: 100,
    },
    layoutMeasurement: {
      // Dimensions of the device
      height: 100,
      width: 100,
    },
  },
}
const routeEmpty = {
  params: {
    repo: 'loremIpsum',
    data: [],
  },
}
describe('<Gazers />', function () {
  //prettier kept adding a semicolon
  it('renders correctly', () => {
    const tree = renderer.create(<Gazers route={route} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('correctly renders prop', () => {
    const tree = renderer.create(<Gazers route={route} />).toJSON()
    const fullRepoName = tree.children[0].children[1].children[0]
    expect(fullRepoName).toBe(route.params.repo)
  })
  it('correctly renders conditional item', () => {
    render(<Gazers navigation={null} route={routeEmpty} />)
    const conditionalComponent = screen.queryByText('No Stargazers?')
    expect(conditionalComponent).toBeTruthy()
  })
  it('scrolls to bottom and loads new items', async () => {
    render(<Gazers route={route} />)
    expect(() => screen.getByText('new')).toThrow() //not shown
    loadNextPage.mockResolvedValueOnce(moreItems)
    fireEvent.scroll(screen.getByTestId('List'), eventData)
    await waitForElementToBeRemoved(
      async () => await screen.findByText(/loading more.../i),
      {
        timeout: 3000,
      }
    )
    await waitFor(() => {
      expect(getByText(/new/i)).toBeTruthy()
    })
  })
})
