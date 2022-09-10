import React from 'react'
import renderer from 'react-test-renderer'
// import App from '../App'
import Home from '../../pages/Home'

describe('<Home />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  
})
