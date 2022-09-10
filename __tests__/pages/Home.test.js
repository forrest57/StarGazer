import React from 'react'
import { TextInput } from 'react-native'
import renderer from 'react-test-renderer'
// import App from '../App'
import Home from '../../pages/Home'

describe('<Home />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  // it('correctly updates state', () => {
  //   const setRepo = jest.fn()
  //   const tree = shallow(<Home />)
  //   console.log(tree)
  //   tree.findByType(<TextInput />).simulate('changeText', 'loremipsum')
  //   expect(setRepo).toHaveBeenCalledWith('loremipsum')
  // })
})
