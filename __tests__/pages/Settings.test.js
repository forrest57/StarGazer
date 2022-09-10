
import React from 'react'
import { TextInput } from 'react-native'
import renderer from 'react-test-renderer'
// import App from '../App'
import Settings from '../../pages/Settings'

describe('<Settings />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Settings />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  
})
