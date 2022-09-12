import { render, screen } from '@testing-library/react-native'

import Gazers from '../../pages/Gazers'
import React from 'react'
import renderer from 'react-test-renderer'

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
const routeEmpty = {
  params: {
    repo: 'loremIpsum',
    data: [],
  },
}
describe('<Gazers />', () => {
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
    console.log(conditionalComponent)
    expect(conditionalComponent).toBeTruthy()
  })
})
