import React from 'react'
import { TextInput } from 'react-native'
import renderer from 'react-test-renderer'
// import App from '../App'
import Gazers from '../../pages/Gazers'

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
describe('<Home />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Gazers route={route} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('correctly renders prop', () => {
    const tree = renderer.create(<Gazers route={route} />).toJSON()
    const fullRepoName = tree.children[0].children[1].children[0]
    expect(fullRepoName).toBe(route.params.repo)
  })
  // it('correctly updates state', () => {
  //   const setRepo = jest.fn()
  //   const tree = shallow(<Home />)
  //   console.log(tree)
  //   tree.findByType(<TextInput />).simulate('changeText', 'loremipsum')
  //   expect(setRepo).toHaveBeenCalledWith('loremipsum')
  // })
})
